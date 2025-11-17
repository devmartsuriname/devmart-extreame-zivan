import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function BlockSelector({ pageId, onBlockAdded, onClose }) {
  const [registry, setRegistry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadRegistry();
  }, []);

  const loadRegistry = async () => {
    try {
      const response = await fetch('/src/UIBlocks/ui-blocks-registry.json');
      const data = await response.json();
      setRegistry(data.sections);
      // Set first category as default
      if (data.sections) {
        const firstCategory = Object.keys(data.sections)[0];
        setSelectedCategory(firstCategory.toLowerCase());
      }
    } catch (error) {
      console.error('Failed to load UI blocks registry:', error);
      toast.error('Failed to load UI blocks');
    }
  };

  const handleAddBlock = async (block) => {
    try {
      setIsAdding(true);

      // Get the current max order_index
      const { data: sections, error: fetchError } = await supabase
        .from('page_sections')
        .select('order_index')
        .eq('page_id', pageId)
        .order('order_index', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const nextOrderIndex = sections.length > 0 ? sections[0].order_index + 1 : 0;

      // Insert the new section
      const { error: insertError } = await supabase
        .from('page_sections')
        .insert({
          page_id: pageId,
          block_type: block.component,
          block_props: block.defaultProps || {},
          order_index: nextOrderIndex,
          is_active: true,
          has_container: true,
          spacing_after_lg: 95,
          spacing_after_md: 70
        });

      if (insertError) throw insertError;

      toast.success(`Added ${block.name}`);
      onBlockAdded?.();
    } catch (error) {
      console.error('Failed to add block:', error);
      toast.error('Failed to add block');
    } finally {
      setIsAdding(false);
    }
  };

  const getFilteredBlocks = () => {
    if (!registry) return [];

    let allBlocks = [];

    if (selectedCategory === 'all') {
      // Get all blocks from all categories
      Object.values(registry).forEach(category => {
        allBlocks = allBlocks.concat(
          category.blocks.map(block => ({
            ...block,
            categoryName: category.displayName
          }))
        );
      });
    } else {
      // Get blocks from selected category
      const category = Object.values(registry).find(
        cat => cat.category.toLowerCase() === selectedCategory
      );
      if (category) {
        allBlocks = category.blocks.map(block => ({
          ...block,
          categoryName: category.displayName
        }));
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      allBlocks = allBlocks.filter(
        block =>
          block.name.toLowerCase().includes(query) ||
          block.description?.toLowerCase().includes(query) ||
          block.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return allBlocks;
  };

  const categories = registry
    ? [{ id: 'all', name: 'All Blocks' }, ...Object.values(registry).map(cat => ({
        id: cat.category.toLowerCase(),
        name: cat.displayName
      }))]
    : [];

  const filteredBlocks = getFilteredBlocks();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Add UI Block</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon icon="mdi:close" className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="relative">
          <Icon 
            icon="mdi:magnify" 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
          />
          <Input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
        <div className="border-b border-border px-4">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-10 bg-transparent">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>

        <ScrollArea className="flex-1">
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="m-0 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBlocks.map((block) => (
                  <div
                    key={block.id}
                    className="group border border-border rounded-lg overflow-hidden hover:border-primary transition-colors bg-card"
                  >
                    <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                      <Icon 
                        icon="mdi:view-dashboard-outline" 
                        className="w-12 h-12 text-muted-foreground"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs text-white font-medium">
                          {block.categoryName}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-1">
                        {block.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {block.description}
                      </p>
                      
                      {block.tags && block.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {block.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        onClick={() => handleAddBlock(block)}
                        disabled={isAdding}
                        size="sm"
                        className="w-full"
                      >
                        <Icon icon="mdi:plus" className="w-4 h-4 mr-1" />
                        Add Block
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredBlocks.length === 0 && (
                <div className="text-center py-12">
                  <Icon 
                    icon="mdi:text-box-search-outline" 
                    className="w-16 h-16 text-muted-foreground mx-auto mb-4"
                  />
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No blocks match your search' : 'No blocks available'}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
}
