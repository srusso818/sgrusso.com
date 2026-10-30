/* ==========================================================================
   SGRusso.com — Interactive & Kinetic Dossier Controller
   Zero external runtime dependencies. GPU-composited, accessible, 60fps.
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.SGR_DATA;
  if (!DATA) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     1. Theme Management with Native View Transitions (Slate <-> Paper)
     ------------------------------------------------------------------------ */
  const rootEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  function getCurrentTheme() {
    return rootEl.getAttribute("data-theme") || "dark";
  }

  function applyTheme(theme, animate) {
    const updateDom = function () {
      rootEl.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("sgr-theme", theme);
      } catch (_) {}
      if (themeLabel) {
        themeLabel.textContent = theme === "dark" ? "PAPER" : "SLATE";
      }
      if (themeBtn) {
        themeBtn.setAttribute(
          "aria-label",
          theme === "dark"
            ? "Switch to warm paper light mode"
            : "Switch to slate dark mode"
        );
      }
    };

    if (
      animate &&
      !prefersReducedMotion &&
      typeof document.startViewTransition === "function"
    ) {
      document.startViewTransition(updateDom);
    } else {
      updateDom();
    }
  }

  applyTheme(getCurrentTheme(), false);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const next = getCurrentTheme() === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  /* ------------------------------------------------------------------------
     2. Sticky Header Scroll-Progress Bar & Live NWA Telemetry Clock
     ------------------------------------------------------------------------ */
  const progressBar = document.getElementById("scroll-progress-bar");
  let scrollTicking = false;

  function updateScrollProgress() {
    scrollTicking = false;
    if (!progressBar) return;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    progressBar.style.transform = "scaleX(" + progress.toFixed(4) + ")";
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollProgress);
      }
    },
    { passive: true }
  );
  updateScrollProgress();

  const liveClock = document.getElementById("live-clock");
  if (liveClock) {
    const updateClock = function () {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Chicago",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(now);
        liveClock.textContent = "NWA · " + formatted + " CT";
      } catch (_) {
        liveClock.textContent = "REV 04.26";
      }
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ------------------------------------------------------------------------
     3. Hero Orthogonal Blueprint Signal Trace Canvas
     Subtle, low-CPU datacenter packet pulses routing along the 20px grid
     ------------------------------------------------------------------------ */
  const heroCanvas = document.getElementById("hero-signal-canvas");
  if (heroCanvas && !prefersReducedMotion) {
    const ctx = heroCanvas.getContext("2d");
    const heroPane = heroCanvas.parentElement;
    const GRID = 20;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let heroVisible = true;
    let pointerX = -999;
    let pointerY = -999;
    const pulses = [];
    const MAX_PULSES = 6;

    function resizeCanvas() {
      if (!heroPane || !ctx) return;
      const rect = heroPane.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnPulse() {
      if (width < 80 || height < 80) return;
      const cols = Math.floor(width / GRID);
      const rows = Math.floor(height / GRID);
      const horizontal = Math.random() > 0.38;
      const gx = Math.floor(Math.random() * cols) * GRID;
      const gy = Math.floor(Math.random() * rows) * GRID;
      const dir = Math.random() > 0.5 ? 1 : -1;
      pulses.push({
        x: gx,
        y: gy,
        vx: horizontal ? dir * 1.15 : 0,
        vy: horizontal ? 0 : dir * 1.15,
        trail: [],
        life: 0,
        maxLife: 130 + Math.floor(Math.random() * 90),
        turned: false
      });
    }

    resizeCanvas();
    for (let i = 0; i < 4; i++) spawnPulse();

    window.addEventListener("resize", resizeCanvas, { passive: true });

    if (heroPane) {
      heroPane.addEventListener(
        "pointermove",
        function (e) {
          const r = heroPane.getBoundingClientRect();
          pointerX = e.clientX - r.left;
          pointerY = e.clientY - r.top;
        },
        { passive: true }
      );
      heroPane.addEventListener(
        "pointerleave",
        function () {
          pointerX = -999;
          pointerY = -999;
        },
        { passive: true }
      );
    }

    if ("IntersectionObserver" in window && heroPane) {
      const heroObs = new IntersectionObserver(function (entries) {
        heroVisible = entries[0] ? entries[0].isIntersecting : true;
      });
      heroObs.observe(heroPane);
    }

    function drawSignalFrame() {
      if (heroVisible && ctx && width > 0) {
        ctx.clearRect(0, 0, width, height);
        const isDark = getCurrentTheme() === "dark";
        const rgb = isDark ? "224, 159, 80" : "156, 74, 26";

        // Subtle cursor-proximate blueprint crosshair nodes
        if (pointerX > 0 && pointerY > 0) {
          const snapX = Math.round(pointerX / GRID) * GRID;
          const snapY = Math.round(pointerY / GRID) * GRID;
          for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
              const nx = snapX + dx * GRID;
              const ny = snapY + dy * GRID;
              const dist = Math.hypot(nx - pointerX, ny - pointerY);
              if (dist < 56) {
                const alpha = (1 - dist / 56) * (isDark ? 0.34 : 0.24);
                ctx.fillStyle = "rgba(" + rgb + "," + alpha.toFixed(3) + ")";
                ctx.fillRect(nx - 1.5, ny - 1.5, 3, 3);
              }
            }
          }
        }

        if (pulses.length < MAX_PULSES && Math.random() < 0.035) {
          spawnPulse();
        }

        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 26) p.trail.shift();

          // Orthogonal 90-degree route turn on grid intersection
          if (
            !p.turned &&
            p.life > 35 &&
            Math.abs(p.x % GRID) < 1.2 &&
            Math.abs(p.y % GRID) < 1.2 &&
            Math.random() < 0.08
          ) {
            p.x = Math.round(p.x / GRID) * GRID;
            p.y = Math.round(p.y / GRID) * GRID;
            const sign = Math.random() > 0.5 ? 1 : -1;
            if (p.vx !== 0) {
              p.vy = sign * Math.abs(p.vx);
              p.vx = 0;
            } else {
              p.vx = sign * Math.abs(p.vy);
              p.vy = 0;
            }
            p.turned = true;
          }

          const env =
            p.life < 20
              ? p.life / 20
              : p.life > p.maxLife - 28
              ? Math.max(0, (p.maxLife - p.life) / 28)
              : 1;

          if (p.trail.length > 2 && env > 0.01) {
            for (let t = 1; t < p.trail.length; t++) {
              const segAlpha =
                (t / p.trail.length) * env * (isDark ? 0.24 : 0.17);
              ctx.strokeStyle = "rgba(" + rgb + "," + segAlpha.toFixed(3) + ")";
              ctx.lineWidth = 1.25;
              ctx.beginPath();
              ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
              ctx.lineTo(p.trail[t].x, p.trail[t].y);
              ctx.stroke();
            }
            const head = p.trail[p.trail.length - 1];
            ctx.fillStyle =
              "rgba(" + rgb + "," + (env * (isDark ? 0.65 : 0.48)).toFixed(3) + ")";
            ctx.fillRect(head.x - 1.5, head.y - 1.5, 3, 3);
          }

          if (
            p.life >= p.maxLife ||
            p.x < -20 ||
            p.x > width + 20 ||
            p.y < -20 ||
            p.y > height + 20
          ) {
            pulses.splice(i, 1);
          }
        }
      }
      window.requestAnimationFrame(drawSignalFrame);
    }

    window.requestAnimationFrame(drawSignalFrame);
  }

  /* ------------------------------------------------------------------------
     4. Metric Counter Roll-Up & Hardware Cipher Reveal
     ------------------------------------------------------------------------ */
  if (!prefersReducedMotion) {
    document.querySelectorAll("[data-metric-target]").forEach(function (el) {
      const target = Number(el.getAttribute("data-metric-target") || "0");
      const prefix = el.getAttribute("data-metric-prefix") || "";
      const suffix = el.getAttribute("data-metric-suffix") || "";
      const duration = 1050;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(target * eased);
        el.textContent = prefix + current + suffix;
        if (t < 1) window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    });

    document.querySelectorAll("[data-metric-decode]").forEach(function (el) {
      const finalStr = el.getAttribute("data-metric-decode") || "H100";
      const glyphs = "0189ABCDEFGHX";
      let step = 0;
      const totalSteps = 12;
      const iv = setInterval(function () {
        step++;
        if (step >= totalSteps) {
          el.textContent = finalStr;
          clearInterval(iv);
          return;
        }
        el.textContent = finalStr
          .split("")
          .map(function (ch, idx) {
            if (step / totalSteps > (idx + 1) / (finalStr.length + 1)) return ch;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");
      }, 42);
    });
  }

  /* ------------------------------------------------------------------------
     5. Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const primaryNav = document.getElementById("primary-nav");

  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("is-open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
      mobileMenuBtn.textContent = isOpen ? "CLOSE" : "INDEX";
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.textContent = "INDEX";
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. Enterprise AI Interactive System Topology, Auto-Tour & Inspector Crossfade
     ------------------------------------------------------------------------ */
  const aiPlatformLayout = document.getElementById("ai-platform-layout");
  const topologyMount = document.getElementById("ai-topology");
  const inspectorMount = document.getElementById("ai-inspector");
  const tourStatusBadge = document.getElementById("ai-tour-status");

  let currentAiLayerIdx = 0;
  let tourLockedManual = false;
  let tourHoverPaused = false;
  let tourTimer = null;
  let aiPlatformInView = false;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function updateTourBadge() {
    if (!tourStatusBadge) return;
    const textSpan = tourStatusBadge.querySelector("span:last-child");
    if (!textSpan) return;

    if (tourLockedManual) {
      tourStatusBadge.classList.add("is-paused");
      textSpan.textContent = "MANUAL INSPECT · LAYER LOCKED";
    } else if (tourHoverPaused || prefersReducedMotion) {
      tourStatusBadge.classList.add("is-paused");
      textSpan.textContent = "TELEMETRY HELD · READY";
    } else {
      tourStatusBadge.classList.remove("is-paused");
      textSpan.textContent = "AUTO-TELEMETRY · HOVER TO HOLD";
    }
  }

  function renderAiInspector(layer) {
    if (!inspectorMount || !layer) return;
    const bulletsHtml = layer.bullets
      .map(function (b) {
        return "<li>" + escapeHtml(b) + "</li>";
      })
      .join("");

    const tagsHtml = layer.tags
      .map(function (t) {
        return '<span class="spec-tag">' + escapeHtml(t) + "</span>";
      })
      .join("");

    inspectorMount.innerHTML =
      '<div class="inspector-content-anim">' +
      "<div>" +
      '<div class="inspector-eyebrow">' + escapeHtml(layer.eyebrow) + "</div>" +
      '<h3 class="inspector-title">' + escapeHtml(layer.title) + "</h3>" +
      '<p class="inspector-summary">' + escapeHtml(layer.summary) + "</p>" +
      '<ul class="inspector-list">' + bulletsHtml + "</ul>" +
      "</div>" +
      '<div><div class="spec-tags">' + tagsHtml + "</div></div>" +
      "</div>";
  }

  function syncTourSweepState() {
    if (!topologyMount) return;
    const activelyTouring =
      !tourLockedManual && !tourHoverPaused && !prefersReducedMotion && aiPlatformInView;
    topologyMount.querySelectorAll(".topology-node").forEach(function (btn) {
      const isSel = btn.classList.contains("is-selected");
      btn.classList.remove("is-touring");
      if (isSel && activelyTouring) {
        // Force reflow so sweep animation restarts cleanly
        void btn.offsetWidth;
        btn.classList.add("is-touring");
      }
    });
  }

  function selectAiLayerByIndex(idx) {
    currentAiLayerIdx = (idx + DATA.aiLayers.length) % DATA.aiLayers.length;
    const selected = DATA.aiLayers[currentAiLayerIdx];

    if (topologyMount) {
      topologyMount.querySelectorAll(".topology-node").forEach(function (btn) {
        const active = btn.getAttribute("data-layer-id") === selected.id;
        btn.classList.toggle("is-selected", active);
        btn.setAttribute("aria-selected", String(active));
        const ind = btn.querySelector(".node-indicator");
        if (ind) ind.textContent = active ? "ACTIVE ▸" : "INSPECT";
      });
    }
    renderAiInspector(selected);
    syncTourSweepState();
  }

  function scheduleAiTour() {
    clearInterval(tourTimer);
    if (prefersReducedMotion || tourLockedManual || tourHoverPaused || !aiPlatformInView) {
      syncTourSweepState();
      return;
    }
    syncTourSweepState();
    tourTimer = setInterval(function () {
      if (!tourLockedManual && !tourHoverPaused && aiPlatformInView) {
        selectAiLayerByIndex(currentAiLayerIdx + 1);
      }
    }, 5200);
  }

  if (topologyMount && inspectorMount) {
    const parts = [];
    DATA.aiLayers.forEach(function (layer, idx) {
      parts.push(
        '<button type="button" role="tab" class="topology-node spotlight-surface' +
          (idx === 0 ? " is-selected" : "") +
          '" data-layer-id="' +
          escapeHtml(layer.id) +
          '" data-layer-idx="' +
          idx +
          '" aria-selected="' +
          (idx === 0 ? "true" : "false") +
          '">' +
          '<span class="node-layer-id">' + escapeHtml(layer.code) + "</span>" +
          '<span class="node-main">' +
          '<span class="node-title">' + escapeHtml(layer.title) + "</span>" +
          '<span class="node-tech-preview">' + escapeHtml(layer.preview) + "</span>" +
          "</span>" +
          '<span class="node-indicator">' + (idx === 0 ? "ACTIVE ▸" : "INSPECT") + "</span>" +
          "</button>"
      );

      if (idx < DATA.aiLayers.length - 1) {
        const busLabel =
          idx === 0
            ? "NVLink / PCIe Gen5 Compute Bus"
            : idx === 1
            ? "OpenAI-Compatible REST & Async Worker Queues"
            : "Internal TLS Endpoints, RAG & SIP/Voice Trunk";
        parts.push(
          '<div class="topology-connector" aria-hidden="true">' +
            '<span class="connector-line"></span>' +
            "<span>↕ " + escapeHtml(busLabel) + "</span>" +
            "</div>"
        );
      }
    });

    topologyMount.innerHTML = parts.join("");
    renderAiInspector(DATA.aiLayers[0]);
    updateTourBadge();

    topologyMount.addEventListener("click", function (e) {
      const btn = e.target.closest(".topology-node");
      if (!btn) return;
      tourLockedManual = true;
      updateTourBadge();
      clearInterval(tourTimer);
      selectAiLayerByIndex(Number(btn.getAttribute("data-layer-idx") || "0"));
    });

    if (aiPlatformLayout) {
      aiPlatformLayout.addEventListener("pointerenter", function () {
        tourHoverPaused = true;
        updateTourBadge();
        scheduleAiTour();
      });
      aiPlatformLayout.addEventListener("pointerleave", function () {
        tourHoverPaused = false;
        updateTourBadge();
        scheduleAiTour();
      });

      if ("IntersectionObserver" in window) {
        const aiObs = new IntersectionObserver(
          function (entries) {
            aiPlatformInView = entries[0] ? entries[0].isIntersecting : false;
            scheduleAiTour();
          },
          { threshold: 0.2 }
        );
        aiObs.observe(aiPlatformLayout);
      }
    }
  }

  /* ------------------------------------------------------------------------
     7. Selected Enterprise Case Studies Ledger (Fluid 0fr->1fr Accordion)
     ------------------------------------------------------------------------ */
  const caseMount = document.getElementById("case-ledger");
  const filterChips = document.querySelectorAll(".filter-chip");

  function renderCases() {
    if (!caseMount) return;
    caseMount.innerHTML = DATA.caseStudies
      .map(function (cs, idx) {
        const isOpen = idx === 0;
        const stackHtml = cs.stack
          .map(function (s) {
            return '<span class="spec-tag">' + escapeHtml(s) + "</span>";
          })
          .join("");

        return (
          '<article class="case-item reveal-block' +
          (isOpen ? " is-open" : "") +
          '" id="case-' +
          escapeHtml(cs.num) +
          '" data-category="' +
          escapeHtml(cs.category) +
          '">' +
          '<button type="button" class="case-trigger" aria-expanded="' +
          String(isOpen) +
          '">' +
          '<span class="case-num">' + escapeHtml(cs.num) + "</span>" +
          '<span class="case-heading-group">' +
          '<span class="case-domain-label">' + escapeHtml(cs.domainLabel) + "</span>" +
          '<h3 class="case-title">' + escapeHtml(cs.title) + "</h3>" +
          "</span>" +
          '<p class="case-brief">' + escapeHtml(cs.brief) + "</p>" +
          '<span class="case-toggle-label">' +
          (isOpen ? "CLOSE −" : "SPECS +") +
          "</span>" +
          "</button>" +
          '<div class="case-detail-shell">' +
          '<div class="case-detail-inner">' +
          '<div class="case-detail">' +
          '<div class="case-detail-grid">' +
          '<div class="detail-col">' +
          '<span class="detail-col-label">01 // Operational Context</span>' +
          "<p>" + escapeHtml(cs.challenge) + "</p>" +
          "</div>" +
          '<div class="detail-col">' +
          '<span class="detail-col-label">02 // Architectural Execution</span>' +
          "<p>" + escapeHtml(cs.architecture) + "</p>" +
          "</div>" +
          '<div class="detail-col">' +
          '<span class="detail-col-label">03 // Verified Impact</span>' +
          "<p>" + escapeHtml(cs.outcome) + "</p>" +
          "</div>" +
          "</div>" +
          '<div class="case-stack-footer">' + stackHtml + "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    caseMount.addEventListener("click", function (e) {
      const trigger = e.target.closest(".case-trigger");
      if (!trigger) return;
      const item = trigger.closest(".case-item");
      if (!item) return;
      const nowOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(nowOpen));
      const lbl = trigger.querySelector(".case-toggle-label");
      if (lbl) lbl.textContent = nowOpen ? "CLOSE −" : "SPECS +";
    });
  }

  renderCases();

  filterChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      const filter = chip.getAttribute("data-filter") || "all";
      filterChips.forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
      });

      if (!caseMount) return;
      let visibleOrder = 0;
      caseMount.querySelectorAll(".case-item").forEach(function (item) {
        const match =
          filter === "all" || item.getAttribute("data-category") === filter;
        item.hidden = !match;
        item.classList.remove("is-filtering-in");
        if (match && !prefersReducedMotion) {
          item.style.animationDelay = visibleOrder * 45 + "ms";
          void item.offsetWidth;
          item.classList.add("is-filtering-in");
          visibleOrder++;
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     8. Capabilities Matrix & Career Ledger Rendering
     ------------------------------------------------------------------------ */
  const capMount = document.getElementById("capabilities-grid");
  if (capMount) {
    capMount.innerHTML = DATA.capabilities
      .map(function (cap, idx) {
        const itemsHtml = cap.items
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("");
        return (
          '<div class="capability-cell spotlight-surface reveal-block" style="--reveal-delay:' +
          (idx % 3) * 65 +
          'ms">' +
          '<div class="cap-header">' +
          '<span class="cap-code">' + escapeHtml(cap.code) + "</span>" +
          '<h3 class="cap-title">' + escapeHtml(cap.title) + "</h3>" +
          '<p class="cap-desc">' + escapeHtml(cap.desc) + "</p>" +
          "</div>" +
          '<ul class="cap-items">' + itemsHtml + "</ul>" +
          "</div>"
        );
      })
      .join("");
  }

  const timelineMount = document.getElementById("timeline-list");
  if (timelineMount) {
    timelineMount.innerHTML = DATA.career
      .map(function (job) {
        const bullets = job.highlights
          .map(function (h) {
            return "<li>" + escapeHtml(h) + "</li>";
          })
          .join("");
        return (
          '<article class="timeline-entry reveal-block">' +
          '<div class="timeline-meta">' +
          '<span class="timeline-dates">' + escapeHtml(job.dates) + "</span>" +
          '<span class="timeline-location">' + escapeHtml(job.location) + "</span>" +
          '<span class="timeline-sector">' + escapeHtml(job.sector) + "</span>" +
          "</div>" +
          '<div class="timeline-body">' +
          '<div class="timeline-header">' +
          '<h3 class="timeline-org">' + escapeHtml(job.org) + "</h3>" +
          '<span class="timeline-role">' + escapeHtml(job.role) + "</span>" +
          "</div>" +
          '<p class="timeline-summary">' + escapeHtml(job.summary) + "</p>" +
          '<ul class="timeline-highlights">' + bullets + "</ul>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     9. Blueprint Scroll-Reveal Choreography & Tactile Cursor Illumination
     ------------------------------------------------------------------------ */
  document
    .querySelectorAll(".outcome-cell, .cred-cell, .contact-direct, .contact-form-pane")
    .forEach(function (el, idx) {
      el.classList.add("reveal-block");
      el.style.setProperty("--reveal-delay", (idx % 4) * 55 + "ms");
    });

  document.querySelectorAll(".resume-callout").forEach(function (el) {
    el.classList.add("spotlight-surface");
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document
      .querySelectorAll(".reveal-block, .section-rail")
      .forEach(function (el) {
        revealObs.observe(el);
      });
  } else {
    document
      .querySelectorAll(".reveal-block, .section-rail")
      .forEach(function (el) {
        el.classList.add("is-revealed");
      });
  }

  // Delegated cursor-tracking for subtle radial spotlight surfaces
  document.addEventListener(
    "pointermove",
    function (e) {
      const surface = e.target.closest(".spotlight-surface");
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--mx", Math.round(e.clientX - rect.left) + "px");
      surface.style.setProperty("--my", Math.round(e.clientY - rect.top) + "px");
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------------
     10. Copy-to-Clipboard Controls
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const value = btn.getAttribute("data-copy");
      if (!value || !navigator.clipboard) return;
      const original = btn.textContent;
      navigator.clipboard.writeText(value).then(function () {
        btn.textContent = "COPIED";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1800);
      });
    });
  });

  /* ------------------------------------------------------------------------
     11. Contact Dispatch Form
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById("dispatch-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const org = String(fd.get("organization") || "").trim();
      const topic = String(
        fd.get("topic") || "Senior Infrastructure / Architecture Role"
      ).trim();
      const message = String(fd.get("message") || "").trim();

      const endpoint = contactForm.getAttribute("data-endpoint");
      if (endpoint) {
        if (formStatus) formStatus.textContent = "TRANSMITTING...";
        fetch(endpoint, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Endpoint error");
            contactForm.reset();
            if (formStatus) {
              formStatus.textContent = "DISPATCH RECEIVED — THANK YOU.";
              formStatus.classList.add("is-success");
            }
          })
          .catch(function () {
            triggerMailtoFallback(name, email, org, topic, message);
          });
        return;
      }

      triggerMailtoFallback(name, email, org, topic, message);
    });
  }

  function triggerMailtoFallback(name, email, org, topic, message) {
    const subject = "[SGRusso.com] " + topic + (org ? " — " + org : "");
    const bodyLines = [
      "Name: " + name,
      "Email: " + email,
      org ? "Organization: " + org : null,
      "Inquiry Scope: " + topic,
      "",
      message
    ].filter(function (line) {
      return line !== null;
    });
    const fullBody = bodyLines.join("\r\n");

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(
          "To: stephen@sgrusso.com\nSubject: " + subject + "\n\n" + fullBody
        )
        .catch(function () {});
    }

    if (formStatus) {
      formStatus.textContent =
        "OPENING MAIL CLIENT (MESSAGE ALSO COPIED TO CLIPBOARD)";
      formStatus.classList.add("is-success");
    }

    window.location.href =
      "mailto:stephen@sgrusso.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(fullBody);
  }

  /* ------------------------------------------------------------------------
     12. Scroll-Spy Navigation Active Highlight
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".primary-nav .nav-link");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );
    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  /* ------------------------------------------------------------------------
     13. Command Palette (⌘K / Ctrl+K Quick Jump)
     ------------------------------------------------------------------------ */
  const cmdBackdrop = document.getElementById("cmd-backdrop");
  const cmdInput = document.getElementById("cmd-input");
  const cmdResults = document.getElementById("cmd-results");
  const cmdOpenBtn = document.getElementById("cmd-open-btn");

  const COMMANDS = [
    {
      title: "Jump to Sovereign Enterprise AI Platform (H100 / vLLM)",
      cat: "Architecture",
      action: function () {
        location.hash = "#ai-architecture";
      }
    },
    {
      title: "Jump to Enterprise Case Studies (01–08)",
      cat: "Dossier",
      action: function () {
        location.hash = "#case-studies";
      }
    },
    {
      title: "Jump to Domain Capabilities Matrix",
      cat: "Specs",
      action: function () {
        location.hash = "#capabilities";
      }
    },
    {
      title: "Jump to 20+ Year Career Ledger",
      cat: "History",
      action: function () {
        location.hash = "#career";
      }
    },
    {
      title: "Open Printable / Save-as-PDF Executive Résumé",
      cat: "Document",
      action: function () {
        window.location.href = "resume.html";
      }
    },
    {
      title: "Toggle Visual Theme (Slate Dark ↔ Warm Paper)",
      cat: "Interface",
      action: function () {
        const next = getCurrentTheme() === "dark" ? "light" : "dark";
        applyTheme(next, true);
      }
    },
    {
      title: "Copy Email Address (stephen@sgrusso.com)",
      cat: "Contact",
      action: function () {
        if (navigator.clipboard) {
          navigator.clipboard.writeText("stephen@sgrusso.com");
        }
      }
    },
    {
      title: "Open LinkedIn Profile",
      cat: "External",
      action: function () {
        window.open(
          "https://www.linkedin.com/in/stephen-russo-506b18",
          "_blank",
          "noopener"
        );
      }
    }
  ].concat(
    DATA.caseStudies.map(function (cs) {
      return {
        title: "Case " + cs.num + ": " + cs.title,
        cat: "Case Study",
        action: function () {
          const filterAll = document.querySelector(
            '.filter-chip[data-filter="all"]'
          );
          if (filterAll) filterAll.click();
          const el = document.getElementById("case-" + cs.num);
          if (el) {
            el.classList.add("is-open", "is-revealed");
            const trig = el.querySelector(".case-trigger");
            if (trig) trig.setAttribute("aria-expanded", "true");
            const lbl = el.querySelector(".case-toggle-label");
            if (lbl) lbl.textContent = "CLOSE −";
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      };
    })
  );

  let filteredCmds = COMMANDS.slice();
  let activeCmdIdx = 0;

  function renderCmdList() {
    if (!cmdResults) return;
    if (!filteredCmds.length) {
      cmdResults.innerHTML =
        '<li style="padding:12px 16px;font-family:var(--font-mono);font-size:12px;color:var(--ink-muted);">No matching architecture entries.</li>';
      return;
    }
    cmdResults.innerHTML = filteredCmds
      .map(function (c, i) {
        return (
          '<li><button type="button" class="cmd-item' +
          (i === activeCmdIdx ? " is-active" : "") +
          '" data-cmd-idx="' +
          i +
          '">' +
          '<span class="cmd-item-title">' + escapeHtml(c.title) + "</span>" +
          '<span class="cmd-item-cat">' + escapeHtml(c.cat) + "</span>" +
          "</button></li>"
        );
      })
      .join("");
  }

  function openCmdPalette() {
    if (!cmdBackdrop) return;
    cmdBackdrop.hidden = false;
    if (cmdInput) {
      cmdInput.value = "";
      filteredCmds = COMMANDS.slice();
      activeCmdIdx = 0;
      renderCmdList();
      setTimeout(function () {
        cmdInput.focus();
      }, 20);
    }
  }

  function closeCmdPalette() {
    if (!cmdBackdrop) return;
    cmdBackdrop.hidden = true;
  }

  if (cmdOpenBtn) {
    cmdOpenBtn.addEventListener("click", openCmdPalette);
  }

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener("click", function (e) {
      if (e.target === cmdBackdrop) closeCmdPalette();
    });
  }

  if (cmdResults) {
    cmdResults.addEventListener("click", function (e) {
      const btn = e.target.closest(".cmd-item");
      if (!btn) return;
      const idx = Number(btn.getAttribute("data-cmd-idx"));
      const item = filteredCmds[idx];
      closeCmdPalette();
      if (item && item.action) item.action();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener("input", function () {
      const q = cmdInput.value.trim().toLowerCase();
      filteredCmds = COMMANDS.filter(function (c) {
        return (
          c.title.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q)
        );
      });
      activeCmdIdx = 0;
      renderCmdList();
    });
  }

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.hidden) {
        openCmdPalette();
      } else {
        closeCmdPalette();
      }
      return;
    }

    if (!cmdBackdrop || cmdBackdrop.hidden) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeCmdPalette();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredCmds.length) {
        activeCmdIdx = (activeCmdIdx + 1) % filteredCmds.length;
        renderCmdList();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredCmds.length) {
        activeCmdIdx =
          (activeCmdIdx - 1 + filteredCmds.length) % filteredCmds.length;
        renderCmdList();
      }
    } else if (e.key === "Enter") {
      if (filteredCmds[activeCmdIdx]) {
        e.preventDefault();
        const chosen = filteredCmds[activeCmdIdx];
        closeCmdPalette();
        chosen.action();
      }
    }
  });
})();
