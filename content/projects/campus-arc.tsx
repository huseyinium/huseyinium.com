export default function CampusArcContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        University campuses are fragmented. Events are announced on WhatsApp groups. Club
        information lives in outdated PDFs. Internship postings go to students a week after they
        close. First-year students especially have no way to discover what&apos;s happening around
        them — and end up isolated in a place designed for connection.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Campus Arc is a mobile super-app that centralizes campus life: events, clubs, internship
        boards, and peer connections in a single feed. Built with React Native and Expo for
        cross-platform coverage from day one. The backend runs on NestJS with PostgreSQL, with a
        notification system that pushes relevant events based on the student&apos;s declared
        interests and faculty.
      </p>
      <p className="text-[--color-text-muted] leading-relaxed">
        The key design decision was the &quot;Arc Score&quot; — a reputation system for clubs and
        event organizers that surfaces high-quality content and filters out noise. This made the
        feed feel curated without requiring manual moderation.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Piloted at METU with 400+ active students in the first semester. Onboarded 30 clubs. The
        data showed that students who used Campus Arc attended 2.4× more events in their first month
        than the control group. Paused development to focus on ARCY AI, but the codebase is open for
        contributors.
      </p>
    </>
  )
}
