import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Fetch all site settings
 * Returns object with keys: site_identity, branding, media
 */
export const useSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      // Transform array to object for easier access
      const settings = {};
      data.forEach(row => {
        settings[row.key] = row.value;
      });
      
      return settings;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

/**
 * Fetch a specific setting by key
 * @param {string} key - Setting key (e.g., 'branding')
 */
export const useSetting = (key) => {
  return useQuery({
    queryKey: ['site-settings', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .maybeSingle();
      
      if (error) throw error;
      return data?.value || null;
    },
    enabled: !!key,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Update a setting (upsert)
 * Automatically invalidates queries and shows toast
 */
export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ 
          key, 
          value, 
          updated_at: new Date().toISOString() 
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Settings saved successfully');
    },
    onError: (error) => {
      toast.error(`Failed to save: ${error.message}`);
    }
  });
};
