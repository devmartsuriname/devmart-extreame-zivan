# Page Builder Implementation Guide

## Overview
The Page Builder system allows administrators to dynamically create and manage pages by selecting, arranging, and configuring UI Blocks through a visual interface.

## System Architecture

### Core Components

#### 1. **BlockSelector** (`src/components/Admin/Pages/BlockSelector.jsx`)
- **Purpose**: Browse and select UI blocks to add to pages
- **Features**:
  - Category-based filtering (Hero, About, Services, etc.)
  - Search functionality across block names, descriptions, and tags
  - Visual block cards with thumbnails
  - One-click block addition to pages
- **Props**:
  - `pageId`: Current page ID
  - `onBlockAdded`: Callback fired when block is successfully added
  - `onClose`: Close dialog callback

#### 2. **PageCanvas** (`src/components/Admin/Pages/PageCanvas.jsx`)
- **Purpose**: Display and manage page sections with drag-and-drop reordering
- **Features**:
  - Drag-and-drop section reordering using @dnd-kit
  - Section visibility toggle (is_active)
  - Edit and delete actions for each section
  - Real-time spacing and container settings display
- **Props**:
  - `pageId`: Current page ID
  - `onEditSection`: Callback fired when editing a section
- **Technology**: Uses @dnd-kit/core and @dnd-kit/sortable for drag-and-drop

#### 3. **PropsEditor** (`src/components/Admin/Pages/PropsEditor.jsx`)
- **Purpose**: Edit block properties and section settings
- **Features**:
  - **Visual Mode**: Auto-generated form inputs based on prop types
    - String inputs (text/textarea)
    - Number inputs
    - Boolean switches
    - URL inputs
    - Array/Object JSON editors
  - **JSON Mode**: Direct JSON editing with validation
  - **Layout Settings**:
    - Container wrapper toggle
    - Desktop spacing (spacing_after_lg)
    - Mobile spacing (spacing_after_md)
    - Custom CSS classes
- **Props**:
  - `section`: Section object to edit
  - `onClose`: Close dialog callback
  - `onSave`: Callback fired after successful save

#### 4. **PageForm** (`src/pages/Admin/Pages/PageForm.jsx`)
- **Purpose**: Main page creation/editing interface
- **Features**:
  - **Basic Info Tab**: Page metadata and SEO settings
  - **Content Builder Tab**: Visual page building interface
  - Preview functionality
  - Auto-slug generation from title
- **Tabs**:
  - **Basic Info**: Title, slug, meta description, keywords, SEO image, layout, status
  - **Content Builder**: Block selector + page canvas (only available in edit mode)

## Data Flow

### Adding a Block
1. User clicks "Add Section" in PageForm
2. BlockSelector dialog opens
3. User selects a block
4. System:
   - Fetches current max order_index
   - Inserts new section with default props
   - Increments order_index
5. PageCanvas refreshes to show new section

### Editing a Section
1. User clicks "Edit Props" on a section in PageCanvas
2. PropsEditor dialog opens with section data
3. User modifies properties in Visual or JSON mode
4. On save:
   - Validates JSON if in JSON mode
   - Updates `page_sections` table
   - Refreshes PageCanvas

### Reordering Sections
1. User drags a section card
2. @dnd-kit handles drag events
3. On drop:
   - Updates local state with new order
   - Batch updates all section order_index values in database
   - Shows success/error toast

## Database Schema

### `pages` Table
```sql
- id (uuid, PK)
- title (text)
- slug (text, unique)
- meta_description (text)
- meta_keywords (text)
- seo_image (text)
- layout (enum: Layout, Layout2, Layout3)
- status (enum: draft, published, archived)
- created_by (uuid, FK to profiles)
- created_at (timestamp)
- updated_at (timestamp)
- published_at (timestamp)
```

### `page_sections` Table
```sql
- id (uuid, PK)
- page_id (uuid, FK to pages)
- block_type (text) - Component name (e.g., "Hero1_CreativeAgency")
- block_props (jsonb) - Block-specific properties
- order_index (integer) - Sort order
- is_active (boolean) - Visibility toggle
- has_container (boolean) - Wrap in container
- spacing_after_lg (integer) - Desktop spacing (px)
- spacing_after_md (integer) - Mobile spacing (px)
- section_wrapper_class (text) - Custom CSS classes
- created_at (timestamp)
- updated_at (timestamp)
```

## UI Blocks Registry

### Location
`/src/UIBlocks/ui-blocks-registry.json`

### Structure
```json
{
  "sections": {
    "Hero": {
      "category": "Hero",
      "displayName": "Hero Sections",
      "description": "Large banner sections",
      "blocks": [
        {
          "id": "hero1-creative-agency",
          "name": "Creative Agency Hero",
          "component": "Hero1_CreativeAgency",
          "description": "Text animation hero with video modal",
          "theme": "both",
          "tags": ["video", "animation"],
          "usedIn": ["Creative Agency"],
          "defaultProps": {
            "title": ["Creative", "Innovative"],
            "subtitle": "Transform Your Vision"
          }
        }
      ]
    }
  }
}
```

### Registry Loading
- Loaded dynamically in BlockSelector via fetch
- Provides metadata for all available blocks
- Used to generate block cards and default props

## Block Component Loading

### Dynamic Import System
`src/utils/blockRegistry.js` provides:
- **loadBlock(blockType)**: Lazy-loads block components
- **preloadBlocks(blockTypes[])**: Preloads commonly used blocks
- **Component caching**: Prevents redundant imports

### Usage in DynamicPage
```jsx
const BlockComponent = await loadBlock(section.block_type);
<BlockComponent {...section.block_props} />
```

## Preview Mode

### Implementation
```javascript
const handlePreview = () => {
  window.open(`/${formData.slug}?preview=true`, '_blank');
};
```

### Frontend Handling (DynamicPage.jsx)
- Detects `?preview=true` query parameter
- Shows draft pages to authenticated admins
- Displays "Preview Mode" banner
- Allows testing before publishing

## Workflow Example

### Creating a New Page
1. Navigate to `/admin/pages`
2. Click "Create Page"
3. Fill basic info (title, slug, meta, layout, status)
4. Click "Create Page" (saves to database)
5. Redirects to edit mode with Content Builder tab enabled
6. Click "Add Section" to add blocks
7. Drag to reorder sections
8. Click "Edit Props" to customize blocks
9. Click "Preview" to test
10. Change status to "published" to go live

### Editing an Existing Page
1. Navigate to `/admin/pages`
2. Click "Edit" on a page
3. Switch to "Content Builder" tab
4. Manage sections (add, reorder, edit, delete)
5. Preview changes
6. Save

## Dependencies

### npm Packages
- `@dnd-kit/core`: Drag-and-drop core functionality
- `@dnd-kit/sortable`: Sortable list utilities
- `@dnd-kit/utilities`: Helper functions
- `@radix-ui/react-tabs`: Tab component
- `@radix-ui/react-dialog`: Modal dialogs
- `zod`: Form validation

## Best Practices

### Performance
- UI Blocks are lazy-loaded via dynamic imports
- Component caching prevents redundant loads
- PageCanvas uses keys to force re-renders only when needed

### UX
- Disabled "Content Builder" tab until page is created (requires page ID)
- Visual feedback for drag operations
- Toast notifications for all actions
- Confirm dialogs for destructive actions

### Data Integrity
- Zod validation for all form inputs
- Slug uniqueness checks
- Order index auto-management on add/delete
- JSON validation in PropsEditor

## Testing Checklist

- [ ] Create new page with basic info
- [ ] Add blocks from different categories
- [ ] Reorder sections via drag-and-drop
- [ ] Edit block props in Visual mode
- [ ] Edit block props in JSON mode
- [ ] Toggle section visibility
- [ ] Delete sections
- [ ] Preview draft pages
- [ ] Publish pages
- [ ] Verify frontend rendering

## Future Enhancements

### Phase 1 (Current) - Complete ✅
- Block selector with categories
- Drag-and-drop reordering
- Props editor (visual + JSON)
- Preview mode
- Basic layout settings

### Phase 2 (Planned)
- Block thumbnails/screenshots
- Duplicate sections
- Section templates
- Undo/redo functionality
- Revision history

### Phase 3 (Advanced)
- Responsive breakpoint editor
- Visual inline editing
- A/B testing variants
- Analytics integration
- Block marketplace

## Troubleshooting

### Block Not Loading
- Check blockRegistry.js for correct import path
- Verify component is exported as default
- Check console for import errors

### Drag-and-Drop Not Working
- Ensure @dnd-kit packages are installed
- Check for conflicting CSS (overflow, position)
- Verify unique IDs for sortable items

### Props Not Saving
- Check network tab for failed requests
- Verify RLS policies allow updates
- Check JSON validation in JSON mode

### Preview Not Working
- Ensure page is saved (has ID)
- Check slug is valid
- Verify DynamicPage handles preview param
- Check user authentication for draft pages

## Related Files
- `/src/components/Admin/Pages/BlockSelector.jsx`
- `/src/components/Admin/Pages/PageCanvas.jsx`
- `/src/components/Admin/Pages/PropsEditor.jsx`
- `/src/pages/Admin/Pages/PageForm.jsx`
- `/src/UIBlocks/ui-blocks-registry.json`
- `/src/utils/blockRegistry.js`
- `/docs/backend/PagesModule.md`
