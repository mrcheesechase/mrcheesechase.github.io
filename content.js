// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
//  Anything marked TODO is placeholder text waiting for real details.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  name: "Your Name",                                   // TODO
  handle: "yourhandle",                                // TODO (shown in the prompt: yourhandle@portfolio)
  tagline: "Student · Builder · Cybersecurity & AI",   // TODO
  location: "City, Country",                           // TODO
  email: "you@example.com",                            // TODO
  roles: ["co-founder", "security engineer", "backend developer", "hackathon builder"], // typed in the hero
  cv: "",                                              // e.g. "cv.pdf" — leave empty to hide the button

  about: [
    // TODO: 2–3 short paragraphs. <a>, <strong> allowed.
    "I'm a student and builder working where <strong>cybersecurity meets AI</strong>. I co-founded a two-person startup building security tooling, and I spend most of my time shipping backends, gateways and infrastructure.",
    "This is a placeholder bio — swap it for the real story: what you study, where, what you're building now, and what you want to do next.",
  ],

  links: [
    { label: "GitHub",   url: "https://github.com/" },        // TODO
    { label: "LinkedIn", url: "https://linkedin.com/in/" },   // TODO
    { label: "Email",    url: "mailto:you@example.com" },     // TODO
  ],

  // Projects. `featured: true` puts it on the home page too.
  // image is optional (path or URL); without one a generated code-style banner is shown.
  projects: [
    {
      title: "Cyber Supplies",
      year: "2026",
      status: "building",
      featured: true,
      summary: "Cybersecurity + AI startup. API gateway, storage service, crawler service and CLI running on Google Cloud.", // TODO
      tags: ["Cloud Run", "PostgreSQL", "TypeScript", "Security"],
      url: "",
      features: ["Token-authenticated API gateway", "Notes & storage services", "Command-line client"], // TODO
    },
    {
      title: "OutSpoken",
      year: "2026",
      status: "hackathon",
      featured: true,
      summary: "Built at HackUCD. TODO: one-line description of what it does and how it placed.", // TODO
      tags: ["Hackathon", "Backend"],
      url: "",
      features: [],
    },
    {
      title: "Project three",
      year: "20XX",
      status: "shipped",
      featured: true,
      summary: "TODO: placeholder project — replace or delete.",
      tags: ["Tag"],
      url: "",
      features: [],
    },
  ],

  // Work, leadership, roles. Newest first.
  experience: [
    { role: "Co-Founder", org: "Cyber Supplies", period: "2026 — Present", url: "", detail: "TODO: what you own — e.g. backend, infrastructure, security." },
    { role: "Role title",  org: "Organisation",  period: "20XX — 20XX",     url: "", detail: "TODO" },
  ],

  education: [
    { role: "Degree / Programme", org: "University", period: "20XX — 20XX", url: "", detail: "TODO" },
  ],

  awards: [
    // { title: "Winner — Some Hackathon", year: "2026", detail: "optional" },
    { title: "TODO: first award or hackathon result", year: "20XX", detail: "" },
  ],

  // Things you recommend: books, tools, courses, blogs.
  resources: [
    { category: "Security", items: [
      { title: "TODO resource", url: "", note: "why you like it" },
    ]},
    { category: "Tools", items: [
      { title: "TODO resource", url: "", note: "" },
    ]},
  ],
};
