export default function BuildingArcyAi() {
  return (
    <>
      <p className="text-[--color-text-muted] leading-relaxed">
        Building ARCY AI has been the most demanding and rewarding year of my professional life. We
        went from a napkin sketch to a product with paying clients, and I want to share the lessons
        that shaped how I think about building AI products.
      </p>

      <h2
        id="the-problem-is-never-the-technology"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        The Problem Is Never the Technology
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        When I started, I thought the hard part would be the AI pipeline — the embeddings, the
        matching algorithms, the ranking models. I was wrong. The hard part was understanding
        recruiter workflows well enough to know which problem was actually worth solving.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        We spent the first two months talking to recruiters before writing a single line of product
        code. That time was not wasted. It revealed that the real pain was not candidate sourcing —
        LinkedIn has that covered — but candidate evaluation at scale. Reading 300 CVs for a
        mid-level engineering role was the bottleneck nobody had solved well.
      </p>

      <h2
        id="distribution-eats-product"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        Distribution Eats Product
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        The best AI feature means nothing if the person who needs it does not know it exists. We
        learned this the hard way after shipping a genuinely impressive skill-matching engine that
        sat unused for six weeks because we had not built any habit around it.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        Our turning point was embedding the tool into the daily ritual recruiters already had: the
        morning inbox review. Instead of asking them to change behaviour, we met them where they
        were.
      </p>

      <h2
        id="accuracy-matters-more-than-comprehensiveness"
        className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4"
      >
        Accuracy Matters More Than Comprehensiveness
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Early on, we optimised for recall — show every potentially relevant candidate. Users hated
        it. The cognitive load of reviewing a long list of mediocre matches was worse than the
        original problem.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        We rebuilt around precision. Fewer results, higher confidence, clear reasoning for each
        match. Completion rates tripled. The lesson: in AI-assisted work, the model&apos;s
        confidence calibration is as important as its raw accuracy.
      </p>

      <h2 id="key-takeaways" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Key Takeaways
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Talking to users beats building features, every time. Distribution is a product problem, not
        a marketing afterthought. In AI tools, less output with higher confidence wins over
        comprehensive output with noise.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        I am still learning. Every sprint surfaces something that contradicts what I thought I knew.
        That is probably what makes it interesting.
      </p>
    </>
  )
}
