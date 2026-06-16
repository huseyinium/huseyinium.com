export default function OdtuBdaysContent() {
  return (
    <>
      <h2 id="problem" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Problem
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Organizing group birthday celebrations at university is messy — coordinating schedules,
        collecting contributions, and buying gifts across a large friend group involves too many
        WhatsApp messages and Venmo requests.
      </p>

      <h2 id="what-i-built" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        What I Built
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        A lightweight React app backed by Firebase Realtime Database. Students create birthday
        events, invite friends, set a gift fund target, and track contributions in real time.
        Firebase Authentication handles login with university email.
      </p>

      <h2 id="outcome" className="font-cal text-2xl text-[--color-text-primary] mt-12 mb-4">
        Outcome
      </h2>
      <p className="text-[--color-text-muted] leading-relaxed">
        Used within the METU community for the 2024 spring semester. Served as a low-stakes project
        to sharpen my Firebase and real-time state management skills.
      </p>
    </>
  )
}
