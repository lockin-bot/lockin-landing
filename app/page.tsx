'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What exactly does LockIn do with my Telegram?",
      answer: "LockIn connects to your Telegram account to monitor conversations and identify potential leads based on your criteria. All data is encrypted and processed within a secure TEE environment."
    },
    {
      question: "How does a LockIn bot work on Telegram chats?",
      answer: "The bot listens to group conversations and DMs (with your permission), analyzes the content for buying signals, and enriches contact profiles with cross-platform data from X and other sources."
    },
    {
      question: "Is this actually secure (we see \"trusted\" everywhere)?",
      answer: "Yes. All encryption happens in a Trusted Execution Environment (TEE), and our security proofs are published on-chain. You can verify our code and attestations yourself—we're fully open source."
    },
    {
      question: "What are the privacy features (what)?",
      answer: "We never send your data to third-party AI providers. All processing happens in isolated, encrypted environments. You control what data is collected and can delete it anytime."
    },
    {
      question: "How quickly can I be up and running with LockIn?",
      answer: "Most teams are fully onboarded within 24 hours. Connect your Telegram and X accounts, set your lead criteria, and start receiving qualified opportunities immediately."
    }
  ];

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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#pricing" className="text-sm font-light hover:text-gray-600">Pricing</a>
            <a href="/blog" className="text-sm font-light hover:text-gray-600">Blog</a>
            <a href="#demo" className="text-sm font-light hover:text-gray-600">Book a demo</a>
            <button className="px-4 lg:px-6 py-2 bg-gray-900 text-white text-sm font-light rounded hover:bg-gray-800">
              Get started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#pricing" className="block text-sm font-light hover:text-gray-600">Pricing</a>
              <a href="/blog" className="block text-sm font-light hover:text-gray-600">Blog</a>
              <a href="#demo" className="block text-sm font-light hover:text-gray-600">Book a demo</a>
              <button className="w-full px-6 py-2 bg-gray-900 text-white text-sm font-light rounded hover:bg-gray-800">
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
            {/* Left: Text Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-6">
                LEAD<br />INTELLIGENCE<br />FOR WEB3
          </h1>
              <p className="text-base sm:text-lg font-normal text-gray-600 mb-8 leading-relaxed">
                Surface lead signals from the noise of your networks on Telegram and X
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="px-8 py-3 bg-gray-900 text-white text-sm font-normal rounded hover:bg-gray-800">
                  Get Started
                </button>
                <button className="px-8 py-3 bg-gray-100 text-sm font-normal rounded hover:bg-gray-200">
                  Watch 1 Min Demo
                </button>
              </div>
            </div>

            {/* Right: Hero Graphic */}
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
          </div>

          {/* Customer Banner */}
          <div className="text-center">
            <p className="text-sm font-normal text-gray-500 mb-8">
              Backed by Alliance and Trusted by
            </p>
            <div className="flex justify-center items-center gap-8 sm:gap-12 lg:gap-16 flex-wrap">
              <div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 rounded"></div>
              <div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 rounded"></div>
              <div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 rounded"></div>
              <div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 rounded"></div>
              <div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect, Enrich, Discover - Cards */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Connect */}
            <div>
              <div className="bg-gray-200 aspect-square rounded-lg mb-6"></div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">Connect</h3>
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                Bring together your contacts in Telegram and X into one platform, and sync it with popular CRMs including Hubspot and Pipedrive.
              </p>
            </div>

            {/* Enrich */}
            <div>
              <div className="bg-gray-200 aspect-square rounded-lg mb-6"></div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">Enrich</h3>
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                Bridge identities across X and Telegram using public data, and generates context so you can determine the best way to connect.
              </p>
            </div>

            {/* Discover */}
            <div>
              <div className="bg-gray-200 aspect-square rounded-lg mb-6"></div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">Discover</h3>
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                Monitor Telegram groups, X posts, and news signals to discover qualified lead opportunities right to your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Don't Trust, Verify */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-normal text-center mb-12 sm:mb-16">
            Don't Trust, Verify
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl font-normal mb-3">Trusted Execution Environment</h3>
                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  All your messages and keys are encrypted inside of a Trusted Execution Environment so sensitive data stays completely private.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-normal mb-3">Secured with Seal</h3>
                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  Key access to unlock is secured with Seal. All proofs and code are posted to the blockchain so anyone can verify exactly what we're doing.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-normal text-gray-600">
                  See our{" "}
                  <a href="#" className="underline hover:text-gray-900">open source code</a>
                  {" "}and{" "}
                  <a href="#" className="underline hover:text-gray-900">attestations</a>
                </p>
              </div>
            </div>

            <div className="bg-gray-200 aspect-video rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
            
            <div>
              <span className="text-xs font-normal text-gray-500 uppercase tracking-wider mb-4 block">
                Case Study
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal mb-4 leading-tight">
                How LockIn Improved Nautilus's TEE Architecture
              </h2>
              <p className="text-base font-normal text-gray-600 mb-6 leading-relaxed">
                READ: How LockIn Improved Nautilus's TEE architecture to operate private and secure AI inference on Telegram data.
              </p>
              <a href="#" className="text-sm font-normal underline hover:text-gray-900">
                Read the full case study →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sales & BD Pros Love LockIn */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-center mb-3 sm:mb-4">
            Why Sales & BD Pros Love LockIn
          </h2>
          <p className="text-center text-sm font-normal text-gray-600 mb-12 sm:mb-16 px-4">
            Built for the way Web3 deals actually happen—in Telegram groups and X threads
          </p>
          
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-normal mb-2">5x</div>
              <p className="text-sm font-normal text-gray-600">More qualified leads identified</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-normal mb-2">60%</div>
              <p className="text-sm font-normal text-gray-600">Reduction in time spent prospecting</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-normal mb-2">3x</div>
              <p className="text-sm font-normal text-gray-600">Faster response times</p>
            </div>
          </div>
          
          {/* Key Benefits */}
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="text-center">
              <h3 className="text-lg font-normal mb-3">Private & Secure</h3>
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                All data encrypted in a Trusted Execution Environment. We never send your conversations to third-party AI providers.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-normal mb-3">Built for Web3</h3>
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                Designed for L1s, L2s, and B2B crypto companies where deals happen in Telegram channels and X threads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-center mb-3 sm:mb-4">
            Transparent Pricing
          </h2>
          <p className="text-center text-sm font-normal text-gray-600 mb-12 sm:mb-16">
            Choose the plan that scales with your team
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Standard Plan */}
            <div className="rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-normal mb-2">Standard Plan</h3>
              <p className="text-sm font-normal text-gray-600 mb-4">
                Perfect for individuals and small teams
              </p>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-normal">$25</span>
                <span className="text-base font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Track up to 100 conversations</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Daily AI-generated follow-up suggestions</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Standard sales pipeline tracking</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-900 text-white text-sm font-normal rounded hover:bg-gray-800 transition-colors">
                Get Started
              </button>
              <p className="text-center text-xs font-normal text-gray-500 mt-4">
                7-day free trial, no credit card required
              </p>
            </div>
            
            {/* Pro Plan */}
            <div className="rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-normal mb-2">Pro Plan</h3>
              <p className="text-sm font-normal text-gray-600 mb-4">
                For serious sales professionals
              </p>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-normal">$50</span>
                <span className="text-base font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Track up to 500 conversations</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI insights (lead intent, urgency detection)</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom sales pipeline stages</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
                <li className="text-sm font-normal text-gray-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Team collaboration features</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-900 text-white text-sm font-normal rounded hover:bg-gray-800 transition-colors">
                Get Started
              </button>
              <p className="text-center text-xs font-normal text-gray-500 mt-4">
                7-day free trial, no credit card required
              </p>
            </div>
          </div>
          
          <p className="text-center text-sm font-normal text-gray-600 mt-12 sm:mt-16">
            Need more than 500 conversations? <a href="#" className="underline hover:text-gray-900">Contact us</a> for enterprise pricing.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-center mb-12 sm:mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm sm:text-base font-normal pr-4 sm:pr-8">{faq.question}</h3>
                  <span className="text-xl sm:text-2xl font-normal text-gray-400 flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <p className="text-sm font-normal text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 sm:mb-8">
            Ready to Lock In More Deals?
          </h2>
          <p className="text-base sm:text-lg font-normal text-gray-600 mb-8 sm:mb-10 px-4">
            Join top Web3 teams turning Telegram noise into qualified pipeline
          </p>
          <button className="px-8 py-3 bg-gray-900 text-white text-sm font-normal rounded hover:bg-gray-800">
            Get Started
          </button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6">
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
              <li><a href="#" className="hover:text-gray-900">Features</a></li>
              <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
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
        
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
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
