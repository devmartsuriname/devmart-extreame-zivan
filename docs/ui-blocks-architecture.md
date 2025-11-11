# UI Block System Architecture

## Overview
The Zivan template has been modularized into 20+ reusable UI Blocks organized by category. Each block is a self-contained React component that can be dynamically composed into pages.

## Directory Structure
```
/src/UIBlocks/
├── Hero/              - 5 hero variants
├── About/             - 4 about variants
├── Services/          - 3 service variants
├── Portfolio/         - 2 portfolio variants
├── Blog/              - 3 blog variants
├── Testimonials/      - 2 testimonial variants
├── CTA/               - 2 CTA variants
├── Features/          - 2 feature variants
└── ui-blocks-registry.json
```

## Naming Convention
Format: `[Category][Number]_[Variant].jsx`
Example: `Hero1_CreativeAgency.jsx`

## Component Structure
Each UI block includes:
- JSDoc documentation
- Prop types and descriptions
- Theme support (light/dark)
- Usage references
- SCSS dependencies

## JSON Registry
`ui-blocks-registry.json` contains metadata for all blocks:
- Block ID and component name
- Description and tags
- Theme support
- Usage tracking

## Integration Status
✅ Hero sections extracted (5 variants)
✅ About sections extracted (4 variants)
✅ Services extracted (3 variants)
✅ Portfolio extracted (2 variants)
✅ Blog extracted (3 variants)
✅ Testimonials extracted (2 variants)
✅ CTA extracted (2 variants)
✅ Features extracted (2 variants)
✅ JSON registry created
✅ Documentation updated

## Next Steps
1. Extract remaining sections (Stats, Team, Brands, etc.)
2. Refactor page files to use UIBlocks
3. Build dynamic page builder UI
4. Implement CMS integration
