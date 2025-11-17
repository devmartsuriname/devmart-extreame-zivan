import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SectionCard({ section, onEdit, onDelete, onToggleActive }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon icon="mdi:drag-vertical" className="w-5 h-5" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-medium text-foreground text-sm">
                {section.block_type}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Order: {section.order_index + 1}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Visible</span>
                <Switch
                  checked={section.is_active}
                  onCheckedChange={() => onToggleActive(section.id, !section.is_active)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon icon="mdi:desktop-mac" className="w-3.5 h-3.5" />
              <span>Spacing: {section.spacing_after_lg}px</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:cellphone" className="w-3.5 h-3.5" />
              <span>{section.spacing_after_md}px</span>
            </div>
            {section.has_container && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                <Icon icon="mdi:package-variant" className="w-3 h-3" />
                Container
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onEdit(section)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Icon icon="mdi:pencil" className="w-4 h-4 mr-1" />
              Edit Props
            </Button>
            <Button
              onClick={() => onDelete(section.id)}
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Icon icon="mdi:delete" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageCanvas({ pageId, onEditSection }) {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (pageId) {
      loadSections();
    }
  }, [pageId]);

  const loadSections = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Failed to load sections:', error);
      toast.error('Failed to load page sections');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    const newSections = arrayMove(sections, oldIndex, newIndex);
    setSections(newSections);

    // Update order_index in database
    try {
      const updates = newSections.map((section, index) => ({
        id: section.id,
        order_index: index,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('page_sections')
          .update({ order_index: update.order_index })
          .eq('id', update.id);

        if (error) throw error;
      }

      toast.success('Section order updated');
    } catch (error) {
      console.error('Failed to update section order:', error);
      toast.error('Failed to update section order');
      loadSections(); // Reload to get correct order
    }
  };

  const handleToggleActive = async (sectionId, isActive) => {
    try {
      const { error } = await supabase
        .from('page_sections')
        .update({ is_active: isActive })
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, is_active: isActive } : s
      ));

      toast.success(isActive ? 'Section shown' : 'Section hidden');
    } catch (error) {
      console.error('Failed to toggle section:', error);
      toast.error('Failed to toggle section visibility');
    }
  };

  const handleDelete = async (sectionId) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.filter(s => s.id !== sectionId));
      toast.success('Section deleted');
    } catch (error) {
      console.error('Failed to delete section:', error);
      toast.error('Failed to delete section');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon icon="mdi:loading" className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon 
          icon="mdi:view-dashboard-outline" 
          className="w-16 h-16 text-muted-foreground mx-auto mb-4"
        />
        <h3 className="text-lg font-medium text-foreground mb-2">No sections yet</h3>
        <p className="text-muted-foreground mb-4">
          Start building your page by adding UI blocks
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onEdit={onEditSection}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
