export default function MisyonBondContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Government bonds are one of the safest investment instruments available to Turkish retail
        investors, but the purchase flow was buried inside traditional banking interfaces designed
        in the 2010s. Misyon Bank needed a product page that explained bond mechanics simply, showed
        live yields clearly, and let customers invest in under 60 seconds.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        A single-page product UI in Next.js that fetches live bond yields from Misyon&apos;s REST
        API and displays them with real-time calculation — you enter an amount and instantly see
        projected returns at maturity. The UI is mobile-first and mirrors the simplicity of the
        misyon.kripto product I built earlier, creating a coherent product family.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Reduced average time-to-purchase from 4 minutes (old flow) to 47 seconds. Bond product
        became Misyon&apos;s highest-converting savings feature in Q4 2023.
      </p>
    </>
  )
}
