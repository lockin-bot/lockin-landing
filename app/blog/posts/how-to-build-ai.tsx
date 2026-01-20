import { PostMetadata } from './types';

export const metadata: PostMetadata = {
  slug: 'how-to-build-ai-without-giving-up-privacy',
  title: 'How to Build AI Solutions Without Giving Up Privacy',
  date: 'Jan 10, 2026',
  excerpt: 'To be useful, AI needs your private context - messages, contacts, history. In crypto, that context is economically sensitive. Here\'s how we built LockIn so even we can\'t see your data.',
  category: 'Security',
  readTime: '8 min read',
  author: {
    name: 'Andrew Jiang',
    role: 'Co-founder and CEO',
    avatar: '/features/find-strongest-path/andrew-avatar.webp',
  },
  // Optional: custom social card image
  // socialImage: '/social/how-to-build-ai.png',
};

export function Content() {
  return (
    <>
      <p>AI is becoming the interface to everything. It drafts, summarizes, searches, and decides. But the trade is rarely stated plainly: to be useful, AI needs your private context - messages, contacts, history, intent.</p>

      <p>In crypto, that context isn't just personal. It's economically sensitive. Deal flow. Alpha. Founder chats. Allocation discussions. Timing. Relationships. If it leaks, it doesn't just embarrass you - it can be exploited.</p>

      <p>Most AI products still follow the same pattern: ingest user data, decrypt it server-side, run a model, store outputs (and often inputs), and pray your access controls stay perfect forever.</p>

      <p>They won't.</p>

      <p>"Encryption-at-rest" is not a privacy strategy. It protects data while it's sitting still. The moment you use that data - embedding it, classifying it, routing it to an LLM - it becomes plaintext somewhere in memory. And plaintext is where real failures happen: a debug log, an over-broad role, a compromised host, a vendor retention setting you didn't intend.</p>

      <p>If you're building AI on sensitive data, the goal isn't better privacy promises. It's building systems where even the operator can't see the data.</p>

      <p>At LockIn, we're building sales intelligence off Telegram and X networks - surfacing warm paths and intent signals. The raw content is deeply sensitive, so we designed around a stronger requirement: privacy that can be verified, not merely asserted.</p>

      <h2>The privacy gap in AI products</h2>

      <p>AI systems don't just store data - they transform it. And transformation creates copies. A single message becomes chunks. Chunks become embeddings. Embeddings become retrieved context. Context becomes prompts. Prompts become outputs. Every step is another surface where sensitive content can accidentally end up.</p>

      <p>That's why AI privacy failures rarely look like a dramatic breach. They look like normal engineering:</p>

      <ul>
        <li>A request body captured by observability</li>
        <li>A queue that retries and persists payloads</li>
        <li>A "temporary" debug flag that ships to prod</li>
        <li>A contractor pulling samples to evaluate quality</li>
        <li>A vendor system retaining more than you assumed</li>
      </ul>

      <p>The default architecture makes plaintext easy to touch.</p>

      <p>So the real question isn't "do we encrypt?" It's: <strong>Where is plaintext allowed to exist - and who can access that place?</strong></p>

      <h2>TEEs and attestation</h2>

      <p>If you want "even the operator can't see it," you need two building blocks:</p>

      <ol>
        <li>A place where plaintext is protected from the infrastructure running it</li>
        <li>A way to prove what code is running in that place</li>
      </ol>

      <p>That's what Trusted Execution Environments (TEEs) and attestation give you.</p>

      <h3>What is a TEE?</h3>

      <p>A TEE is hardware-backed isolated compute. Think of it as a sealed room: data can enter, results can leave, but the host machine can't look inside while computation happens. No casual admin access. No "just SSH in." No scraping memory from the outside.</p>

      <p>This changes the rules. Plaintext is no longer "server default." It becomes a tightly controlled exception.</p>

      <h3>"Prove it" with attestation</h3>

      <p>A sealed room is great - unless nobody can verify what's inside.</p>

      <p>Attestation is the cryptographic proof a TEE can produce that says: this is the software I'm running. If the code changes, the measurement changes. If the measurement changes, verification fails. If verification fails, sensitive workflows don't run.</p>

      <p>That's how you replace "trust us" with "verify us."</p>

      <h3>The privacy lifecycle</h3>

      <p>Once you enforce the boundary, the lifecycle becomes simple and auditable:</p>

      <p><strong>Encrypted → Enters enclave → Decrypted (inside) → Processed → Re-encrypted → Leaves enclave</strong></p>

      <p>Plaintext exists in exactly one place: inside hardware-protected memory running verified code.</p>

      <p>This is how we built LockIn. Your messages never leave a secure enclave. Even we can't see them. And you don't have to take our word for it - you can verify it.</p>
    </>
  );
}
