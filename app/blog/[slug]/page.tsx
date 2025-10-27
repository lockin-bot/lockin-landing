'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  "introducing-lockin": {
    slug: "introducing-lockin",
    title: "Introducing LockIn: Lead Intelligence for Web3",
    date: "Oct 25, 2025",
    excerpt: "Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X.",
    category: "Product",
    content: `
      <p class="text-lg font-light leading-relaxed mb-6 text-gray-700">
        Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X. After talking to dozens of BD and sales teams in crypto, we kept hearing the same problem: the best deals don't happen over email or LinkedIn—they happen in Telegram groups and X threads.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        The Problem with Web3 Sales
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Traditional CRMs weren't built for how Web3 deals actually happen. Your best prospects are having conversations in public Telegram channels, announcing projects in Discord, and signaling intent through X posts. But tracking all of this manually is impossible at scale.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        How LockIn Works
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        LockIn connects to your Telegram and X accounts to automatically surface qualified leads based on your criteria. We use AI to enrich contact profiles, bridge identities across platforms, and identify buying signals in real-time.
      </p>

      <h3 class="text-2xl font-light mt-8 mb-4">
        Connect
      </h3>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Bring together all your contacts from Telegram and X into one unified platform. Sync with your existing CRM tools like Hubspot and Pipedrive.
      </p>

      <h3 class="text-2xl font-light mt-8 mb-4">
        Enrich
      </h3>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Automatically link Telegram profiles to X accounts using public data. Generate context on each contact so you know exactly how to approach them.
      </p>

      <h3 class="text-2xl font-light mt-8 mb-4">
        Discover
      </h3>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Monitor groups, posts, and news signals to discover qualified opportunities. Get alerts when prospects show buying intent.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        Built for Privacy
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        All your data is encrypted inside a Trusted Execution Environment. We never send your conversations to third-party AI providers. Our code and security proofs are published on-chain so you can verify exactly what we're doing.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        Get Started
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        We're opening up early access to LockIn today. If you're a BD or sales professional in Web3, we'd love to have you try it out. Get started at lockin.ai.
      </p>
    `
  },
  "why-web3-sales-different": {
    slug: "why-web3-sales-different",
    title: "Why Web3 Sales is Different",
    date: "Oct 20, 2025",
    excerpt: "Deals in Web3 don't happen over email or LinkedIn. They happen in Telegram groups and X threads.",
    category: "Insights",
    content: `
      <p class="text-lg font-light leading-relaxed mb-6 text-gray-700">
        If you've ever tried to apply traditional B2B sales tactics to Web3, you've probably noticed they don't quite work. The entire sales motion is fundamentally different.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        Where Deals Actually Happen
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        In traditional B2B, you might cold email a prospect, set up a call, send a deck, and close over Zoom. In Web3, your best prospects are already in your Telegram groups. They're engaging with your content on X. They're asking questions in Discord.
      </p>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        The deal doesn't start with an outbound email—it starts with a reply in a group chat.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        The Signal Problem
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        The challenge is volume. A single Telegram group might have hundreds of messages per day. Multiply that across 10, 20, 50 groups, and it's impossible to manually track every potential lead signal.
      </p>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        You need automation, but not the kind that feels robotic. You need intelligence that surfaces the right opportunities at the right time.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        What Good Web3 Sales Looks Like
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        The best BD teams in crypto have systems for this. They track conversations, enrich contacts, and respond quickly when opportunities emerge. LockIn automates this entire workflow.
      </p>
    `
  }
};

function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts[slug];
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Send iframe context to parent window (scroll position and page)
  useEffect(() => {
    const sendContext = () => {
      window.parent.postMessage({
        type: 'IFRAME_CONTEXT',
        page: window.location.pathname,
        scroll: window.scrollY
      }, '*');
    };

    // Send initial context
    sendContext();

    // Update on scroll
    const handleScroll = () => {
      sendContext();
    };

    // Update on navigation
    const handlePopState = () => {
      sendContext();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Listen for navigation commands from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATE_TO') {
        if (event.data.page && event.data.page !== window.location.pathname) {
          window.history.pushState({}, '', event.data.page);
        }
        if (typeof event.data.scroll === 'number') {
          window.scrollTo(0, event.data.scroll);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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

      {/* Blog Post Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16">
        <a href="/blog" className="text-sm font-light text-gray-600 hover:text-gray-900 mb-8 inline-block">
          ← Back to blog
        </a>
        
        <div className="mb-6">
          <span className="text-xs font-light text-gray-500 mb-2 block">
            {post.category} · {post.date}
          </span>
          <h1 className="text-4xl sm:text-5xl font-light mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

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

