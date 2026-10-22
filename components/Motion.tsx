"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

/**
 * All client-side motion for the site. It is mounted once in the root layout
 * and re-initialises on every route change, so pages stay plain server-rendered
 * markup that opts in through `data-*` hooks.
 */

type Cleanup = () => void;
type El = HTMLElement;

const qs = <T extends Element = El>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const qsa = <T extends Element = El>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

let registered = false;
let lenis: Lenis | null = null;
let introPlayed = false;

function register(reduce: boolean) {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase);
  CustomEase.create("out", "0.22, 1, 0.36, 1");
  CustomEase.create("inOut", "0.76, 0, 0.24, 1");
  gsap.defaults({ ease: "out", duration: reduce ? 0.001 : 0.9 });
}

function ensureLenis(reduce: boolean) {
  if (reduce || lenis) return lenis;
  lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

const hashTarget = (): El | null => {
  const h = window.location.hash;
  if (!h || h === "#") return null;
  try {
    return document.querySelector<El>(h);
  } catch {
    return null;
  }
};

const canHover = () => window.matchMedia("(hover: hover)").matches;

export function Motion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    register(reduce);
    ensureLenis(reduce);

    const cleanups: Cleanup[] = [];
    const on = (
      target: Window | Document | Element,
      type: string,
      fn: (e: Event) => void,
      opts?: AddEventListenerOptions | boolean
    ) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const target = hashTarget();
    if (!target) {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
    }

    const ctx = gsap.context(() => {
      /* ------------------------------------------------ shared chrome */
      anchors(on, reduce);
      progressBar();
      navBehaviour(on);
      cursor(on, reduce);
      magnetic(reduce);
      splitReveals(reduce);

      /* ------------------------------------------------ per page */
      if (pathname === "/") home(on, reduce, target);
      else if (pathname === "/work/") indexPage(reduce, "work");
      else if (pathname === "/case-studies/") indexPage(reduce, "cases");
      else if (pathname === "/fractional-cmo-services/") fcmo(reduce);

    });
    if (target) settleOnTarget(target, cleanups);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    on(window, "load", refresh);
    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

function scrollToTarget(el: El) {
  ScrollTrigger.refresh();
  // After a client-side navigation Lenis still holds the previous page's height,
  // which would clamp the jump short.
  lenis?.resize();
  if (lenis) lenis.scrollTo(el, { offset: -80, immediate: true, force: true });
  else el.scrollIntoView();
}

/** Land on a #hash target, re-checking while the new page's layout settles. */
function settleOnTarget(el: El, cleanups: Cleanup[]) {
  let interacted = false;
  const stop = () => (interacted = true);
  ["wheel", "touchstart", "keydown"].forEach((t) => {
    window.addEventListener(t, stop, { once: true, passive: true });
    cleanups.push(() => window.removeEventListener(t, stop));
  });
  [0, 250, 800].forEach((ms) => {
    const id = window.setTimeout(() => !interacted && scrollToTarget(el), ms);
    cleanups.push(() => window.clearTimeout(id));
  });
}

type On = (target: Window | Document | Element, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions | boolean) => void;

/* ---------------------------------------------------------------- anchors */

/** Same-page #hash links glide with Lenis instead of jumping. */
function anchors(on: On, reduce: boolean) {
  on(
    document,
    "click",
    (e) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!a || !lenis || reduce) return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !url.hash || url.hash === "#") return;
      const norm = (p: string) => p.replace(/\/+$/, "");
      if (norm(url.pathname) !== norm(window.location.pathname)) return;
      const el = qs(url.hash);
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    },
    true
  );
}

/* ------------------------------------------------------------ progress bar */

function progressBar() {
  const bar = qs("[data-progress]");
  if (!bar) return;
  gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
}

/* --------------------------------------------------------------------- nav */

function navBehaviour(on: On) {
  const nav = qs("[data-nav]");
  const links = qsa<HTMLAnchorElement>("[data-nav-link]");
  const ind = qs("[data-nav-ind]");
  const burger = qs("[data-burger]");
  const list = qs(".nav__links");
  if (!nav) return;

  let last = 0;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("is-stuck", y > 12);
      nav.classList.toggle("is-hidden", y > 400 && y > last);
      last = y;
    },
  });

  // Underline indicator that slides between links (Flip).
  const moveTo = (el: El | undefined, animate = true) => {
    if (!el || !ind) return;
    const state = animate ? Flip.getState(ind) : null;
    ind.style.width = `${el.offsetWidth}px`;
    ind.style.left = `${el.offsetLeft}px`;
    gsap.set(ind, { opacity: 1 });
    if (state) Flip.from(state, { duration: 0.45, ease: "out" });
  };
  const current = () => links.find((l) => l.classList.contains("is-current"));
  const rest = () => {
    const c = current();
    if (c) moveTo(c, false);
    else if (ind) gsap.set(ind, { opacity: 0 });
  };
  rest();
  document.fonts?.ready.then(rest);
  on(window, "resize", rest);
  links.forEach((l) => on(l, "pointerenter", () => moveTo(l)));
  if (list) {
    on(list, "pointerleave", () => {
      const c = current();
      if (c) moveTo(c);
      else if (ind) gsap.to(ind, { opacity: 0, duration: 0.3 });
    });
  }

  // Mobile menu
  if (burger) {
    on(burger, "click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      list?.classList.toggle("is-open", !open);
    });
  }
  const closeMenu = () => {
    burger?.setAttribute("aria-expanded", "false");
    list?.classList.remove("is-open");
  };
  links.forEach((l) => on(l, "click", closeMenu));
  closeMenu();
}

/* ------------------------------------------------------------------ cursor */

function cursor(on: On, reduce: boolean) {
  const root = qs("[data-cursor]");
  if (!root || reduce || !canHover()) return;
  const ring = qs("[data-cursor-ring]", root)!;
  const dot = qs("[data-cursor-dot]", root)!;
  const label = qs("[data-cursor-label]", root)!;

  const rx = gsap.quickTo(root, "x", { duration: 0.5, ease: "power3" });
  const ry = gsap.quickTo(root, "y", { duration: 0.5, ease: "power3" });
  const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
  const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

  let shown = false;
  on(window, "pointermove", (e) => {
    const p = e as PointerEvent;
    rx(p.clientX);
    ry(p.clientY);
    dx((p.clientX - (gsap.getProperty(root, "x") as number)) * 0.35);
    dy((p.clientY - (gsap.getProperty(root, "y") as number)) * 0.35);
    if (!shown) {
      shown = true;
      gsap.to(root, { opacity: 1, duration: 0.3 });
    }
  });

  const state = (ringScale: number, withLabel: boolean) => () => {
    gsap.to(ring, { scale: ringScale, duration: 0.4 });
    gsap.to(dot, { scale: withLabel ? 0 : 1, duration: 0.3 });
    gsap.to(label, { opacity: withLabel ? 1 : 0, scale: withLabel ? 1 : 0.6, duration: 0.35 });
  };
  const idle = state(1, false);
  qsa("[data-cursor-hover]").forEach((el) => {
    on(el, "pointerenter", state(1.9, false));
    on(el, "pointerleave", idle);
  });
  qsa("[data-cursor-project]").forEach((el) => {
    on(el, "pointerenter", state(2.7, true));
    on(el, "pointerleave", idle);
  });
}

/* ---------------------------------------------------------------- magnetic */

function magnetic(reduce: boolean) {
  if (reduce || !canHover()) return;
  qsa("[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.22);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener("pointerleave", () => {
      x(0);
      y(0);
    });
  });
}

/* ------------------------------------------------------------ text reveals */

/** `[data-split]` headings rise line by line; `[data-split-words]` word by word. */
function splitReveals(reduce: boolean) {
  if (reduce) return;
  qsa("[data-split]").forEach((el) => {
    const split = new SplitText(el, { type: "lines", linesClass: "line", mask: "lines" });
    gsap.from(split.lines, { yPercent: 115, duration: 1, stagger: 0.09, scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  qsa("[data-split-words]").forEach((el) => {
    const split = new SplitText(el, { type: "words", wordsClass: "word" });
    gsap.set(split.words, { display: "inline-block" });
    gsap.from(split.words, { yPercent: 70, opacity: 0, duration: 0.7, stagger: 0.03, scrollTrigger: { trigger: el, start: "top 92%" } });
  });
}

/** Scroll-velocity skew on image frames. */
function skew(reduce: boolean) {
  const frames = qsa(".card__media, .cases__card");
  if (!frames.length || reduce) return;
  const setters = frames.map((f) => gsap.quickTo(f, "skewY", { duration: 0.7, ease: "power3" }));
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-2, 2, self.getVelocity() / -380);
      setters.forEach((s) => s(v));
    },
  });
}

/* =================================================================== HOME */

function home(on: On, reduce: boolean, target: El | null) {
  const heroTl = gsap.timeline({ paused: true });
  hero(heroTl, on, reduce);

  const intro = qs("[data-intro]");
  const reveal = () => {
    lenis?.start();
    document.documentElement.classList.add("is-ready");
    ScrollTrigger.refresh();
  };

  if (target || introPlayed || reduce || !intro) {
    // Hash deep-link, client-side navigation back to "/" or reduced motion: no curtain.
    if (intro) intro.hidden = true;
    reveal();
    if (target) {
      heroTl.progress(1);
    } else {
      heroTl.play();
    }
  } else {
    playIntro(intro, () => {
      reveal();
      heroTl.play();
    });
  }

  marquee(reduce);
  cards(reduce);
  reviews(on, reduce);
  caseSlider(reduce);
  advantage(reduce);
  cta(reduce);
  skew(reduce);
}

/** Black curtain: counter + name, then purple slats wipe the page in. */
function playIntro(root: El, onReveal: () => void) {
  const ink = qs("[data-intro-ink]", root)!;
  const glow = qs("[data-intro-glow]", root)!;
  const role = qs("[data-intro-role]", root)!;
  const name = qs("[data-intro-name]", root)!;
  const count = qs("[data-intro-count]", root)!;
  const meter = qs(".intro__meter", root)!;
  const rail = qs("[data-intro-rail]", root)!;
  const slats = qsa("[data-intro-slats] span", root);

  lenis?.stop();
  const split = new SplitText(name, { type: "lines,chars", linesClass: "line", charsClass: "char", mask: "lines" });
  gsap.set(glow, { scale: 0.35, opacity: 0 });
  gsap.set(role, { opacity: 0, y: 10 });
  gsap.set(slats, { y: 0, yPercent: 100 });

  const counter = { v: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      root.hidden = true;
      introPlayed = true;
    },
  });
  tl.to(glow, { scale: 1, opacity: 1, duration: 1.7, ease: "out" }, 0)
    .to(rail, { scaleX: 1, duration: 1, ease: "inOut" }, 0)
    .to(counter, { v: 100, duration: 1, ease: "inOut", onUpdate: () => { count.textContent = String(Math.round(counter.v)).padStart(2, "0"); } }, 0)
    .from(split.chars, { yPercent: 115, duration: 0.85, stagger: 0.018 }, 0.1)
    .to(role, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
    .to(split.chars, { yPercent: -115, duration: 0.5, stagger: 0.012 }, 1.02)
    .to([meter, role], { opacity: 0, duration: 0.35 }, 1.12)
    .to(slats, { yPercent: 0, duration: 0.58, ease: "inOut", stagger: { each: 0.04 } }, 1.2)
    .add(onReveal, 1.78)
    .set(ink, { autoAlpha: 0 }, 1.98)
    .to(slats, { yPercent: -100, duration: 0.68, ease: "inOut", stagger: { each: 0.04, from: "end" } }, 1.99);
}

function hero(tl: gsap.core.Timeline, on: On, reduce: boolean) {
  const root = qs("[data-hero]");
  if (!root) return;
  const photo = qs("[data-hero-photo]", root);
  const halo = qs("[data-halo]", root)!;
  const halo2 = qs("[data-halo-2]", root)!;
  const name = qs("[data-hero-name]", root)!;
  const tag = qs("[data-hero-tag]", root)!;
  const lede = qs("[data-hero-lede]", root)!;
  const cue = qs("[data-hero-cue]", root)!;
  if (reduce) return;

  const split = new SplitText(name, { type: "lines,chars", linesClass: "line", charsClass: "char", mask: "lines" });
  gsap.set([halo, halo2], { scale: 0.55, opacity: 0 });
  if (photo) gsap.set(photo, { yPercent: 8, scale: 1.05, opacity: 0 });
  gsap.set(split.chars, { yPercent: 118 });
  gsap.set([tag, cue], { opacity: 0, y: 14 });
  gsap.set(lede.children, { opacity: 0, y: 22 });

  tl.to(halo, { scale: 1, opacity: 1, duration: 1.8, ease: "out" }, 0)
    .to(halo2, { scale: 1, opacity: 1, duration: 2.2, ease: "out" }, 0.1)
    .to(split.chars, { yPercent: 0, duration: 1, stagger: 0.022 }, 0.35)
    .to(tag, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
    .to(lede.children, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.7)
    .to(cue, { opacity: 1, y: 0, duration: 0.6 }, 1.1);
  if (photo) tl.to(photo, { yPercent: 0, scale: 1, opacity: 1, duration: 1.6 }, 0.05);

  // Scroll parallax
  const parallax = gsap
    .timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 } })
    .to(halo, { yPercent: -26, scale: 1.25, ease: "none" }, 0)
    .to(halo2, { yPercent: -40, ease: "none" }, 0)
    .to(name, { yPercent: -34, ease: "none" }, 0)
    .to(tag, { yPercent: -34, opacity: 0.2, ease: "none" }, 0)
    .to(cue, { opacity: 0, duration: 0.2 }, 0);
  if (photo) parallax.to(photo, { yPercent: 12, scale: 1.08, ease: "none" }, 0);

  // Pointer parallax + idle breathing
  if (canHover()) {
    const px = photo ? gsap.quickTo(photo, "xPercent", { duration: 1.2, ease: "power2" }) : null;
    const hx = gsap.quickTo(halo, "xPercent", { duration: 1.6, ease: "power2" });
    on(window, "pointermove", (e) => {
      const r = (e as PointerEvent).clientX / window.innerWidth - 0.5;
      px?.(r * -1.6);
      hx(r * 4);
    });
  }
  gsap.to(halo, { scale: 1.08, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
}

function marquee(reduce: boolean) {
  const track = qs("[data-marquee-track]");
  if (!track) return;
  const unit = track.innerHTML;
  while (track.scrollWidth < window.innerWidth * 2) track.innerHTML += unit;
  if (reduce) return;

  const half = track.scrollWidth / 2;
  const tween = gsap.to(track, {
    x: -half,
    duration: half / 60,
    ease: "none",
    repeat: -1,
    modifiers: { x: (x) => `${parseFloat(x) % half}px` },
  });
  let dir = 1;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (self.direction !== dir) {
        dir = self.direction;
        gsap.to(tween, { timeScale: dir, duration: 0.4, overwrite: true });
      }
    },
  });
}

/** Project cards: clip-path reveal, inner parallax and hover zoom. */
function cards(reduce: boolean) {
  const all = qsa("[data-card]");
  if (reduce) return;
  all.forEach((card, i) => {
    const media = qs(".card__media", card);
    const img = qs("[data-card-img]", card);
    const meta = qs(".card__meta", card);
    if (!media || !img || !meta) return;
    gsap
      .timeline({ scrollTrigger: { trigger: card, start: "top 85%" }, delay: (i % 2) * 0.1 })
      .from(media, { clipPath: "inset(100% 0% 0% 0% round 40px)", duration: 1.25, ease: "inOut" })
      .from(img, { scale: 1.22, duration: 1.5, ease: "out" }, 0)
      .from(meta.children, { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.35);
    gsap.fromTo(img, { yPercent: -3.5 }, { yPercent: 3.5, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    card.addEventListener("pointerenter", () => gsap.to(img, { scale: 1.06, duration: 0.8, overwrite: "auto" }));
    card.addEventListener("pointerleave", () => gsap.to(img, { scale: 1, duration: 0.8, overwrite: "auto" }));
  });
}

function reviews(on: On, reduce: boolean) {
  const root = qs(".reviews");
  if (!root) return;
  const slab = qs("[data-slab]", root)!;
  const card = qs("[data-rev-card]", root)!;
  const quote = qs("[data-quote]", root)!;
  const stats = qsa("[data-stat]", root);
  const items = qsa("[data-review]", root);
  const prev = qs<HTMLButtonElement>("[data-rev-prev]", root)!;
  const next = qs<HTMLButtonElement>("[data-rev-next]", root)!;

  if (reduce) {
    qsa("[data-count]", root).forEach((c) => (c.textContent = c.dataset.count ?? "0"));
  } else {
    gsap.set(card, { transformPerspective: 900 });
    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 75%" } })
      .from(slab, { scaleX: 0, duration: 1.1, ease: "inOut" }, 0)
      .from(card, { y: 70, rotateX: -9, opacity: 0, duration: 1.1 }, 0.1)
      .from(quote, { scale: 0.5, opacity: 0, duration: 0.7 }, 0.5)
      .from(stats, { x: 44, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.35);

    qsa("[data-count]", root).forEach((el) => {
      const end = Number(el.dataset.count);
      const counter = { v: 0 };
      gsap.to(counter, {
        v: end,
        duration: 1.5,
        ease: "inOut",
        scrollTrigger: { trigger: root, start: "top 70%" },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.v));
        },
      });
    });

    // 3D tilt on the dark review card
    if (canHover()) {
      const rx = gsap.quickTo(card, "rotateX", { duration: 0.7, ease: "power2" });
      const ry = gsap.quickTo(card, "rotateY", { duration: 0.7, ease: "power2" });
      on(card, "pointermove", (e) => {
        const p = e as PointerEvent;
        const r = card.getBoundingClientRect();
        rx(-((p.clientY - (r.top + r.height / 2)) / r.height) * 9);
        ry(((p.clientX - (r.left + r.width / 2)) / r.width) * 9);
      });
      on(card, "pointerleave", () => {
        rx(0);
        ry(0);
      });
    }
  }

  let index = 0;
  let busy = false;
  const sync = () => {
    prev.disabled = index === 0;
    next.disabled = index === items.length - 1;
  };
  const go = (to: number, dir: 1 | -1) => {
    if (busy || to < 0 || to >= items.length || to === index) return;
    busy = true;
    const out = items[index];
    const incoming = items[to];
    index = to;
    sync();
    if (reduce) {
      out.classList.remove("is-active");
      incoming.classList.add("is-active");
      busy = false;
      return;
    }
    incoming.classList.add("is-active");
    gsap
      .timeline({ onComplete: () => { out.classList.remove("is-active"); busy = false; } })
      .to(out, { yPercent: -12 * dir, opacity: 0, duration: 0.42, ease: "inOut" })
      .fromTo(incoming, { yPercent: 14 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55 }, 0.18);
  };
  on(prev, "click", () => go(index - 1, -1));
  on(next, "click", () => go(index + 1, 1));
  sync();
}

function caseSlider(reduce: boolean) {
  const frame = qs("[data-case-frame]");
  if (!frame) return;
  const slides = qsa("[data-case]", frame);
  const dots = qsa("[data-case-dot]", frame);

  if (!reduce) {
    const first = slides[0];
    gsap
      .timeline({ scrollTrigger: { trigger: frame, start: "top 78%" } })
      .from(qs(".cases__card", frame)!, { y: 60, opacity: 0, duration: 1 }, 0)
      .from(qs(".case__panel", first)!, { clipPath: "inset(0% 100% 0% 0%)", duration: 1.1, ease: "inOut" }, 0.25)
      .from(qs(".case__media img", first)!, { scale: 1.2, duration: 1.4 }, 0.25)
      .from(qs(".case__panel-copy", first)!.children, { y: 26, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.7);
    slides.forEach((s) => {
      gsap.fromTo(qs("img", s)!, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    });
  }

  let index = 0;
  let busy = false;
  const paint = () => dots.forEach((d, i) => d.classList.toggle("is-on", i === index));
  paint();
  const go = (to: number) => {
    if (busy || to === index || !slides[to]) return;
    busy = true;
    const out = slides[index];
    const incoming = slides[to];
    const dir = to > index ? 1 : -1;
    index = to;
    paint();
    if (reduce) {
      out.classList.remove("is-active");
      incoming.classList.add("is-active");
      busy = false;
      return;
    }
    incoming.classList.add("is-active");
    gsap
      .timeline({ onComplete: () => { out.classList.remove("is-active"); busy = false; } })
      .to(out, { xPercent: -6 * dir, opacity: 0, duration: 0.4, ease: "inOut" })
      .fromTo(incoming, { xPercent: 8 * dir, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.6 }, 0.16)
      .fromTo(qs(".case__media img", incoming)!, { scale: 1.12 }, { scale: 1, duration: 1 }, 0.16);
  };
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
}

function advantage(reduce: boolean) {
  const root = qs(".adv");
  if (!root || reduce) return;
  const rules = qsa("[data-rule]", root);
  const cols = qsa("[data-adv-col]", root);
  gsap
    .timeline({ scrollTrigger: { trigger: root, start: "top 72%" } })
    .to(rules[0], { scaleX: 1, duration: 1.3, ease: "inOut" }, 0)
    .from(cols.map((c) => qs(".adv__dot", c)), { scale: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2.4)" }, 0.35)
    .from(cols.flatMap((c) => [qs(".adv__title", c)!, qs(".adv__body", c)!]), { y: 26, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.45)
    .to(rules[1] ?? rules[0], { scaleX: 1, duration: 1.3, ease: "inOut" }, 0.5);
}

function cta(reduce: boolean) {
  const root = qs(".cta");
  if (!root) return;
  const statement = qs("[data-cta-statement]", root)!;
  const button = qs(".cta__btn", root)!;
  const glow = qs("[data-cta-glow]", root)!;
  if (reduce) return;
  const split = new SplitText(statement, { type: "words", wordsClass: "word" });
  gsap
    .timeline({ scrollTrigger: { trigger: root, start: "top 72%" } })
    .from(split.words, { yPercent: 60, opacity: 0, duration: 0.9, stagger: 0.018 })
    .from(button, { y: 24, opacity: 0, duration: 0.7 }, 0.5);
  gsap.fromTo(glow, { yPercent: 18, scale: 0.85 }, { yPercent: -6, scale: 1.05, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: 0.7 } });
}

/* ============================================================ INDEX PAGES */

function pageHead(reduce: boolean) {
  if (reduce) return;
  const glow = qs(".pagehead__glow");
  if (glow) {
    gsap.from(glow, { scale: 0.6, opacity: 0, duration: 1.8 });
    gsap.to(glow, { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".pagehead", start: "top top", end: "bottom top", scrub: 0.8 } });
  }
  const note = qs(".pagehead__note");
  if (note) gsap.from(note, { y: 22, opacity: 0, duration: 0.9, delay: 0.5 });
}

function indexPage(reduce: boolean, kind: "work" | "cases") {
  pageHead(reduce);
  if (kind === "work") {
    cards(reduce);
    skew(reduce);
    return;
  }
  if (reduce) return;
  qsa("[data-csx]").forEach((row, i) => {
    gsap
      .timeline({ scrollTrigger: { trigger: row, start: "top 86%" }, delay: (i % 2) * 0.06 })
      .from(row, { y: 44, opacity: 0, duration: 0.9 })
      .from(qs(".csx__panel", row)!, { clipPath: "inset(0% 100% 0% 0%)", duration: 1, ease: "inOut" }, 0.15)
      .from(qsa(".csx__stats li, .csx__challenge", row), { y: 16, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.5);
    const img = qs("[data-csx-img]", row);
    if (img) gsap.fromTo(img, { yPercent: -2.5 }, { yPercent: 2.5, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  });
}

/* ====================================================== FRACTIONAL CMO SHEET */

function fcmo(reduce: boolean) {
  const shot = qs(".sheet__shot");
  const sheetCard = qs("[data-sheet-card]");
  const back = qs<HTMLAnchorElement>("[data-sheet-back]");

  // "Back" returns to wherever the visitor came from on this site.
  back?.addEventListener("click", (e) => {
    try {
      if (document.referrer && new URL(document.referrer).origin === window.location.origin && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    } catch {
      /* fall through to the link's own href */
    }
  });

  if (reduce) return;

  if (shot) {
    gsap.to(shot, { yPercent: -8, scale: 1.1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.2 } });
    gsap.to(shot, { xPercent: 4, duration: 24, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }
  if (sheetCard) gsap.from(sheetCard, { y: 40, opacity: 0, duration: 1, ease: "out", delay: 0.05 });

  const photo = qs("[data-fc-photo]");
  const halo = qs(".fc__halo");
  gsap.from(qsa(".fc__para, .fc__emphasis"), { y: 22, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.4 });
  if (photo) {
    gsap.from(photo, { scale: 1.1, opacity: 0, duration: 1.6, delay: 0.1 });
    gsap.to(photo, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".fc__hero", start: "top top", end: "bottom top", scrub: 0.7 } });
  }
  if (halo) {
    gsap.from(halo, { scale: 0.6, opacity: 0, duration: 1.9 });
    gsap.to(halo, { scale: 1.12, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  }

  const stats = qs("[data-fc-stats]");
  if (stats) {
    gsap
      .timeline({ scrollTrigger: { trigger: stats, start: "top 92%" } })
      .from(stats, { y: 30, opacity: 0, duration: 0.9 })
      .from(qsa("li", stats), { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.2);
  }

  qsa("[data-panel]").forEach((panel, i) => {
    gsap
      .timeline({ scrollTrigger: { trigger: panel, start: "top 84%" }, delay: i * 0.1 })
      .from(panel, { y: 56, opacity: 0, duration: 1 })
      .from(qs(".fc__panel-title", panel)!, { y: 20, opacity: 0, duration: 0.7 }, 0.2);
  });

  qsa("[data-logo]").forEach((logo, i) => {
    gsap.from(logo, { scale: 0.8, opacity: 0, duration: 0.6, delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.08, ease: "back.out(1.8)", scrollTrigger: { trigger: ".fc__logos", start: "top 90%" } });
  });

  qsa("[data-owncell]").forEach((cell) => {
    gsap
      .timeline({ scrollTrigger: { trigger: cell, start: "top 88%" } })
      .from(qs(".fc__ownicon", cell)!, { scale: 0, rotate: -12, duration: 0.7, ease: "back.out(2)" })
      .from(qs(".fc__ownname", cell)!, { y: 20, opacity: 0, duration: 0.7 }, 0.12)
      .from(qs(".fc__ownbody", cell)!, { y: 20, opacity: 0, duration: 0.7 }, 0.2);
  });

  const howBg = qs("[data-how-bg]");
  if (howBg) {
    gsap.fromTo(howBg, { yPercent: -8, scale: 1.08 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".fc__how", start: "top bottom", end: "bottom top", scrub: 0.8 } });
  }
  const howPhoto = qs("[data-how-photo]");
  if (howPhoto) {
    gsap.from(howPhoto, { clipPath: "inset(100% 0% 0% 0% round 20px)", duration: 1.2, ease: "inOut", scrollTrigger: { trigger: howPhoto, start: "top 88%" } });
    gsap.from(qs("img", howPhoto)!, { scale: 1.2, duration: 1.5, scrollTrigger: { trigger: howPhoto, start: "top 88%" } });
  }

  const fit = qs("[data-fitlist]");
  if (fit) {
    gsap
      .timeline({ scrollTrigger: { trigger: fit, start: "top 82%" } })
      .from(fit, { clipPath: "inset(0% 100% 0% 0% round 40px)", duration: 1.1, ease: "inOut" })
      .from(qsa("[data-fititem] .mark", fit), { scale: 0, duration: 0.5, stagger: 0.07, ease: "back.out(2.4)" }, 0.4)
      .from(qsa("[data-fititem] span", fit), { x: 14, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.45);
  }

  gsap.from(qsa(".fc__diff-cols p"), { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, scrollTrigger: { trigger: ".fc__diff-cols", start: "top 86%" } });
  qsa("[data-rule2]").forEach((rule) => gsap.to(rule, { scaleX: 1, duration: 1.3, ease: "inOut", scrollTrigger: { trigger: rule, start: "top 92%" } }));

  // Bullet lists: marks pop, text slides in.
  qsa(".bullets").forEach((list) => {
    gsap
      .timeline({ scrollTrigger: { trigger: list, start: "top 88%" } })
      .from(qsa("[data-bullet] .mark", list), { scale: 0, duration: 0.45, stagger: 0.06, ease: "back.out(2.4)" })
      .from(qsa("[data-bullet] span", list), { x: 14, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.06);
  });

  const statement = qs("[data-cta-statement]");
  if (statement) {
    const split = new SplitText(statement, { type: "words", wordsClass: "word" });
    gsap.set(split.words, { display: "inline-block" });
    gsap.from(split.words, { yPercent: 60, opacity: 0, duration: 0.85, stagger: 0.02, scrollTrigger: { trigger: statement, start: "top 86%" } });
  }
  qsa("[data-resultcard]").forEach((c) => gsap.from(c, { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: c, start: "top 86%" } }));
}
