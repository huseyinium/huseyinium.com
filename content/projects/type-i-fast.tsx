export default function TypeIFastContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Standard typing trainers use fixed texts. Your weakest keys never get targeted practice —
        you just repeatedly type passages that happen to use them. I wanted a trainer that adapts:
        identify where you slow down, then generate passages that force you to practice exactly
        those keys.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        A Next.js app that tracks per-key latency during typing sessions. After each session, it
        sends your slowest key combinations to the OpenAI API and generates a custom passage
        weighted toward those sequences. The next session&apos;s text is personalized to your actual
        weak spots.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        My first project using the OpenAI API. Learned prompt engineering basics and how to build
        tight feedback loops between user behavior and AI generation. Still use it occasionally.
      </p>
    </>
  )
}
