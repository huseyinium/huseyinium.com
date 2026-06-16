export default function InvestBuddyContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Turkish retail investors in 2022–2023 were navigating extreme inflation and volatile markets
        with no accessible tools to track their portfolio across stocks, gold, and crypto in one
        place. Most existing apps were either too complex or didn&apos;t support Turkish assets.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        A React Native mobile app with a FastAPI backend. Users link their brokerage accounts or
        manually enter positions. The app aggregates portfolio value in both TRY and USD, shows
        daily P&amp;L, and surfaces simple insights like sector concentration and volatility
        exposure. PostgreSQL stores historical snapshots for trend charts.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Built as an early personal project. Learned mobile development fundamentals and API design
        patterns that I carried into later work on Campus Arc.
      </p>
    </>
  )
}
