(() => {
  const S = window.SITE;
  const app = document.getElementById("app");
  const esc = (s = "") => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const slug = p => p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const corners = '<i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>';
  // Email links open a Gmail compose window instead of the system mail app.
  const gmail = to => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
  const href = url => url.startsWith("mailto:") ? gmail(url.slice(7)) : url;
  const ext = url => url && !url.startsWith("#") && !url.startsWith("mailto:") ? ' target="_blank" rel="noopener"' : "";

  // ── Shell ──────────────────────────────
  document.title = `${S.name} — ${S.tagline}`;
  document.getElementById("brand-name").textContent = S.handle;
  const fe = document.getElementById("footer-email");
  fe.href = gmail(S.email);
  fe.target = "_blank";
  fe.rel = "noopener";
  fe.innerHTML = `${esc(S.email)} <span class="arrow">→</span>`;
  document.getElementById("footer-copy").textContent = `© ${new Date().getFullYear()} ${S.name}`;
  document.getElementById("footer-links").innerHTML =
    S.links.map(l => `<a href="${esc(href(l.url))}"${ext(href(l.url))}>${esc(l.label.toLowerCase())}</a>`).join("") +
    (S.cv ? `<a href="${esc(S.cv)}" target="_blank" rel="noopener">cv</a>` : "");

  // ── Pieces ─────────────────────────────
  const codeArt = p => {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    const tags = p.tags.slice(0, 3).map(t => `<span class="s">"${esc(t)}"</span>`).join(", ");
    return `<div class="code-art"><span class="k">const</span> <span class="f">${slug}</span> = {
  year: <span class="n">${esc(p.year)}</span>,
  status: <span class="s">"${esc(p.status || "")}"</span>,
  stack: [${tags}],
};

<span class="k">export default</span> ${slug};</div>`;
  };

  // Themed banners for non-software projects (set `art` in content.js).
  const arts = {
    auto: () => {
      // Rev-counter dial: 0–8 (x1000 rpm) across a 240° arc, redline from 6.5.
      const cx = 60, cy = 62, r = 46;
      const pt = (v, rr) => { const a = (150 + v * 30) * Math.PI / 180; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
      const ticks = Array.from({ length: 17 }, (_, i) => {
        const v = i / 2, [x1, y1] = pt(v, r), [x2, y2] = pt(v, i % 2 ? r - 5 : r - 9);
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${v >= 6.5 ? "red" : ""}"/>`;
      }).join("");
      const nums = [0, 2, 4, 6, 8].map(v => { const [x, y] = pt(v, r - 18); return `<text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}">${v}</text>`; }).join("");
      const [ax, ay] = pt(0, r), [bx, by] = pt(8, r), [rx, ry] = pt(6.5, r);
      return `<div class="art art-auto">
        <svg class="gauge" viewBox="0 0 120 110" aria-hidden="true">
          <path d="M${ax.toFixed(1)} ${ay.toFixed(1)} A${r} ${r} 0 1 1 ${bx.toFixed(1)} ${by.toFixed(1)}" class="arc"/>
          <path d="M${rx.toFixed(1)} ${ry.toFixed(1)} A${r} ${r} 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}" class="arc red"/>
          ${ticks}${nums}
          <g class="needle"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 10}"/></g>
          <circle cx="${cx}" cy="${cy}" r="4" class="hub"/>
          <text x="${cx}" y="${cy + 24}" class="unit">x1000 rpm</text>
        </svg>
        <div class="readout"><span class="dim">$ obd2 --scan</span>
<span class="dim">ENGINE </span> <span class="ok">● running</span>
<span class="dim">DTC    </span> P0301 <span class="dim">→</span> <span class="ok">cleared</span>
<span class="dim">PARTS  </span> tested <span class="ok">✓</span>
<span class="dim">STATUS </span> <span class="hi">for sale</span><span class="blink">_</span></div>
      </div>`;
    },
    // Card banners in each product's own visual style (colours/logos taken from their sites).
    outspoken: () => {
      const heights = [6, 14, 22, 12, 26, 18, 30, 16, 24, 10, 20, 28, 14, 8, 18, 26, 12, 22, 16, 6];
      return `<div class="bnr bnr-outspoken">
        <div class="b-top">
          <svg class="os-logo" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="none" stroke="#10B981" stroke-width="7"/><rect x="15" y="27" width="5" height="10" rx="2.5" fill="#06B6D4"/><rect x="23" y="21" width="5" height="22" rx="2.5" fill="#06B6D4"/><rect x="31" y="16" width="5" height="32" rx="2.5" fill="#06B6D4"/><rect x="39" y="22" width="5" height="20" rx="2.5" fill="#06B6D4"/><rect x="47" y="28" width="4" height="8" rx="2" fill="#06B6D4"/></svg>
          <span class="os-word"><b>Out</b><i>Spoken</i></span>
        </div>
        <p class="b-head">Sound sharper in<br>your <em>next video</em></p>
        <div class="os-wave"><span class="play">▶</span>${heights.map((h, i) => `<i style="--h:${h}px;--d:${(i % 7) * 0.08}s"></i>`).join("")}<span class="t">0:04</span></div>
      </div>`;
    },
    boltun: () => `<div class="bnr bnr-boltun">
        <div class="b-top"><span class="bt-logo"><i></i></span><span class="bt-word">Boltun</span></div>
        <span class="bt-pill"><i></i>AUTONOMOUS CALLS</span>
        <p class="b-head">Cold calls that <em>improve themselves.</em></p>
      </div>`,
    nutrition: () => {
      const bars = [["protein", 78, "142g"], ["carbs", 60, "180g"], ["fat", 45, " 55g"], ["kcal", 88, "1840"]];
      return `<div class="art art-nutri">
        <svg class="dumbbell" viewBox="0 0 120 50" aria-hidden="true">
          <rect x="4" y="12" width="9" height="26" rx="2"/><rect x="15" y="6" width="11" height="38" rx="2"/>
          <rect x="26" y="22" width="68" height="6" rx="2" class="bar"/>
          <rect x="94" y="6" width="11" height="38" rx="2"/><rect x="107" y="12" width="9" height="26" rx="2"/>
        </svg>
        <div class="readout"><span class="dim">$ today --macros</span>
${bars.map(([k, pct, v]) => `<span class="row"><span class="dim">${k.padEnd(7)}</span><span class="meter"><i style="--w:${pct}%"></i></span> ${v}</span>`).join("\n")}
<span class="dim">streak</span>  <span class="hi">🔥 12d</span></div>
      </div>`;
    },
  };

  const brandVars = p => p.accent ? ` style="--accent:${esc(p.accent)};--accent-soft:color-mix(in srgb, ${esc(p.accent)} 40%, transparent)"` : "";

  const projectCard = (p, full) => {
    return `<a class="card" href="#/projects/${slug(p)}"${brandVars(p)}>${corners}
      <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : (arts[p.art] || codeArt)(p)}
        ${p.status ? `<span class="badge">${esc(p.status)}</span>` : ""}</div>
      <div class="card-body">
        <div class="card-top"><h3>${esc(p.title)}</h3><span class="year">${esc(p.year)}</span></div>
        <p>${esc(p.summary)}</p>
        ${full && p.features?.length ? `<ul class="features">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <div class="tags">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <span class="visit">read more →</span>
      </div></a>`;
  };

  const timeline = items => `<div class="timeline">${items.map(e => `
    <div class="t-item">
      <div class="t-head">
        <div><span class="t-role">${esc(e.role)}</span> <span class="muted">@</span>
          ${e.url ? `<a class="t-org" href="${esc(e.url)}"${ext(e.url)}>${esc(e.org)}</a>` : `<span class="t-org">${esc(e.org)}</span>`}</div>
        <span class="t-period">${esc(e.period)}</span>
      </div>
      ${e.detail ? `<p class="t-detail">${esc(e.detail)}</p>` : ""}
    </div>`).join("")}</div>`;

  const awardsList = () => `<ul class="list">${S.awards.map(a => `
    <li><div><div class="l-title">${esc(a.title)}</div>${a.detail ? `<div class="l-note">${esc(a.detail)}</div>` : ""}</div>
    <span class="l-year">${esc(a.year)}</span></li>`).join("")}</ul>`;

  const skillsBlock = () => S.skills?.length ? `<section><div class="section-head"><h2>Skills</h2></div>
    <div class="skills">${S.skills.map(g => `<div class="skill-row"><span class="skill-group">${esc(g.group)}</span>
      <div class="tags">${g.items.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>`).join("")}</div></section>` : "";

  // ── Pages ──────────────────────────────
  const pages = {
    "/": () => `
      <div class="hero">
        <p class="prompt-line"><span class="accent">${esc(S.handle)}@portfolio</span>:~$ whoami</p>
        <h1>${esc(S.name)}</h1>
        <p class="typed"><span id="typed"></span><span class="cursor"></span></p>
        <div class="meta"><span>📍 ${esc(S.location)}</span><span>${esc(S.tagline)}</span></div>
        <div class="hero-actions">
          <a class="btn-primary" href="${esc(gmail(S.email))}" target="_blank" rel="noopener">get in touch <span class="arrow">→</span></a>
          ${S.cv ? `<a class="btn-ghost" href="${esc(S.cv)}" target="_blank" rel="noopener">↓ cv.pdf</a>` : ""}
          ${S.links.filter(l => !l.url.startsWith("mailto:")).map(l => `<a class="btn-ghost" href="${esc(l.url)}"${ext(l.url)}>${esc(l.label.toLowerCase())}</a>`).join("")}
        </div>
      </div>
      <section><div class="section-head"><h2>About</h2></div>
        <div class="about${S.photo ? " has-photo" : ""}">
          <div class="prose">${S.about.map(p => `<p>${p}</p>`).join("")}</div>
          ${S.photo ? `<figure class="portrait"><span class="orbit"></span><img src="${esc(S.photo)}" alt="Photo of ${esc(S.name)}"><span class="status" title="online"></span></figure>` : ""}
        </div></section>
      <section><div class="section-head"><h2>Projects</h2><a href="#/projects">all projects →</a></div>
        <div class="cards">${S.projects.filter(p => p.featured).map(p => projectCard(p)).join("")}</div></section>
      ${skillsBlock()}
      ${S.awards.length ? `<section><div class="section-head"><h2>Awards</h2></div>${awardsList()}</section>` : ""}`,

    "/projects": () => `
      <h1 class="page-title">Projects</h1><p class="page-sub">A collection of things I've built.</p>
      <div class="cards">${S.projects.map(p => projectCard(p, true)).join("")}</div>`,

    "/experience": () => `
      <h1 class="page-title">Experience</h1><p class="page-sub">Roles, education and awards.</p>
      <section><div class="section-head"><h2>Work</h2></div>${timeline(S.experience)}</section>
      ${S.education.length ? `<section><div class="section-head"><h2>Education</h2></div>${timeline(S.education)}</section>` : ""}
      ${skillsBlock()}
      ${S.awards.length ? `<section><div class="section-head"><h2>Awards</h2></div>${awardsList()}</section>` : ""}`,

    "/resources": () => `
      <h1 class="page-title">Resources</h1><p class="page-sub">Things I recommend.</p>
      <div class="res-grid">${S.resources.map(g => `<div class="card">${corners}<h3>${esc(g.category)}</h3>
        <ul class="list">${g.items.map(i => `<li><div>
          ${i.url ? `<a class="l-title" href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.title)}</a>` : `<span class="l-title">${esc(i.title)}</span>`}
          ${i.note ? `<div class="l-note">${esc(i.note)}</div>` : ""}</div></li>`).join("")}</ul></div>`).join("")}</div>`,

    "/project": p => {
      const i = S.projects.indexOf(p);
      const prev = S.projects[(i - 1 + S.projects.length) % S.projects.length];
      const next = S.projects[(i + 1) % S.projects.length];
      // Gallery items are paths or { src, caption }; the card image is only reused when there's no gallery.
      const gallery = (p.gallery?.length ? p.gallery : [p.image]).filter(Boolean).map(g => typeof g === "string" ? { src: g } : g);
      return `<div${brandVars(p)}>
      <a class="back" href="#/projects"><span class="arrow">←</span> cd ../projects</a>
      <div class="p-head">
        <div class="p-meta"><span class="year">${esc(p.year)}</span>${p.status ? `<span class="tag">${esc(p.status)}</span>` : ""}</div>
        ${p.logo ? `<img class="p-logo${p.logoLight ? " light" : ""}" src="${esc(p.logo)}" alt="${esc(p.title)} logo">` : ""}
        <h1 class="page-title">${esc(p.title)}</h1>
        ${p.role ? `<p class="p-role"><span class="muted">role:</span> <span class="accent">${esc(p.role)}</span></p>` : ""}
        <p class="page-sub">${esc(p.summary)}</p>
        ${p.url ? `<a class="btn-primary" href="${esc(p.url)}"${ext(p.url)}>visit ${esc(p.urlLabel || p.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))} <span class="arrow">→</span></a>` : ""}
      </div>
      ${gallery.length ? `<div class="gallery${gallery.length > 2 ? " masonry" : ""}">${gallery.map(g => `<a class="card shot" href="${esc(g.src)}" target="_blank">${corners}<img src="${esc(g.src)}" alt="${esc(g.caption || p.title)}" loading="lazy">${g.caption ? `<span class="cap">${esc(g.caption)}</span>` : ""}</a>`).join("")}</div>` : ""}
      <div class="p-grid">
        <section class="prose">
          <div class="section-head"><h2>Overview</h2></div>
          ${(p.details || [p.summary]).map(d => `<p>${d}</p>`).join("")}
        </section>
        <aside>
          ${p.features?.length ? `<div class="section-head"><h2>Highlights</h2></div><ul class="features">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
          <div class="section-head"><h2>Stack</h2></div>
          <div class="tags">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </aside>
      </div>
      ${S.projects.length > 1 ? `<nav class="p-nav">
        <a href="#/projects/${slug(prev)}"><span class="muted">← prev</span><br>${esc(prev.title)}</a>
        <a href="#/projects/${slug(next)}" class="right"><span class="muted">next →</span><br>${esc(next.title)}</a>
      </nav>` : ""}</div>`;
    },

    "404": () => `<h1 class="page-title">404 / not found</h1><p class="page-sub">That page doesn't exist.</p><a class="btn-primary" href="#/">cd ~ <span class="arrow">→</span></a>`,
  };

  // ── Typing effect ──────────────────────
  let typeTimer;
  const startTyping = () => {
    clearTimeout(typeTimer);
    const el = document.getElementById("typed");
    if (!el || !S.roles.length) return;
    let i = 0, n = 0, del = false;
    const tick = () => {
      const word = S.roles[i];
      n += del ? -1 : 1;
      el.textContent = word.slice(0, n);
      let wait = del ? 35 : 75;
      if (!del && n === word.length) { del = true; wait = 1600; }
      else if (del && n === 0) { del = false; i = (i + 1) % S.roles.length; wait = 300; }
      typeTimer = setTimeout(tick, wait);
    };
    tick();
  };

  // The resources page only exists when content.js has some resources.
  if (!S.resources.length) {
    delete pages["/resources"];
    document.querySelector('.nav-links a[data-route="/resources"]').remove();
  }

  // ── Router ─────────────────────────────
  const render = () => {
    const path = location.hash.replace(/^#/, "") || "/";
    const m = path.match(/^\/projects\/(.+)$/);
    const project = m && S.projects.find(p => slug(p) === m[1]);
    const html = project ? pages["/project"](project) : (pages[path] || pages["404"])();
    app.innerHTML = `<div class="page">${html}</div>`;
    const section = m ? "/projects" : path;
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.toggle("active", a.dataset.route === section));
    window.scrollTo(0, 0);
    startTyping();
  };
  window.addEventListener("hashchange", render);
  render();

  // ── Command palette (⌘K / Ctrl+K, or "/") ──
  const pal = document.getElementById("palette");
  const input = document.getElementById("palette-input");
  const list = document.getElementById("palette-list");
  const commands = [
    { label: "about", grp: "page", run: () => (location.hash = "#/") },
    { label: "projects", grp: "page", run: () => (location.hash = "#/projects") },
    { label: "experience", grp: "page", run: () => (location.hash = "#/experience") },
    ...(S.resources.length ? [{ label: "resources", grp: "page", run: () => (location.hash = "#/resources") }] : []),
    { label: "copy email", grp: "action", run: () => navigator.clipboard?.writeText(S.email) },
    ...(S.cv ? [{ label: "open cv", grp: "action", run: () => window.open(S.cv, "_blank") }] : []),
    ...S.links.map(l => ({ label: l.label.toLowerCase(), grp: "link", run: () => window.open(href(l.url), "_blank") })),
    ...S.projects.map(p => ({ label: p.title, grp: "project", run: () => (location.hash = `#/projects/${slug(p)}`) })),
  ];
  let shown = [], sel = 0;
  const draw = () => {
    const q = input.value.toLowerCase();
    shown = commands.filter(c => c.label.toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(shown.length - 1, 0));
    list.innerHTML = shown.length
      ? shown.map((c, i) => `<li data-i="${i}" class="${i === sel ? "sel" : ""}">${esc(c.label)}<span class="grp">${c.grp}</span></li>`).join("")
      : `<li class="muted">no matches</li>`;
  };
  const open = () => { pal.hidden = false; input.value = ""; sel = 0; draw(); input.focus(); };
  const close = () => { pal.hidden = true; };
  const choose = i => { const c = shown[i]; close(); c?.run(); };

  document.getElementById("open-palette").addEventListener("click", open);
  pal.addEventListener("click", e => { if (e.target === pal) close(); });
  list.addEventListener("click", e => { const li = e.target.closest("li[data-i]"); if (li) choose(+li.dataset.i); });
  input.addEventListener("input", () => { sel = 0; draw(); });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? open() : close(); return; }
    if (pal.hidden) {
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
      return;
    }
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { sel = (sel + 1) % Math.max(shown.length, 1); draw(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = (sel - 1 + shown.length) % Math.max(shown.length, 1); draw(); e.preventDefault(); }
    else if (e.key === "Enter") choose(sel);
  });
})();
