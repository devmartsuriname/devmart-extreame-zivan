# Page Builder Implementation Plan

**Version:** 1.0.0  
**Last Updated:** 2025-11-17  
**Phase:** 2 - Dynamic CMS Page Builder  
**Project:** Devmart-Extreame-Zivan  
**Estimated Duration:** 9-13 days

---

## TODO: Open Questions Before Implementation

Before starting implementation, these decisions must be finalized:

- [ ] **Save Pattern:** Auto-save (debounced) vs. Manual "Save" button in Props Editor?
  - **Recommendation:** Debounced auto-save (2 seconds) for better UX
  
- [ ] **Published Snapshots:** Should published pages be separate snapshots or just `status` toggle?
  - **Recommendation:** Phase 2 uses `status` toggle; snapshots in Phase 3
  
- [ ] **Reorder Endpoint:** Use Edge Function or direct Supabase client with batching?
  - **Recommendation:** Direct Supabase client with batching (simpler for Phase 2)
  
- [ ] **Drag/Drop Library:** `@dnd-kit` vs. `react-beautiful-dnd`?
  - **Recommendation:** `@dnd-kit` (modern, better TypeScript support, lighter)

- [ ] **Block Thumbnails:** Generate placeholders or require actual screenshots?
  - **Recommendation:** Use placeholder images initially, add real screenshots in Phase 2.7

**Status:** 🟡 Awaiting final decisions

---

## 1. High-Level Objective

**Goal:** Implement a simple but robust 3-column Page Builder (Sections Sidebar / Page Canvas / Props Editor) with full CRUD on page sections, powered by existing UI Blocks and Supabase, without refactoring UI Blocks themselves.

**Success Metric:** Admins can create, edit, and publish pages dynamically using the 36 existing UI Blocks, with changes immediately visible on the public site.

---

## 2. Dependencies and Preconditions

### 2.1 Backend Infrastructure (✅ Complete)

- [x] Supabase project connected
- [x] Authentication system with `profiles` and `user_roles` tables
- [x] `has_role()` security definer function
- [x] RLS policies for admin access control

### 2.2 Database Schema (✅ Complete)

- [x] `pages` table with slug, title, status, meta fields
- [x] `page_sections` table with block_type, block_props, order_index
- [x] RLS policies for pages and sections
- [x] Triggers for `updated_at` timestamps

### 2.3 Frontend Foundation (✅ Complete)

- [x] React + Vite setup
- [x] React Router v6 for routing
- [x] React Query for state management
- [x] Admin layout and navigation
- [x] `PagesList.jsx` and `PageForm.jsx` for basic page CRUD

### 2.4 Media Library (✅ Complete)

- [x] `media_library` and `media_usage` tables
- [x] Supabase Storage bucket: `media`
- [x] `MediaPicker` component at `src/components/Admin/MediaLibrary/MediaPicker.jsx`
- [x] Usage tracking hooks

### 2.5 UI Blocks System (✅ Complete)

- [x] 36 UI Blocks organized in `/src/UIBlocks/`
- [x] Blocks are synchronized with latest frontend improvements
- [x] `blockRegistry.js` with `loadBlock()` function
- [x] All blocks use common patterns (Spacing, SectionHeading, Button)

### 2.6 Outstanding Items (🟡 To Be Created)

- [ ] `public/data/ui-blocks-registry.json` file
- [ ] `DynamicPage.jsx` finalization (currently basic implementation)
- [ ] Page Builder route in admin area

---

## 3. Work Breakdown by Phases

### Phase 2.0 – Preparation & Registry Setup
**Duration:** 0.5–1 day  
**Priority:** Critical

#### Tasks

1. **Finalize UI Blocks Registry JSON** (3 hours)
   - [ ] Create `public/data/ui-blocks-registry.json`
   - [ ] Document all 36 blocks with metadata:
     - `id`, `component`, `category`, `name`, `description`
     - `thumbnail` paths (use placeholders initially)
     - `propsSchema` for each block
   - [ ] Validate JSON structure
   - [ ] Add registry loader utility at `src/utils/registryLoader.js`

2. **Confirm Database Schema** (1 hour)
   - [ ] Review `pages` and `page_sections` tables
   - [ ] Verify RLS policies are correct
   - [ ] Test inserting/updating sections manually via SQL editor

3. **Create Utility Functions** (1 hour)
   - [ ] `src/utils/blockLoader.js` - Enhanced version of `blockRegistry.js`
   - [ ] `src/utils/propsValidator.js` - Validate props against schema

4. **Set Up Admin Route** (0.5 hours)
   - [ ] Add `/admin/pages/:id/builder` route in router
   - [ ] Create placeholder `PageBuilderLayout.jsx` component

**Deliverables:**
- ✅ Complete UI Blocks registry JSON
- ✅ Utility functions for loading blocks and validating props
- ✅ Page Builder route added to admin area

---

### Phase 2.1 – Backend APIs and Hooks
**Duration:** 2–3 days  
**Priority:** Critical

#### Tasks

1. **React Query Hooks for Page Sections** (1 day)

   **File:** `src/hooks/usePageSections.js`
   ```javascript
   // Fetch sections for a page
   export function usePageSections(pageId)
   ```
   - [ ] Implement `queryFn` with Supabase client
   - [ ] Order by `order_index`
   - [ ] Filter by `is_active = true` (or include inactive for admin view)
   - [ ] Add error handling

   **File:** `src/hooks/useCreateSection.js`
   ```javascript
   // Create a new section
   export function useCreateSection(pageId)
   ```
   - [ ] Implement `mutationFn` to insert into `page_sections`
   - [ ] Invalidate `['page-sections', pageId]` on success
   - [ ] Handle default props from registry

   **File:** `src/hooks/useUpdateSection.js`
   ```javascript
   // Update section props or settings
   export function useUpdateSection(pageId, sectionId)
   ```
   - [ ] Implement `mutationFn` to update `block_props`
   - [ ] Support partial updates
   - [ ] Invalidate cache on success

   **File:** `src/hooks/useDeleteSection.js`
   ```javascript
   // Delete a section (hard delete or soft delete via is_active)
   export function useDeleteSection(pageId, sectionId)
   ```
   - [ ] Implement `mutationFn` to delete or set `is_active = false`
   - [ ] Invalidate cache on success

   **File:** `src/hooks/useReorderSections.js`
   ```javascript
   // Update order_index for multiple sections
   export function useReorderSections(pageId)
   ```
   - [ ] Implement `mutationFn` to batch update `order_index`
   - [ ] Use Promise.all for concurrent updates
   - [ ] Invalidate cache on success

2. **Edge Function for Bulk Reorder (Optional)** (0.5 day)
   - [ ] If needed, create `/supabase/functions/reorder-sections/index.ts`
   - [ ] Accept array of `{ id, order_index }` pairs
   - [ ] Update all sections in a single transaction
   - [ ] Return updated sections
   - **Decision:** Only implement if direct client approach has issues

3. **Testing** (0.5 day)
   - [ ] Test each hook with mock data
   - [ ] Verify RLS policies work correctly
   - [ ] Test error scenarios (network failure, invalid data)
   - [ ] Verify cache invalidation behavior

**Deliverables:**
- ✅ 5 React Query hooks for section CRUD
- ✅ (Optional) Edge function for bulk reorder
- ✅ All hooks tested and working

---

### Phase 2.2 – Block Selector Modal
**Duration:** 1 day  
**Priority:** High

#### Tasks

1. **Component Structure** (2 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/BlockSelectorModal.jsx`
   
   **Features:**
   - [ ] Modal container with backdrop
   - [ ] Header with search bar
   - [ ] Category tabs (18 categories)
   - [ ] Grid of block cards
   - [ ] Close button / ESC key handling

2. **Registry Integration** (2 hours)
   - [ ] Fetch registry from `public/data/ui-blocks-registry.json`
   - [ ] Parse and group blocks by category
   - [ ] Implement search filter (by name/description)
   - [ ] Handle loading and error states

3. **Block Cards** (2 hours)
   - [ ] Design card layout:
     - Thumbnail image (placeholder if not available)
     - Block name and description
     - Category badge
     - "Add" button
   - [ ] Hover effects
   - [ ] Click handler to select block

4. **UX Polish** (2 hours)
   - [ ] Add animations (fade in, slide up)
   - [ ] Keyboard navigation (arrow keys, Enter to select)
   - [ ] Empty state for no search results
   - [ ] Loading skeleton while fetching registry

**Deliverables:**
- ✅ `BlockSelectorModal` component
- ✅ Search and filter functionality
- ✅ Responsive card grid layout
- ✅ Accessible and keyboard-friendly

---

### Phase 2.3 – Sections Sidebar
**Duration:** 0.5–1 day  
**Priority:** High

#### Tasks

1. **Component Structure** (2 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/SectionsSidebar.jsx`
   
   **Features:**
   - [ ] Sidebar container (fixed width, scrollable)
   - [ ] Ordered list of section cards
   - [ ] "+ Add Section" button at bottom
   - [ ] Empty state when no sections

2. **Section Cards** (2 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/SectionCard.jsx`
   
   - [ ] Display:
     - Order number (01, 02, 03...)
     - Block name (from registry)
     - Category badge
   - [ ] Selection state (highlight if selected)
   - [ ] Delete button (trash icon)
   - [ ] Drag handle icon

3. **Drag & Drop Reordering** (3 hours)
   - [ ] Install `@dnd-kit/core` and `@dnd-kit/sortable`
   - [ ] Wrap section cards in sortable context
   - [ ] Implement drag start, drag over, drag end handlers
   - [ ] Update local state immediately (optimistic UI)
   - [ ] Call `useReorderSections` on drop
   - [ ] Handle drag errors (revert on failure)

4. **Interactions** (1 hour)
   - [ ] Click card to select section
   - [ ] Hover effects
   - [ ] Delete confirmation dialog
   - [ ] Disable dragging while mutation is pending

**Deliverables:**
- ✅ `SectionsSidebar` component with drag/drop
- ✅ Section cards with selection and delete
- ✅ "+ Add Section" button wired to modal

---

### Phase 2.4 – Page Canvas
**Duration:** 1.5–2 days  
**Priority:** High

#### Tasks

1. **Component Structure** (2 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/PageCanvas.jsx`
   
   **Features:**
   - [ ] Canvas container with scrolling
   - [ ] Device toggle buttons (Desktop / Tablet / Mobile)
   - [ ] Responsive viewport width based on device mode
   - [ ] Loading state while sections are fetching

2. **Section Rendering** (4 hours)
   - [ ] Map over `sections` array
   - [ ] For each section:
     - Use `loadBlock(section.block_type)` to get component
     - Render component with `{...section.block_props}`
     - Wrap in `SectionWrapper`
   - [ ] Handle missing block types (show placeholder)
   - [ ] Handle render errors (error boundary)

3. **SectionWrapper Component** (2 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/SectionWrapper.jsx`
   
   - [ ] Wrapper div with click handler
   - [ ] Selection highlight (border or overlay)
   - [ ] Section index badge (top-left corner)
   - [ ] Hover state
   - [ ] Pass `onSelect` callback to parent

4. **Device Preview** (2 hours)
   - [ ] Implement viewport width toggling:
     - Desktop: 100%
     - Tablet: 768px
     - Mobile: 375px
   - [ ] Center smaller viewports
   - [ ] Add device frame visual (optional)

5. **Performance** (1 hour)
   - [ ] Lazy load UI Blocks using `React.lazy()` or `loadBlock` cache
   - [ ] Avoid re-rendering entire canvas on selection change
   - [ ] Optimize block prop diffing

**Deliverables:**
- ✅ `PageCanvas` component with live preview
- ✅ `SectionWrapper` for selection handling
- ✅ Device preview toggle
- ✅ Error boundaries for block errors

---

### Phase 2.5 – Props Editor Panel
**Duration:** 2–3 days  
**Priority:** High

#### Tasks

1. **Component Structure** (2 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/PropsEditorPanel.jsx`
   
   **Features:**
   - [ ] Panel container (fixed width, scrollable)
   - [ ] Header showing selected section name
   - [ ] Dynamic form fields
   - [ ] Save button (if not auto-save)
   - [ ] Empty state when no section selected

2. **Dynamic Form Generator** (4 hours)

   **File:** `src/pages/Admin/Pages/PageBuilder/FormField.jsx`
   
   - [ ] Parse `propsSchema` from registry
   - [ ] Render field based on type:
     - `text` → TextInput
     - `textarea` → TextareaInput
     - `number` → NumberInput
     - `select` → SelectDropdown
     - `checkbox` → CheckboxInput
     - `media` → MediaField (uses MediaPicker)
     - `array` → ArrayEditor
   - [ ] Apply validation rules (required, min/max length, pattern)
   - [ ] Show validation errors below fields

3. **Field Components** (4 hours)

   **Files:**
   - `src/pages/Admin/Pages/PageBuilder/fields/TextInput.jsx`
   - `src/pages/Admin/Pages/PageBuilder/fields/TextareaInput.jsx`
   - `src/pages/Admin/Pages/PageBuilder/fields/MediaField.jsx`
   - `src/pages/Admin/Pages/PageBuilder/fields/ArrayEditor.jsx`

   **TextInput / TextareaInput:**
   - [ ] Controlled input with label
   - [ ] Character count (if maxLength)
   - [ ] Validation error display

   **MediaField:**
   - [ ] Button to open `MediaPicker`
   - [ ] Show selected media thumbnail
   - [ ] Clear button
   - [ ] Track media usage on change

   **ArrayEditor:**
   - [ ] List of items (e.g., services, team members)
   - [ ] "+ Add Item" button
   - [ ] Remove button per item
   - [ ] Drag handle for reordering items
   - [ ] Nested form for each item (recursive use of FormField)

4. **Save Logic** (2 hours)
   - [ ] **If auto-save:**
     - Use `useDebounce` hook (2 seconds)
     - Call `useUpdateSection` mutation on debounce
     - Show "Saving..." indicator
   - [ ] **If manual save:**
     - "Save Changes" button
     - Call mutation on click
     - Disable button while saving
   - [ ] **Regardless:**
     - Show success toast on save
     - Show error toast on failure
     - Handle concurrent edits (optimistic updates)

5. **Validation** (2 hours)
   - [ ] Implement `validateProps(props, schema)` utility
   - [ ] Run validation on save
   - [ ] Show field-level errors
   - [ ] Prevent save if validation fails

**Deliverables:**
- ✅ `PropsEditorPanel` with dynamic form generation
- ✅ All field types implemented
- ✅ MediaPicker integration with usage tracking
- ✅ Array editor for lists
- ✅ Auto-save or manual save (per decision)
- ✅ Validation with error handling

---

### Phase 2.6 – Dynamic Page Renderer Finalization
**Duration:** 1 day  
**Priority:** High

#### Tasks

1. **Enhance DynamicPage Component** (3 hours)

   **File:** `src/pages/DynamicPage.jsx`
   
   - [ ] Fetch page by slug (only `status = 'published'`)
   - [ ] Fetch page sections ordered by `order_index`
   - [ ] Filter sections by `is_active = true`
   - [ ] Render sections using `loadBlock()`
   - [ ] Apply SEO metadata (Helmet)
   - [ ] Handle 404 state gracefully

2. **Error Handling** (2 hours)
   - [ ] Loading state (skeleton or spinner)
   - [ ] Error state (show friendly message)
   - [ ] 404 page when slug not found
   - [ ] Fallback for invalid block types

3. **SEO Metadata** (1 hour)
   - [ ] Helmet integration:
     - `<title>` from `page.title`
     - `<meta name="description">` from `page.meta_description`
     - `<meta name="keywords">` from `page.meta_keywords`
     - `<meta property="og:image">` from `page.seo_image`
   - [ ] Canonical URL

4. **Testing** (2 hours)
   - [ ] Test with multiple page types (home, about, services)
   - [ ] Test with draft vs. published pages
   - [ ] Test with missing sections
   - [ ] Verify SEO tags render correctly

**Deliverables:**
- ✅ `DynamicPage` fully functional
- ✅ SEO metadata applied
- ✅ Error states handled
- ✅ 404 page integration

---

### Phase 2.7 – QA, Polish, and Documentation
**Duration:** 1–2 days  
**Priority:** Medium

#### Tasks

1. **Integration Testing** (4 hours)
   - [ ] Test full workflow:
     1. Create new page
     2. Open Page Builder
     3. Add sections (all 36 block types)
     4. Edit props
     5. Reorder sections
     6. Delete sections
     7. Save and publish
     8. Verify on frontend
   - [ ] Test edge cases:
     - No sections (empty page)
     - 1 section
     - 20+ sections (performance test)
     - Very long text in props
     - Invalid media URLs
   - [ ] Test across browsers (Chrome, Firefox, Safari)
   - [ ] Test responsive behavior (mobile, tablet, desktop)

2. **Performance Audit** (2 hours)
   - [ ] Check React DevTools for unnecessary re-renders
   - [ ] Optimize expensive operations
   - [ ] Verify lazy loading of UI Blocks works
   - [ ] Test with slow network (throttle in DevTools)

3. **Accessibility Audit** (2 hours)
   - [ ] Run Lighthouse accessibility scan
   - [ ] Fix ARIA issues
   - [ ] Ensure keyboard navigation works
   - [ ] Test with screen reader (NVDA / VoiceOver)

4. **UI/UX Polish** (2 hours)
   - [ ] Add loading skeletons
   - [ ] Smooth transitions and animations
   - [ ] Consistent spacing and typography
   - [ ] Tooltips for unclear UI elements
   - [ ] Confirmation dialogs for destructive actions

5. **Update Documentation** (2 hours)
   - [ ] Update `/docs/backend.md` with Page Builder references
   - [ ] Update `/docs/architecture.md` with component structure
   - [ ] Create `/docs/backend/Phase2-Complete.md` changelog
   - [ ] Add screenshots to documentation

6. **User Guide** (2 hours)
   - [ ] Write step-by-step admin guide at bottom of this file
   - [ ] Include screenshots
   - [ ] Cover common workflows
   - [ ] Troubleshooting section

**Deliverables:**
- ✅ All 36 UI Blocks tested in builder
- ✅ Performance optimized
- ✅ Accessibility compliant
- ✅ Documentation updated
- ✅ Admin user guide created

---

## 4. Priority Matrix

| Task Group                      | Priority  | Est. Time | Dependencies                          |
|---------------------------------|-----------|-----------|---------------------------------------|
| Phase 2.0: Preparation          | Critical  | 0.5–1 day | None                                  |
| Phase 2.1: Backend APIs + Hooks | Critical  | 2–3 days  | Phase 2.0                             |
| Phase 2.2: Block Selector       | High      | 1 day     | Phase 2.0, Phase 2.1                  |
| Phase 2.3: Sections Sidebar     | High      | 0.5–1 day | Phase 2.1, Phase 2.2                  |
| Phase 2.4: Page Canvas          | High      | 1.5–2 days| Phase 2.0, Phase 2.1                  |
| Phase 2.5: Props Editor Panel   | High      | 2–3 days  | Phase 2.1, Phase 2.2                  |
| Phase 2.6: Dynamic Page Renderer| High      | 1 day     | Phase 2.0, Phase 2.1                  |
| Phase 2.7: QA + Docs            | Medium    | 1–2 days  | All above phases                      |

**Critical Path:** 2.0 → 2.1 → 2.4 → 2.5 → 2.6  
**Parallelizable:** 2.2 and 2.4 can be developed concurrently after 2.1

---

## 5. Risks and Open Questions

### 5.1 Identified Risks

| Risk                                      | Impact | Likelihood | Mitigation                                          |
|-------------------------------------------|--------|------------|-----------------------------------------------------|
| Invalid `props_data` causing block errors | High   | Medium     | Validation before save, error boundaries, fallbacks |
| Very large pages (30+ sections)           | Medium | Low        | Enforce 30-section limit, lazy loading              |
| Race conditions (multiple admins)         | Medium | Low        | Use Supabase optimistic locking, last-write-wins    |
| Missing block types in registry           | High   | Low        | Validate `block_type` before save, show placeholder |
| Media usage tracking failures             | Low    | Low        | Use try-catch, log errors, allow fallback           |
| Drag/drop bugs across browsers            | Medium | Medium     | Use well-tested library (`@dnd-kit`), extensive QA  |

### 5.2 Open Questions

1. **Auto-save vs. Manual Save**
   - **Question:** Should Props Editor auto-save (debounced) or require explicit "Save" button?
   - **Recommendation:** Auto-save for better UX, add "Saving..." indicator
   - **Status:** 🟡 Awaiting decision

2. **Published Snapshots**
   - **Question:** Should published pages be separate snapshots or just toggle `status`?
   - **Recommendation:** Phase 2 uses `status` toggle; add snapshot system in Phase 3
   - **Status:** 🟡 Awaiting decision

3. **Reorder Implementation**
   - **Question:** Use Edge Function or direct Supabase client for bulk reorder?
   - **Recommendation:** Direct client with Promise.all (simpler for Phase 2)
   - **Status:** 🟡 Awaiting decision

4. **Block Thumbnails**
   - **Question:** Generate placeholder images or require actual screenshots?
   - **Recommendation:** Use generic placeholders initially, add real screenshots later
   - **Status:** 🟡 Awaiting decision

5. **Soft vs. Hard Delete**
   - **Question:** Should deleting a section hard-delete or set `is_active = false`?
   - **Recommendation:** Soft delete (`is_active = false`) for recovery
   - **Status:** 🟡 Awaiting decision

---

## 6. Success Criteria

### Phase 2 will be considered complete when all of the following are achieved:

- [ ] **Admin can create a new page**
  - Via `/admin/pages` list → "New Page" button
  - Form includes slug, title, meta fields

- [ ] **Admin can open Page Builder**
  - Via "Edit in Builder" button on page row
  - Routes to `/admin/pages/:id/builder`
  - Builder loads with 3-column layout

- [ ] **Admin can add any UI Block as a new section**
  - Click "+ Add Section" → Block Selector opens
  - Select any of 36 blocks → section appears in canvas
  - Block renders correctly with default props

- [ ] **Admin can reorder sections via drag & drop**
  - Drag section card in sidebar
  - Order updates in canvas immediately
  - Database `order_index` persists correctly

- [ ] **Admin can edit content and media for each section**
  - Select section → Props Editor shows fields
  - Edit text, numbers, media, arrays
  - MediaPicker integration works for images/videos
  - Changes reflect in canvas preview immediately

- [ ] **Changes persist and reflect correctly in the public site**
  - Save changes → data persists to `page_sections.block_props`
  - Publish page → `status = 'published'`
  - Frontend (`DynamicPage`) renders published page correctly

- [ ] **No runtime React errors when interacting with the builder**
  - No console errors during normal operation
  - Error boundaries catch block render errors gracefully
  - Invalid props don't crash the app

- [ ] **Media usages are tracked correctly when images are assigned**
  - Assigning media increments `media_library.usage_count`
  - Removing media decrements usage count
  - `media_usage` table tracks where media is used

- [ ] **Builder UX is simple and understandable for non-technical users**
  - UI is intuitive (similar to Devmart WordPress editor)
  - Clear visual feedback for all actions
  - Tooltips and help text where needed
  - Confirmation dialogs for destructive actions

---

## 7. Testing Checklist

### Unit Tests
- [ ] `usePageSections` hook fetches sections correctly
- [ ] `useCreateSection` inserts section with correct order_index
- [ ] `useUpdateSection` updates only changed fields
- [ ] `useDeleteSection` soft-deletes or hard-deletes correctly
- [ ] `useReorderSections` updates all affected sections
- [ ] `validateProps` correctly validates against schema
- [ ] `loadBlock` caches loaded components

### Integration Tests
- [ ] Create page → Add Hero block → Edit title → Publish → Verify on frontend
- [ ] Create page → Add 5 sections → Reorder → Verify order on frontend
- [ ] Edit section props → Save → Refresh → Props persist
- [ ] Add media to section → Verify usage_count increments
- [ ] Delete section → Verify removed from frontend
- [ ] Draft page is not visible to public users
- [ ] Published page is visible to public users

### Browser/Device Tests
- [ ] Chrome (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (macOS)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Tests
- [ ] Keyboard navigation works (Tab, Enter, ESC)
- [ ] Screen reader announces all interactive elements
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards

---

## 8. Deployment Checklist

### Pre-Deployment
- [ ] All success criteria met
- [ ] All tests passing
- [ ] Documentation updated
- [ ] User guide written
- [ ] No critical bugs in issue tracker

### Deployment Steps
1. [ ] Merge feature branch to `main`
2. [ ] Deploy frontend to production
3. [ ] Deploy edge functions (if any)
4. [ ] Run database migrations (if any)
5. [ ] Test in production environment
6. [ ] Announce to stakeholders

### Post-Deployment
- [ ] Monitor error logs for 24 hours
- [ ] Gather user feedback
- [ ] Create tickets for enhancement requests
- [ ] Update roadmap with Phase 3 items

---

## Appendix A: Admin User Guide

### How to Use the Page Builder

#### 1. Create a New Page

1. Navigate to **Admin → Pages**
2. Click **"+ New Page"**
3. Fill in:
   - **Slug:** URL-friendly identifier (e.g., "about-us")
   - **Title:** Page title (e.g., "About Us")
   - **Meta Description:** SEO description (max 160 chars)
   - **Meta Keywords:** Comma-separated keywords (optional)
4. Click **"Save Draft"**

#### 2. Open the Page Builder

1. From the Pages list, find your page
2. Click the **"Edit in Builder"** button (or three-dot menu → "Open Builder")
3. The Page Builder opens with three columns:
   - **Left:** Sections Sidebar (list of sections)
   - **Center:** Page Canvas (live preview)
   - **Right:** Props Editor (edit selected section)

#### 3. Add a Section

1. In the **Sections Sidebar**, click **"+ Add Section"** at the bottom
2. The **Block Selector** modal opens
3. Browse categories or use the search bar
4. Click on a block card to add it to your page
5. The new section appears at the bottom of the canvas

#### 4. Edit Section Content

1. Click on a section in the **Sections Sidebar** or **Canvas** to select it
2. The **Props Editor** (right panel) shows editable fields for that section
3. Edit fields:
   - **Text fields:** Type directly
   - **Images/Videos:** Click "Choose Media" to open Media Picker
   - **Lists (e.g., services):** Click "+ Add Item" to add entries, drag to reorder, click trash to remove
4. Changes appear immediately in the canvas preview
5. Changes auto-save after 2 seconds (or click "Save" button if manual save)

#### 5. Reorder Sections

1. In the **Sections Sidebar**, hover over a section card
2. Click and drag the drag handle (⋮⋮ icon)
3. Drop the section in the desired position
4. The canvas updates to reflect the new order
5. Order is saved automatically

#### 6. Delete a Section

1. Select the section you want to delete
2. Click the **trash icon** on the section card in the sidebar
3. Confirm deletion in the dialog
4. The section is removed from the page

#### 7. Publish the Page

1. Click the **"Publish"** button in the top-right corner
2. The page status changes from "Draft" to "Published"
3. The page is now visible to the public at `yoursite.com/[slug]`

#### 8. Preview the Page

1. While editing, the **Canvas** shows a live preview
2. Use the **device toggle** (Desktop / Tablet / Mobile) to see responsive layouts
3. To preview the actual public page, open `yoursite.com/[slug]` in a new tab (if published)

---

### Tips and Best Practices

- **Plan your layout:** Sketch out your page structure before building
- **Use consistent sections:** Stick to similar patterns across pages (e.g., Hero → Services → CTA)
- **Optimize images:** Use compressed images (WebP format) for faster loading
- **Test on mobile:** Always check mobile preview before publishing
- **Limit sections:** Keep pages under 20 sections for best performance
- **Use descriptive titles:** Make section titles clear so they're easy to find later

---

### Troubleshooting

**Problem:** Section not rendering correctly
- **Solution:** Check console for errors, verify props are valid, try removing and re-adding the section

**Problem:** Changes not saving
- **Solution:** Check your internet connection, verify you're logged in, check for error toasts

**Problem:** Can't drag sections
- **Solution:** Make sure you're dragging the drag handle, not the entire card

**Problem:** Media not appearing
- **Solution:** Verify media URL is correct, check browser console for 404 errors, re-upload media

**Problem:** Page not visible on public site
- **Solution:** Verify page status is "Published" (not "Draft"), check slug is correct

---

## Appendix B: Technical Reference

### Component File Structure

```
src/pages/Admin/Pages/
├── PagesList.jsx (existing)
├── PageForm.jsx (existing)
└── PageBuilder/
    ├── PageBuilderLayout.jsx
    ├── SectionsSidebar.jsx
    ├── SectionCard.jsx
    ├── BlockSelectorModal.jsx
    ├── PageCanvas.jsx
    ├── SectionWrapper.jsx
    ├── PropsEditorPanel.jsx
    └── fields/
        ├── TextInput.jsx
        ├── TextareaInput.jsx
        ├── NumberInput.jsx
        ├── SelectInput.jsx
        ├── MediaField.jsx
        └── ArrayEditor.jsx
```

### Hook File Structure

```
src/hooks/
├── usePageSections.js
├── useCreateSection.js
├── useUpdateSection.js
├── useDeleteSection.js
└── useReorderSections.js
```

### Utility File Structure

```
src/utils/
├── blockRegistry.js (existing)
├── registryLoader.js
├── propsValidator.js
└── blockLoader.js
```

### Data File Structure

```
public/data/
└── ui-blocks-registry.json
```

---

## Appendix C: Related Documentation

- `/docs/page-builder-architecture.md` - Technical architecture (companion to this document)
- `/docs/backend/PRD.md` - Product Requirements Document
- `/docs/backend/Tasks.md` - Current task status
- `/docs/backend/DatabaseSchema.md` - Complete DB schema reference
- `/docs/ui-blocks-architecture.md` - UI Blocks system documentation
- `/docs/architecture.md` - Frontend architecture overview

---

**Document Status:** ✅ Complete  
**Ready for Implementation:** 🟡 Awaiting final decisions on open questions  
**Next Step:** Finalize open questions, then proceed with Phase 2.0
