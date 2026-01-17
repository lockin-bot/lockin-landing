# LockIn Blog

This directory contains the blog system for the LockIn landing page.

## Directory Structure

```
app/blog/
├── README.md                 # This file
├── page.tsx                  # Blog listing page
├── [slug]/
│   ├── page.tsx             # Dynamic route (handles metadata + SSG)
│   └── BlogPostContent.tsx  # Client component for rendering posts
└── posts/
    ├── index.ts             # Posts registry and utility functions
    ├── types.ts             # TypeScript types for posts
    ├── introducing-lockin.tsx
    └── how-to-build-ai.tsx
```

## Adding a New Post

1. **Create a new file** in `posts/` directory (e.g., `my-new-post.tsx`)

2. **Export metadata and Content**:
```tsx
import { PostMetadata } from './types';

export const metadata: PostMetadata = {
  slug: 'my-new-post',           // URL slug - must be unique
  title: 'My New Post',
  date: 'Jan 20, 2026',          // Display date
  excerpt: 'A brief description shown on the blog listing page.',
  category: 'Product',           // Product, Security, Guide, Insights, etc.
  readTime: '5 min read',
  author: {
    name: 'Author Name',
    role: 'Role at LockIn',
    avatar: '/path/to/avatar.png',  // Optional
  },
  // Optional: Custom social card image (1200x630 recommended)
  // socialImage: '/social/my-new-post.png',
};

export function Content() {
  return (
    <>
      <p>Your content here...</p>
      <h2>Section heading</h2>
      <p>More content...</p>
    </>
  );
}
```

3. **Register the post** in `posts/index.ts`:
```ts
import * as myNewPost from './my-new-post';

const posts: Record<string, BlogPost> = {
  // ... existing posts
  'my-new-post': myNewPost,
};
```

## Post Content Guidelines

### Available HTML Elements
- `<p>` - Paragraphs
- `<h2>` - Section headings
- `<h3>` - Subsection headings
- `<ul>` / `<ol>` - Lists
- `<strong>` - Bold text
- `<Link>` - Internal/external links (import from 'next/link')

### Adding Interactive Components
Import any React component and use it in your Content:

```tsx
import { NetworkGraph } from '../../components/NetworkGraph';
import { SignalCards } from '../../components/SignalCards';

export function Content() {
  return (
    <>
      <p>Some text...</p>

      {/* Interactive visualization */}
      <div className="w-full py-[24px] md:py-[40px] my-[32px] md:my-[48px]">
        <NetworkGraph />
      </div>

      <p>More text...</p>
    </>
  );
}
```

### Links
```tsx
import Link from 'next/link';

// Internal link
<Link href="/blog/other-post" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">
  Link text
</Link>

// External link
<Link href="https://example.com" target="_blank" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">
  External link
</Link>
```

## Social Cards (Open Graph / Twitter)

Social card images are **automatically generated** for each blog post using Next.js OG Image Generation.

### Automatic Generation
Each post gets a dynamic social card (1200x630) that includes:
- Your custom background image (`/public/social/card-bg.png`)
- Category badge
- Post title
- Author name
- LockIn branding

The images are generated on-demand at `/blog/[slug]/opengraph-image` and `/blog/[slug]/twitter-image`.

### How It Works
The `[slug]/opengraph-image.tsx` file uses `next/og` ImageResponse to render JSX as an image. The background image is embedded as base64 for reliable loading.

### Customizing the Design
Edit `[slug]/opengraph-image.tsx` to change:
- Colors, fonts, spacing
- Layout and positioning
- Background image (update the base64 constant)

To update the background image:
1. Place your new image at `/public/social/card-bg.png` (1200x630 recommended)
2. Create an optimized version: `convert card-bg.png -resize 1200x630 -quality 80 card-bg-small.jpg`
3. Convert to base64: `base64 -i card-bg-small.jpg | tr -d '\n'`
4. Update the `BACKGROUND_IMAGE` constant in `opengraph-image.tsx`

### Optional: Custom Social Titles/Descriptions
You can override the title or description used in social cards:

```tsx
export const metadata: PostMetadata = {
  // ... required fields
  socialTitle: 'Custom title for social',    // Override title
  socialDescription: 'Custom description',   // Override excerpt
};
```

## Featured Post

To change which post is featured on the blog listing, edit the `FEATURED_SLUG` constant in `page.tsx`:

```tsx
const FEATURED_SLUG = 'introducing-lockin';
```

## Utility Functions

The `posts/index.ts` file exports several utility functions:

```tsx
import {
  getPost,            // Get single post by slug
  getAllPosts,        // Get all posts (sorted by date)
  getAllPostMetadata, // Get all metadata (for listings)
  getPostsByCategory, // Filter posts by category
  getRelatedPosts,    // Get related posts (same category)
  getAllCategories,   // Get unique category list
} from './posts';
```

## Environment Variables

Set `NEXT_PUBLIC_BASE_URL` for correct social card URLs:

```env
NEXT_PUBLIC_BASE_URL=https://lockin.bot
```

If not set, defaults to `https://lockin.bot`.
