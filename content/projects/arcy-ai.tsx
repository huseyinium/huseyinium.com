export default function ArcyAiContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Hiring is broken for early-stage startups. Founders spend 20+ hours a week on recruiting
        tasks that don&apos;t require human judgment — sourcing LinkedIn profiles, writing
        first-touch outreach, tracking follow-ups. Every hour spent there is an hour not spent
        building. We needed a way to run a high-quality candidate pipeline at near-zero marginal
        cost.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        ARCY AI is an end-to-end recruitment agent. You drop in a job spec, and the system sources
        candidates from LinkedIn and GitHub, scores them against the role, writes personalized
        outreach sequences, and manages follow-ups autonomously. The agent layer runs on LangChain
        with OpenAI function calling. The backend is NestJS with a PostgreSQL database for candidate
        state tracking. The frontend is Next.js with a real-time dashboard showing pipeline health.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        The hardest technical problem was making outreach feel human. I built a two-stage generation
        pipeline: first extract the candidate&apos;s &quot;signal&quot; (a recent post, an
        open-source repo, a job transition), then generate outreach grounded in that signal. Open
        rates jumped from 12% on generic templates to 38%.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Closed 10 paying clients in the first 3 months after launch. Current monthly active usage
        across 4 enterprise teams with 200+ candidates processed per week. ARCY AI is now my primary
        company — we are actively fundraising.
      </p>
    </>
  )
}
