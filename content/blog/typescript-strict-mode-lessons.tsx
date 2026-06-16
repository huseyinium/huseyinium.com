const code = 'font-mono text-sm bg-[--color-surface] px-1.5 py-0.5 rounded text-[--color-accent]'

export default function TypescriptStrictModeLessons() {
  return (
    <>
      <p className="text-[--color-text-muted] leading-relaxed">
        Six months ago, I enabled <code className={code}>strict: true</code> across a 30,000-line
        TypeScript codebase. It was painful. It was also one of the best engineering decisions I
        have made.
      </p>

      <h2
        id="what-broke-first"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        What Broke First
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        The first <code className={code}>tsc --noEmit</code> run produced 847 errors. Most fell into
        three categories: implicit <code className={code}>any</code> on function parameters, missing
        null checks on values that came from APIs or database queries, and type assertions used as
        shortcuts around incompatible interfaces.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        The implicit <code className={code}>any</code> errors were the easiest to fix and the most
        revealing. Every one of them was a place where I had been sloppy about what data actually
        flowed through a function. Making the types explicit forced me to confront mismatches I had
        been ignoring.
      </p>

      <h2
        id="null-checks-revealed-real-bugs"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        Null Checks Revealed Real Bugs
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        The null check failures were more interesting. About a third of them were false positives —
        TypeScript being overly conservative about values I knew would always be present. But the
        other two-thirds uncovered genuine bugs: places where a missing record from the database
        would cause a runtime crash that only surfaced in edge cases.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        The discipline of handling <code className={code}>undefined</code> explicitly made me think
        harder about what &quot;no result&quot; means for each operation. In most cases, the right
        answer was not to throw but to return an empty state that the UI could gracefully display.
      </p>

      <h2
        id="what-i-will-never-give-up"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        What I Will Never Give Up
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        <code className={code}>noUncheckedIndexedAccess</code> is the one I recommend most
        aggressively. Array access in TypeScript returns <code className={code}>T</code>, not{' '}
        <code className={code}>T | undefined</code>, which is a lie — any out-of-bounds access
        returns <code className={code}>undefined</code> at runtime. This flag makes the type honest,
        which means your code is honest.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        <code className={code}>exactOptionalPropertyTypes</code> is the other one that changed how I
        model data. The difference between a property that is absent and a property explicitly set
        to <code className={code}>undefined</code> matters in practice, and this flag makes you deal
        with that distinction.
      </p>

      <h2
        id="the-maintenance-payoff"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        The Maintenance Payoff
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        The upfront cost was about two weeks of focused refactoring. Six months later, I have caught
        zero runtime type errors in production. Before strict mode, we were averaging two or three
        per month — all the annoying kind that only appear with specific data shapes.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        Strict mode is not about satisfying a type checker. It is about writing code that is honest
        about what it does.
      </p>
    </>
  )
}
