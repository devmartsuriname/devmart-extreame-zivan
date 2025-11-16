import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/zip',
      'video/mp4',
      'video/webm'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 50MB limit' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not allowed' };
    }

    return { valid: true };
  };

  const validateTags = (tags) => {
    if (!tags || tags.length === 0) return [];
    
    return tags
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0)
      .filter(tag => /^[a-z0-9-]+$/.test(tag));
  };

  const getImageDimensions = (file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve({ width: null, height: null });
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ width: null, height: null });
      };

      img.src = url;
    });
  };

  const sanitizeFilename = (filename) => {
    return filename
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const uploadFiles = async (files, folder = 'uncategorized', tags = []) => {
    const validatedTags = validateTags(tags);
    setUploading(true);
    const uploadedFiles = [];
    const errors = [];

    try {
      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
          errors.push({ file: file.name, error: validation.error });
          continue;
        }

        // Generate unique filename with timestamp
        const timestamp = Date.now();
        const sanitized = sanitizeFilename(file.name);
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const filePath = `${year}/${month}/${timestamp}-${sanitized}`;

        // Update progress
        setProgress(prev => ({ ...prev, [file.name]: 0 }));

        // Upload to storage
        const { data: storageData, error: storageError } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (storageError) {
          errors.push({ file: file.name, error: storageError.message });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Get image dimensions if applicable
        const { width, height } = await getImageDimensions(file);

        // Create database record
        const { data: dbData, error: dbError } = await supabase
          .from('media_library')
          .insert({
            filename: sanitized,
            original_filename: file.name,
            file_path: filePath,
            file_url: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            width,
            height,
            folder,
            tags: validatedTags,
            usage_count: 0,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id
          })
          .select()
          .single();

        if (dbError) {
          // Cleanup storage if DB insert fails
          await supabase.storage.from('media').remove([filePath]);
          errors.push({ file: file.name, error: dbError.message });
          continue;
        }

        uploadedFiles.push(dbData);
        setProgress(prev => ({ ...prev, [file.name]: 100 }));
      }

      if (uploadedFiles.length > 0) {
        toast.success(`Successfully uploaded ${uploadedFiles.length} file(s)`);
      }

      if (errors.length > 0) {
        errors.forEach(({ file, error }) => {
          toast.error(`${file}: ${error}`);
        });
      }

      return { uploadedFiles, errors };
    } catch (error) {
      toast.error('Upload failed: ' + error.message);
      return { uploadedFiles: [], errors: [{ error: error.message }] };
    } finally {
      setUploading(false);
      setProgress({});
    }
  };

  return {
    uploadFiles,
    uploading,
    progress
  };
};
