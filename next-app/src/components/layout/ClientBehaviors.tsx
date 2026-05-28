"use client";

import { useEffect } from "react";

/**
 * Ports the inline `<script>` behaviors from the original index.html.
 * Each effect attaches once after mount and cleans up on unmount.
 *
 * Note: this is a verbatim port of the legacy imperative JS. It expects
 * the legacy class names (`.fade-up`, `.st-stat`, `.mob-acc-item`, etc.)
 * present on rendered sections.
 */
export function ClientBehaviors() {
  /* ===== Generic reveal-on-scroll for legacy animation classes ===== */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(
        ".fade-up,.reveal-right,.reveal-left,.reveal-scale,.stagger,.glitch-title"
      )
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ===== Floating-features section: add .flt-in when in view ===== */
  useEffect(() => {
    const sec = document.getElementById("flt-section");
    if (!sec) return;
    if (!("IntersectionObserver" in window)) {
      sec.classList.add("flt-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            sec.classList.add("flt-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  /* ===== Floating-features: scroll-driven fly-out + fly-back-in ===== */
  useEffect(() => {
    const sec = document.getElementById("flt-section");
    if (!sec) return;
    const feats = Array.from(
      sec.querySelectorAll<HTMLElement>(".flt-feat[data-flt-idx]")
    );
    if (!feats.length) return;

    // Phase 1: fly-OUT from character (cards arrive into place).
    // Phase 2: linear/stripe-style EXIT — cards drift further outward with
    // increasing blur + fade as scroll progresses, never collapsing back.
    const OUT_WINDOW = 0.32;
    const OUT_STEP = 0.08;
    const HOLD_END = 0.60;   // arrival settles by here
    const EXIT_START = 0.62; // exit drift begins
    const EXIT_WINDOW = 0.22; // total exit duration
    const EXIT_STEP = 0.04;  // per-card stagger on exit (further cards leave later)

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const easeOutSlow = (t: number) => 1 - Math.pow(1 - t, 4);
    // smooth ease-in-out for a graceful exit drift
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const tick = () => {
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = total > 0 ? clamp(scrolled / total) : 0;

      feats.forEach((el) => {
        const idx = parseInt(el.dataset.fltIdx || "0", 10);

        // arrival progress (0 → 1 as the card flies into view)
        const outStart = idx * OUT_STEP;
        const fp = easeOutSlow(clamp((p - outStart) / OUT_WINDOW));
        el.style.setProperty("--flt-fp", fp.toFixed(4));

        // exit progress (0 → 1 as the card drifts away outward + blurs)
        const exitStart = EXIT_START + idx * EXIT_STEP;
        const exitRaw = clamp((p - exitStart) / EXIT_WINDOW);
        const exit = easeInOut(exitRaw);
        el.style.setProperty("--flt-exit", exit.toFixed(4));
      });
    };

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    tick();
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  /* ===== Stats counter — animates .st-count from 0 to data-to ===== */
  useEffect(() => {
    const done = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const stat = entry.target;
          if (done.has(stat)) return;
          done.add(stat);
          const el = stat.querySelector<HTMLElement>(".st-count");
          if (!el) return;
          const target = parseInt(el.getAttribute("data-to") || "0", 10);
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.floor(eased * target));
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = String(target);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".st-stat").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ===== Adds .st-visible on .st-stat when first seen ===== */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("st-visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".st-stat").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ===== Cinematic platform statement — scroll-driven CSS vars ===== */
  useEffect(() => {
    const outer = document.getElementById("cin-statement");
    if (!outer) return;
    const sticky = outer.querySelector<HTMLElement>(".cin-sticky");
    const vigTop = outer.querySelector<HTMLElement>(".cin-vignette-top");
    const vigBot = outer.querySelector<HTMLElement>(".cin-vignette-bot");
    if (!sticky) return;

    const tick = () => {
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = total > 0 ? Math.min(1, scrolled / total) : 0;
      const pa = Math.min(1, p / 0.4);
      const pr = Math.min(1, Math.max(0, (p - 0.28) / 0.26));
      const pb = Math.min(1, Math.max(0, (p - 0.57) / 0.28));
      sticky.style.setProperty("--cin-p", p.toFixed(4));
      sticky.style.setProperty("--cin-pa", pa.toFixed(4));
      sticky.style.setProperty("--cin-pr", pr.toFixed(4));
      sticky.style.setProperty("--cin-pb", pb.toFixed(4));
      if (vigTop) vigTop.style.opacity = Math.max(0, 1 - p / 0.22).toFixed(3);
      if (vigBot) vigBot.style.opacity = Math.max(0, (p - 0.78) / 0.22).toFixed(3);
    };

    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, []);

  /* ===== Mobile showcase — accordion + peek carousel ===== */
  useEffect(() => {
    const stage = document.getElementById("mobStage");
    const track = document.getElementById("mobTrack");
    const dotsEl = document.getElementById("mobDots");
    const prevBtn = document.getElementById("mobPrev");
    const nextBtn = document.getElementById("mobNext");
    if (!stage || !track || !dotsEl) return;

    const accItems = Array.from(
      document.querySelectorAll<HTMLElement>(".mob-acc-item")
    );
    const allCards = Array.from(
      track.querySelectorAll<HTMLElement>(".mob-card")
    );
    const GAP = 20;
    let currentIdx = 0;
    let visibleCards: HTMLElement[] = allCards.slice();

    const getCardW = () => 300;

    const buildDots = () => {
      dotsEl.innerHTML = "";
      visibleCards.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "mob-dot" + (i === currentIdx ? " mob-dot-on" : "");
        d.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(d);
      });
    };

    const goTo = (idx: number) => {
      if (!visibleCards.length) return;
      currentIdx =
        ((idx % visibleCards.length) + visibleCards.length) %
        visibleCards.length;
      const cardW = getCardW();
      if (cardW < 20) return;
      allCards.forEach((c) => (c.style.width = cardW + "px"));
      let beforeCount = 0;
      for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].style.display === "none") continue;
        if (allCards[i] === visibleCards[currentIdx]) break;
        beforeCount++;
      }
      const tx = stage.offsetWidth / 2 - cardW / 2 - beforeCount * (cardW + GAP);
      track.style.transform = `translateX(${tx}px)`;
      visibleCards.forEach((card, i) => {
        const d = Math.abs(i - currentIdx);
        card.style.opacity = d === 0 ? "1" : d === 1 ? "0.45" : "0.15";
        card.style.transform = d === 0 ? "scale(1)" : "scale(0.92)";
        card.classList.toggle("is-center", d === 0);
      });
      Array.from(dotsEl.querySelectorAll(".mob-dot")).forEach((dot, i) => {
        dot.classList.toggle("mob-dot-on", i === currentIdx);
      });
    };

    const filterCat = (cat: string) => {
      allCards.forEach((c) => {
        const show = cat === "all" || c.dataset.cat === cat;
        c.style.display = show ? "flex" : "none";
        c.style.opacity = "";
        c.style.transform = "";
        c.style.width = "";
      });
      visibleCards = allCards.filter((c) => c.style.display !== "none");
      const startIdx = visibleCards.length > 2 ? 1 : 0;
      currentIdx = startIdx;
      buildDots();
      goTo(startIdx);
    };

    const handlers: Array<() => void> = [];

    accItems.forEach((item) => {
      const onClick = () => {
        accItems.forEach((it) => {
          it.classList.remove("mob-acc-item-on");
          it.querySelector(".mob-acc-body")?.classList.remove("mob-acc-body-on");
        });
        item.classList.add("mob-acc-item-on");
        item.querySelector(".mob-acc-body")?.classList.add("mob-acc-body-on");
        filterCat(item.dataset.cat || "all");
      };
      item.addEventListener("click", onClick);
      handlers.push(() => item.removeEventListener("click", onClick));
    });

    const onPrev = () => goTo(currentIdx - 1);
    const onNext = () => goTo(currentIdx + 1);
    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);

    /* ─── drag / swipe on the carousel ─── */
    const DRAG_THRESHOLD = 6; // px of motion before we consider it a drag
    let isDown = false;
    let didDrag = false;
    let startX = 0;
    let startTx = 0;
    const trackEl = track as HTMLElement;
    const stageEl = stage as HTMLElement;

    const readCurrentTx = () => {
      const m = /translateX\((-?\d*\.?\d+)px\)/.exec(trackEl.style.transform || "");
      return m ? parseFloat(m[1]) : 0;
    };

    const onDragStart = (clientX: number) => {
      if (!visibleCards.length) return;
      isDown = true;
      didDrag = false;
      startX = clientX;
      startTx = readCurrentTx();
      trackEl.style.transition = "none";
      stageEl.classList.add("mob-dragging");
    };

    const onDragMove = (clientX: number) => {
      if (!isDown) return;
      const dx = clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) didDrag = true;
      trackEl.style.transform = `translateX(${startTx + dx}px)`;
    };

    const onDragEnd = (clientX: number) => {
      if (!isDown) return;
      isDown = false;
      trackEl.style.transition = "";
      stageEl.classList.remove("mob-dragging");
      if (!didDrag) return;
      const dx = clientX - startX;
      const cardW = getCardW();
      // each step is cardW + GAP. Snap to the nearest based on drag distance.
      // In RTL track layout dragging right (dx > 0) moves to previous card.
      const step = cardW + GAP;
      const offset = -Math.round(dx / step);
      goTo(currentIdx + offset);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      onDragStart(e.clientX);
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => onDragMove(e.clientX);
    const onMouseUp = (e: MouseEvent) => onDragEnd(e.clientX);
    const onMouseLeave = (e: MouseEvent) => {
      if (isDown) onDragEnd(e.clientX);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      onDragStart(e.touches[0].clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDown || e.touches.length !== 1) return;
      onDragMove(e.touches[0].clientX);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) onDragEnd(t.clientX);
    };

    // Swallow the click that follows a drag, so card-clicks don't fire.
    const onClickCapture = (e: MouseEvent) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    };

    stageEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    stageEl.addEventListener("mouseleave", onMouseLeave);
    stageEl.addEventListener("touchstart", onTouchStart, { passive: true });
    stageEl.addEventListener("touchmove", onTouchMove, { passive: true });
    stageEl.addEventListener("touchend", onTouchEnd);
    stageEl.addEventListener("click", onClickCapture, true);

    const firstCat = accItems[0]?.dataset.cat || "all";
    if (accItems[0]) {
      accItems[0].classList.add("mob-acc-item-on");
      accItems[0]
        .querySelector(".mob-acc-body")
        ?.classList.add("mob-acc-body-on");
    }

    let inited = false;
    const init = () => {
      if (inited) return;
      if (stage.offsetWidth < 40) {
        requestAnimationFrame(init);
        return;
      }
      inited = true;
      filterCat(firstCat);
    };
    requestAnimationFrame(init);
    const safety = setTimeout(() => {
      if (!inited) {
        inited = true;
        filterCat(firstCat);
      } else {
        goTo(currentIdx);
      }
    }, 120);

    const onResize = () => goTo(currentIdx);
    window.addEventListener("resize", onResize);

    return () => {
      handlers.forEach((cleanup) => cleanup());
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
      window.removeEventListener("resize", onResize);
      stageEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      stageEl.removeEventListener("mouseleave", onMouseLeave);
      stageEl.removeEventListener("touchstart", onTouchStart);
      stageEl.removeEventListener("touchmove", onTouchMove);
      stageEl.removeEventListener("touchend", onTouchEnd);
      stageEl.removeEventListener("click", onClickCapture, true);
      clearTimeout(safety);
    };
  }, []);

  return null;
}
