'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: React.ReactNode;
}

const blogPosts: Record<string, BlogPost> = {
  "introducing-lockin": {
    slug: "introducing-lockin",
    title: "Introducing LockIn: Lead Intelligence for Web3",
    date: "Oct 25, 2025",
    excerpt: "Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X.",
    category: "Product",
    readTime: "5 min read",
    author: {
      name: "LockIn Team",
      role: "Product"
    },
    content: (
      <>
        <p>Today we're excited to announce the launch of LockIn – a new way for Web3 sales and BD teams to surface qualified leads from the noise of Telegram and X.</p>

        <p>After talking to dozens of BD and sales teams in crypto, we kept hearing the same problem: deals happen in Telegram groups and X threads, but there's no good way to track them. Traditional CRMs don't work because they're built for email sequences and cold calling – not for the fast-moving, relationship-driven world of Web3.</p>

        <h2>The Problem We're Solving</h2>

        <p>If you're in Web3 BD, you know the pain. You're in hundreds of Telegram groups. You're tracking conversations across X, Discord, and direct messages. You're trying to remember who you talked to, what was said, and when you should follow up.</p>

        <p>Most teams end up with a mess of spreadsheets, Notion databases, and memory. Important leads slip through the cracks. Warm intros get forgotten. And deals that should have closed never do.</p>

        <h2>How LockIn Works</h2>

        <p>LockIn connects to your Telegram and X accounts and uses AI to automatically identify and track sales conversations. It builds a living relationship graph of your network, showing you:</p>

        <ul>
          <li><strong>Warm paths</strong> to any account through your existing connections</li>
          <li><strong>Buying signals</strong> when prospects show intent in group chats</li>
          <li><strong>Follow-up reminders</strong> so nothing falls through the cracks</li>
          <li><strong>Deal pipeline</strong> tracking across all your conversations</li>
        </ul>

        <h2>Privacy First</h2>

        <p>We know your conversations are sensitive. That's why we built LockIn with privacy as a core principle:</p>

        <ul>
          <li>All data is encrypted inside a Trusted Execution Environment (TEE)</li>
          <li>We never send your conversations to third-party AI providers</li>
          <li>All proofs and code are posted to the blockchain for verification</li>
        </ul>

        <h2>Get Started</h2>

        <p>LockIn is available today with a 7-day free trial. We're starting with two plans:</p>

        <ul>
          <li><strong>Standard ($120/month)</strong>: Track up to 100 conversations with daily AI suggestions</li>
          <li><strong>Pro ($150/month)</strong>: Track up to 500 conversations with advanced AI insights and custom pipelines</li>
        </ul>

        <p>Ready to stop losing deals to Telegram chaos? <Link href="/pricing" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Get started today</Link>.</p>
      </>
    )
  },
  "why-web3-sales-different": {
    slug: "why-web3-sales-different",
    title: "Why Web3 Sales is Different",
    date: "Oct 20, 2025",
    excerpt: "Deals in Web3 don't happen in CRM tools or cold email sequences. They happen in Telegram groups, X threads, and Discord servers.",
    category: "Insights",
    readTime: "4 min read",
    author: {
      name: "LockIn Team",
      role: "Insights"
    },
    content: (
      <>
        <p>If you've ever tried to apply traditional SaaS sales tactics to Web3, you know it doesn't work. Cold emails go unanswered. LinkedIn outreach feels tone-deaf. And the CRM you set up sits empty while deals actually happen in Telegram groups you forgot you joined.</p>

        <h2>The Web3 Sales Reality</h2>

        <p>Deals in crypto happen differently. They're built on relationships, reputation, and being in the right place at the right time. Here's what makes Web3 sales unique:</p>

        <h3>1. Community-First Discovery</h3>

        <p>Prospects don't find you through Google ads or cold emails. They find you in the Telegram groups and X threads where they already spend time. Building presence and reputation in these communities is essential.</p>

        <h3>2. Relationship-Driven Closes</h3>

        <p>In Web3, who you know matters. Warm intros from mutual connections can 10x your close rate. The challenge is tracking all your relationships across fragmented platforms.</p>

        <h3>3. Speed Matters</h3>

        <p>Crypto moves fast. A prospect who's interested today might have closed with a competitor tomorrow. You need to catch buying signals immediately and act on them.</p>

        <h3>4. Trust is Everything</h3>

        <p>With so many scams and rug pulls in the space, trust is the most valuable currency. Building genuine relationships over time is more important than any sales technique.</p>

        <h2>What This Means for Sales Teams</h2>

        <p>Traditional sales tools don't work because they're built for a different model. You need tools that:</p>

        <ul>
          <li>Work where your conversations actually happen (Telegram, X, Discord)</li>
          <li>Help you track relationships, not just deals</li>
          <li>Surface warm intros and connection paths</li>
          <li>Alert you to buying signals in real-time</li>
        </ul>

        <p>That's exactly what we built LockIn to do. <Link href="/pricing" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Learn more about how it works</Link>.</p>
      </>
    )
  },
  "tee-security-deep-dive": {
    slug: "tee-security-deep-dive",
    title: "How We Keep Your Messages Private with TEE",
    date: "Oct 15, 2025",
    excerpt: "A technical deep-dive into how LockIn uses Trusted Execution Environments to ensure your conversations never leave a secure enclave.",
    category: "Security",
    readTime: "8 min read",
    author: {
      name: "LockIn Team",
      role: "Engineering"
    },
    content: (
      <>
        <p>When we tell people that LockIn processes their Telegram messages with AI, the first question is always about privacy. How can they trust us with their sensitive business conversations?</p>

        <p>The answer is: they don't have to trust us. We built LockIn so that even we can't see your messages. Here's how.</p>

        <h2>What is a Trusted Execution Environment?</h2>

        <p>A Trusted Execution Environment (TEE) is a secure area within a processor that runs code in isolation from the rest of the system. Think of it as a locked room that even the building owner can't enter.</p>

        <p>When your messages are processed in a TEE:</p>

        <ul>
          <li>The data is encrypted in memory</li>
          <li>No one – not even us – can see what's being processed</li>
          <li>The code running inside can be verified by anyone</li>
        </ul>

        <h2>How LockIn Uses TEE</h2>

        <p>When you connect your Telegram account to LockIn, here's what happens:</p>

        <ol>
          <li><strong>Secure Connection</strong>: Your session token is encrypted and sent directly to the TEE</li>
          <li><strong>Message Processing</strong>: All AI analysis happens inside the secure enclave</li>
          <li><strong>Results Only</strong>: Only the extracted insights (lead scores, follow-up suggestions) leave the TEE – never your raw messages</li>
        </ol>

        <h2>Verification and Attestation</h2>

        <p>How do you know we're actually running the code we say we are? Through attestation.</p>

        <p>The TEE produces cryptographic proofs that show exactly what code is running inside. We publish these attestations on-chain, so anyone can verify that:</p>

        <ul>
          <li>The code matches our open-source repository</li>
          <li>No unauthorized access is possible</li>
          <li>Your data is being handled as promised</li>
        </ul>

        <h2>Why This Matters</h2>

        <p>In Web3, trust is everything. We didn't want to ask you to "just trust us" with your sensitive business conversations. With TEE, you don't have to. The math and cryptography guarantee your privacy.</p>

        <p>Want to learn more? Check out our <Link href="/" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">open source code</Link> and <Link href="/" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">attestation proofs</Link>.</p>
      </>
    )
  },
  "telegram-sales-playbook": {
    slug: "telegram-sales-playbook",
    title: "The Ultimate Telegram Sales Playbook for Web3",
    date: "Oct 10, 2025",
    excerpt: "Learn how top BD teams are using Telegram to close deals, build relationships, and grow their pipeline in the crypto ecosystem.",
    category: "Guide",
    readTime: "12 min read",
    author: {
      name: "LockIn Team",
      role: "Growth"
    },
    content: (
      <>
        <p>Telegram is where Web3 deals happen. If you're not active on Telegram, you're missing out on the most important sales channel in crypto. Here's everything you need to know.</p>

        <h2>Why Telegram Matters</h2>

        <p>Unlike LinkedIn or email, Telegram is where crypto-native teams actually spend their time. It's where:</p>

        <ul>
          <li>Projects announce launches and updates</li>
          <li>Community members discuss and share alpha</li>
          <li>Partnerships get discussed and closed</li>
          <li>Trust gets built through consistent presence</li>
        </ul>

        <h2>Setting Up Your Telegram Presence</h2>

        <h3>Profile Optimization</h3>
        <ul>
          <li>Use a professional photo (not a PFP unless you're well-known)</li>
          <li>Bio should clearly state your role and company</li>
          <li>Include relevant links (X, website)</li>
        </ul>

        <h3>Groups to Join</h3>
        <ul>
          <li>Your target customers' community groups</li>
          <li>Ecosystem-specific groups (Solana Builders, Ethereum Devs, etc.)</li>
          <li>Industry groups (DeFi, NFTs, Infrastructure, etc.)</li>
          <li>Regional groups if relevant</li>
        </ul>

        <h2>Engagement Strategies</h2>

        <h3>Add Value First</h3>
        <p>Don't join groups and immediately start pitching. Spend time understanding the community, answering questions, and sharing useful insights. Build reputation before selling.</p>

        <h3>Timing Matters</h3>
        <p>Pay attention to when your target audience is active. Most crypto communities are global, but there are peak times. Use tools like LockIn to track activity patterns.</p>

        <h3>DM Etiquette</h3>
        <p>Cold DMs are tricky on Telegram. Best practices:</p>
        <ul>
          <li>Build rapport in groups first</li>
          <li>Reference something specific they said or did</li>
          <li>Keep initial message short and value-focused</li>
          <li>Don't pitch immediately – start a conversation</li>
        </ul>

        <h2>Tracking and Follow-Up</h2>

        <p>The biggest challenge with Telegram sales is tracking. Conversations are scattered across dozens of groups and DMs. This is where LockIn helps – automatically tracking your conversations and surfacing the ones that matter.</p>

        <p>Ready to level up your Telegram sales game? <Link href="/pricing" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Try LockIn free for 7 days</Link>.</p>
      </>
    )
  },
  "case-study-nautilus": {
    slug: "case-study-nautilus",
    title: "How Nautilus 3x'd Their Deal Flow with LockIn",
    date: "Oct 5, 2025",
    excerpt: "Nautilus was drowning in Telegram notifications. Here's how they used LockIn to surface the conversations that actually mattered.",
    category: "Case Study",
    readTime: "6 min read",
    author: {
      name: "LockIn Team",
      role: "Customer Success"
    },
    content: (
      <>
        <p>Nautilus is a leading infrastructure provider in the Solana ecosystem. Their BD team was managing relationships across 200+ Telegram groups – and they were drowning.</p>

        <h2>The Challenge</h2>

        <p>"We were in so many groups that important conversations were getting lost," says their Head of BD. "A potential partnership would message, and by the time we saw it, they'd already moved on."</p>

        <p>Key problems:</p>
        <ul>
          <li>200+ Telegram groups to monitor</li>
          <li>No systematic way to track conversations</li>
          <li>Warm intros getting missed</li>
          <li>Manual spreadsheet tracking failing</li>
        </ul>

        <h2>The Solution</h2>

        <p>Nautilus deployed LockIn across their 4-person BD team. Within the first week:</p>

        <ul>
          <li>LockIn identified 47 active conversations they had lost track of</li>
          <li>The relationship graph revealed 12 warm intro paths to target accounts</li>
          <li>Automated alerts caught 3 buying signals they would have missed</li>
        </ul>

        <h2>The Results</h2>

        <p>After 3 months with LockIn:</p>

        <ul>
          <li><strong>3x increase</strong> in qualified pipeline</li>
          <li><strong>60% reduction</strong> in time spent on manual tracking</li>
          <li><strong>5 deals closed</strong> directly from recovered conversations</li>
        </ul>

        <p>"LockIn is now essential to how we do BD," says their team lead. "We can't imagine going back to the old way."</p>

        <h2>Key Takeaways</h2>

        <ul>
          <li>Don't underestimate how many conversations slip through the cracks</li>
          <li>Warm intro paths are often hidden in your existing network</li>
          <li>Real-time alerts on buying signals can make the difference</li>
        </ul>

        <p>Want similar results? <Link href="/pricing" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Start your free trial today</Link>.</p>
      </>
    )
  },
  "ai-sales-intelligence": {
    slug: "ai-sales-intelligence",
    title: "The Future of AI-Powered Sales Intelligence",
    date: "Sep 30, 2025",
    excerpt: "How artificial intelligence is transforming the way sales teams identify, qualify, and close deals in the modern era.",
    category: "Insights",
    readTime: "7 min read",
    author: {
      name: "LockIn Team",
      role: "Product"
    },
    content: (
      <>
        <p>AI is transforming every aspect of sales – from lead generation to closing. But most AI sales tools are built for traditional enterprise sales. Web3 needs something different.</p>

        <h2>The State of AI in Sales</h2>

        <p>Today's AI sales tools excel at:</p>
        <ul>
          <li>Email personalization at scale</li>
          <li>Call transcription and analysis</li>
          <li>CRM data enrichment</li>
          <li>Predictive lead scoring</li>
        </ul>

        <p>But they fail in Web3 because they're built for the wrong channels and workflows.</p>

        <h2>What Web3 Sales AI Needs</h2>

        <h3>1. Native Telegram & X Integration</h3>
        <p>The AI needs to understand conversations happening in Telegram groups and X threads – not just email and Salesforce.</p>

        <h3>2. Relationship Intelligence</h3>
        <p>In Web3, relationships matter more than data. AI should map your network and surface connection paths, not just lead scores.</p>

        <h3>3. Real-Time Signal Detection</h3>
        <p>Crypto moves fast. AI should alert you to buying signals immediately, not in a daily digest.</p>

        <h3>4. Privacy-First Architecture</h3>
        <p>Your conversations contain alpha and sensitive deal information. AI processing should happen in secure enclaves, not on third-party cloud servers.</p>

        <h2>The LockIn Approach</h2>

        <p>We built LockIn from the ground up for Web3 sales:</p>

        <ul>
          <li><strong>Native integrations</strong> with Telegram and X</li>
          <li><strong>Relationship graph</strong> that maps your entire network</li>
          <li><strong>Real-time alerts</strong> on buying signals and activity</li>
          <li><strong>TEE architecture</strong> for complete privacy</li>
        </ul>

        <p>The future of AI in Web3 sales isn't about automating cold outreach – it's about surfacing the right opportunities from your existing relationships and communities.</p>

        <p>Ready to see what AI-powered Web3 sales looks like? <Link href="/pricing" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Try LockIn free</Link>.</p>
      </>
    )
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different slug)
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className='w-full h-auto relative overflow-hidden pt-[100px] md:pt-[140px] lg:pt-[160px] pb-[40px] md:pb-[60px] lg:pb-[80px] px-[16px] md:px-[24px]'>
        {/* Circle Gradient */}
        <div className='absolute left-1/2 -translate-x-1/2 top-0 w-[814px] md:w-[1222px] lg:w-[1443px] h-[400px] md:h-[600px] lg:h-[700px] rounded-[169px] lg:rounded-[200px] bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

        {/* Stars Left */}
        <div className='w-[411px] md:w-[728px] h-[778px] md:h-[1380px] absolute top-0 -left-[221px] md:-left-[322px] lg:left-0 z-1'>
          <Image
            src={'/backgrounds/stars.svg'}
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
            src={'/backgrounds/stars.svg'}
            width={1380}
            height={728}
            alt='Stars'
                priority
                draggable={false}
            className='w-full h-full object-contain'
              />
            </div>

        {/* Content */}
        <div className='w-full max-w-[1000px] mx-auto flex flex-col items-start relative z-2'>
          {/* Back Link */}
          <Link href="/blog" className='flex items-center gap-[8px] mb-[24px] md:mb-[32px] group'>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="24" viewBox="0 0 8 24" fill="none" className='rotate-180'>
              <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-white transition-all duration-300' />
            </svg>
            <span className='text-[14px] md:text-[16px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5] group-hover:opacity-100 transition-all duration-300'>Back to Blog</span>
          </Link>

          {/* Category & Meta */}
          <div className='flex items-center gap-[12px] mb-[16px] md:mb-[20px]'>
            <span className='px-[12px] py-[4px] rounded-[40px] bg-[rgba(255,255,255,0.10)] text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white font-medium'>{post.category}</span>
            <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{post.date}</span>
            <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white opacity-[.3]'>•</span>
            <span className='text-[13px] md:text-[15px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className='text-[32px] md:text-[48px] lg:text-[56px] leading-[38px] md:leading-[54px] lg:leading-[64px] -tracking-[1.28px] md:-tracking-[1.92px] lg:-tracking-[2.24px] text-white font-hedvig font-normal mb-[20px] md:mb-[28px]'>{post.title}</h1>

          {/* Author */}
          <div className='flex items-center gap-[12px]'>
            <div className='w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center'>
              <span className='text-[16px] md:text-[18px] text-white font-medium'>{post.author.name.charAt(0)}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-[14px] md:text-[16px] leading-[20px] -tracking-[0.15px] text-white font-medium'>{post.author.name}</span>
              <span className='text-[13px] md:text-[14px] leading-[18px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{post.author.role}</span>
                </div>
              </div>
            </div>

        {/* Bottom Gradient Fade */}
        <div className='absolute bottom-0 left-0 w-full h-[150px] md:h-[200px] pointer-events-none z-[1]' style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 100%)' }}></div>
      </div>

      {/* Article Content */}
      <div className='w-full px-[16px] md:px-[24px] pb-[60px] md:pb-[80px] lg:pb-[100px]'>
        <article className='w-full max-w-[1000px] mx-auto prose prose-invert prose-lg
          [&>p]:text-[16px] [&>p]:md:text-[18px] [&>p]:leading-[28px] [&>p]:md:leading-[32px] [&>p]:-tracking-[0.15px] [&>p]:text-white [&>p]:font-normal [&>p]:opacity-[.85] [&>p]:mb-[24px] [&>p]:md:mb-[28px]
          [&>h2]:text-[24px] [&>h2]:md:text-[32px] [&>h2]:leading-[32px] [&>h2]:md:leading-[40px] [&>h2]:-tracking-[0.48px] [&>h2]:md:-tracking-[0.64px] [&>h2]:text-white [&>h2]:font-hedvig [&>h2]:font-normal [&>h2]:mt-[40px] [&>h2]:md:mt-[56px] [&>h2]:mb-[16px] [&>h2]:md:mb-[24px]
          [&>h3]:text-[20px] [&>h3]:md:text-[24px] [&>h3]:leading-[28px] [&>h3]:md:leading-[32px] [&>h3]:-tracking-[0.4px] [&>h3]:md:-tracking-[0.48px] [&>h3]:text-white [&>h3]:font-hedvig [&>h3]:font-normal [&>h3]:mt-[32px] [&>h3]:md:mt-[40px] [&>h3]:mb-[12px] [&>h3]:md:mb-[16px]
          [&>ul]:mb-[24px] [&>ul]:md:mb-[28px] [&>ul]:pl-[20px]
          [&>ul>li]:text-[16px] [&>ul>li]:md:text-[18px] [&>ul>li]:leading-[28px] [&>ul>li]:md:leading-[32px] [&>ul>li]:-tracking-[0.15px] [&>ul>li]:text-white [&>ul>li]:font-normal [&>ul>li]:opacity-[.85] [&>ul>li]:mb-[8px] [&>ul>li]:md:mb-[12px]
          [&>ol]:mb-[24px] [&>ol]:md:mb-[28px] [&>ol]:pl-[20px]
          [&>ol>li]:text-[16px] [&>ol>li]:md:text-[18px] [&>ol>li]:leading-[28px] [&>ol>li]:md:leading-[32px] [&>ol>li]:-tracking-[0.15px] [&>ol>li]:text-white [&>ol>li]:font-normal [&>ol>li]:opacity-[.85] [&>ol>li]:mb-[8px] [&>ol>li]:md:mb-[12px]
          [&_strong]:text-white [&_strong]:font-semibold
        '>
          {post.content}
        </article>
      </div>

      {/* Divider */}
      <div className='w-full px-[16px] md:px-[24px]'>
        <div className='w-full max-w-[1000px] mx-auto h-px bg-[#272727]'></div>
            </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className='w-full px-[16px] md:px-[24px] py-[60px] md:py-[80px] lg:py-[100px]'>
          <div className='w-full max-w-[1000px] mx-auto'>
            <h2 className='text-[24px] md:text-[32px] lg:text-[36px] leading-[32px] md:leading-[40px] lg:leading-[44px] -tracking-[0.48px] md:-tracking-[0.64px] lg:-tracking-[0.72px] text-white font-hedvig font-normal mb-[24px] md:mb-[32px] lg:mb-[40px]'>Related Articles</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] lg:gap-[24px]'>
              {relatedPosts.map((relatedPost) => (
                <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                  <div className='w-full h-full rounded-[20px] md:rounded-[28px] lg:rounded-[36px] border border-[#272727] bg-black p-[20px] md:p-[24px] lg:p-[28px]'>
                    {/* Category & Meta */}
                    <div className='flex items-center gap-[10px] mb-[12px] md:mb-[14px]'>
                      <span className='text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white font-medium opacity-[.5]'>{relatedPost.category}</span>
                      <span className='text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white opacity-[.3]'>•</span>
                      <span className='text-[12px] md:text-[14px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5]'>{relatedPost.readTime}</span>
                  </div>

                    {/* Title */}
                    <h3 className='text-[18px] md:text-[21px] lg:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[32px] -tracking-[0.2px] md:-tracking-[0.24px] text-white font-hedvig font-normal mb-[10px] md:mb-[12px] group-hover:text-[#429DED] transition-all duration-300'>{relatedPost.title}</h3>

                    {/* Excerpt */}
                    <p className='text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] -tracking-[0.15px] text-white font-normal opacity-[.7]'>{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
                  </div>
                </div>
              </div>
      )}

      {/* Footer CTA */}
      <div className='w-full h-auto flex flex-col items-center px-[16px] md:px-[18px] pt-[40px] md:pt-[60px] lg:pt-[80px] relative overflow-hidden bg-black'>
        {/* Circle Gradient */}
        <div className='w-[493px] md:w-[1061px] lg:w-[1481px] h-[400px] md:h-[600px] lg:h-[700px] absolute bottom-0 left-1/2 -translate-x-1/2 lg:rounded-full bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

        {/* Stars */}
        <div className='w-[348px] md:w-[728px] h-[660px] md:h-[1380px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90'>
                    <Image
            src={'/backgrounds/stars.svg'}
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
            <Link href='/#pricing' className='flex items-center justify-center w-full h-full'>
              <span className='text-[18px] md:text-[20px] leading-normal -tracking-[0.6px] md:-tracking-[0.72px] font-semibold text-black group-hover:text-white transition-all duration-300'>Get Started</span>
            </Link>
          </div>
        </div>

        {/* Footer Block */}
        <div className='w-full max-w-[1000px] 2xl:max-w-[1200px] min-h-[290px] md:min-h-[210px] lg:min-h-[280px] h-auto mx-auto bg-black border border-[#272727] rounded-[20px] md:rounded-[28px] lg:rounded-[36px] backdrop-blur-[27px] px-[24px] md:px-[32px] lg:px-[48px] pt-[20px] md:pt-[24px] lg:pt-[48px] relative z-1'>
          <div className='w-full mx-auto flex flex-col md:flex-row items-start justify-between'>
            {/* Left Block */}
            <div className='flex flex-col'>
                  {/* Logo */}
              <Link href='/' className='flex max-w-[64px] h-auto mb-[8px] md:mb-[14px] lg:mb-[20px]'>
                    <Image
                  src={'/brand/logo.svg'}
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
                    <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_post_footer)" />
                    <defs>
                      <linearGradient id="paint0_linear_post_footer" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
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

                {/* LinkedIn */}
                <div className='w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://www.linkedin.com/company/lockinbot' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                  </svg>
                  </div>

                {/* Instagram */}
                <div className='w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://www.instagram.com/lockinbot' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Nav Block */}
            <div className='flex items-start gap-[48px] md:gap-[56px] lg:gap-[70px] max-md:mt-[24px]'>
              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Product</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/#features' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Features</Link>
                  <Link href='/#pricing' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Pricing</Link>
                  <Link href='/#security' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Security</Link>
            </div>
          </div>

              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Company</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/blog' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Blog</Link>
                  <Link href='/' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Careers</Link>
        </div>
      </div>

              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Legal</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/privacy' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Privacy</Link>
                  <Link href='/terms' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Terms</Link>
                  <Link href='/cookies' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Cookie Policy</Link>
                </div>
              </div>
        </div>

            {/* Mobile Social Icons */}
            <div className='flex md:hidden items-center gap-[12px] mt-[28px] flex-wrap'>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://t.me/lockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                  <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                  <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_post_footer_mobile)" />
                  <defs>
                    <linearGradient id="paint0_linear_post_footer_mobile" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EDEDED" />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://x.com/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 18 17" fill="none">
                  <path d="M10.6944 7L17.2222 0H15.5556L9.94444 6L5.55556 0H0L6.83333 9.33333L0 16.6667H1.66667L7.58333 10.3333L12.2222 16.6667H17.7778L10.6944 7ZM2.47222 1.11111H4.69444L15.2778 15.5556H13.0556L2.47222 1.11111Z" fill="white" />
                </svg>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://www.linkedin.com/company/lockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                </svg>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://www.instagram.com/lockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="white"/>
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
