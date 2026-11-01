// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
//  Anything marked TODO is placeholder text waiting for real details.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  name: "Adam Omer",
  handle: "adam",                                      // shown in the prompt: adam@portfolio
  tagline: "CS @ UCD · Startups · AI",
  location: "Dublin, Ireland",
  email: "adam.omer0403@gmail.com",
  roles: ["computer science student", "startup co-founder", "ai builder", "automotive engineering nerd"], // typed in the hero
  photo: "images/pfp/portrait.jpg",                             // shown in the About section
  cv: "cv.pdf",                                        // rebuild with: python3 scripts/build_cv.py

  about: [
    // <a>, <strong> allowed.
    "I'm Adam, a 21-year-old <strong>Computer Science</strong> student at <a href=\"https://www.ucd.ie/\" target=\"_blank\" rel=\"noopener\">University College Dublin</a> (class of 2029), based in Dublin, Ireland.",
    "I'm into <strong>startups, tech, AI and automotive engineering</strong>. Most of my time goes into keeping up with the latest engineering news and trends, and turning what I learn into projects — from an AI speaking coach built at a hackathon to repairing and reselling cars.",
    "Right now I'm co-founder of <strong>Cyber Supplies</strong>, a two-person startup working where cybersecurity meets AI, where I build backends, gateways and cloud infrastructure.",
  ],

  links: [
    { label: "GitHub",   url: "https://github.com/mrcheesechase" },
    { label: "LinkedIn", url: "https://linkedin.com/in/adam-omer-0aab76373" },
    { label: "Email",    url: "mailto:adam.omer0403@gmail.com" },
  ],

  // Projects. Each gets its own page at #/projects/<title-as-slug>.
  // `featured: true` puts it on the home page too.
  // image: card thumbnail (optional; without one a code-style banner is shown).
  // art: "auto", "nutrition", "outspoken" or "boltun" swaps the code banner for a themed one.
  // accent: brand colour for the card + project page. logo: shown above the title on the project page.
  // gallery: extra images shown on the project page. details: paragraphs for the project page (<a>, <strong> allowed).
  projects: [
    {
      title: "Cyber Supplies",
      role: "Co-Founder · Backend & Infrastructure",
      details: [
        "Cyber Supplies is a two-person student startup working where <strong>cybersecurity meets AI</strong>.",
        "I build and run much of the backend: a token-authenticated API gateway, storage and notes services, a web-crawling service and a command-line client, all deployed on Google Cloud (Cloud Run + Cloud SQL Postgres).",
        // TODO: add what the product does for users, who it's for, and where it's at (users, funding, milestones).
      ],
      gallery: [],
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
      art: "outspoken",
      accent: "#10B981",            // brand emerald
      logo: "images/projects/outspoken-logo.png",
      logoLight: true,              // logo is on a light background
      gallery: ["images/projects/outspoken-home.jpg", "images/projects/outspoken-feedback.jpg"],
      year: "2026",
      status: "hackathon",
      featured: true,
      summary: "AI speaking coach for creators who talk to camera. Record a take on a prompt and get feedback on the exact moments you rambled, repeated yourself or said \"um\" — with what to say instead. Built at HackUCD 2026.",
      role: "Backend Lead · Team of 4",
      details: [
        "<strong>OutSpoken</strong> helps creators <em>sound sharper in their next video</em>. You pick a prompt, talk about it for 30 seconds to two minutes — no script, no second takes — and an AI coach reviews the recording.",
        "The report gives a word-for-word transcript with filler words, long pauses and coaching notes highlighted. Tap any highlight to hear that moment; each note quotes what you said, explains the issue and suggests what to say instead. It also checks whether you actually answered the prompt and stayed on topic, and tracks your pace and filler-word count.",
        "It ships as a freemium product: one free analysis a day with no sign-up, and a Pro plan with a 7-day free trial through Stripe. New prompts can be added on the backend and show up on the site within a minute, with no frontend change.",
        "Built in a team of four at <strong>HackUCD</strong>. I owned the backend architecture: the API layer connecting the frontend to the <strong>OpenRouter API</strong> for AI analysis and the <strong>Stripe API</strong> for payments, deployed on Google Cloud Run — prioritising what would ship a working product before the deadline and adapting the plan as problems came up.", // TODO: add your result at HackUCD
      ],
      tags: ["Speech AI", "OpenRouter", "Stripe", "Cloud Run", "Hackathon"],
      url: "https://hackucd-backend-177345674775.europe-west1.run.app/",
      urlLabel: "live demo",
      features: ["Timestamped coaching notes with \"try instead\" rewrites", "Filler-word, pause and pace detection", "Checks you answered the prompt and stayed on it", "Freemium with Stripe-powered Pro trial"],
    },
    {
      title: "Boltun",
      art: "boltun",
      accent: "#91FF4A",            // brand lime
      logo: "images/projects/boltun-logo.png",
      gallery: ["images/projects/boltun-home.jpg"],
      role: "Co-Developer · Marketer · Product Tester",
      details: [
        "<a href=\"https://boltun.io/\" target=\"_blank\" rel=\"noopener\">Boltun</a> is an autonomous outbound calling platform: <em>cold calls that improve themselves</em>. It designs a call script, dials a contact list, and rewrites the script from real call transcripts.",
        "At its core is <strong>Robert</strong>, an AI prompt designer that keeps long-term memory of campaigns, preferences and objections. After a set number of calls Boltun reviews the transcripts and refines the script, with an optional approval gate before changes go live.",
        "I worked on Boltun as a co-developer, put the product through extensive testing, and handled marketing.",
      ],
      year: "2025",
      status: "live",
      featured: true,
      summary: "Autonomous outbound calling: AI voice agents that design a cold-call script, dial a contact list, and rewrite the script from real call transcripts. Co-developer, marketer and product tester.",
      tags: ["Voice AI", "LLMs", "Sales", "Marketing"],
      url: "https://boltun.io/",
      features: ["AI prompt designer with long-term campaign memory", "Script auto-refinement from call transcripts", "Four voice engines, timezone-aware concurrent dialing"],
    },
    {
      title: "Vehicle Repair & Resale",
      role: "Founder",
      details: [
        "I ran my own small business in the used-car market: buying vehicles, bringing them back to standard — mechanical repairs, bodywork prep and respraying — and reselling them for a profit.",
        "Cars that weren't worth fixing got parted out — I dismantled them and sold the working parts on. It taught me hands-on mechanical diagnosis and repair, how to value stock, negotiate, and run a business end to end.",
        // TODO: add numbers (cars flipped, parts sold) and notable builds or makes.
      ],
      year: "2024 — 2025",
      status: "business",
      featured: true,
      summary: "Ran my own small business buying, repairing, respraying and reselling vehicles, and parting out cars to sell their working parts.",
      tags: ["Automotive", "Mechanical repair", "Sales", "Small business"],
      url: "",
      image: "images/projects/cars/collage.jpg",
      gallery: [
        { src: "images/projects/cars/bmw-front.jpg",     caption: "BMW 3 Series — repaired and ready for resale" },
        { src: "images/projects/cars/bmw-silver.jpg",    caption: "3 Series M Sport, back on the road" },
        { src: "images/projects/cars/bmw-rear.jpg",      caption: "320d, cleaned up and listed" },
        { src: "images/projects/cars/strip-front.jpg",   caption: "On the lift — front end stripped for parts" },
        { src: "images/projects/cars/engine-out.jpg",    caption: "Engine coming out on the crane" },
        { src: "images/projects/cars/bodywork-prep.jpg", caption: "Bodywork — filler and prep before paint" },
        { src: "images/projects/cars/paint-red.jpg",     caption: "Spray work — shell painted red" },
        { src: "images/projects/cars/turbo.jpg",         caption: "Turbo and manifold, pulled for resale" },
        { src: "images/projects/cars/injectors.jpg",     caption: "Diesel injectors, pulled for resale" },
      ],
      features: ["Sourced and valued used vehicles", "Diagnosed and repaired them for resale", "Bodywork prep and spray painting", "Dismantled non-runners and sold working parts"],
    },
    {
      title: "Nutrition & Weight Tracker Bot",
      art: "nutrition",                  // themed card banner (used when there's no image)
      year: "2026",
      status: "side project",
      summary: "AI-powered weight-loss and nutrition coach on Telegram. Log meals in plain English and Claude breaks them down into calories, macros, vitamins and minerals, with personalised targets and progress charts.",
      role: "Solo developer",
      details: [
        "A Telegram bot that works as a personal weight-loss and nutrition coach. A guided onboarding flow collects your weight, height, age, activity level and goal, then calculates your <strong>BMR</strong> (Mifflin–St Jeor), <strong>TDEE</strong>, a daily calorie target to hit the goal on time, macro targets and your recommended daily intake of micronutrients.",
        "To log a meal you just describe it — <em>\"2 eggs and a slice of toast\"</em>. The bot sends it to the <strong>Claude API</strong>, which returns a full nutritional profile as structured JSON based on standard food-composition databases: calories, macros, fats broken down by type, vitamins, minerals and amino acids.",
        "Everything is stored in SQLite and turned into charts with matplotlib: weight progress against your goal, daily calorie history, a macro summary, and vitamin and mineral intake compared to your RDA. You can also upload progress photos and check your profile and goals at any time from a button menu.",
      ],
      tags: ["Python", "Claude API", "Telegram Bot API", "SQLite", "matplotlib"],
      url: "https://github.com/mrcheesechase/Nutri-tracker",
      urlLabel: "on GitHub",
      features: ["Plain-English meal logging with AI nutrient analysis", "Personalised calorie, macro and RDA targets", "Weight, calorie and micronutrient charts", "Progress photos and guided onboarding"],
      gallery: [],   // TODO: screenshots of the bot chats/charts would look great here
    },
  ],

  // Work, leadership, roles. Newest first.
  experience: [
    { role: "Co-Founder", org: "Cyber Supplies", period: "2026 — Present", url: "", detail: "Building backends, gateways and cloud infrastructure for a two-person cybersecurity + AI startup." },
    { role: "Hackathon Participant", org: "Stripe Hackathon", period: "Sep 2026", url: "", detail: "" }, // TODO: what you built + result
    { role: "Outbound Sales Advisor", org: "Forward Emphasis International", period: "Jun — Jul 2026", url: "", detail: "Converted free-trial members to paid subscriptions over high-volume outbound calls, consistently exceeding monthly conversion targets." },
    { role: "Co-Developer & Marketer", org: "Boltun", period: "2025", url: "https://boltun.io/", detail: "Helped build and test an autonomous AI cold-calling product, and worked on its marketing." },
    { role: "Customer Service Representative", org: "Forward Emphasis", period: "Sep 2024 — Aug 2025", url: "", detail: "Handled a high volume of motor-insurance queries under tight deadlines, gathering and cross-checking details from policyholders and third parties." },
    { role: "Founder", org: "Vehicle Repair & Resale", period: "2024 — 2025", url: "", detail: "Bought, repaired and resold vehicles, and parted out cars to sell their working parts." },
    { role: "Work Experience", org: "Douglass Garage & Welditz", period: "Transition Year", url: "", detail: "Vehicle maintenance, repairs and diagnostics at a garage, and operating industrial machinery on a factory floor." },
  ],

  education: [
    { role: "BSc Computer Science", org: "University College Dublin", period: "Sep 2025 — Jun 2029", url: "https://www.ucd.ie/", detail: "Programming (C, Python, Java, Scheme), algorithms, databases & SQL, computer networking, computer architecture, digital systems, formal foundations and matrix algebra." },
    { role: "Leaving Certificate", org: "Carndonagh Community School, Co. Donegal", period: "2021 — 2024", url: "", detail: "" },
  ],

  // Skills section (home + experience pages) is hidden while this is empty.
  // Example: { group: "Languages", items: ["Python", "C"] },
  skills: [],

  // Awards section (home + experience pages) is hidden while this is empty.
  awards: [
    // { title: "Winner — Some Hackathon", year: "2026", detail: "optional" },
  ],

  // Things you recommend: books, tools, courses, blogs.
  // The Resources page and nav link are hidden while this is empty. Example:
  // { category: "Security", items: [ { title: "Some book", url: "https://…", note: "why you like it" } ] },
  resources: [],
};

// Hidden for now (source code lost) — paste back into `projects` to restore.
//     {
//       title: "Mouse Maze Runner",
//       year: "High school",
//       status: "published",
//       summary: "Mobile maze-runner game, co-developed in Unity/C# and published on the Google Play Store.",
//       role: "Co-developer",
//       details: [
//         "A mobile maze-runner game I co-developed in <strong>Unity with C#</strong> and published on the <strong>Google Play Store</strong>.",
//         "It features in-app microtransactions, animated sprites, background music, countdown timers and a global leaderboard. We managed the full release cycle ourselves, from development through Play Store submission to live deployment.",
//       ],
//       tags: ["Unity", "C#", "Mobile", "Google Play"],
//       url: "",   // TODO: Play Store link if it's still live
//       features: ["Global leaderboard", "In-app purchases", "Animated sprites, music and timers"],
//       gallery: [],
//     },
