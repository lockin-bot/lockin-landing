'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: "introducing-lockin",
    title: "Introducing LockIn: Lead Intelligence for Web3",
    date: "Oct 25, 2025",
    excerpt: "Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X. After talking to dozens of BD and sales teams in crypto, we kept hearing the same problem.",
    category: "Product",
    readTime: "5 min read",
    featured: true
  },
  {
    slug: "why-web3-sales-different",
    title: "Why Web3 Sales is Different",
    date: "Oct 20, 2025",
    excerpt: "Deals in Web3 don't happen in CRM tools or cold email sequences. They happen in Telegram groups, X threads, and Discord servers.",
    category: "Insights",
    readTime: "4 min read"
  },
  {
    slug: "tee-security-deep-dive",
    title: "How We Keep Your Messages Private with TEE",
    date: "Oct 15, 2025",
    excerpt: "A technical deep-dive into how LockIn uses Trusted Execution Environments to ensure your conversations never leave a secure enclave.",
    category: "Security",
    readTime: "8 min read"
  },
  {
    slug: "telegram-sales-playbook",
    title: "The Ultimate Telegram Sales Playbook for Web3",
    date: "Oct 10, 2025",
    excerpt: "Learn how top BD teams are using Telegram to close deals, build relationships, and grow their pipeline in the crypto ecosystem.",
    category: "Guide",
    readTime: "12 min read"
  },
  {
    slug: "case-study-nautilus",
    title: "How Nautilus 3x'd Their Deal Flow with LockIn",
    date: "Oct 5, 2025",
    excerpt: "Nautilus was drowning in Telegram notifications. Here's how they used LockIn to surface the conversations that actually mattered.",
    category: "Case Study",
    readTime: "6 min read"
  },
  {
    slug: "ai-sales-intelligence",
    title: "The Future of AI-Powered Sales Intelligence",
    date: "Sep 30, 2025",
    excerpt: "How artificial intelligence is transforming the way sales teams identify, qualify, and close deals in the modern era.",
    category: "Insights",
    readTime: "7 min read"
  }
];

const categories = ["All", "Product", "Guide", "Security", "Insights", "Case Study"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className='w-full h-auto relative overflow-hidden pt-[120px] md:pt-[160px] lg:pt-[200px] pb-[60px] md:pb-[80px] lg:pb-[100px] px-[16px] md:px-[24px]'>
        {/* Circle Gradient */}
        <div className='absolute left-1/2 -translate-x-1/2 top-0 w-[814px] md:w-[1222px] lg:w-[1443px] h-[500px] md:h-[700px] lg:h-[800px] rounded-[169px] lg:rounded-[200px] bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

        {/* Stars Left */}
        <div className='w-[411px] md:w-[728px] h-[778px] md:h-[1380px] absolute top-0 -left-[221px] md:-left-[322px] lg:left-0 z-1'>
          <Image
            src={'/stars.svg'}
            width={1380}
            height={728}
            alt='Stars'
            priority
            draggable={false}
            className='w-full h-full object-contain'
          />
          </div>

        {/* Stars Right */}
        <div className='w-[411px] md:w-[728px] h-[778px] md:h-[1380px] absolute top-0 -right-[221px] md:-right-[322px] lg:right-0 z-1'>
          <Image
            src={'/stars.svg'}
            width={1380}
            height={728}
            alt='Stars'
            priority
            draggable={false}
            className='w-full h-full object-contain'
          />
        </div>

        {/* Content */}
        <div className='w-full max-w-[800px] mx-auto flex flex-col items-center relative z-2'>
          <h1 className='text-[40px] md:text-[64px] lg:text-[72px] leading-[46px] md:leading-[70px] lg:leading-[80px] -tracking-[2.28px] md:-tracking-[3.28px] lg:-tracking-[3.52px] text-center text-white font-hedvig font-normal mb-[16px] md:mb-[20px]'>
            LockIn's Latest News
          </h1>

          <span className='flex max-w-[300px] md:max-w-[580px] mx-auto text-[14px] md:text-[17px] leading-[20px] md:leading-[26px] lg:leading-[28px] -tracking-[0.15px] md:-tracking-[0.2px] text-center text-white font-normal opacity-[.8]'>
            The latest on Web3 sales, lead intelligence, and building relationships in crypto
          </span>
        </div>

        {/* Bottom Gradient Fade */}
        <div className='absolute bottom-0 left-0 w-full h-[150px] md:h-[200px] pointer-events-none z-[1]' style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 100%)' }}></div>
      </div>

      {/* Filter & Search Section */}
      <div className='w-full px-[16px] md:px-[24px] pb-[40px] md:pb-[60px]'>
        <div className='w-full max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[20px] md:gap-[24px]'>
          {/* Categories */}
          <div className='flex flex-wrap items-center justify-center gap-[8px] md:gap-[12px]'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-[14px] md:px-[18px] py-[8px] md:py-[10px] rounded-[100px] text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-[rgba(255,255,255,0.10)] text-white hover:bg-[rgba(255,255,255,0.20)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className='w-full md:w-auto relative'>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full md:w-[280px] h-[44px] md:h-[48px] px-[16px] md:px-[20px] rounded-[100px] bg-[rgba(255,255,255,0.10)] border border-[#272727] text-white text-[14px] md:text-[15px] placeholder:text-white/50 focus:outline-none focus:border-[#429DED] transition-all duration-300'
            />
            <svg className='absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] opacity-50' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" color="white" />
            </svg>
          </div>
          </div>
        </div>

        {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <div className='w-full px-[16px] md:px-[24px] pb-[40px] md:pb-[60px]'>
          <div className='w-full max-w-[1000px] mx-auto'>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className='w-full rounded-[20px] md:rounded-[28px] lg:rounded-[36px] border border-[#272727] bg-black p-[20px] md:p-[32px] lg:p-[40px] relative overflow-hidden'>
                {/* Background glow */}
                <div className='absolute top-0 right-0 w-[400px] h-[400px] bg-[#0F0E38] blur-[120px] opacity-50 z-0'></div>

                <div className='relative z-1'>
                  {/* Category & Meta */}
                  <div className='flex items-center gap-[12px] mb-[12px] md:mb-[16px]'>
                    <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white font-medium opacity-[.5]'>{featuredPost.category}</span>
                    <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white opacity-[.3]'>•</span>
                    <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{featuredPost.date}</span>
                    <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white opacity-[.3]'>•</span>
                    <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{featuredPost.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className='text-[24px] md:text-[36px] lg:text-[44px] leading-[30px] md:leading-[44px] lg:leading-[52px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-white font-hedvig font-normal mb-[12px] md:mb-[16px]'>{featuredPost.title}</h2>

                  {/* Excerpt */}
                  <p className='text-[14px] md:text-[17px] leading-[22px] md:leading-[26px] -tracking-[0.15px] md:-tracking-[0.2px] text-white font-normal opacity-[.7] max-w-[700px]'>{featuredPost.excerpt}</p>

                  {/* Read More */}
                  <div className='flex items-center gap-[8px] mt-[20px] md:mt-[28px]'>
                    <span className='text-[14px] md:text-[16px] leading-[20px] -tracking-[0.15px] text-[#429DED] font-medium'>Read article</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="24" viewBox="0 0 8 24" fill="none">
                      <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
              </div>
            </div>
      )}

      {/* Blog Grid */}
      <div className='w-full px-[16px] md:px-[24px] pb-[80px] md:pb-[120px] lg:pb-[160px]'>
        <div className='w-full max-w-[1000px] mx-auto'>
          {/* Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] lg:gap-[24px]'>
            {regularPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className='h-full'>
                <div className='w-full h-full rounded-[20px] md:rounded-[28px] lg:rounded-[36px] border border-[#272727] bg-black p-[20px] md:p-[24px] lg:p-[28px] flex flex-col'>
                  {/* Category & Meta */}
                  <div className='flex items-center gap-[10px] mb-[12px] md:mb-[14px]'>
                    <span className='text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white font-medium opacity-[.5]'>{post.category}</span>
                    <span className='text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white opacity-[.3]'>•</span>
                    <span className='text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className='text-[18px] md:text-[21px] lg:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[32px] -tracking-[0.2px] md:-tracking-[0.24px] text-white font-hedvig font-normal mb-[10px] md:mb-[12px]'>{post.title}</h3>

                  {/* Excerpt */}
                  <p className='text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] -tracking-[0.15px] text-white font-normal opacity-[.7] flex-grow'>{post.excerpt}</p>

                  {/* Date & Read More */}
                  <div className='flex items-center justify-between mt-[16px] md:mt-[20px]'>
                    <span className='text-[13px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.4]'>{post.date}</span>
                    <div className='flex items-center gap-[6px]'>
                      <span className='text-[13px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-[#429DED] font-medium'>Read</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="20" viewBox="0 0 8 24" fill="none">
                        <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className='w-full py-[60px] md:py-[80px] flex flex-col items-center'>
              <span className='text-[17px] md:text-[20px] leading-[26px] -tracking-[0.2px] text-white font-normal opacity-[.7]'>No articles found</span>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className='mt-[16px] text-[14px] md:text-[16px] leading-[20px] -tracking-[0.15px] text-[#429DED] font-medium hover:text-[#429DED]/80 transition-all duration-300'
              >
                Clear filters
              </button>
          </div>
        )}
        </div>
          </div>
          
      {/* Footer CTA */}
      <div className='w-full h-auto flex flex-col items-center px-[16px] md:px-[18px] pt-[40px] md:pt-[60px] lg:pt-[80px] relative overflow-hidden bg-black'>
        {/* Circle Gradient */}
        <div className='w-[493px] md:w-[1061px] lg:w-[1481px] h-[400px] md:h-[600px] lg:h-[700px] absolute bottom-0 left-1/2 -translate-x-1/2 lg:rounded-full bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

        {/* Stars */}
        <div className='w-[348px] md:w-[728px] h-[660px] md:h-[1380px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90'>
          <Image
            src={'/stars.svg'}
            width={1380}
            height={728}
            alt='Stars'
            priority
            draggable={false}
            className='w-full h-full object-contain'
          />
          </div>
          
        {/* Content Block */}
        <div className='w-full max-w-[650px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px] mb-[24px] md:mb-[40px] lg:mb-[56px] relative z-1'>
          <h2 className='text-[40px] md:text-[64px] lg:text-[72px] leading-[46px] md:leading-[70px] lg:leading-[80px] -tracking-[2.28px] md:-tracking-[3.28px] lg:-tracking-[3.52px] text-center text-white font-hedvig font-normal'>Ready to Lock In More Deals?</h2>

          <span className='flex max-w-[300px] md:max-w-[480px] lg:max-w-[420px] justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-center text-white font-normal opacity-[.7]'>Join top Web3 teams turning Telegram noise into qualified pipeline</span>

          {/* Get Started Button */}
          <div className='w-[170px] md:w-[210px] h-[48px] md:h-[58px] rounded-[28px] flex items-center justify-center mt-[10px] md:mt-[16px] group border-[3px] border-[#8d8d8d] hover:border-black bg-white hover:bg-black transition-all duration-300'>
            <Link href='/v1#pricing' className='flex items-center justify-center w-full h-full'>
              <span className='text-[18px] md:text-[20px] leading-normal -tracking-[0.6px] md:-tracking-[0.72px] font-semibold text-black group-hover:text-white transition-all duration-300'>Get Started</span>
            </Link>
          </div>
        </div>
        
        {/* Footer Block */}
        <div className='w-full max-w-[1200px] min-h-[290px] md:min-h-[210px] lg:min-h-[280px] h-auto mx-auto bg-black border border-[#272727] rounded-[20px] md:rounded-[28px] lg:rounded-[36px] backdrop-blur-[27px] px-[16px] md:px-[24px] pt-[20px] md:pt-[24px] lg:pt-[48px] relative z-1'>
          <div className='w-full max-w-[1110px] mx-auto flex flex-col md:flex-row items-start justify-between'>
            {/* Left Block */}
            <div className='flex flex-col'>
              {/* Logo */}
              <Link href='/v1' className='flex max-w-[64px] h-auto mb-[8px] md:mb-[14px] lg:mb-[20px]'>
                <Image
                  src={'/logo.svg'}
                  width={64}
                  height={26}
                  alt={'logo'}
                  draggable={false}
                  className='w-full h-full object-fit'
                />
              </Link>

              <span className='flex justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8]'>Lead intelligence for Web3</span>

              {/* Social Icons */}
              <div className='hidden md:flex items-center gap-[14px] md:mt-[14px] lg:mt-[30px]'>
                {/* Telegram */}
                <div className='w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://t.me/lockinbot' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                    <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                    <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_blog_footer)" />
                    <defs>
                      <linearGradient id="paint0_linear_blog_footer" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EDEDED" />
                        <stop offset="1" stopColor="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X (Twitter) */}
                <div className='w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://x.com/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                    <path d="M10.6944 7L17.2222 0H15.5556L9.94444 6L5.55556 0H0L6.83333 9.33333L0 16.6667H1.66667L7.58333 10.3333L12.2222 16.6667H17.7778L10.6944 7ZM2.47222 1.11111H4.69444L15.2778 15.5556H13.0556L2.47222 1.11111Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Nav Block */}
            <div className='flex items-start gap-[48px] md:gap-[56px] lg:gap-[70px] max-md:mt-[24px]'>
              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Product</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/v1#features' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Features</Link>
                  <Link href='/v1#pricing' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Pricing</Link>
                  <Link href='/v1#security' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Security</Link>
                </div>
              </div>

              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Company</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/blog' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Blog</Link>
                  <Link href='/v1' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Careers</Link>
                </div>
              </div>

              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Legal</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/v1' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Privacy</Link>
                  <Link href='/v1' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Terms</Link>
                </div>
              </div>
            </div>

            {/* Mobile Social Icons */}
            <div className='flex md:hidden items-center gap-[16px] mt-[28px]'>
              <div className='w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://t.me/lockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                  <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                  <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_blog_footer_mobile)" />
                  <defs>
                    <linearGradient id="paint0_linear_blog_footer_mobile" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EDEDED" />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className='w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://x.com/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                  <path d="M10.6944 7L17.2222 0H15.5556L9.94444 6L5.55556 0H0L6.83333 9.33333L0 16.6667H1.66667L7.58333 10.3333L12.2222 16.6667H17.7778L10.6944 7ZM2.47222 1.11111H4.69444L15.2778 15.5556H13.0556L2.47222 1.11111Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <span className='flex mt-[20px] md:mt-[24px] lg:mt-[32px] mb-[24px] lg:mb-[32px] justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8] relative z-1'>© 2025 LockIn. All rights reserved.</span>
      </div>
    </div>
  );
}
