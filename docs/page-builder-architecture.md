# Page Builder Architecture

**Version:** 1.0.0  
**Last Updated:** 2025-11-17  
**Phase:** 2 - Dynamic CMS Page Builder  
**Project:** Devmart-Extreame-Zivan

---

## 1. Overview

The **Page Builder** is a visual editor for managing marketing pages built on the Zivan template. It provides a simple, stable interface for non-technical administrators to dynamically create and manage web pages without touching code.

### Core Capabilities

The Page Builder allows admins to:
- **Create pages** with custom slugs and SEO metadata
- **Add/remove sections** from a library of 36 pre-built UI Blocks
- **Reorder sections** via drag-and-drop
- **Edit section content and media** through a dynamic props editor
- **Preview pages** in real-time with device viewport toggles
- **Publish/draft** pages with controlled visibility

### Foundation

The Page Builder leverages existing stable systems:
- **36 UI Blocks** across 18 categories (Hero, About, Services, Portfolio, Blog, Testimonials, CTA, Features, Stats, Team, Awards, Brands, Pricing, FAQ, Video, Marquee, WhyChoose, CaseStudy)
- **Media Library** for centralized asset management with usage tracking
- **Supabase Backend** for data persistence, authentication, and RLS
- **React + Vite** frontend with React Query for state management

### Critical Constraints

> **UI Blocks themselves are already synchronized with the frontend and are NOT to be refactored in Phase 2.**

> **Phase 2 focuses on orchestration around `pages`, `page_sections`, UI Blocks registry, and admin UI — not template redesign.**

The Page Builder is the orchestration layer that connects existing UI Blocks to dynamic database-driven content management.

---

## 2. Goals and Non-Goals

### Goals

1. **Simple Visual Editor**
   - Provide a 3-column layout (Sections Sidebar / Canvas / Props Editor)
   - Similar in concept to the current Devmart WordPress page editor
   - Intuitive UX for non-technical users

2. **Dynamic Page Rendering**
   - Pages are fetched from database by slug
   - Sections are rendered using the same UI Blocks as the public site
   - Draft and published states are clearly separated

3. **Reusability**
   - Make it easy to deploy the same Page Builder for multiple Devmart client sites
   - Keep the architecture modular and well-documented

4. **Stability**
   - Do not break existing stable systems (Auth, Media Library, Site Settings)
   - Maintain backward compatibility with the Zivan frontend

### Non-Goals

1. **No Frontend Redesign**
   - Do not redesign the Zivan template layout or styling
   - Do not modify UI Block visual designs (except critical bug fixes)

2. **No New Content Modules**
   - Do not add content modules beyond what the PRD defines
   - Focus on the builder infrastructure, not new features

3. **No Advanced CMS Features in Phase 2**
   - No versioning/revision history
   - No page templates library
   - No A/B testing
   - No real-time collaborative editing
   - No role-based section editing restrictions

These features may be added in future phases, but Phase 2 is focused on a solid, working Page Builder foundation.

---

## 3. Existing Related Systems

The Page Builder builds on top of stable Phase 1 foundations. These systems **must not be broken** during Phase 2 implementation.

### 3.1 Authentication & Roles

**Database Tables:**
- `profiles` - User profile information
- `user_roles` - Role assignments (super_admin, admin, editor, viewer)

**Key Functions:**
- `has_role(_user_id, _role)` - Security definer function for RLS policies

**RLS Policies:**
- Admins and super_admins can manage pages
- Editors can view and edit but not delete
- Viewers have read-only access

### 3.2 Media Library

**Database Tables:**
- `media_library` - Media metadata (filename, URL, dimensions, tags, usage count)
- `media_usage` - Tracks where media is used across the site

**Storage:**
- Supabase Storage bucket: `media` (public)

**UI Component:**
- `MediaPicker` - Reusable modal for selecting/uploading media
- Located at: `src/components/Admin/MediaLibrary/MediaPicker.jsx`

**Integration:**
- Page Builder will use `MediaPicker` for all image/video fields
- Usage tracking is automatically updated when media is assigned to sections

### 3.3 Site Settings & Branding

**Database Table:**
- `site_settings` - Key-value pairs for site configuration

**Custom Hook:**
- `useSettings()` - React Query hook to fetch settings

**Branding Injection:**
- `brandingInjection.js` utility
- Dynamically injects logo, favicon, colors from settings
- Already integrated via `BrandingInitializer` in `App.jsx`

### 3.4 Pages Basics (Existing)

**Database Table:**
- `pages` - Page metadata (slug, title, status, SEO fields)

**Admin UI:**
- `PagesList.jsx` - List all pages with filters
- `PageForm.jsx` - Create/edit page metadata

**Frontend Rendering:**
- `DynamicPage.jsx` - Basic implementation for rendering pages by slug
- Currently exists but needs enhancement for section rendering

**RLS Policies:**
- Admins can manage all pages
- Public can view published pages only

---

## 4. Data Model – Pages and Sections

### 4.1 `pages` Table (Existing)

Stores high-level page metadata.

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status page_status NOT NULL DEFAULT 'draft', -- enum: draft, published, archived
  layout TEXT DEFAULT 'Layout',
  meta_description TEXT,
  meta_keywords TEXT,
  seo_image TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);
```

**Key Fields:**
- `slug` - URL-friendly identifier (e.g., "about-us")
- `status` - Controls visibility (draft = admin-only, published = public)
- `layout` - Layout wrapper (e.g., "Layout", "Layout2") — currently unused in builder
- `published_at` - Timestamp when page was first published

### 4.2 `page_sections` Table (Existing)

Stores individual sections (UI Block instances) for each page.

```sql
CREATE TABLE page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL, -- e.g. "Hero1_CreativeAgency"
  block_props JSONB NOT NULL DEFAULT '{}', -- UI Block props
  order_index INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  has_container BOOLEAN DEFAULT false,
  section_wrapper_class TEXT,
  spacing_after_lg INTEGER DEFAULT 0,
  spacing_after_md INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Key Fields:**
- `block_type` - Canonical UI Block identifier (matches registry)
- `block_props` - JSON object with block-specific props
- `order_index` - Determines render order (0, 1, 2, ...)
- `is_active` - Soft delete flag (allows hiding sections without deletion)
- `has_container` - Whether section should be wrapped in `.container`
- `section_wrapper_class` - Custom CSS classes for the section wrapper
- `spacing_after_*` - Spacing utilities for responsive layout control

**Constraints:**
- Foreign key CASCADE on `page_id` (deleting a page deletes all sections)
- `order_index` must be unique per page (enforced at application level)

### 4.3 RLS Strategy

**Page Sections Policies:**

```sql
-- Admins/super_admins can manage all sections
CREATE POLICY "Admins can manage sections"
ON page_sections FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'))
WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- Public can view sections of published pages only
CREATE POLICY "Public can view published sections"
ON page_sections FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = page_sections.page_id
      AND pages.status = 'published'
  )
);
```

**Draft vs. Published Behavior:**
- Page Builder always works with the current `page_sections` data (draft state)
- Frontend (`DynamicPage`) only renders sections for `status = 'published'` pages
- No separate "draft sections" table — publish is controlled by `pages.status`

---

## 5. UI Blocks System

### 5.1 Block Inventory

**Total:** 36 UI Blocks  
**Categories:** 18

| Category      | Count | Examples                                      |
|---------------|-------|-----------------------------------------------|
| Hero          | 5     | Hero1_CreativeAgency, Hero2_MarketingAgency   |
| About         | 4     | About1_ImageGrid, About2_TwoColumn            |
| Services      | 3     | Services1_Grid, Services2_Carousel            |
| Portfolio     | 2     | Portfolio1_Masonry, Portfolio2_Grid           |
| Blog          | 3     | Blog1_Grid, Blog2_Carousel, Blog3_List        |
| Testimonials  | 2     | Testimonials1_Carousel, Testimonials2_Grid    |
| CTA           | 2     | CTA1_Centered, CTA2_Split                     |
| Features      | 2     | Features1_Grid, Features2_IconList            |
| Stats         | 1     | Stats1_Counter                                |
| Team          | 1     | Team1_Grid                                    |
| Awards        | 1     | Awards1_Carousel                              |
| Brands        | 2     | Brands1_Marquee, Brands2_Grid                 |
| Pricing       | 1     | Pricing1_Cards                                |
| FAQ           | 1     | FAQ1_Accordion                                |
| Video         | 1     | Video1_Modal                                  |
| Marquee       | 1     | Marquee1_Scrolling                            |
| WhyChoose     | 1     | WhyChoose1_TwoColumn                          |
| CaseStudy     | 1     | CaseStudy1_Showcase                           |

### 5.2 Block Patterns

All blocks share common architectural patterns:

**Shared Components:**
- `Spacing` - Wrapper for consistent vertical spacing
- `SectionHeading` / `SectionHeadingStyle3` - Standardized titles/subtitles
- `Button` - CTA buttons with variants
- `VideoModal` - Lightbox for video playback

**Common Props:**
- `title` (string) - Section heading
- `subtitle` (string) - Small text above heading
- `description` (string) - Paragraph text
- `bgUrl` (string) - Background image URL
- `videoSrc` (string) - Video URL for modal triggers
- `data` (array) - Lists of items (services, team members, etc.)
- `btnText` / `btnUrl` (string) - CTA button configuration

**Location:**
- All blocks are in `/src/UIBlocks/`
- Organized by category folders (e.g., `/src/UIBlocks/Hero/`)

### 5.3 Block Referencing

**Identifier Mapping:**
- Each block has a canonical `block_type` string
- Example: `"Hero1_CreativeAgency"` maps to component `Hero1_CreativeAgency.jsx`
- This `block_type` is stored in `page_sections.block_type`

**Props Storage:**
- Block-specific props are stored in `page_sections.block_props` as JSONB
- Example:
  ```json
  {
    "title": "Creative Digital Agency",
    "subtitle": "Welcome to Zivan",
    "description": "We craft stunning digital experiences...",
    "bgUrl": "/images/hero/hero-bg.jpg",
    "btnText": "Get Started",
    "btnUrl": "/contact"
  }
  ```

**Loading Mechanism:**
- `blockRegistry.js` provides `loadBlock(blockType)` function
- Dynamically imports components on-demand
- Caches loaded components for performance

### 5.4 Phase 2 Constraints on UI Blocks

> **CRITICAL:** UI Blocks **MUST remain unchanged** in Phase 2 except for strictly necessary bug fixes.

**No Refactoring:**
- Do not change block file structure
- Do not rename block components
- Do not modify block visual design
- Do not add new props unless absolutely critical

**Why:**
- Blocks are already synchronized with the latest frontend improvements
- Any changes risk breaking existing pages
- Phase 2 focus is on orchestration, not block development

---

## 6. UI Blocks Registry File

### 6.1 Location

**File Path:** `public/data/ui-blocks-registry.json`

**Purpose:** Single source of truth for the Page Builder about available UI Blocks.

### 6.2 Registry Structure

The registry is a JSON array of block definitions, grouped by category:

```json
{
  "categories": [
    {
      "name": "Hero",
      "description": "Full-width header sections with hero images and CTAs",
      "blocks": [
        {
          "id": "Hero1_CreativeAgency",
          "component": "Hero1_CreativeAgency",
          "category": "Hero",
          "name": "Creative Agency Hero",
          "description": "Animated text hero with video modal trigger",
          "thumbnail": "/images/blocks/hero-creative-agency.webp",
          "propsSchema": {
            "title": {
              "type": "text",
              "label": "Main Title",
              "default": "Creative Digital Agency",
              "required": true,
              "maxLength": 100
            },
            "subtitle": {
              "type": "text",
              "label": "Subtitle",
              "default": "Welcome to Zivan",
              "required": false,
              "maxLength": 50
            },
            "description": {
              "type": "textarea",
              "label": "Description",
              "default": "We create stunning digital experiences...",
              "required": false,
              "maxLength": 500
            },
            "bgUrl": {
              "type": "media",
              "label": "Background Image",
              "mediaType": "image",
              "default": "/images/hero/hero-bg.jpg",
              "required": false
            },
            "videoSrc": {
              "type": "text",
              "label": "Video URL (YouTube/Vimeo)",
              "default": "",
              "required": false
            },
            "btnText": {
              "type": "text",
              "label": "Button Text",
              "default": "Get Started",
              "required": false,
              "maxLength": 30
            },
            "btnUrl": {
              "type": "text",
              "label": "Button URL",
              "default": "/contact",
              "required": false
            }
          }
        }
      ]
    },
    {
      "name": "Services",
      "description": "Service offerings with icons and descriptions",
      "blocks": [
        {
          "id": "Services1_Grid",
          "component": "Services1_Grid",
          "category": "Services",
          "name": "Services Grid",
          "description": "3-column grid of services with icons",
          "thumbnail": "/images/blocks/services-grid.webp",
          "propsSchema": {
            "title": {
              "type": "text",
              "label": "Section Title",
              "default": "Our Services",
              "required": true
            },
            "subtitle": {
              "type": "text",
              "label": "Subtitle",
              "default": "What We Do",
              "required": false
            },
            "services": {
              "type": "array",
              "label": "Services List",
              "itemSchema": {
                "iconClass": {
                  "type": "text",
                  "label": "Icon Class (Iconify)",
                  "default": "flaticon-computer",
                  "required": true
                },
                "title": {
                  "type": "text",
                  "label": "Service Title",
                  "default": "Web Development",
                  "required": true,
                  "maxLength": 50
                },
                "description": {
                  "type": "textarea",
                  "label": "Service Description",
                  "default": "We build modern, responsive websites...",
                  "required": true,
                  "maxLength": 200
                },
                "link": {
                  "type": "text",
                  "label": "Link URL",
                  "default": "/services/web-development",
                  "required": false
                }
              },
              "default": []
            }
          }
        }
      ]
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "totalCategories": 18,
    "totalBlocks": 36,
    "lastUpdated": "2025-11-17"
  }
}
```

### 6.3 Field Types

The `propsSchema` supports these field types:

| Type       | Description                          | Rendered As            |
|------------|--------------------------------------|------------------------|
| `text`     | Single-line text input               | `<input type="text">`  |
| `textarea` | Multi-line text input                | `<textarea>`           |
| `number`   | Numeric input                        | `<input type="number">`|
| `select`   | Dropdown selection                   | `<select>`             |
| `checkbox` | Boolean toggle                       | `<input type="checkbox">` |
| `media`    | Image/video picker                   | `<MediaPicker>`        |
| `array`    | List of repeated items               | Dynamic list editor    |
| `color`    | Color picker (future)                | `<input type="color">` |

### 6.4 Validation Rules

Each field can specify validation:

- `required` (boolean) - Field must have a value
- `minLength` / `maxLength` (number) - String length constraints
- `min` / `max` (number) - Numeric range constraints
- `pattern` (regex string) - Pattern matching for text fields

---

## 7. Page Builder UX Layout

### 7.1 Three-Column Layout

The Page Builder uses a classic 3-column layout:

```
┌─────────────────────────────────────────────────────────────────┐
│  Page Builder - "About Us"                           [Save] [X]  │
├────────────┬──────────────────────────────────┬──────────────────┤
│            │                                  │                  │
│  SECTIONS  │         PAGE CANVAS              │   PROPS EDITOR   │
│  SIDEBAR   │      (Live Preview)              │                  │
│            │                                  │                  │
│  ┌──────┐  │  ┌────────────────────────────┐  │  Selected:       │
│  │ 01   │◄─┼──┤  [Hero Section]            │  │  Hero Section    │
│  │ Hero │  │  │  • Selected border         │  │                  │
│  └──────┘  │  └────────────────────────────┘  │  Title:          │
│            │                                  │  [____________]  │
│  ┌──────┐  │  ┌────────────────────────────┐  │                  │
│  │ 02   │  │  │  [About Section]           │  │  Subtitle:       │
│  │About │  │  │                            │  │  [____________]  │
│  └──────┘  │  └────────────────────────────┘  │                  │
│            │                                  │  Description:    │
│  ┌──────┐  │  ┌────────────────────────────┐  │  [____________]  │
│  │ 03   │  │  │  [Services Section]        │  │  [____________]  │
│  │Svcs  │  │  │                            │  │  [____________]  │
│  └──────┘  │  └────────────────────────────┘  │                  │
│            │                                  │  Background:     │
│  [+ Add    │                                  │  [Choose Image]  │
│   Section] │                                  │                  │
│            │                                  │  [Save Changes]  │
└────────────┴──────────────────────────────────┴──────────────────┘
```

### 7.2 Left Sidebar: Sections List

**Purpose:** Manage section order and selection.

**Features:**
- **Ordered List:** Shows sections in render order (01, 02, 03...)
- **Section Cards:** Display block name and category (e.g., "01 – Hero: Creative Agency")
- **Drag & Drop:** Reorder sections by dragging cards
- **Selection:** Click to select a section (highlights both sidebar and canvas)
- **Delete Button:** Trash icon with confirmation dialog
- **Add Button:** "+ Add Section" button at bottom opens Block Selector modal

**Interactions:**
- Dragging updates `order_index` in database immediately
- Deleting a section removes it from database (or sets `is_active = false`)
- Selecting a section updates the Props Editor panel

### 7.3 Center: Page Canvas

**Purpose:** Live preview of the page as it will appear to users.

**Features:**
- **Real-time Rendering:** Uses actual UI Block components
- **Selection Highlight:** Selected section has a border/overlay
- **Click to Select:** Clicking any section selects it
- **Device Toggle:** Buttons for Desktop / Tablet / Mobile viewport sizes
- **Read-only:** Cannot edit content directly in canvas (edit via Props Editor)

**Technical Implementation:**
- Renders sections using `loadBlock()` from `blockRegistry.js`
- Each section wrapped in `<SectionWrapper>` for selection handling
- Uses same SCSS as public site for accurate preview
- Updates immediately when props change in the right panel

### 7.4 Right Sidebar: Props Editor

**Purpose:** Edit content and settings for the selected section.

**Features:**
- **Dynamic Form:** Fields generated from `propsSchema` in registry
- **Field Types:** Text, textarea, number, select, media picker, array editor
- **Media Integration:** `MediaPicker` component for images/videos
- **Array Editor:** Add/remove/reorder items in lists (services, team members, etc.)
- **Validation:** Shows error messages for invalid input
- **Save Behavior:** Debounced auto-save (2 seconds) OR explicit "Save" button (TBD)

**Empty State:**
- When no section is selected, shows: "Select a section to edit its properties"

**Save Strategy (To Be Decided):**
- **Option A:** Auto-save after 2-second delay (less clicking, risk of accidental changes)
- **Option B:** Manual "Save" button (more control, more clicking)
- Decision will be documented in implementation plan

---

## 8. Page Builder Components Overview

### 8.1 Component Hierarchy

```
PageBuilderLayout
├── PageBuilderHeader (page title, save/close buttons)
├── SectionsSidebar
│   ├── SectionCard (repeated for each section)
│   └── AddSectionButton
├── PageCanvas
│   ├── DeviceToggle
│   └── SectionWrapper (repeated for each section)
│       └── [DynamicUIBlock]
├── PropsEditorPanel
│   ├── FormField (repeated for each prop)
│   │   ├── TextInput
│   │   ├── TextareaInput
│   │   ├── MediaField (uses MediaPicker)
│   │   └── ArrayField
│   └── SaveButton (if not auto-save)
└── BlockSelectorModal (opened via AddSectionButton)
    ├── CategoryTabs
    └── BlockCard (repeated for each block)
```

### 8.2 PageBuilderLayout

**File:** `src/pages/Admin/Pages/PageBuilderLayout.jsx`

**Purpose:** Top-level orchestrator for the Page Builder.

**Props:**
- `pageId` (UUID) - The page being edited

**Responsibilities:**
- Fetch page and sections data via React Query
- Manage selected section state
- Coordinate updates between sidebar, canvas, and props panel
- Handle modals (Block Selector, delete confirmation)

**Must NOT:**
- Directly mutate database (use hooks)
- Render UI Blocks directly (delegate to PageCanvas)

### 8.3 SectionsSidebar

**File:** `src/pages/Admin/Pages/PageBuilder/SectionsSidebar.jsx`

**Purpose:** Display and manage section order.

**Props:**
- `sections` (array) - List of page sections
- `selectedSectionId` (UUID) - Currently selected section
- `onSelectSection` (function) - Callback when section is clicked
- `onReorder` (function) - Callback when sections are reordered
- `onDelete` (function) - Callback when section is deleted
- `onAddSection` (function) - Callback when "+ Add Section" is clicked

**Responsibilities:**
- Render ordered list of sections with drag/drop
- Highlight selected section
- Show delete button with confirmation
- Open Block Selector on "+ Add Section" click

**Must NOT:**
- Directly call Supabase (use callbacks)
- Render section content (only names/icons)

### 8.4 BlockSelectorModal

**File:** `src/pages/Admin/Pages/PageBuilder/BlockSelectorModal.jsx`

**Purpose:** Modal for selecting a UI Block to add as a new section.

**Props:**
- `isOpen` (boolean) - Modal visibility state
- `onClose` (function) - Callback to close modal
- `onSelectBlock` (function) - Callback when block is selected

**Responsibilities:**
- Fetch UI Blocks registry from `public/data/ui-blocks-registry.json`
- Display blocks grouped by category
- Implement search/filter functionality
- Return selected block ID to parent

**Must NOT:**
- Create sections directly (parent handles creation)
- Load actual UI Block components (just show metadata)

### 8.5 PageCanvas

**File:** `src/pages/Admin/Pages/PageBuilder/PageCanvas.jsx`

**Purpose:** Render live preview of the page.

**Props:**
- `sections` (array) - List of page sections with props
- `selectedSectionId` (UUID) - Currently selected section
- `onSelectSection` (function) - Callback when section is clicked
- `deviceMode` (string) - "desktop" | "tablet" | "mobile"

**Responsibilities:**
- Render each section using `loadBlock(block_type)`
- Pass `block_props` to each UI Block component
- Wrap sections in `SectionWrapper` for selection handling
- Apply responsive viewport width based on `deviceMode`

**Must NOT:**
- Directly fetch data (receives via props)
- Handle editing logic (read-only preview)
- Modify section order (canvas just renders current order)

### 8.6 SectionWrapper

**File:** `src/pages/Admin/Pages/PageBuilder/SectionWrapper.jsx`

**Purpose:** Wrapper for each section in the canvas to handle selection.

**Props:**
- `sectionId` (UUID) - Section identifier
- `isSelected` (boolean) - Whether this section is selected
- `onSelect` (function) - Callback when section is clicked
- `children` (ReactNode) - The actual UI Block component

**Responsibilities:**
- Apply selection highlight border/overlay
- Handle click events to select section
- Show section index/name on hover (optional)

**Must NOT:**
- Render UI Block content (just wraps it)
- Handle editing (just selection)

### 8.7 PropsEditorPanel

**File:** `src/pages/Admin/Pages/PageBuilder/PropsEditorPanel.jsx`

**Purpose:** Dynamic form for editing section props.

**Props:**
- `section` (object) - Selected section with `block_type` and `block_props`
- `onUpdate` (function) - Callback when props are updated
- `propsSchema` (object) - Schema from registry for current block type

**Responsibilities:**
- Generate form fields based on `propsSchema`
- Handle form state and validation
- Integrate `MediaPicker` for media fields
- Render array editor for list fields
- Call `onUpdate` on save/auto-save

**Must NOT:**
- Directly mutate database (use callback)
- Render the UI Block preview (that's canvas's job)

---

## 9. Hooks and Data Flow

### 9.1 React Query Hooks

All Page Builder data operations use React Query hooks for caching and state management.

#### `usePageSections(pageId)`

**Purpose:** Fetch and subscribe to page sections.

**Returns:**
```typescript
{
  data: PageSection[],
  isLoading: boolean,
  error: Error | null
}
```

**Implementation:**
```javascript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function usePageSections(pageId) {
  return useQuery({
    queryKey: ['page-sections', pageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!pageId
  });
}
```

#### `useCreateSection(pageId)`

**Purpose:** Add a new section to a page.

**Returns:**
```typescript
{
  mutate: (data: CreateSectionData) => void,
  isLoading: boolean,
  error: Error | null
}
```

**Implementation:**
```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useCreateSection(pageId) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ block_type, block_props, order_index }) => {
      const { data, error } = await supabase
        .from('page_sections')
        .insert({
          page_id: pageId,
          block_type,
          block_props,
          order_index
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['page-sections', pageId]);
    }
  });
}
```

#### `useUpdateSection(pageId, sectionId)`

**Purpose:** Update section props or settings.

**Returns:**
```typescript
{
  mutate: (updates: Partial<PageSection>) => void,
  isLoading: boolean,
  error: Error | null
}
```

#### `useDeleteSection(pageId, sectionId)`

**Purpose:** Delete a section (or set `is_active = false`).

**Returns:**
```typescript
{
  mutate: () => void,
  isLoading: boolean,
  error: Error | null
}
```

#### `useReorderSections(pageId)`

**Purpose:** Update `order_index` for multiple sections after drag/drop.

**Returns:**
```typescript
{
  mutate: (reorderedSections: PageSection[]) => void,
  isLoading: boolean,
  error: Error | null
}
```

**Implementation:**
```javascript
export function useReorderSections(pageId) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sections) => {
      // Update order_index for each section
      const updates = sections.map((section, index) => ({
        id: section.id,
        order_index: index
      }));
      
      // Batch update (use edge function or RPC for efficiency)
      // ... implementation
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['page-sections', pageId]);
    }
  });
}
```

### 9.2 Data Flow: Add Section

1. User clicks **"+ Add Section"** in `SectionsSidebar`
2. `BlockSelectorModal` opens
3. User selects a block (e.g., "Hero1_CreativeAgency")
4. Modal closes and returns `block_type` to parent
5. Parent calls `createSection.mutate({ block_type, block_props: {}, order_index: maxIndex + 1 })`
6. Mutation inserts row into `page_sections` table
7. On success, React Query invalidates `['page-sections', pageId]`
8. `usePageSections` refetches data
9. UI updates: new section appears in sidebar and canvas

### 9.3 Data Flow: Edit Props

1. User selects a section in canvas or sidebar
2. `PropsEditorPanel` renders form based on section's `propsSchema`
3. User edits a field (e.g., changes title text)
4. **If auto-save:** After 2-second delay, `updateSection.mutate({ block_props: updatedProps })` is called
5. **If manual save:** User clicks "Save" button, triggers mutation
6. Mutation updates `page_sections.block_props` in database
7. On success, React Query updates cache or refetches
8. `PageCanvas` rerenders with new props

### 9.4 Data Flow: Reorder Sections

1. User drags a section card in `SectionsSidebar`
2. Drag library (e.g., `@dnd-kit`) updates local section order
3. On drop, `onReorder` callback is triggered with new order
4. Parent calls `reorderSections.mutate(reorderedSections)`
5. Mutation updates `order_index` for affected sections
6. On success, React Query invalidates cache
7. UI reflects new order in both sidebar and canvas

---

## 10. Dynamic Frontend Rendering

### 10.1 Public Page Route

**Route:** `/:slug` (or `/pages/:slug` if preferred)

**Component:** `DynamicPage.jsx`

**Responsibilities:**
- Fetch page by slug from `pages` table
- Only fetch if `status = 'published'`
- Fetch page sections ordered by `order_index`
- Render sections using `loadBlock()` from `blockRegistry`
- Handle 404 if page not found
- Apply SEO metadata from page record

### 10.2 DynamicPage Implementation

```javascript
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { loadBlock } from '@/utils/blockRegistry';
import { Helmet } from 'react-helmet-async';

export default function DynamicPage() {
  const { slug } = useParams();
  
  // Fetch page metadata
  const { data: page, isLoading: pageLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data;
    }
  });
  
  // Fetch page sections
  const { data: sections, isLoading: sectionsLoading } = useQuery({
    queryKey: ['page-sections-public', page?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id)
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!page?.id
  });
  
  if (pageLoading || sectionsLoading) return <PageLoader />;
  if (!page) return <NotFoundPage />;
  
  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.meta_description} />
        {page.meta_keywords && <meta name="keywords" content={page.meta_keywords} />}
        {page.seo_image && <meta property="og:image" content={page.seo_image} />}
      </Helmet>
      
      {sections.map(section => {
        const BlockComponent = loadBlock(section.block_type);
        return (
          <BlockComponent
            key={section.id}
            {...section.block_props}
          />
        );
      })}
    </>
  );
}
```

### 10.3 Draft vs. Published

**Current Approach:**
- Page Builder always works with the current database state
- Publish is controlled by `pages.status` field
- When status changes from `draft` to `published`, frontend can access the page

**Considerations:**
- **Risk:** Changes are immediately visible to admins, but a mistake could be published accidentally
- **Mitigation:** Clear visual indication of draft/published status in builder
- **Future Enhancement:** Implement snapshot system where published version is a separate copy

**Implementation Details:**
- RLS policies ensure public users only see `status = 'published'`
- Admin users can preview draft pages via special route (e.g., `/preview/:slug`)

---

## 11. Constraints, Performance, and Safety

### 11.1 Constraints

**Max Sections Per Page:** 30
- Rationale: Prevent absurdly long pages that hurt UX and performance
- Enforcement: UI shows warning at 25 sections, blocks new sections at 30

**Max JSON Size for Props:** 100KB per section
- Rationale: Prevent database bloat from large data objects
- Enforcement: Validation before save, show error if exceeded

**Block Type Validation:**
- Only allow `block_type` values that exist in the registry
- Prevent invalid/missing block types that would cause render errors

### 11.2 Performance

**React Query Caching:**
- Page sections are cached with `['page-sections', pageId]` key
- Cache is invalidated only on mutations (create, update, delete, reorder)
- Reduces unnecessary database queries

**Lazy Loading UI Blocks:**
- Use `blockRegistry.loadBlock()` for dynamic imports
- Blocks are loaded on-demand, not all upfront
- Cache loaded components to avoid re-importing

**Optimistic Updates (Optional):**
- Consider optimistic UI updates for props editing
- Update UI immediately, revert if mutation fails
- Improves perceived performance

**Debouncing:**
- If using auto-save, debounce at 2 seconds
- Prevents excessive database writes during typing

### 11.3 Safety

**Row-Level Security (RLS):**
- All mutations enforced via RLS policies
- Admins/super_admins only can manage `page_sections`
- Public users cannot write, even if they manipulate client code

**Edge Functions (Optional):**
- Consider using Supabase Edge Functions for complex operations
- E.g., Reorder endpoint that updates multiple sections atomically
- Provides server-side validation and business logic

**Validation:**
- Client-side validation based on `propsSchema`
- Server-side validation via RLS and check constraints (where applicable)
- Never trust client input

**Error Boundaries:**
- Wrap Page Canvas in React Error Boundary
- Prevent one broken UI Block from crashing entire builder
- Show friendly error message and allow recovery

**Media Usage Tracking:**
- When media is assigned to a section, increment `media_usage`
- When media is removed, decrement `media_usage`
- Prevents orphaned media files

---

## 12. Future Extensions (Non-blocking for Phase 2)

These features are **out of scope** for Phase 2 but documented for future consideration:

### 12.1 Version History / Revisions

**Concept:**
- Snapshot page state (all sections + props) when published
- Store snapshots in a `page_revisions` table
- Allow rollback to previous versions

**Use Cases:**
- Undo accidental changes after publish
- Compare current vs. previous versions
- Audit trail for compliance

### 12.2 Page Templates

**Concept:**
- Save page structure (sections + props) as a reusable template
- E.g., "About Page Template", "Landing Page Template"
- Apply template to new page with one click

**Implementation:**
- `page_templates` table with JSON snapshot
- "Save as Template" button in builder
- "Create from Template" option in page creation flow

### 12.3 Per-Role Editing Restrictions

**Concept:**
- Editors can edit section props but not delete sections
- Viewers can only view pages in builder (no edits)

**Implementation:**
- RLS policies differentiated by role
- UI disables delete/reorder for non-admins

### 12.4 Real-Time Collaborative Editing

**Concept:**
- Multiple admins can edit the same page simultaneously
- See each other's cursors and changes in real-time

**Implementation:**
- Supabase Realtime subscriptions
- Conflict resolution strategy (last-write-wins or operational transforms)

### 12.5 A/B Testing

**Concept:**
- Create variant pages for A/B tests
- Track performance metrics per variant

**Implementation:**
- `page_variants` table
- Analytics integration
- Traffic splitting logic

---

## Appendix A: Glossary

- **Page:** High-level content container with slug, title, SEO metadata
- **Section:** Individual UI Block instance within a page
- **UI Block:** Pre-built React component from the Zivan template (e.g., Hero, About, Services)
- **Block Type:** Canonical string identifier for a UI Block (e.g., `"Hero1_CreativeAgency"`)
- **Props Schema:** JSON definition of editable fields for a UI Block
- **Page Builder:** Visual editor for managing pages and sections
- **Dynamic Page:** Frontend component that renders pages from database
- **RLS (Row-Level Security):** Supabase security mechanism for table access control
- **React Query:** State management library for async data fetching and caching

---

## Appendix B: Related Documentation

- `/docs/backend/PRD.md` - Product Requirements Document
- `/docs/backend/Tasks.md` - Current task status
- `/docs/backend/Roadmap.md` - Project roadmap
- `/docs/backend/DatabaseSchema.md` - Complete DB schema reference
- `/docs/ui-blocks-architecture.md` - UI Blocks system documentation
- `/docs/ui-blocks-complete-catalog.md` - Full catalog of 36 UI Blocks
- `/docs/architecture.md` - Frontend architecture overview
- `/docs/page-builder-implementation-plan.md` - Phase 2 execution roadmap (companion to this document)

---

**Document Status:** ✅ Complete  
**Next Step:** Proceed to `/docs/page-builder-implementation-plan.md` for execution details.
