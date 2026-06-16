export default function CarrotContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Community engagement in Web3 is gamed. Bots farm airdrops, Sybils inflate metrics, and
        genuine contributors get drowned out. Carrot was our answer: a protocol that rewards real
        on-chain actions from verified-human users, making community engagement legible and
        Sybil-resistant.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Built in 36 hours at ETHGlobal Cannes 2025. Smart contracts in Solidity on Base handle the
        reward logic. World ID proofs verify human uniqueness at action submission — one person, one
        reward per action. The Next.js frontend lets project owners define custom action campaigns
        and lets users claim rewards after verification.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Won the Worldcoin Pool Prize at ETHGlobal Cannes 2025. Demo&apos;d to 50+ builders and
        protocol teams at the event. Contract deployed on Base testnet with 200+ simulated
        verifications.
      </p>
    </>
  )
}
