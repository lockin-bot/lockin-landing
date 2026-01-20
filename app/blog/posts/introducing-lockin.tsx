import Link from 'next/link';
import { NetworkGraph } from '../../components/NetworkGraph';
import { SignalCards } from '../../components/SignalCards';
import { ProcessDemo } from '../../components/ProcessDemo';
import { PostMetadata } from './types';

export const metadata: PostMetadata = {
  slug: 'introducing-lockin',
  title: 'Introducing LockIn',
  date: 'Jan 15, 2026',
  excerpt: 'Cold outreach is quickly becoming a thing of the past. We built LockIn to reveal warm paths to your target accounts on Telegram and X and surface buying intent and signals.',
  category: 'Product',
  readTime: '5 min read',
  author: {
    name: 'Andrew Jiang',
    role: 'Co-founder and CEO',
    avatar: '/features/find-strongest-path/andrew-avatar.webp',
  },
  // Optional: custom social card image
  // socialImage: '/social/introducing-lockin.png',
};

export function Content() {
  return (
    <>
      <p>Last year I spent a month trying to get a meeting with a target account. I sent Telegram DMs, replied to their tweets, asked around for intros. Nothing.</p>

      <p>Then my co-founder mentioned he went to college with their CEO. He even had an active DM with him!</p>

      <p>Like many teams, we had a visibility problem in sales. Our team knew hundreds of the right people - we just couldn't see the connections. They were buried in Telegram groups, X follows, our investors' and team's networks.</p>

      {/* Network visualization */}
      <div className="w-full py-[24px] md:py-[40px] my-[32px] md:my-[48px]">
        <NetworkGraph />
      </div>

      <p>Around the same time, I found a Telegram message in a large group from a founder asking for exactly what we sold. Posted three weeks earlier, so by the time I messaged, they had already found a solution.</p>

      <p>Opportunities hiding in plain sight amongst thousands of messages across Telegram and X. I was catching maybe 1% of what mattered.</p>

      <p>The two problems were connected. A warm intro at the wrong moment is noise. The right signal with no path in is just frustration. You need to know your strongest path in and reach out when intent is highest.</p>

      {/* Signal cards */}
      <div className="w-full py-[24px] md:py-[40px] my-[32px] md:my-[48px]">
        <SignalCards />
      </div>

      <h2>So we built LockIn.</h2>

      <p>The idea is simple: make your team's collective network visible, and surface the signals that tell you when to activate it.</p>

      <p>When you connect your Telegram and X accounts, we map everything. Every group you're in. Every follow. Every shared connection across your team. When you look up a company, you see every path in - who knows someone, how they're connected, how strong the relationship is. The "does anyone know someone at X?" question gets answered before you ask it.</p>

      <p>Then we use monitor your network. You tell us what signals matter - someone evaluating tools in your space, a company hiring for roles that indicate growth, a founder posting about a problem you solve - and we watch the firehose for you. When something hits, you see the signal and the warm path together. Here's what's happening, here's who can get you in the door.</p>

      <p>It's not complicated. It's just the two things that actually matter for selling in crypto: warm paths and perfect timing.</p>

      {/* Process demo */}
      <div className="w-full py-[24px] md:py-[40px] my-[32px] md:my-[48px]">
        <ProcessDemo />
      </div>

      <p>One more thing: all your messages and data stay inside a <Link href="/blog/how-to-build-ai-without-giving-up-privacy" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Trusted Execution Environment</Link>. Even we can't see them. It's an insane technical challenge, but crypto is a sensitive industry - your alpha and deal flow need to stay private.</p>

      <h2>Why LockIn will help you win</h2>

      <p>AI has made it trivial to automate outreach. Everyone's inbox is now flooded with AI-generated spam. Response rates are approaching zero. The channel is burned.</p>

      <p>What's left is relationships and relevance. Warm intros. The right timing. The stuff that always worked better but was hard to systematize.</p>

      <p>We're not building another database of contacts to blast. We're building the thing we needed when we were doing BD ourselves - a way to see the network we're sitting on, catch the signals we kept missing, and combine the two so that when an opportunity shows up, you know exactly who can get you there.</p>

      <p>If you're running BD or sales at a crypto company and any of this sounds familiar - if you know the game but can't see the board - I'd like to talk.</p>

      <p>DM me on <Link href="https://x.com/andrewjiang" target="_blank" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">X</Link> or <Link href="https://t.me/axjiang" target="_blank" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">Telegram</Link>, or <Link href="/demo" className="text-[#429DED] underline hover:text-[#429DED]/80 transition-all duration-300">book a demo</Link>.</p>
    </>
  );
}
