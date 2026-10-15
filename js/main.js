/* ==========================================================================
   Portfolio logic. You normally do not need to edit this file.
   All text, links and videos live in js/content.js
   ========================================================================== */
(() => {
  "use strict";

  const S = window.SITE || {};
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny DOM helper (builds elements safely, no innerHTML for user text) ---------- */
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
      if (val == null || val === false) continue;
      if (key === "class") el.className = val;
      else if (key === "text") el.textContent = val;
      else if (key.startsWith("on") && typeof val === "function") el.addEventListener(key.slice(2), val);
      else el.setAttribute(key, val === true ? "" : val);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }

  const ICONS = {
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13a.5.5 0 0 0 .77.42l10-6.5a.5.5 0 0 0 0-.84l-10-6.5A.5.5 0 0 0 8 5.5z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
  };
  function icon(name) {
    const s = h("span", { class: "icon", "aria-hidden": "true" });
    s.innerHTML = ICONS[name];
    return s;
  }

  /* ==========================================================================
     VIDEO HELPERS
     ========================================================================== */
  const CATS = ["short", "youtube", "other"];

  const fmtOf = (p) => p.format || (p.category === "short" ? "vertical" : "horizontal");

  // Accept either a bare ID or a pasted link.
  function youtubeId(raw) {
    const m = String(raw || "").match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
    return m ? m[1] : String(raw || "").trim();
  }
  function vimeoId(raw) {
    const m = String(raw || "").match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : String(raw || "").trim();
  }

  function isPlayable(v) {
    if (!v) return false;
    if (v.type === "file") return !!(v.src && v.src.trim());
    if (v.type === "youtube" || v.type === "vimeo") return !!(v.id && String(v.id).trim());
    return false;
  }

  function buildPlayer(p) {
    const v = p.video;
    const common = { class: "media-el" };
    if (v.type === "file") {
      return h("video", { ...common, src: v.src, poster: p.poster || null, controls: true, autoplay: true,
        playsinline: true, preload: "metadata", "aria-label": p.title });
    }
    if (v.type === "vimeo") {
      return h("iframe", { ...common, title: p.title,
        src: `https://player.vimeo.com/video/${encodeURIComponent(vimeoId(v.id))}?autoplay=1&dnt=1`,
        allow: "autoplay; fullscreen; picture-in-picture", allowfullscreen: true });
    }
    return h("iframe", { ...common, title: p.title,
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId(v.id))}?autoplay=1&rel=0&playsinline=1`,
      allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: true,
      referrerpolicy: "strict-origin-when-cross-origin" });
  }

  function posterImage(src, fallback) {
    const img = h("img", { alt: "", loading: "lazy", decoding: "async" });
    let usedFallback = false;
    img.addEventListener("load", () => {
      // YouTube returns a tiny 120px grey image when "maxres" does not exist.
      if (fallback && !usedFallback && img.naturalWidth <= 120) { usedFallback = true; img.src = fallback; return; }
      img.classList.add("is-loaded");
    });
    img.addEventListener("error", () => {
      if (fallback && !usedFallback) { usedFallback = true; img.src = fallback; } else img.remove();
    });
    img.src = src;
    return img;
  }

  function posterLayer(p) {
    const v = p.video || {};
    if (p.poster) return posterImage(p.poster);
    if (v.type === "youtube" && v.id) {
      const id = encodeURIComponent(youtubeId(v.id));
      return posterImage(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
    }
    if (v.type === "file" && v.src) {
      // No cover image given: show the first frame of the video file.
      const vid = h("video", { src: `${v.src}#t=0.1`, muted: true, playsinline: true, preload: "metadata", tabindex: "-1" });
      vid.muted = true;
      vid.addEventListener("loadeddata", () => vid.classList.add("is-loaded"));
      return vid;
    }
    return null;
  }

  /* ---------- inline playback (Selected work) ---------- */
  let active = null; // { media, project }

  function stopInline() {
    if (!active) return;
    const { media, project } = active;
    active = null;
    renderPoster(media, project, "inline");
  }

  function playInline(media, project) {
    stopInline();
    active = { media, project };
    media.replaceChildren(buildPlayer(project));
  }

  function renderPoster(media, project, mode) {
    media.replaceChildren();
    if (!isPlayable(project.video)) {
      media.classList.add("is-empty");
      media.append(h("div", { class: "poster poster--empty" },
        h("span", { class: "poster__label", text: "Your video here" }),
        h("span", { class: "poster__ratio", text: fmtOf(project) === "vertical" ? "9:16" : "16:9" })));
      return;
    }
    const btn = h("button", {
      class: "poster", type: "button", "aria-label": `Play video: ${project.title}`,
      onclick: () => (mode === "inline" ? playInline(media, project) : openLightbox(project))
    }, posterLayer(project), h("span", { class: "play" }, icon("play")));
    media.append(btn);
  }

  function projectCard(project, mode) {
    const fmt = fmtOf(project);
    const media = h("div", { class: `media media--${fmt}` });
    renderPoster(media, project, mode);
    return h("article", { class: `card card--${fmt}` },
      media,
      h("div", { class: "card__text" },
        h("h3", { class: "card__title", text: project.title || "Untitled" }),
        project.note ? h("p", { class: "card__note", text: project.note }) : null));
  }

  /* ---------- lightbox (category lists + showreel) ---------- */
  const dlg = $("#lightbox");
  const stage = $("#lightbox-stage");

  function openLightbox(project) {
    stopInline();
    stage.className = `lightbox__stage lightbox__stage--${fmtOf(project)}`;
    stage.replaceChildren(buildPlayer(project));
    $("#lightbox-title").textContent = project.title || "";
    $("#lightbox-note").textContent = project.note || "";
    $("#lightbox-note").hidden = !project.note;
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute("open", "");
  }

  $("#lightbox-close").append(icon("close"));
  $("#lightbox-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); }); // click outside the player
  dlg.addEventListener("close", () => stage.replaceChildren());                 // stops the video

  /* ==========================================================================
     RENDER SECTIONS
     ========================================================================== */
  function contactLinks() {
    const c = S.contacts || {};
    const out = [];
    const tg = String(c.telegram || "").trim();
    if (tg) {
      const url = /^https?:\/\//i.test(tg) ? tg : `https://t.me/${tg.replace(/^@/, "")}`;
      out.push(h("a", { class: "btn btn--red", href: url, target: "_blank", rel: "noopener" }, icon("send"), "Write on Telegram"));
    }
    const mail = String(c.email || "").trim();
    if (mail) {
      const subj = c.emailSubject ? `?subject=${encodeURIComponent(c.emailSubject)}` : "";
      out.push(h("a", { class: "btn btn--ghost", href: `mailto:${mail}${subj}` }, icon("mail"), "Send email"));
    }
    return out;
  }

  function renderHero() {
    document.title = `${S.name || "Portfolio"} | ${S.role || "Video Editor"}`;
    $("#brand").append(h("span", { class: "brand__dot", "aria-hidden": "true" }), S.name || "");

    const words = String(S.name || "").trim().split(/\s+/).filter(Boolean);
    const nameEl = $("#hero-name");
    words.forEach((w, i) => nameEl.append(
      h("span", { class: "line" }, h("span", { class: "line__in", style: `--i:${i}`, text: w }))));

    $("#hero-role").textContent = S.role || "";
    $("#hero-tagline").textContent = S.tagline || "";

    const a = S.availability || {};
    const status = $("#status");
    if (a.show && a.text) status.append(h("span", { class: "status__dot", "aria-hidden": "true" }), a.text);
    else status.hidden = true;

    // Showreel button
    const sr = S.showreel || {};
    const reel = { title: "Showreel", note: "", format: sr.format || "horizontal", poster: sr.poster, video: sr };
    if (isPlayable(sr)) {
      const btn = $("#showreel-btn");
      btn.hidden = false;
      btn.addEventListener("click", () => openLightbox(reel));
    }
  }

  function renderProjects() {
    const list = (S.projects || []).map((p) => ({ ...p, category: CATS.includes(p.category) ? p.category : "other" }));

    // Featured
    const featured = list.filter((p) => p.featured);
    const host = $("#featured");
    if (!featured.length) {
      $("#work").hidden = true;
    } else {
      const hs = featured.filter((p) => fmtOf(p) === "horizontal");
      const vs = featured.filter((p) => fmtOf(p) === "vertical");
      if (hs.length) host.append(h("div", { class: `feat__h${hs.length > 1 ? " feat__h--multi" : ""}` }, hs.map((p) => projectCard(p, "inline"))));
      if (vs.length) host.append(h("div", { class: "feat__v" }, vs.map((p) => projectCard(p, "inline"))));
    }

    // Categories
    const projectsHost = $("#projects");
    const ids = { short: "short-form", youtube: "youtube", other: "other-projects" };
    CATS.forEach((cat) => {
      const items = list.filter((p) => p.category === cat && !p.featured);
      if (!items.length) return;
      const meta = (S.categories || {})[cat] || {};
      projectsHost.append(
        h("section", { class: "section section--ruled section--tight", id: ids[cat], "aria-labelledby": `${ids[cat]}-title` },
          h("div", { class: "wrap split" },
            h("div", { class: "split__head" },
              h("h2", { class: "h2", id: `${ids[cat]}-title`, text: meta.title || cat }),
              meta.text ? h("p", { class: "lead lead--small", text: meta.text }) : null),
            h("div", { class: "split__body" },
              h("div", { class: "grid" }, items.map((p) => projectCard(p, "modal")))))));
    });
  }

  function renderAbout() {
    const a = S.about || {};
    const body = $("#about-body");
    const intro = h("div", { class: "about__intro" },
      a.heading ? h("p", { class: "about__lead", text: a.heading }) : null,
      (a.text || []).map((t) => h("p", { class: "about__text", text: t })),
      a.tools && a.tools.length
        ? h("p", { class: "tools" }, h("span", { class: "tools__label", text: "Tools" }), a.tools.join(", ")) : null);
    const top = h("div", { class: `about__top${a.photo ? " has-photo" : ""}` },
      intro,
      a.photo ? h("figure", { class: "about__photo" }, h("img", { src: a.photo, alt: a.photoAlt || "", loading: "lazy", decoding: "async" })) : null);
    body.append(top);
    if (a.principles && a.principles.length) {
      body.append(h("ul", { class: "principles" },
        a.principles.map((p) => h("li", {}, h("h3", { class: "principle__title", text: p.title }), h("p", { text: p.text })))));
    }
  }

  function renderServices() {
    const list = $("#services-list");
    (S.services || []).forEach((s) =>
      list.append(h("li", { class: "service" },
        h("h3", { class: "service__title", text: s.title }),
        h("p", { class: "service__text", text: s.text }))));
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch {
      const ta = h("textarea", { readonly: "", style: "position:fixed;opacity:0" });
      ta.value = text; document.body.append(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { /* ignore */ }
      ta.remove();
      return ok;
    }
  }

  function renderContact() {
    const c = S.contacts || {};
    $("#contact-actions").append(...contactLinks());
    $("#menu-actions").append(...contactLinks());

    const more = $("#contact-more");
    const mail = String(c.email || "").trim();
    if (mail) {
      const status = h("span", { class: "sr-only", role: "status", "aria-live": "polite" });
      const copy = h("button", { class: "copy", type: "button" }, "Copy email");
      copy.addEventListener("click", async () => {
        const ok = await copyText(mail);
        copy.textContent = ok ? "Copied" : "Copy failed";
        status.textContent = ok ? "Email address copied" : "Could not copy the email address";
        setTimeout(() => { copy.textContent = "Copy email"; status.textContent = ""; }, 2200);
      });
      more.append(h("p", { class: "contact__mail" }, h("span", { text: mail }), copy, status));
    }
    if (c.socials && c.socials.length) {
      more.append(h("p", { class: "contact__social" },
        c.socials.map((s) => h("a", { href: s.url, target: "_blank", rel: "noopener", text: s.label }))));
    }
    $("#footer-copy").textContent = `© ${new Date().getFullYear()} ${S.name || ""}`;
  }

  /* ==========================================================================
     HERO: fit the name, timeline playhead
     ========================================================================== */
  function fitName() {
    const el = $("#hero-name");
    el.style.removeProperty("--name-size");
    const avail = el.clientWidth;
    let widest = 0;
    $$(".line__in", el).forEach((n) => { widest = Math.max(widest, n.getBoundingClientRect().width); });
    if (widest > avail && widest > 0) {
      const size = parseFloat(getComputedStyle(el).fontSize);
      el.style.setProperty("--name-size", `${(size * avail / widest * 0.985).toFixed(2)}px`);
    }
  }

  function initTimeline() {
    const wrap = $("#timeline");
    const body = $("#tl-body");
    const tcEl = $("#tl-tc");
    if (!wrap || !body || !tcEl) return { intro() {} }; // timeline block was removed from index.html
    const TOTAL = 90 * 30; // a 90 second sequence at 30 fps
    let p = 0, raf = 0, dragging = false;

    $$(".clip", wrap).forEach((c, i) => c.style.setProperty("--k", i));

    const pad = (n) => String(n).padStart(2, "0");
    function timecode(frames) {
      const f = frames % 30, s = Math.floor(frames / 30) % 60, m = Math.floor(frames / 1800) % 60, hh = Math.floor(frames / 108000);
      return `${pad(hh)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    }
    function set(next) {
      p = clamp(next, 0, 1);
      body.style.setProperty("--p", p);
      tcEl.textContent = timecode(Math.round(p * (TOTAL - 1)));
      const w = tcEl.offsetWidth, W = body.clientWidth, x = p * W;
      let shift = -w / 2;
      if (x + shift < 0) shift = -x;
      if (x + shift + w > W) shift = W - x - w;
      tcEl.style.transform = `translateX(${shift}px)`;
    }
    const toP = (e) => { const r = body.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };

    function sweep(to, ms) {
      cancelAnimationFrame(raf);
      const from = p, t0 = performance.now();
      const step = (now) => {
        const t = clamp((now - t0) / ms, 0, 1);
        set(from + (to - from) * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    wrap.addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse" || dragging) { cancelAnimationFrame(raf); set(toP(e)); }
    });
    wrap.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      dragging = true; cancelAnimationFrame(raf);
      try { wrap.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      set(toP(e));
    });
    const end = () => { dragging = false; };
    wrap.addEventListener("pointerup", end);
    wrap.addEventListener("pointercancel", end);
    window.addEventListener("resize", () => set(p));

    set(0);
    return { intro() { reduceMotion ? set(0.36) : sweep(0.36, 1700); } };
  }

  /* ==========================================================================
     HEADER, MENU, ACTIVE LINK
     ========================================================================== */
  function initChrome() {
    const header = $(".site-header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const btn = $("#menu-btn"), menu = $("#mobile-menu");
    function setMenu(open) {
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("no-scroll", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

    // Highlight the nav link of the section in view
    if ("IntersectionObserver" in window) {
      const map = { hero: null, work: "work", projects: "work", about: "about", services: "services", contact: "contact" };
      const links = $$(".nav a");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const key = map[en.target.id];
          links.forEach((a) => a.setAttribute("aria-current", String(key !== null && a.getAttribute("href") === `#${key}`)));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
  }

  /* ==========================================================================
     START
     ========================================================================== */
  renderHero();
  renderProjects();
  renderAbout();
  renderServices();
  renderContact();
  initChrome();
  const timeline = initTimeline();

  // Start the intro once the font is ready, so the headline does not jump.
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const fontsReady = document.fonts && document.fonts.load
    ? Promise.race([Promise.all([document.fonts.load('800 1em "Archivo"'), document.fonts.load('400 1em "Archivo"')]), wait(1500)])
    : Promise.resolve();

  fontsReady.then(() => {
    fitName();
    root.classList.add("is-ready");
    setTimeout(() => timeline.intro(), reduceMotion ? 0 : 900);
  });

  let resizeTimer;
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fitName, 120); });
})();
