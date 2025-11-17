import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function PropsEditor({ section, onClose, onSave }) {
  const [mode, setMode] = useState('visual');
  const [formData, setFormData] = useState({
    block_props: section?.block_props || {},
    has_container: section?.has_container ?? true,
    spacing_after_lg: section?.spacing_after_lg ?? 95,
    spacing_after_md: section?.spacing_after_md ?? 70,
    section_wrapper_class: section?.section_wrapper_class || ''
  });
  const [jsonValue, setJsonValue] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (section) {
      setJsonValue(JSON.stringify(section.block_props, null, 2));
    }
  }, [section]);

  const handlePropChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      block_props: {
        ...prev.block_props,
        [key]: value
      }
    }));
  };

  const handleJsonChange = (value) => {
    setJsonValue(value);
    setJsonError('');
    
    try {
      const parsed = JSON.parse(value);
      setFormData(prev => ({
        ...prev,
        block_props: parsed
      }));
    } catch (error) {
      setJsonError('Invalid JSON format');
    }
  };

  const handleSave = async () => {
    if (mode === 'json' && jsonError) {
      toast.error('Please fix JSON errors before saving');
      return;
    }

    try {
      setIsSaving(true);

      const { error } = await supabase
        .from('page_sections')
        .update({
          block_props: formData.block_props,
          has_container: formData.has_container,
          spacing_after_lg: formData.spacing_after_lg,
          spacing_after_md: formData.spacing_after_md,
          section_wrapper_class: formData.section_wrapper_class,
          updated_at: new Date().toISOString()
        })
        .eq('id', section.id);

      if (error) throw error;

      toast.success('Section updated successfully');
      onSave?.();
      onClose?.();
    } catch (error) {
      console.error('Failed to update section:', error);
      toast.error('Failed to update section');
    } finally {
      setIsSaving(false);
    }
  };

  const renderVisualEditor = () => {
    const props = formData.block_props;
    const propEntries = Object.entries(props);

    if (propEntries.length === 0) {
      return (
        <div className="text-center py-8">
          <Icon icon="mdi:code-json" className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No props defined for this block</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {propEntries.map(([key, value]) => {
          const valueType = Array.isArray(value) ? 'array' : typeof value;

          return (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="capitalize">
                {key.replace(/_/g, ' ')}
              </Label>

              {valueType === 'string' && key.toLowerCase().includes('url') && (
                <Input
                  id={key}
                  type="url"
                  value={value}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  placeholder="https://..."
                />
              )}

              {valueType === 'string' && !key.toLowerCase().includes('url') && value.length < 100 && (
                <Input
                  id={key}
                  type="text"
                  value={value}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                />
              )}

              {valueType === 'string' && value.length >= 100 && (
                <Textarea
                  id={key}
                  value={value}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  rows={4}
                />
              )}

              {valueType === 'number' && (
                <Input
                  id={key}
                  type="number"
                  value={value}
                  onChange={(e) => handlePropChange(key, parseFloat(e.target.value) || 0)}
                />
              )}

              {valueType === 'boolean' && (
                <div className="flex items-center gap-2">
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => handlePropChange(key, checked)}
                  />
                  <Label htmlFor={key} className="cursor-pointer">
                    {value ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              )}

              {valueType === 'array' && (
                <Textarea
                  id={key}
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      handlePropChange(key, parsed);
                    } catch (error) {
                      // Keep typing, don't update until valid
                    }
                  }}
                  rows={6}
                  className="font-mono text-xs"
                />
              )}

              {valueType === 'object' && value !== null && (
                <Textarea
                  id={key}
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      handlePropChange(key, parsed);
                    } catch (error) {
                      // Keep typing, don't update until valid
                    }
                  }}
                  rows={6}
                  className="font-mono text-xs"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Edit Section</h3>
            <p className="text-sm text-muted-foreground">{section?.block_type}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon icon="mdi:close" className="w-5 h-5" />
          </Button>
        </div>

        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visual">
              <Icon icon="mdi:form-select" className="w-4 h-4 mr-2" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="json">
              <Icon icon="mdi:code-json" className="w-4 h-4 mr-2" />
              JSON
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1 p-4">
        <Tabs value={mode}>
          <TabsContent value="visual" className="mt-0 space-y-6">
            <div className="space-y-4 pb-4 border-b border-border">
              <h4 className="font-medium text-sm text-foreground">Layout Settings</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="has_container">Container Wrapper</Label>
                  <Switch
                    id="has_container"
                    checked={formData.has_container}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, has_container: checked }))
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Wrap section content in a container for better alignment
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spacing_after_lg">
                    <Icon icon="mdi:desktop-mac" className="w-4 h-4 inline mr-1" />
                    Desktop Spacing
                  </Label>
                  <Input
                    id="spacing_after_lg"
                    type="number"
                    value={formData.spacing_after_lg}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        spacing_after_lg: parseInt(e.target.value) || 0
                      }))
                    }
                    min="0"
                    max="200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spacing_after_md">
                    <Icon icon="mdi:cellphone" className="w-4 h-4 inline mr-1" />
                    Mobile Spacing
                  </Label>
                  <Input
                    id="spacing_after_md"
                    type="number"
                    value={formData.spacing_after_md}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        spacing_after_md: parseInt(e.target.value) || 0
                      }))
                    }
                    min="0"
                    max="200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section_wrapper_class">Custom CSS Classes</Label>
                <Input
                  id="section_wrapper_class"
                  type="text"
                  value={formData.section_wrapper_class}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      section_wrapper_class: e.target.value
                    }))
                  }
                  placeholder="custom-class another-class"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-foreground">Block Properties</h4>
              {renderVisualEditor()}
            </div>
          </TabsContent>

          <TabsContent value="json" className="mt-0">
            <div className="space-y-2">
              <Label htmlFor="json-editor">Block Props JSON</Label>
              <Textarea
                id="json-editor"
                value={jsonValue}
                onChange={(e) => handleJsonChange(e.target.value)}
                className="font-mono text-xs min-h-[400px]"
                placeholder="{}"
              />
              {jsonError && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon icon="mdi:alert-circle" className="w-4 h-4" />
                  {jsonError}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      <div className="p-4 border-t border-border flex gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving || (mode === 'json' && jsonError)} className="flex-1">
          {isSaving ? (
            <>
              <Icon icon="mdi:loading" className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Icon icon="mdi:check" className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
