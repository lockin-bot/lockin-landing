import { ReactNode } from 'react';

export interface PostAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: PostAuthor;
  // Social card metadata (optional - falls back to defaults)
  socialImage?: string;
  socialTitle?: string;
  socialDescription?: string;
}

export interface BlogPost {
  metadata: PostMetadata;
  Content: () => ReactNode;
}
