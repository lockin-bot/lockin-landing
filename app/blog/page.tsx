'use client';

import { useState } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "introducing-lockin",
    title: "Introducing LockIn: Lead Intelligence for Web3",
    date: "Oct 25, 2025",
    excerpt: "Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X.",
    category: "Product"
  },
  {
    slug: "why-web3-sales-different",
    title: "Why Web3 Sales is Different",
    date: "Oct 20, 2025",
    excerpt: "Deals in Web3 don't happen over email or LinkedIn. They happen in Telegram groups and X threads.",
    category: "Insights"
  },
  {
    slug: "building-trust-tee",
    title: "Building Trust with TEE Architecture",
    date: "Oct 15, 2025",
    excerpt: "How we use Trusted Execution Environments to keep your data private and verifiable.",
    category: "Security"
  },
  {
    slug: "turning-telegram-into-pipeline",
    title: "Turning Telegram Noise into Pipeline",
    date: "Oct 10, 2025",
    excerpt: "A guide to identifying and qualifying leads from your Telegram conversations.",
    category: "Guide"
  },
  {
    slug: "cross-platform-enrichment",
    title: "Cross-Platform Identity Enrichment",
    date: "Oct 5, 2025",
    excerpt: "How we bridge identities across Telegram and X to build complete contact profiles.",
    category: "Product"
  },
  {
    slug: "web3-sales-playbook",
    title: "The Web3 Sales Playbook",
    date: "Sep 30, 2025",
    excerpt: "Best practices for managing dealflow in decentralized communities.",
    category: "Guide"
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Product', 'Guide', 'Security', 'Insights'];
  
  // Filter posts
  let filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query)
    );
  }
  
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <span className="text-lg sm:text-xl font-light">LockIn</span>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="/" className="text-sm font-light hover:text-gray-600">Home</a>
            <a href="/#pricing" className="text-sm font-light hover:text-gray-600">Pricing</a>
            <a href="/blog" className="text-sm font-light hover:text-gray-600">Blog</a>
            <button className="px-4 lg:px-6 py-2 bg-gray-900 text-white text-sm font-light rounded hover:bg-gray-800">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Blog</h1>
          <p className="text-base font-light text-gray-600">
            Insights on Web3 sales, lead intelligence, and building in crypto
          </p>
        </div>

        {/* Category Tabs and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={`px-4 py-2 text-sm font-light rounded whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 bg-white">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm font-light outline-none w-32 sm:w-48 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <a href={`/blog/${featuredPost.slug}`} className="group block mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-200 aspect-video rounded-lg"></div>
              <div>
                <span className="text-xs font-light text-gray-500 mb-2 block">
                  {featuredPost.category} · {featuredPost.date}
                </span>
                <h2 className="text-3xl sm:text-4xl font-light mb-4 group-hover:text-gray-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-base font-light text-gray-600 mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <span className="text-sm font-light underline">Read more →</span>
              </div>
            </div>
          </a>
        )}

        {/* Blog Posts Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <a 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full flex flex-col">
                  <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
                  <span className="text-xs font-light text-gray-500 mb-2 block">
                    {post.category} · {post.date}
                  </span>
                  <h3 className="text-xl font-light mb-3 group-hover:text-gray-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-gray-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </article>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-base font-light text-gray-600">
              No posts found matching your criteria.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light mb-6">
            Ready to Lock In More Deals?
          </h2>
          <p className="text-lg font-light text-gray-400 mb-8">
            Join top Web3 teams turning Telegram noise into qualified pipeline
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 text-sm font-light rounded hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <span className="text-sm font-light">LockIn</span>
            </div>
            <p className="text-xs font-light text-gray-600">
              Lead intelligence for Web3
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-light mb-4">Product</h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><a href="/#features" className="hover:text-gray-900">Features</a></li>
              <li><a href="/#pricing" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-light mb-4">Company</h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About</a></li>
              <li><a href="/blog" className="hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-light mb-4">Connect</h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900">Telegram</a></li>
              <li><a href="#" className="hover:text-gray-900">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
          <p className="text-center sm:text-left">© 2025 LockIn. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

