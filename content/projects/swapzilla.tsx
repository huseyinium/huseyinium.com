export default function SwapZillaContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Swapping tokens across chains is painful. Users manually compare routes across bridges and
        DEXs, often ending up with worse execution than if they&apos;d done a single-chain swap.
        There was no single interface that found the truly optimal path across chains.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        SwapZilla aggregates liquidity across chains using intent-based routing. You specify what
        you want to end up with; the protocol finds the best path across 1inch routes and LayerZero
        bridge hops to fulfill the intent. Solidity contracts handle escrow and settlement. The
        React frontend abstracts all the complexity into a single input field and a countdown to
        execution.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Won the 1inch Pool Prize at ETHGlobal Brussels 2024. Built and shipped in 24 hours with a
        team of three.
      </p>
    </>
  )
}
