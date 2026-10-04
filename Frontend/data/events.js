export const hackathonCfg = {
  slug: "hackathon",
  name: "Hackathon",
  tag: "DOT DevOps Team // Flagship Build Event",
  desc: "Build. Collaborate. Innovate. A high-intensity, time-boxed build sprint where developer teams design, code and ship a working product from scratch.",
  format: "Team-Based",
  teamSize: "Up to 4 members",
  mode: "On-Campus",
  status: "Registrations Open",
  registerHref: "/events/hackathon/register",
  ctaVerb: "Build",
  about:
    "The Hackathon is DOT DevOps Team's flagship build event — a focused sprint that brings together developers, designers and problem-solvers to build a working solution against the clock. Expect mentor check-ins, technical challenges and a final showcase in front of judges.",
  formatSectionTitle: "Event Format",
  formatCards: [
    { t: "Team Formation", d: "Form or join a team of up to 4 before the event begins." },
    { t: "Build Sprint", d: "A continuous build window to design, develop and test your solution." },
    { t: "Final Showcase", d: "Present your build to judges and the community for evaluation." },
  ],
  rules: [
    "All code must be written during the official hackathon window.",
    "Teams may consist of 1 to 4 members from any eligible institution.",
    "Use of open-source libraries and public APIs is permitted.",
    "Plagiarism or pre-built solutions will lead to disqualification.",
    "Respect the code of conduct — harassment of any kind is not tolerated.",
  ],
  timeline: [
    { time: "Day 00", title: "Registrations Open", desc: "Team registration window opens online." },
    { time: "Day 01", title: "Check-in & Kickoff", desc: "Team check-in, problem statement reveal and opening ceremony." },
    { time: "Build Window", title: "Hacking Begins", desc: "Teams design, build and iterate with mentor support available." },
    { time: "Final Day", title: "Submissions & Judging", desc: "Project submissions close, followed by judging and final showcase." },
  ],
  eligibility: [
    "Open to currently enrolled college / university students.",
    "Both individual registration and team registration are accepted.",
    "Participants should carry a valid college ID for verification.",
  ],
  faq: [
    { q: "Do I need a team to register?", a: "No — you can register solo and form a team during check-in, or register with your team already formed." },
    { q: "Is there a participation fee?", a: "Fee details will be announced closer to the event. Check this page for updates." },
    { q: "What should I bring?", a: "Your laptop, charger, college ID, and any hardware your project may need." },
  ],
};

export const gamethonCfg = {
  slug: "gamethon",
  name: "Gamethon",
  tag: "DOT DevOps Team // Flagship Play Event",
  desc: "Create. Play. Compete. A competitive event for gamers and game-builders — from esports showdowns to game-dev challenges.",
  format: "Solo / Team",
  teamSize: "Format-dependent",
  mode: "On-Campus",
  status: "Registrations Open",
  registerHref: "/events/gamethon/register",
  ctaVerb: "Compete",
  about:
    "Gamethon is DOT DevOps Team's flagship play event, bringing together the college's gaming and game-development community. Whether you're competing in tournament brackets or building a game against the clock, Gamethon is built for creators who play to win.",
  formatSectionTitle: "Game Format",
  formatCards: [
    { t: "Registration", d: "Sign up solo or with your squad ahead of the event." },
    { t: "Bracket Play", d: "Compete through tournament rounds or a build challenge track." },
    { t: "Finals", d: "Top performers face off in the final round for the top spot." },
  ],
  rules: [
    "Participants must check in before their scheduled slot.",
    "Fair play only — cheats, exploits or smurfing lead to disqualification.",
    "Game titles and formats will be confirmed closer to the event date.",
    "Respect opponents and organizers — the code of conduct applies to all.",
  ],
  timeline: [
    { time: "Day 00", title: "Registrations Open", desc: "Participant / team registration window opens online." },
    { time: "Day 01", title: "Check-in & Briefing", desc: "Participant check-in and rules briefing before play begins." },
    { time: "Bracket Rounds", title: "Competition Begins", desc: "Matches proceed through the bracket / challenge format." },
    { time: "Final Day", title: "Finals & Results", desc: "Top competitors face off, followed by results and closing." },
  ],
  eligibility: [
    "Open to currently enrolled college / university students.",
    "Individual and team-based participation formats available.",
    "Participants should carry a valid college ID for verification.",
  ],
  faq: [
    { q: "Which games will be featured?", a: "Game titles will be announced closer to the event — check back on this page." },
    { q: "Can I participate solo?", a: "Yes, both solo and team formats are supported depending on the game track." },
    { q: "Is there a participation fee?", a: "Fee details will be announced closer to the event." },
  ],
};

export const eventsBySlug = {
  hackathon: hackathonCfg,
  gamethon: gamethonCfg,
};
