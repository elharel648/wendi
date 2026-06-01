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

  /* ===== Floating-features: arrive (scroll) → hold (wheel-lock) → collapse-to-wendi (time) ===
   *
   * Three phases, controlled by a small state machine:
   *
   *  1. "arriving" — scroll-driven. As the sticky stage starts to pin and the
   *     user scrolls through the section, --flt-fp on each card animates 0→1
   *     and the cards fly out from Wendi to their resting positions. Same
   *     behavior as the original site.
   *
   *  2. "locked"   — when all 4 cards have fully arrived (fp ≈ 1) and the
   *     section is fully pinned (rect.top <= 0), we hijack the wheel: scroll
   *     can't advance until the user has flicked the wheel HOLD_TICKS times.
   *     This forces them to actually see the cards before moving on. Each
   *     wheel notch counts as one tick regardless of momentum.
   *
   *  3. "collapsing" — once HOLD_TICKS is reached, we release the lock and
   *     run a TIME-driven collapse-back-to-Wendi animation: --flt-exit
   *     animates 0→1 over EXIT_MS, which (via the existing CSS) translates
   *     cards back to center, shrinks them, fades them out — as if Wendi is
   *     pulling them back into herself. When done, normal scrolling resumes.
   *
   *  Scrolling back up at any point cleanly reverses to the previous phase. */
  useEffect(() => {
    const sec = document.getElementById("flt-section");
    if (!sec) return;
    const feats = Array.from(
      sec.querySelectorAll<HTMLElement>(".flt-feat[data-flt-idx]")
    );
    if (!feats.length) return;

    const isDesktop = !window.matchMedia("(max-width: 1023px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Phase-1 (arrival) windows — gentle, industry-standard pacing.
    // OUT_WINDOW = how spread out each card's arrival is (in normalized progress).
    // OUT_STEP = stagger between cards.
    // ARRIVAL_END = what fraction of the section's scroll the arrival fills.
    // 0.75 means the cards finish landing only when the user has scrolled
    // through 75% of the pinned section — comfortable to follow, not jumpy.
    const OUT_WINDOW = 0.42;
    const OUT_STEP = 0.10;
    const ARRIVAL_END = 0.75;

    // Phase-2 (hold) — how many wheel ticks the user must flick before unlock.
    const HOLD_TICKS = 3;
    // Debounce so trackpad inertia or one fast wheel-flick doesn't burn all
    // 3 ticks instantly. A tick is only counted after this gap.
    const TICK_DEBOUNCE_MS = 220;

    // Phase-3 (collapse-to-Wendi) duration.
    const EXIT_MS = 900;

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const easeOutSlow = (t: number) => 1 - Math.pow(1 - t, 4);
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    type Phase = "arriving" | "locked" | "collapsing" | "done";
    let phase: Phase = "arriving";
    let lockTicks = 0;
    let lastTickAt = 0;
    let exitStart = 0;
    let exitProgress = 0; // current --flt-exit value during collapse
    let rafId = 0;

    const setArrival = (p: number) => {
      feats.forEach((el) => {
        const idx = parseInt(el.dataset.fltIdx || "0", 10);
        const outStart = idx * OUT_STEP;
        const fp = easeOutSlow(clamp((p - outStart) / OUT_WINDOW));
        el.style.setProperty("--flt-fp", fp.toFixed(4));
      });
    };
    const setExit = (e: number) => {
      exitProgress = e;
      feats.forEach((el) => {
        el.style.setProperty("--flt-exit", e.toFixed(4));
      });
    };
    // Initial state
    setArrival(0);
    setExit(0);

    const computeArrivalProgress = () => {
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const raw = total > 0 ? clamp(scrolled / total) : 0;
      // Compress: arrival completes by ARRIVAL_END of section scroll
      return clamp(raw / ARRIVAL_END);
    };

    const onScroll = () => {
      if (phase === "arriving") {
        const p = computeArrivalProgress();
        setArrival(p);
        // Once cards are settled AND the section is fully pinned, enter lock.
        if (p >= 1 && isDesktop && !reduce) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 0) {
            phase = "locked";
            lockTicks = 0;
            lastTickAt = 0;
          }
        }
      } else if (phase === "done") {
        // Scrolled back into the section from below or above — reset.
        const rect = sec.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          phase = "arriving";
          setExit(0);
        }
      }
    };

    const startCollapse = () => {
      phase = "collapsing";
      exitStart = performance.now();
      const step = (now: number) => {
        const t = clamp((now - exitStart) / EXIT_MS);
        setExit(easeInOut(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          phase = "done";
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const reverseCollapse = () => {
      // The user scrolled back during collapse — unwind exit to 0 and go
      // back to "locked" so they can re-do the tick gesture.
      cancelAnimationFrame(rafId);
      const fromValue = exitProgress;
      const start = performance.now();
      const DURATION = 280;
      const step = (now: number) => {
        const t = clamp((now - start) / DURATION);
        setExit(fromValue * (1 - t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          phase = "locked";
          lockTicks = 0;
          lastTickAt = 0;
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (phase === "locked") {
        // Hijack scroll while locked.
        e.preventDefault();
        const dir = Math.sign(e.deltaY);
        if (dir > 0) {
          // count a tick — but only one per debounce window
          const now = performance.now();
          if (now - lastTickAt < TICK_DEBOUNCE_MS) return;
          lastTickAt = now;
          lockTicks += 1;
          if (lockTicks >= HOLD_TICKS) {
            startCollapse();
          }
        } else if (dir < 0) {
          // backing out — reverse arrival a bit and exit lock immediately
          phase = "arriving";
          // Nudge scroll up so the user feels their gesture worked
          window.scrollBy({ top: -80, behavior: "smooth" });
        }
      } else if (phase === "collapsing") {
        // Allow user to abort the collapse by scrolling back up.
        if (e.deltaY < 0) {
          e.preventDefault();
          reverseCollapse();
        }
        // scrolling down during collapse is fine — let the page move on
      }
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY;
      if (phase === "locked") {
        if (Math.abs(dy) < 30) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const now = performance.now();
        if (now - lastTickAt < TICK_DEBOUNCE_MS) {
          touchY = e.touches[0].clientY;
          return;
        }
        lastTickAt = now;
        if (dy > 0) {
          lockTicks += 1;
          if (lockTicks >= HOLD_TICKS) startCollapse();
        } else {
          phase = "arriving";
          window.scrollBy({ top: -80, behavior: "smooth" });
        }
        touchY = e.touches[0].clientY;
      } else if (phase === "collapsing" && dy < 0) {
        e.preventDefault();
        reverseCollapse();
      }
    };
    const onTouchEnd = () => {
      touchY = null;
    };

    const onKey = (e: KeyboardEvent) => {
      if (phase === "locked") {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          const now = performance.now();
          if (now - lastTickAt < TICK_DEBOUNCE_MS) return;
          lastTickAt = now;
          lockTicks += 1;
          if (lockTicks >= HOLD_TICKS) startCollapse();
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault();
          phase = "arriving";
          window.scrollBy({ top: -80, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    onScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
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
