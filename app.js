(() => {
  const S = window.SITE;
  const app = document.getElementById("app");
  const esc = (s = "") => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const corners = '<i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>';
  const ext = url => url && !url.startsWith("#") && !url.startsWith("mailto:") ? ' target="_blank" rel="noopener"' : "";

  // ── Shell ──────────────────────────────
  document.title = `${S.name} — ${S.tagline}`;
  document.getElementById("brand-name").textContent = S.handle;
  const fe = document.getElementById("footer-email");
  fe.href = `mailto:${S.email}`;
  fe.innerHTML = `${esc(S.email)} <span class="arrow">→</span>`;
  document.getElementById("footer-copy").textContent = `© ${new Date().getFullYear()} ${S.name}`;
  document.getElementById("footer-links").innerHTML =
    S.links.map(l => `<a href="${esc(l.url)}"${ext(l.url)}>${esc(l.label.toLowerCase())}</a>`).join("");

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

  const projectCard = (p, full) => {
    const tag = p.url ? "a" : "div";
    const href = p.url ? ` href="${esc(p.url)}"${ext(p.url)}` : "";
    return `<${tag} class="card"${href}>${corners}
      <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : codeArt(p)}
        ${p.status ? `<span class="badge">${esc(p.status)}</span>` : ""}</div>
      <div class="card-body">
        <div class="card-top"><h3>${esc(p.title)}</h3><span class="year">${esc(p.year)}</span></div>
        <p>${esc(p.summary)}</p>
        ${full && p.features?.length ? `<ul class="features">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <div class="tags">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        ${p.url ? `<span class="visit">visit →</span>` : ""}
      </div></${tag}>`;
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

  // ── Pages ──────────────────────────────
  const pages = {
    "/": () => `
      <div class="hero">
        <p class="prompt-line"><span class="accent">${esc(S.handle)}@portfolio</span>:~$ whoami</p>
        <h1>${esc(S.name)}</h1>
        <p class="typed"><span id="typed"></span><span class="cursor"></span></p>
        <div class="meta"><span>📍 ${esc(S.location)}</span><span>${esc(S.tagline)}</span></div>
        <div class="hero-actions">
          <a class="btn-primary" href="mailto:${esc(S.email)}">get in touch <span class="arrow">→</span></a>
          ${S.cv ? `<a class="btn-ghost" href="${esc(S.cv)}" target="_blank">cv.pdf</a>` : ""}
          ${S.links.filter(l => !l.url.startsWith("mailto:")).map(l => `<a class="btn-ghost" href="${esc(l.url)}"${ext(l.url)}>${esc(l.label.toLowerCase())}</a>`).join("")}
        </div>
      </div>
      <section><div class="section-head"><h2>About</h2></div><div class="prose">${S.about.map(p => `<p>${p}</p>`).join("")}</div></section>
      <section><div class="section-head"><h2>Projects</h2><a href="#/projects">all projects →</a></div>
        <div class="cards">${S.projects.filter(p => p.featured).map(p => projectCard(p)).join("")}</div></section>
      <section><div class="section-head"><h2>Experience</h2><a href="#/experience">full timeline →</a></div>${timeline(S.experience.slice(0, 3))}</section>
      ${S.awards.length ? `<section><div class="section-head"><h2>Awards</h2></div>${awardsList()}</section>` : ""}`,

    "/projects": () => `
      <h1 class="page-title">Projects</h1><p class="page-sub">A collection of things I've built.</p>
      <div class="cards">${S.projects.map(p => projectCard(p, true)).join("")}</div>`,

    "/experience": () => `
      <h1 class="page-title">Experience</h1><p class="page-sub">Roles, education and awards.</p>
      <section><div class="section-head"><h2>Work</h2></div>${timeline(S.experience)}</section>
      ${S.education.length ? `<section><div class="section-head"><h2>Education</h2></div>${timeline(S.education)}</section>` : ""}
      ${S.awards.length ? `<section><div class="section-head"><h2>Awards</h2></div>${awardsList()}</section>` : ""}`,

    "/resources": () => `
      <h1 class="page-title">Resources</h1><p class="page-sub">Things I recommend.</p>
      <div class="res-grid">${S.resources.map(g => `<div class="card">${corners}<h3>${esc(g.category)}</h3>
        <ul class="list">${g.items.map(i => `<li><div>
          ${i.url ? `<a class="l-title" href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.title)}</a>` : `<span class="l-title">${esc(i.title)}</span>`}
          ${i.note ? `<div class="l-note">${esc(i.note)}</div>` : ""}</div></li>`).join("")}</ul></div>`).join("")}</div>`,

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

  // ── Router ─────────────────────────────
  const render = () => {
    const path = location.hash.replace(/^#/, "") || "/";
    app.innerHTML = `<div class="page">${(pages[path] || pages["404"])()}</div>`;
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.toggle("active", a.dataset.route === path));
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
    { label: "resources", grp: "page", run: () => (location.hash = "#/resources") },
    { label: "copy email", grp: "action", run: () => navigator.clipboard?.writeText(S.email) },
    ...S.links.map(l => ({ label: l.label.toLowerCase(), grp: "link", run: () => window.open(l.url, "_blank") })),
    ...S.projects.filter(p => p.url).map(p => ({ label: p.title, grp: "project", run: () => window.open(p.url, "_blank") })),
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
