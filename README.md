# Portfolio website

Plain HTML/CSS/JS — no build step.

- `content.js` — **all the text/projects/experience live here.** Edit this to update the site.
- `index.html`, `styles.css`, `app.js` — layout, styling, routing, command palette.

Preview locally:

    cd ~/portfolio_website && python3 -m http.server 8765
    # open http://localhost:8765

Shortcuts on the site: `Ctrl/⌘+K` or `/` opens the command palette.
Project images: drop a file in `images/` and set `image: "images/foo.png"` on the project.
