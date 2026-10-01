import { Poppins } from "next/font/google";
import { Eye, Target, Handshake, Scale, Leaf, Clock, Users, ShieldCheck, Sprout, Warehouse } from "lucide-react";

// Font loaded at module scope so layout.js never needs to change.
const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Theme tokens: green, black, white, beige, yellow
const GREEN = "#1f5a2e";
const BLACK = "#121410";
const BEIGE = "#f3ecd9";
const YELLOW = "#f2b705";

const pattern = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><g fill='none' stroke='#1f5a2e' stroke-opacity='.08' stroke-width='1.5' stroke-linecap='round'><path d='M20 70V40M20 52c-8-2-9-9-9-9 8 0 9 7 9 9zm0-8c8-2 9-9 9-9-8 0-9 7-9 9z'/><path d='M65 40V10M65 22c-8-2-9-9-9-9 8 0 9 7 9 9zm0-8c8-2 9-9 9-9-8 0-9 7-9 9z'/></g></svg>`
)}")`;

const Button = ({ href = "#", children, variant = "green" }) => (
  <a
    href={href}
    className={`inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      variant === "green"
        ? "bg-[#1f5a2e] text-white hover:bg-[#174523] focus-visible:outline-[#1f5a2e]"
        : "bg-[#f2b705] text-[#121410] hover:bg-[#dca604] focus-visible:outline-[#f2b705]"
    }`}
  >
    {children}
  </a>
);

// Arched illustration cards standing in for photos (no remote images needed)
const Arch = ({ tall, bg, children }) => (
  <div
    className={`flex items-end justify-center overflow-hidden rounded-t-[999px] rounded-b-3xl ${tall ? "h-72 w-36 md:h-80 md:w-44" : "h-60 w-32 md:h-64 md:w-40"}`}
    style={{ background: bg }}
    aria-hidden="true"
  >
    {children}
  </div>
);

const values = [
  [Handshake, "Fairness", "Every farmer gets the same chance at a slot, whatever the size of their harvest."],
  [Eye, "Transparency", "Queue positions, weights, grades and payments are visible to the people they concern."],
  [Clock, "Respect for time", "A farmer's day belongs to the farm, not to a line at the gate."],
  [ShieldCheck, "Trust", "Role-based access, activity logs and secure payment records protect every transaction."],
];

const serves = [
  [Sprout, "Farmers", "Book a slot, receive a digital token, follow the queue and see the final weight and payment."],
  [Warehouse, "Procurement centers", "Plan daily capacity, run weighing and unloading smoothly, and issue clear receipts."],
  [Scale, "Quality inspectors", "Record grade, moisture and remarks in seconds, with accept or reject decisions on file."],
  [Users, "Management", "Watch queues live and learn from waiting-time and crop-intake reports."],
];

const timeline = [
  ["The problem", "Farmers arrived by truck and tractor and waited for hours with no idea of their turn, while centers struggled with crowding and paper records."],
  ["The idea", "Let farmers book a slot before they leave home, and let each center accept only what it can actually weigh, inspect and unload."],
  ["The system", "One connected flow from registration to payment, with a live queue, quality records and a dashboard for management."],
];

export default function AboutUs({ ctaHref = "#", secondaryHref = "#" }) {
  return (
    <main className={`${font.className} bg-white text-[#121410] antialiased`}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#121410]">
        <svg className="absolute inset-0 -z-10 h-full w-full opacity-40" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="au-g" x1="0" x2="1"><stop offset="0" stopColor="#1f5a2e" /><stop offset="1" stopColor="#0c1f10" /></linearGradient>
          </defs>
          <rect width="800" height="300" fill="url(#au-g)" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <path key={i} d={`M${40 + i * 65} 300V170M${40 + i * 65} 200c-14-4-16-16-16-16 14 0 16 12 16 16zm0-14c14-4 16-16 16-16-14 0-16 12-16 16z`} stroke="#f2b705" strokeOpacity=".5" strokeWidth="3" fill="none" strokeLinecap="round" />
          ))}
        </svg>
        <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Empowering Farmers.
            <br />
            <span className="text-[#f2b705]">Streamlining Procurement.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-white/80 md:text-base">
            We turn long waits at the gate into booked slots, clear queues and trusted records.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-[#f3ecd9] px-5 py-16 md:py-20" style={{ backgroundImage: pattern }}>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="inline-block border-b-2 border-[#1f5a2e] pb-1 text-2xl font-semibold md:text-3xl">Our Story</h2>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <blockquote className="mx-auto max-w-md text-left text-sm leading-relaxed md:text-base">
              <p>
                "Born out of a simple frustration: good farmers losing good days to long queues. The Agricultural Procurement and Digital Queue System connects farmers with procurement centers through fair, transparent and well-planned deliveries. We believe a harvest should move from field to storage with dignity, not delay."
              </p>
              <div className="mt-6"><Button href={ctaHref}>See how it works</Button></div>
            </blockquote>
            <div className="flex items-end justify-center gap-3">
              <Arch bg="linear-gradient(#f2b705,#e0a200)">
                <svg viewBox="0 0 100 120" className="h-4/5 w-full"><circle cx="50" cy="30" r="14" fill="#fff" opacity=".9" /><path d="M20 120c0-30 12-48 30-48s30 18 30 48z" fill="#1f5a2e" /></svg>
              </Arch>
              <Arch tall bg="linear-gradient(#1f5a2e,#0f3a1c)">
                <svg viewBox="0 0 100 160" className="h-full w-full"><circle cx="50" cy="40" r="10" fill="#f2b705" /><path d="M0 160V110c20-20 40-20 50-10s30 10 50-10v70z" fill="#f2b705" opacity=".35" /><path d="M20 160V90M20 110c-10-3-12-12-12-12 10 0 12 9 12 12zm0-12c10-3 12-12 12-12-10 0-12 9-12 12zM50 160V80M50 100c-10-3-12-12-12-12 10 0 12 9 12 12zm0-12c10-3 12-12 12-12-10 0-12 9-12 12zM80 160V90M80 110c-10-3-12-12-12-12 10 0 12 9 12 12zm0-12c10-3 12-12 12-12-10 0-12 9-12 12z" stroke="#f2b705" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
              </Arch>
              <Arch bg="linear-gradient(#121410,#2b2f26)">
                <svg viewBox="0 0 100 120" className="h-4/5 w-full"><rect x="15" y="60" width="50" height="28" rx="4" fill="#f3ecd9" /><rect x="65" y="68" width="22" height="20" rx="3" fill="#f2b705" /><circle cx="32" cy="92" r="8" fill="#1f5a2e" /><circle cx="76" cy="92" r="8" fill="#1f5a2e" /></svg>
              </Arch>
            </div>
          </div>
        </div>
      </section>

      {/* IDENTITY, VISION AND VALUES */}
      <section className="px-5 py-16 md:py-20" style={{ background: BEIGE, backgroundImage: pattern }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold text-[#1f5a2e]">About us</p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">Our Identity, Vision and Values</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-[#1f5a2e] p-8 text-white">
              <Target className="h-7 w-7 text-[#f2b705]" />
              <h3 className="mt-4 text-xl font-semibold">Our mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">To give every farmer a predictable, respectful delivery experience, and every procurement center the tools to receive crops efficiently, accurately and fairly.</p>
            </div>
            <div className="rounded-3xl bg-[#121410] p-8 text-white">
              <Eye className="h-7 w-7 text-[#f2b705]" />
              <h3 className="mt-4 text-xl font-semibold">Our vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">A farm-to-center supply chain where nobody waits without knowing why, every kilogram is recorded, and every payment can be traced.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([Icon, t, d]) => (
              <div key={t} className="rounded-3xl bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2b705]"><Icon className="h-5 w-5 text-[#121410]" /></span>
                <h3 className="mt-4 text-base font-semibold">{t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#121410]/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE GOT HERE */}
      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Why we built it</h2>
          <ol className="mt-10 space-y-6 border-l-2 border-[#f2b705] pl-6">
            {timeline.map(([t, d]) => (
              <li key={t} className="relative">
                <span className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full bg-[#1f5a2e] ring-4 ring-white" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-[#1f5a2e]">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#121410]/80">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-[#121410] px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Who we serve</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serves.map(([Icon, t, d]) => (
              <div key={t} className="rounded-3xl border border-white/15 p-6">
                <Icon className="h-7 w-7 text-[#f2b705]" />
                <h3 className="mt-4 text-base font-semibold">{t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT + CTA */}
      <section className="px-5 py-16 text-center md:py-20" style={{ background: BEIGE, backgroundImage: pattern }}>
        <Leaf className="mx-auto h-8 w-8 text-[#1f5a2e]" />
        <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-bold md:text-4xl">Better harvest days start with a booked slot.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#121410]/75">
          Join farmers and procurement centers who are replacing waiting with planning.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href={ctaHref}>Book a slot</Button>
          <Button href={secondaryHref} variant="yellow">Contact us</Button>
        </div>
      </section>
    </main>
  );
}
