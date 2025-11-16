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

      if (filters.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags);
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
        .maybeSingle();

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

export const useMediaTags = () => {
  return useQuery({
    queryKey: ['media-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_library')
        .select('tags');
      
      if (error) throw error;
      
      // Flatten and get unique tags
      const allTags = data.flatMap(item => item.tags || []);
      const uniqueTags = [...new Set(allTags)].sort();
      
      // Return tags with counts
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});
      
      return uniqueTags.map(tag => ({
        name: tag,
        count: tagCounts[tag]
      }));
    }
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaId) => {
      // Get media info including usage count
      const { data: media, error: fetchError } = await supabase
        .from('media_library')
        .select('file_path, usage_count')
        .eq('id', mediaId)
        .single();

      if (fetchError) throw fetchError;

      // Prevent deletion if media is in use
      if (media.usage_count > 0) {
        throw new Error('Cannot delete media that is currently in use');
      }

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
      queryClient.invalidateQueries({ queryKey: ['media-tags'] });
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
      queryClient.invalidateQueries({ queryKey: ['media-tags'] });
      toast.success('Media updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update media: ' + error.message);
    }
  });
};

export const useTrackMediaUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mediaId, usedIn }) => {
      // Check if usage already exists
      const { data: existing } = await supabase
        .from('media_usage')
        .select('id')
        .eq('media_id', mediaId)
        .eq('used_in', usedIn)
        .maybeSingle();

      if (existing) {
        return existing; // Already tracked
      }

      // Insert usage record
      const { error: insertError } = await supabase
        .from('media_usage')
        .insert({ media_id: mediaId, used_in: usedIn });
      
      if (insertError) throw insertError;
      
      // Increment usage_count using RPC
      const { error: rpcError } = await supabase.rpc('increment_media_usage', { 
        media_id: mediaId 
      });
      
      if (rpcError) throw rpcError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['media-usage'] });
    },
    onError: (error) => {
      console.error('Failed to track media usage:', error.message);
    }
  });
};

export const useMediaUsage = (mediaId) => {
  return useQuery({
    queryKey: ['media-usage', mediaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_usage')
        .select('*')
        .eq('media_id', mediaId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!mediaId
  });
};

export const useUntrackMediaUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mediaId, usedIn }) => {
      // Delete usage record
      const { error: deleteError } = await supabase
        .from('media_usage')
        .delete()
        .eq('media_id', mediaId)
        .eq('used_in', usedIn);
      
      if (deleteError) throw deleteError;
      
      // Decrement usage_count
      const { data: media } = await supabase
        .from('media_library')
        .select('usage_count')
        .eq('id', mediaId)
        .single();
      
      if (media && media.usage_count > 0) {
        await supabase
          .from('media_library')
          .update({ usage_count: media.usage_count - 1 })
          .eq('id', mediaId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['media-usage'] });
    },
    onError: (error) => {
      console.error('Failed to untrack media usage:', error.message);
    }
  });
};

export const useBulkDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaIds) => {
      // Get all file paths and usage counts
      const { data: mediaList, error: fetchError } = await supabase
        .from('media_library')
        .select('file_path, usage_count, id')
        .in('id', mediaIds);

      if (fetchError) throw fetchError;

      // Check if any media is in use
      const inUseMedia = mediaList.filter(m => m.usage_count > 0);
      if (inUseMedia.length > 0) {
        throw new Error(`Cannot delete ${inUseMedia.length} media file(s) that are currently in use`);
      }

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
      queryClient.invalidateQueries({ queryKey: ['media-tags'] });
      toast.success(`${mediaIds.length} media files deleted successfully`);
    },
    onError: (error) => {
      toast.error('Failed to delete media: ' + error.message);
    }
  });
};
