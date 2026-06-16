export default function Rent3Content() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Rental deposits are a trust problem. Landlords hold large sums with no accountability, and
        tenants have little recourse if disputes arise. Rent3 explored whether smart contracts could
        replace the middleman — holding deposits in escrow and releasing them based on on-chain
        conditions.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        A rental marketplace prototype on a local Hardhat network. Solidity contracts handle deposit
        locking, lease period tracking, and conditional release. The Next.js frontend lets landlords
        list properties and tenants initiate lease agreements, with wallet connection via MetaMask.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Prototype completed. Archived — the regulatory complexity of crypto rental payments in
        Turkey made a production launch impractical at this stage.
      </p>
    </>
  )
}
