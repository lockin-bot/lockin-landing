/**
 * Blog Posts Registry
 *
 * This file exports all blog posts and provides utility functions
 * for accessing them. Add new posts by:
 * 1. Creating a new file in this directory (e.g., my-new-post.tsx)
 * 2. Importing and adding it to the `posts` object below
 *
 * See README.md for full documentation.
 */

import { BlogPost, PostMetadata } from './types';

// Import all posts
import * as introducingLockin from './introducing-lockin';
import * as howToBuildAi from './how-to-build-ai';

// Registry of all posts (add new posts here)
const posts: Record<string, BlogPost> = {
  'introducing-lockin': introducingLockin,
  'how-to-build-ai-without-giving-up-privacy': howToBuildAi,
};

/**
 * Get a single post by slug
 */
export function getPost(slug: string): BlogPost | undefined {
  return posts[slug];
}

/**
 * Get all posts as an array, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  return Object.values(posts).sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });
}

/**
 * Get all post metadata (for listing pages)
 */
export function getAllPostMetadata(): PostMetadata[] {
  return getAllPosts().map(post => post.metadata);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.metadata.category === category);
}

/**
 * Get related posts (same category, excluding current)
 */
export function getRelatedPosts(currentSlug: string, limit: number = 2): BlogPost[] {
  const currentPost = getPost(currentSlug);
  if (!currentPost) return [];

  return getAllPosts()
    .filter(post =>
      post.metadata.category === currentPost.metadata.category &&
      post.metadata.slug !== currentSlug
    )
    .slice(0, limit);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map(post => post.metadata.category));
  return Array.from(categories);
}

// Re-export types
export type { BlogPost, PostMetadata, PostAuthor } from './types';
