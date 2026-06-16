export default function VerifyWorldContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Web3 applications have no reliable way to enforce &quot;one account per human&quot; without
        relying on centralized identity providers. VerifyWorld was built to show that on-chain proof
        of personhood — using World ID&apos;s ZK proofs — could gate access to any dApp with zero
        personal data exposed.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        VerifyWorld is an access-control primitive. Any dApp can integrate the VerifyWorld smart
        contract to require a valid World ID proof before allowing an action — minting, voting,
        claiming, or anything else. The proof verification happens on-chain in Solidity. Metadata is
        stored on IPFS. The Next.js demo shows the full flow: scan World ID → generate ZK proof →
        submit → access granted.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Won the Worldcoin Pool Prize at ETHGlobal Istanbul 2023. This was my first ETHGlobal win and
        the project that got me deep into ZK proofs and the Worldcoin ecosystem — which directly led
        to Carrot two years later.
      </p>
    </>
  )
}
