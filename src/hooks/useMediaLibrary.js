import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useMediaList = (filters = {}) => {
  return useQuery({
    queryKey: ['media', filters],
    queryFn: async () => {
      let query = supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.folder && filters.folder !== 'all') {
        query = query.eq('folder', filters.folder);
      }

      if (filters.search) {
        query = query.or(`filename.ilike.%${filters.search}%,original_filename.ilike.%${filters.search}%,alt_text.ilike.%${filters.search}%`);
      }

      if (filters.mimeType) {
        query = query.like('mime_type', `${filters.mimeType}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    }
  });
};

export const useMediaItem = (id) => {
  return useQuery({
    queryKey: ['media', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
};

export const useMediaFolders = () => {
  return useQuery({
    queryKey: ['media-folders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_library')
        .select('folder')
        .order('folder');

      if (error) throw error;

      // Get unique folders with counts
      const folderCounts = data.reduce((acc, item) => {
        acc[item.folder] = (acc[item.folder] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(folderCounts).map(([name, count]) => ({
        name,
        count
      }));
    }
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaId) => {
      // Get media info
      const { data: media, error: fetchError } = await supabase
        .from('media_library')
        .select('file_path')
        .eq('id', mediaId)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([media.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', mediaId);

      if (dbError) throw dbError;

      return mediaId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['media-folders'] });
      toast.success('Media deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete media: ' + error.message);
    }
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await supabase
        .from('media_library')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['media-folders'] });
      toast.success('Media updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update media: ' + error.message);
    }
  });
};

export const useBulkDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaIds) => {
      // Get all file paths
      const { data: mediaList, error: fetchError } = await supabase
        .from('media_library')
        .select('file_path')
        .in('id', mediaIds);

      if (fetchError) throw fetchError;

      const filePaths = mediaList.map(m => m.file_path);

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove(filePaths);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .in('id', mediaIds);

      if (dbError) throw dbError;

      return mediaIds;
    },
    onSuccess: (mediaIds) => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['media-folders'] });
      toast.success(`${mediaIds.length} media files deleted successfully`);
    },
    onError: (error) => {
      toast.error('Failed to delete media: ' + error.message);
    }
  });
};
