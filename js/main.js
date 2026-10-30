/* ==========================================================================
   SGRusso.com — Kinetic 3D & Scroll-Driven Architecture Controller (v2)
   Features:
   - Real-time 3D Perspective Sovereign Infrastructure Stack (Canvas)
   - Scroll-pinned morphing SVG Architecture Schematic
   - Animated Cloud-Exit vs. Sovereign On-Premises telemetry bars
   - 3D-tilted Bento cards + Slide-Over Engineering Spec Drawer
   - Scroll-illuminated Career Timeline spine & Magnetic CTA buttons
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.SGR_DATA;
  if (!DATA) return;

  const reducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  /* ------------------------------------------------------------------------
     1. Theme Switcher (with Native View Transitions)
     ------------------------------------------------------------------------ */
  const rootEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  function getTheme() {
    return rootEl.getAttribute("data-theme") || "dark";
  }

  function setTheme(theme, animate) {
    const apply = function () {
      rootEl.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("sgr-theme", theme);
      } catch (_) {}
      if (themeLabel) {
        themeLabel.textContent = theme === "dark" ? "PAPER" : "SLATE";
      }
    };

    if (animate && !reducedMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  setTheme(getTheme(), false);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(getTheme() === "dark" ? "light" : "dark", true);
    });
  }

  /* ------------------------------------------------------------------------
     2. Mobile Menu & Header Scroll Progress
     ------------------------------------------------------------------------ */
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const siteNav = document.getElementById("site-nav");

  if (mobileBtn && siteNav) {
    mobileBtn.addEventListener("click", function () {
      const open = siteNav.classList.toggle("is-open");
      mobileBtn.setAttribute("aria-expanded", String(open));
      mobileBtn.textContent = open ? "CLOSE" : "MENU";
    });
    siteNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.textContent = "MENU";
      });
    });
  }

  const progressBar = document.getElementById("scroll-progress-bar");
  const careerWrap = document.getElementById("career-track-wrap");
  const careerSpineFill = document.getElementById("career-spine-fill");

  let scrollPending = false;
  function onScrollFrame() {
    scrollPending = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) {
      const p = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      progressBar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    }

    // Real-time scroll-illuminated career timeline spine
    if (careerWrap && careerSpineFill) {
      const rect = careerWrap.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.62;
      const raw = (triggerY - rect.top) / Math.max(1, rect.height);
      const clamped = Math.min(1, Math.max(0, raw));
      careerSpineFill.style.transform = "scaleY(" + clamped.toFixed(4) + ")";

      careerWrap.querySelectorAll(".career-node").forEach(function (node) {
        const nr = node.getBoundingClientRect();
        node.classList.toggle("is-lit", nr.top + 32 <= triggerY);
      });
    }
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!scrollPending) {
        scrollPending = true;
        window.requestAnimationFrame(onScrollFrame);
      }
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------------
     3. Magnetic Button Micro-Physics
     ------------------------------------------------------------------------ */
  if (!reducedMotion) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
        btn.style.transform = "translate(" + dx.toFixed(1) + "px, " + dy.toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });

    // Hero stat counter roll-up
    document.querySelectorAll("[data-count]").forEach(function (el) {
      const target = Number(el.getAttribute("data-count") || "0");
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const start = performance.now();
      const dur = 950;
      function step(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (t < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  }

  /* ------------------------------------------------------------------------
     4. Interactive 3D Isometric Sovereign Infrastructure Stack (Hero Stage)
     ------------------------------------------------------------------------ */
  const stackCanvas = document.getElementById("stack-3d-canvas");
  const canvasWrap = document.getElementById("canvas-3d-wrap");
  const deckTabsMount = document.getElementById("deck-tabs");
  const hudCode = document.getElementById("hud-code");
  const hudName = document.getElementById("hud-name");
  const hudSub = document.getElementById("hud-sub");
  const hudMetric = document.getElementById("hud-metric");

  let selectedDeck = 0; // 0 = top (AI), 3 = bottom (Vault)
  let manualDeckLock = false;
  let pointerHoveringStage = false;

  function updateStageHud(idx) {
    selectedDeck = idx;
    const deck = DATA.stackDecks[idx];
    if (!deck) return;
    if (hudCode) hudCode.textContent = deck.code;
    if (hudName) hudName.textContent = deck.name;
    if (hudSub) hudSub.textContent = deck.sub;
    if (hudMetric) hudMetric.textContent = deck.metric;

    if (deckTabsMount) {
      deckTabsMount.querySelectorAll(".deck-tab").forEach(function (btn, bIdx) {
        btn.classList.toggle("is-active", bIdx === idx);
        btn.setAttribute("aria-selected", String(bIdx === idx));
      });
    }
  }

  if (deckTabsMount) {
    deckTabsMount.innerHTML = DATA.stackDecks
      .map(function (d, i) {
        const shortLabel =
          i === 0 ? "04 · AI" : i === 1 ? "03 · SAN" : i === 2 ? "02 · PKI" : "01 · DR";
        return (
          '<button type="button" role="tab" class="deck-tab' +
          (i === 0 ? " is-active" : "") +
          '" data-deck="' +
          i +
          '" aria-selected="' +
          String(i === 0) +
          '">' +
          shortLabel +
          "</button>"
        );
      })
      .join("");

    deckTabsMount.addEventListener("click", function (e) {
      const btn = e.target.closest(".deck-tab");
      if (!btn) return;
      manualDeckLock = true;
      updateStageHud(Number(btn.getAttribute("data-deck") || "0"));
    });
  }

  if (stackCanvas && canvasWrap) {
    const ctx = stackCanvas.getContext("2d");
    let cw = 0;
    let ch = 0;
    let dpr = 1;
    let stageVisible = true;

    // 3D rotation angles & spring state
    let yaw = 0.72;
    let targetYaw = 0.72;
    let pitch = 0.52;
    let targetPitch = 0.52;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let pointerCanvasY = -1;

    // Smooth vertical offsets per deck for active "exploded view" separation
    const deckExpand = [1, 0, 0, 0];

    // High-speed optical fiber pulses traveling vertically between decks
    const fiberPulses = [];
    const CONDUIT_COORDS = [
      [-68, -68],
      [68, -68],
      [-68, 68],
      [68, 68],
      [0, 0]
    ];

    for (let i = 0; i < 9; i++) {
      const c = CONDUIT_COORDS[i % CONDUIT_COORDS.length];
      fiberPulses.push({
        x: c[0],
        z: c[1],
        y: -90 + Math.random() * 180,
        speed: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 1.1),
        emerald: i % 3 === 0
      });
    }

    function resize3D() {
      const r = canvasWrap.getBoundingClientRect();
      cw = Math.max(260, Math.floor(r.width));
      ch = Math.max(240, Math.floor(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      stackCanvas.width = cw * dpr;
      stackCanvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize3D();
    window.addEventListener("resize", resize3D, { passive: true });

    // Auto-cycle active 3D deck when not hovered or manually locked
    if (!reducedMotion) {
      setInterval(function () {
        if (!manualDeckLock && !pointerHoveringStage && stageVisible) {
          updateStageHud((selectedDeck + 1) % DATA.stackDecks.length);
        }
      }, 3800);
    }

    canvasWrap.addEventListener("pointerenter", function () {
      pointerHoveringStage = true;
    });

    canvasWrap.addEventListener("pointerleave", function () {
      pointerHoveringStage = false;
      dragging = false;
      targetPitch = 0.52;
    });

    canvasWrap.addEventListener("pointerdown", function (e) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("pointerup", function () {
      dragging = false;
    });

    canvasWrap.addEventListener("pointermove", function (e) {
      const r = canvasWrap.getBoundingClientRect();
      const rx = (e.clientX - r.left) / r.width - 0.5;
      const ry = (e.clientY - r.top) / r.height - 0.5;
      pointerCanvasY = e.clientY - r.top;

      if (dragging) {
        targetYaw += (e.clientX - lastX) * 0.011;
        targetPitch = Math.max(0.28, Math.min(0.82, targetPitch + (e.clientY - lastY) * 0.007));
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        targetYaw = 0.72 + rx * 0.65;
        targetPitch = 0.52 + ry * 0.26;

        // Hover hit-detection across the 4 vertical zones
        const normY = (e.clientY - r.top) / r.height;
        if (normY > 0.14 && normY < 0.88) {
          const hoveredIdx = Math.min(3, Math.max(0, Math.floor(((normY - 0.14) / 0.74) * 4)));
          if (hoveredIdx !== selectedDeck && !manualDeckLock) {
            updateStageHud(hoveredIdx);
          }
        }
      }
    });

    canvasWrap.addEventListener("click", function () {
      if (pointerCanvasY > 0) {
        const r = canvasWrap.getBoundingClientRect();
        const normY = pointerCanvasY / r.height;
        const clickedIdx = Math.min(3, Math.max(0, Math.floor(((normY - 0.14) / 0.74) * 4)));
        manualDeckLock = true;
        updateStageHud(clickedIdx);
      }
    });

    if ("IntersectionObserver" in window) {
      const obs3d = new IntersectionObserver(function (entries) {
        stageVisible = entries[0] ? entries[0].isIntersecting : true;
      });
      obs3d.observe(canvasWrap);
    }

    function project3D(x, y, z, cosY, sinY, cosP, sinP, scale) {
      const rx = x * cosY - z * sinY;
      const rz = x * sinY + z * cosY;
      const ry = y * cosP - rz * sinP;
      const depth = y * sinP + rz * cosP;
      const perspective = 560 / (560 + depth * 0.45);
      return {
        x: cw * 0.5 + rx * scale * perspective,
        y: ch * 0.51 + ry * scale * perspective,
        z: depth
      };
    }

    function drawPolygon(pts, fill, stroke, lineWidth) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth || 1;
        ctx.stroke();
      }
    }

    let timeTick = 0;

    function render3DStack() {
      if (stageVisible && ctx && cw > 0) {
        timeTick += reducedMotion ? 0 : 0.016;
        ctx.clearRect(0, 0, cw, ch);

        const isDark = getTheme() === "dark";
        const copperRGB = isDark ? "224, 159, 80" : "156, 74, 26";
        const emeraldRGB = isDark ? "56, 193, 114" : "29, 122, 70";
        const slateRGB = isDark ? "159, 176, 199" : "70, 82, 100";

        if (!dragging && !pointerHoveringStage && !reducedMotion) {
          targetYaw = 0.74 + Math.sin(timeTick * 0.55) * 0.16;
        }

        yaw += (targetYaw - yaw) * 0.085;
        pitch += (targetPitch - pitch) * 0.085;

        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const cosP = Math.cos(pitch);
        const sinP = Math.sin(pitch);
        const scale = Math.min(cw, ch) / 315;

        const floatY = reducedMotion ? 0 : Math.sin(timeTick * 1.4) * 3.5;

        // Smooth deck separation physics
        for (let d = 0; d < 4; d++) {
          const targetExp = d === selectedDeck ? 1 : 0;
          deckExpand[d] += (targetExp - deckExpand[d]) * 0.12;
        }

        // Base Y positions (negative Y is up in screen space): index 0 is top deck, index 3 is bottom deck
        const baseYs = [-78, -26, 26, 78];
        const deckYs = baseYs.map(function (by, idx) {
          let push = 0;
          if (idx < selectedDeck) push = -10 * deckExpand[selectedDeck];
          if (idx > selectedDeck) push = 10 * deckExpand[selectedDeck];
          if (idx === selectedDeck) push = -4 * deckExpand[idx];
          return by + push + floatY;
        });

        // 1. Draw vertical optical conduits behind/through slabs
        CONDUIT_COORDS.forEach(function (c, cIdx) {
          const topPt = project3D(c[0], deckYs[0] - 8, c[1], cosY, sinY, cosP, sinP, scale);
          const botPt = project3D(c[0], deckYs[3] + 12, c[1], cosY, sinY, cosP, sinP, scale);
          ctx.strokeStyle =
            cIdx === 4
              ? "rgba(" + copperRGB + ", 0.28)"
              : "rgba(" + slateRGB + ", 0.16)";
          ctx.lineWidth = cIdx === 4 ? 1.8 : 1;
          ctx.beginPath();
          ctx.moveTo(topPt.x, topPt.y);
          ctx.lineTo(botPt.x, botPt.y);
          ctx.stroke();
        });

        // 2. Draw slabs from bottom (index 3) to top (index 0) for accurate painter's occlusion
        const S = 88; // half-width of slab
        const THICK = 11; // slab thickness

        for (let idx = 3; idx >= 0; idx--) {
          const yTop = deckYs[idx];
          const yBot = yTop + THICK;
          const active = idx === selectedDeck;
          const emph = deckExpand[idx];

          const topCorners = [
            project3D(-S, yTop, -S, cosY, sinY, cosP, sinP, scale),
            project3D(S, yTop, -S, cosY, sinY, cosP, sinP, scale),
            project3D(S, yTop, S, cosY, sinY, cosP, sinP, scale),
            project3D(-S, yTop, S, cosY, sinY, cosP, sinP, scale)
          ];
          const botCorners = [
            project3D(-S, yBot, -S, cosY, sinY, cosP, sinP, scale),
            project3D(S, yBot, -S, cosY, sinY, cosP, sinP, scale),
            project3D(S, yBot, S, cosY, sinY, cosP, sinP, scale),
            project3D(-S, yBot, S, cosY, sinY, cosP, sinP, scale)
          ];

          // Draw visible side walls (edges where normal faces camera)
          for (let e = 0; e < 4; e++) {
            const next = (e + 1) % 4;
            const midZ = (topCorners[e].z + topCorners[next].z) * 0.5;
            if (midZ > -20) {
              const sideQuad = [
                topCorners[e],
                topCorners[next],
                botCorners[next],
                botCorners[e]
              ];
              const sideFill = active
                ? "rgba(" + copperRGB + "," + (isDark ? "0.28" : "0.22") + ")"
                : isDark
                ? "rgba(26, 36, 52, 0.88)"
                : "rgba(220, 213, 198, 0.90)";
              const sideStroke = active
                ? "rgba(" + copperRGB + ", 0.80)"
                : "rgba(" + slateRGB + ", 0.28)";
              drawPolygon(sideQuad, sideFill, sideStroke, 1);
            }
          }

          // Top plate fill & border
          const topFill = active
            ? isDark
              ? "rgba(34, 44, 62, 0.94)"
              : "rgba(255, 252, 245, 0.96)"
            : isDark
            ? "rgba(20, 27, 40, 0.90)"
            : "rgba(247, 244, 236, 0.92)";

          const topStroke = active
            ? "rgba(" + copperRGB + ", 0.95)"
            : "rgba(" + slateRGB + ", 0.34)";

          drawPolygon(topCorners, topFill, topStroke, active ? 1.8 : 1.1);

          // Internal architectural circuit traces per layer
          const detailAlpha = active ? 0.85 : 0.35 + emph * 0.4;
          const accentColor =
            "rgba(" + (active ? copperRGB : slateRGB) + "," + detailAlpha.toFixed(2) + ")";

          if (idx === 0) {
            // Layer 04: 2x4 H100 Tensor GPU Array
            for (let gx = -1.5; gx <= 1.5; gx += 1) {
              for (let gz = -0.5; gz <= 0.5; gz += 1) {
                const cx = gx * 36;
                const cz = gz * 44;
                const chip = [
                  project3D(cx - 12, yTop - 0.5, cz - 14, cosY, sinY, cosP, sinP, scale),
                  project3D(cx + 12, yTop - 0.5, cz - 14, cosY, sinY, cosP, sinP, scale),
                  project3D(cx + 12, yTop - 0.5, cz + 14, cosY, sinY, cosP, sinP, scale),
                  project3D(cx - 12, yTop - 0.5, cz + 14, cosY, sinY, cosP, sinP, scale)
                ];
                const pulseGlow =
                  active && !reducedMotion
                    ? 0.22 + 0.16 * Math.sin(timeTick * 4 + gx + gz)
                    : 0.1;
                drawPolygon(
                  chip,
                  "rgba(" + copperRGB + "," + pulseGlow.toFixed(2) + ")",
                  accentColor,
                  1
                );
              }
            }
          } else if (idx === 1) {
            // Layer 03: SAN Storage & Hypervisor Blades
            for (let b = -2; b <= 2; b++) {
              const bz = b * 26;
              const p1 = project3D(-64, yTop - 0.5, bz, cosY, sinY, cosP, sinP, scale);
              const p2 = project3D(64, yTop - 0.5, bz, cosY, sinY, cosP, sinP, scale);
              ctx.strokeStyle = accentColor;
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              const led = project3D(58, yTop - 0.8, bz, cosY, sinY, cosP, sinP, scale);
              ctx.fillStyle = "rgba(" + emeraldRGB + ", 0.85)";
              ctx.beginPath();
              ctx.arc(led.x, led.y, 2.1, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (idx === 2) {
            // Layer 02: Zero-Trust Security Perimeter Ring
            const ringR = 46;
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            for (let a = 0; a <= 6; a++) {
              const ang = (a / 6) * Math.PI * 2;
              const rp = project3D(
                Math.cos(ang) * ringR,
                yTop - 0.5,
                Math.sin(ang) * ringR,
                cosY,
                sinY,
                cosP,
                sinP,
                scale
              );
              if (a === 0) ctx.moveTo(rp.x, rp.y);
              else ctx.lineTo(rp.x, rp.y);
            }
            ctx.stroke();
          } else {
            // Layer 01: Air-Gapped LTO-9 Vault Cells
            for (let vx = -1; vx <= 1; vx++) {
              for (let vz = -1; vz <= 1; vz++) {
                const vp = project3D(
                  vx * 42,
                  yTop - 0.5,
                  vz * 42,
                  cosY,
                  sinY,
                  cosP,
                  sinP,
                  scale
                );
                ctx.fillStyle = active
                  ? "rgba(" + copperRGB + ", 0.85)"
                  : "rgba(" + emeraldRGB + ", 0.55)";
                ctx.fillRect(vp.x - 3, vp.y - 3, 6, 6);
              }
            }
          }

          // Floating callout tag on the right edge of each slab
          const labelAnchor = project3D(S + 14, yTop + 3, -S * 0.35, cosY, sinY, cosP, sinP, scale);
          ctx.font = (active ? "600 " : "400 ") + "10px 'IBM Plex Mono', monospace";
          ctx.fillStyle = active
            ? "rgba(" + copperRGB + ", 1)"
            : "rgba(" + slateRGB + ", 0.62)";
          const tagText =
            idx === 0 ? "L4 · AI" : idx === 1 ? "L3 · SAN" : idx === 2 ? "L2 · PKI" : "L1 · DR";
          ctx.fillText(tagText, labelAnchor.x, labelAnchor.y);
        }

        // 3. Draw glowing optical data pulses shooting along conduits
        if (!reducedMotion) {
          fiberPulses.forEach(function (fp) {
            fp.y += fp.speed;
            if (fp.y > deckYs[3] + 10) fp.y = deckYs[0] - 8;
            if (fp.y < deckYs[0] - 8) fp.y = deckYs[3] + 10;

            const head = project3D(fp.x, fp.y, fp.z, cosY, sinY, cosP, sinP, scale);
            const tail = project3D(
              fp.x,
              fp.y - fp.speed * 7,
              fp.z,
              cosY,
              sinY,
              cosP,
              sinP,
              scale
            );
            const col = fp.emerald ? emeraldRGB : copperRGB;

            ctx.strokeStyle = "rgba(" + col + ", 0.78)";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(tail.x, tail.y);
            ctx.lineTo(head.x, head.y);
            ctx.stroke();

            ctx.fillStyle = "rgba(" + col + ", 1)";
            ctx.beginPath();
            ctx.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      window.requestAnimationFrame(render3DStack);
    }

    window.requestAnimationFrame(render3DStack);
  }

  /* ------------------------------------------------------------------------
     5. Band 01: Scroll-Pinned Six Pillars & Morphing SVG Schematic
     ------------------------------------------------------------------------ */
  const pillarsStream = document.getElementById("pillars-stream");
  const schemIndex = document.getElementById("schematic-index");
  const schemKicker = document.getElementById("schematic-kicker");
  const shubMode = document.getElementById("shub-mode");
  const schemMetricLabel = document.getElementById("schem-metric-label");
  const schemMetricVal = document.getElementById("schem-metric-val");
  const schemSvg = document.getElementById("live-schematic-svg");

  let activePillarIdx = -1;

  function activatePillar(idx) {
    if (idx === activePillarIdx || !DATA.pillars[idx]) return;
    activePillarIdx = idx;
    const p = DATA.pillars[idx];

    if (pillarsStream) {
      pillarsStream.querySelectorAll(".pillar-card").forEach(function (card, cIdx) {
        card.classList.toggle("is-active", cIdx === idx);
      });
    }

    if (schemIndex) schemIndex.textContent = p.num + " / 0" + DATA.pillars.length;
    if (schemKicker) schemKicker.textContent = p.kicker;
    if (shubMode) shubMode.textContent = p.diagramMode.toUpperCase();
    if (schemMetricLabel) schemMetricLabel.textContent = p.metricLabel;
    if (schemMetricVal) schemMetricVal.textContent = p.metricValue;

    p.nodes.forEach(function (label, nIdx) {
      const txt = document.getElementById("snode-text-" + nIdx);
      if (txt) txt.textContent = label;
    });

    if (schemSvg && !reducedMotion) {
      schemSvg.classList.remove("schem-morph");
      void schemSvg.offsetWidth;
      schemSvg.classList.add("schem-morph");
    }
  }

  if (pillarsStream) {
    pillarsStream.innerHTML = DATA.pillars
      .map(function (p, idx) {
        const pills = p.tags
          .map(function (t) {
            return '<span class="tech-pill">' + escapeHtml(t) + "</span>";
          })
          .join("");

        return (
          '<article class="pillar-card reveal' +
          (idx === 0 ? " is-active" : "") +
          '" data-pillar-idx="' +
          idx +
          '" id="pillar-' +
          escapeHtml(p.id) +
          '">' +
          '<div class="pillar-top">' +
          '<span class="pillar-num">PILLAR ' + escapeHtml(p.num) + "</span>" +
          '<span class="pillar-kicker">' + escapeHtml(p.kicker) + "</span>" +
          "</div>" +
          '<h3 class="pillar-title">' + escapeHtml(p.title) + "</h3>" +
          '<p class="pillar-lead">' + escapeHtml(p.lead) + "</p>" +
          '<div class="tag-row">' + pills + "</div>" +
          "</article>"
        );
      })
      .join("");

    activatePillar(0);

    pillarsStream.addEventListener("click", function (e) {
      const card = e.target.closest(".pillar-card");
      if (!card) return;
      activatePillar(Number(card.getAttribute("data-pillar-idx") || "0"));
    });

    if ("IntersectionObserver" in window) {
      const pillarObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.getAttribute("data-pillar-idx") || "0");
              activatePillar(idx);
            }
          });
        },
        { rootMargin: "-32% 0px -48% 0px", threshold: 0.1 }
      );

      pillarsStream.querySelectorAll(".pillar-card").forEach(function (c) {
        pillarObs.observe(c);
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. Band 02: Cloud Repatriation Telemetry Bars
     ------------------------------------------------------------------------ */
  const compRows = document.getElementById("comp-rows");
  const compBoard = document.getElementById("comparison-board");

  if (compRows) {
    compRows.innerHTML = DATA.repatriationMetrics
      .map(function (m) {
        return (
          '<div class="comp-item">' +
          '<h3 class="comp-title">' + escapeHtml(m.label) + "</h3>" +
          '<div class="bar-group">' +
          '<div class="bar-caption"><span>' + escapeHtml(m.sovereignNote) + "</span><strong>" + m.sovereign + "%</strong></div>" +
          '<div class="bar-track"><div class="bar-fill bar-fill--sov" style="width:' + m.sovereign + '%"></div></div>' +
          "</div>" +
          '<div class="bar-group">' +
          '<div class="bar-caption bar-caption--muted"><span>' + escapeHtml(m.cloudNote) + "</span><span>" + m.cloud + "%</span></div>" +
          '<div class="bar-track"><div class="bar-fill bar-fill--cloud" style="width:' + m.cloud + '%"></div></div>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     7. Band 03: Bento Grid + Slide-Over Engineering Spec Drawer
     ------------------------------------------------------------------------ */
  const bentoMount = document.getElementById("bento-grid");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const drawerBody = document.getElementById("drawer-body");
  const drawerBadge = document.getElementById("drawer-badge");
  const drawerClose = document.getElementById("drawer-close");

  function openProjectDrawer(proj) {
    if (!drawerBackdrop || !drawerBody || !proj) return;
    if (drawerBadge) drawerBadge.textContent = proj.badge;
    const pills = proj.stack
      .map(function (s) {
        return '<span class="tech-pill">' + escapeHtml(s) + "</span>";
      })
      .join("");

    drawerBody.innerHTML =
      '<h2 class="drawer-title" id="drawer-title">' + escapeHtml(proj.title) + "</h2>" +
      '<div class="drawer-sec"><span class="drawer-sec-label">01 // Challenge</span><p>' + escapeHtml(proj.challenge) + "</p></div>" +
      '<div class="drawer-sec"><span class="drawer-sec-label">02 // Architectural Execution</span><p>' + escapeHtml(proj.execution) + "</p></div>" +
      '<div class="drawer-sec"><span class="drawer-sec-label">03 // Verified Impact</span><p>' + escapeHtml(proj.impact) + "</p></div>" +
      '<div class="drawer-sec"><span class="drawer-sec-label">Primary Stack</span><div class="tag-row">' + pills + "</div></div>";

    drawerBackdrop.hidden = false;
  }

  function closeProjectDrawer() {
    if (drawerBackdrop) drawerBackdrop.hidden = true;
  }

  if (bentoMount) {
    bentoMount.innerHTML = DATA.projects
      .map(function (p, i) {
        return (
          '<article class="bento-card reveal" tabindex="0" role="button" data-proj-idx="' +
          i +
          '" aria-label="Inspect ' +
          escapeHtml(p.title) +
          '">' +
          "<div>" +
          '<span class="bento-badge">' + escapeHtml(p.badge) + "</span>" +
          '<h3 class="bento-title">' + escapeHtml(p.title) + "</h3>" +
          '<p class="bento-summary">' + escapeHtml(p.summary) + "</p>" +
          "</div>" +
          '<div class="bento-bottom">' +
          "<span>" + escapeHtml(p.stack.slice(0, 2).join(" · ")) + "</span>" +
          '<span class="bento-cta">Specs →</span>' +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    bentoMount.addEventListener("click", function (e) {
      const card = e.target.closest(".bento-card");
      if (!card) return;
      const idx = Number(card.getAttribute("data-proj-idx") || "0");
      openProjectDrawer(DATA.projects[idx]);
    });

    bentoMount.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".bento-card");
        if (!card) return;
        e.preventDefault();
        openProjectDrawer(DATA.projects[Number(card.getAttribute("data-proj-idx") || "0")]);
      }
    });

    // Cursor spotlight coordinates on Bento cards
    bentoMount.addEventListener(
      "pointermove",
      function (e) {
        const card = e.target.closest(".bento-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", Math.round(e.clientX - r.left) + "px");
        card.style.setProperty("--my", Math.round(e.clientY - r.top) + "px");
      },
      { passive: true }
    );
  }

  if (drawerClose) drawerClose.addEventListener("click", closeProjectDrawer);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", function (e) {
      if (e.target === drawerBackdrop) closeProjectDrawer();
    });
  }

  /* ------------------------------------------------------------------------
     8. Band 04: Concise Career Trajectory
     ------------------------------------------------------------------------ */
  const careerMount = document.getElementById("career-entries");
  if (careerMount) {
    careerMount.innerHTML = DATA.career
      .map(function (c) {
        return (
          '<article class="career-node reveal">' +
          '<div class="career-top">' +
          '<h3 class="career-org">' + escapeHtml(c.org) + "</h3>" +
          '<span class="career-dates">' + escapeHtml(c.dates) + "</span>" +
          "</div>" +
          '<div class="career-role-line">' +
          escapeHtml(c.role) +
          "<span>· " + escapeHtml(c.location) + "</span>" +
          "</div>" +
          '<p class="career-desc">' + escapeHtml(c.summary) + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     9. IntersectionObserver for Scroll Reveals & Nav Active State
     ------------------------------------------------------------------------ */
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revObs.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    if (compBoard) compBoard.classList.add("is-visible");
  }

  const navSections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".site-nav .nav-item");
  if ("IntersectionObserver" in window && navSections.length) {
    const navObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navItems.forEach(function (a) {
              a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    navSections.forEach(function (s) {
      navObs.observe(s);
    });
  }

  onScrollFrame();

  /* ------------------------------------------------------------------------
     10. Copy Controls & Contact Form
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const val = btn.getAttribute("data-copy");
      if (!val || !navigator.clipboard) return;
      const orig = btn.textContent;
      navigator.clipboard.writeText(val).then(function () {
        btn.textContent = "COPIED";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove("is-copied");
        }, 1800);
      });
    });
  });

  const contactForm = document.getElementById("dispatch-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const org = String(fd.get("organization") || "").trim();
      const topic = String(fd.get("topic") || "Infrastructure Inquiry").trim();
      const message = String(fd.get("message") || "").trim();

      const endpoint = contactForm.getAttribute("data-endpoint");
      if (endpoint) {
        if (formStatus) formStatus.textContent = "Sending...";
        fetch(endpoint, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" }
        })
          .then(function (r) {
            if (!r.ok) throw new Error("Failed");
            contactForm.reset();
            if (formStatus) {
              formStatus.textContent = "Message received — thank you.";
              formStatus.classList.add("is-success");
            }
          })
          .catch(function () {
            mailtoFallback(name, email, org, topic, message);
          });
        return;
      }
      mailtoFallback(name, email, org, topic, message);
    });
  }

  function mailtoFallback(name, email, org, topic, message) {
    const subject = "[SGRusso.com] " + topic + (org ? " — " + org : "");
    const body = [
      "Name: " + name,
      "Email: " + email,
      org ? "Organization: " + org : null,
      "Focus: " + topic,
      "",
      message
    ]
      .filter(Boolean)
      .join("\r\n");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(body).catch(function () {});
    }
    if (formStatus) {
      formStatus.textContent = "Opening mail client (backup copied to clipboard)";
      formStatus.classList.add("is-success");
    }
    window.location.href =
      "mailto:stephen@sgrusso.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  }

  /* ------------------------------------------------------------------------
     11. Command Palette (⌘K / Ctrl+K)
     ------------------------------------------------------------------------ */
  const cmdBackdrop = document.getElementById("cmd-backdrop");
  const cmdInput = document.getElementById("cmd-input");
  const cmdResults = document.getElementById("cmd-results");
  const cmdOpenBtn = document.getElementById("cmd-open-btn");

  const COMMANDS = [
    {
      title: "Explore the 6 Architecture Pillars",
      cat: "Section",
      action: function () {
        location.hash = "#pillars";
      }
    },
    {
      title: "Cloud Repatriation vs. Cloud Sprawl Comparison",
      cat: "Section",
      action: function () {
        location.hash = "#sovereignty";
      }
    },
    {
      title: "Selected Production Deliveries",
      cat: "Section",
      action: function () {
        location.hash = "#deliveries";
      }
    },
    {
      title: "20+ Year Career Trajectory",
      cat: "Section",
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
      title: "Switch Theme (Slate Dark ↔ Warm Paper)",
      cat: "Interface",
      action: function () {
        setTheme(getTheme() === "dark" ? "light" : "dark", true);
      }
    }
  ].concat(
    DATA.projects.map(function (p) {
      return {
        title: p.title,
        cat: p.badge,
        action: function () {
          openProjectDrawer(p);
        }
      };
    })
  );

  let filteredCmds = COMMANDS.slice();
  let activeCmdIdx = 0;

  function renderCmds() {
    if (!cmdResults) return;
    if (!filteredCmds.length) {
      cmdResults.innerHTML =
        '<li style="padding:12px 18px;font-family:var(--font-mono);font-size:12px;color:var(--ink-muted);">No matching items.</li>';
      return;
    }
    cmdResults.innerHTML = filteredCmds
      .map(function (c, i) {
        return (
          '<li><button type="button" class="cmd-item' +
          (i === activeCmdIdx ? " is-active" : "") +
          '" data-idx="' +
          i +
          '">' +
          '<span class="cmd-item-title">' + escapeHtml(c.title) + "</span>" +
          '<span class="cmd-item-cat">' + escapeHtml(c.cat) + "</span>" +
          "</button></li>"
        );
      })
      .join("");
  }

  function openCmd() {
    if (!cmdBackdrop) return;
    cmdBackdrop.hidden = false;
    filteredCmds = COMMANDS.slice();
    activeCmdIdx = 0;
    if (cmdInput) {
      cmdInput.value = "";
      renderCmds();
      setTimeout(function () {
        cmdInput.focus();
      }, 20);
    }
  }

  function closeCmd() {
    if (cmdBackdrop) cmdBackdrop.hidden = true;
  }

  if (cmdOpenBtn) cmdOpenBtn.addEventListener("click", openCmd);
  if (cmdBackdrop) {
    cmdBackdrop.addEventListener("click", function (e) {
      if (e.target === cmdBackdrop) closeCmd();
    });
  }
  if (cmdResults) {
    cmdResults.addEventListener("click", function (e) {
      const btn = e.target.closest(".cmd-item");
      if (!btn) return;
      const item = filteredCmds[Number(btn.getAttribute("data-idx") || "0")];
      closeCmd();
      if (item && item.action) item.action();
    });
  }
  if (cmdInput) {
    cmdInput.addEventListener("input", function () {
      const q = cmdInput.value.trim().toLowerCase();
      filteredCmds = COMMANDS.filter(function (c) {
        return c.title.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q);
      });
      activeCmdIdx = 0;
      renderCmds();
    });
  }

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.hidden) openCmd();
      else closeCmd();
      return;
    }
    if (e.key === "Escape") {
      if (drawerBackdrop && !drawerBackdrop.hidden) closeProjectDrawer();
      if (cmdBackdrop && !cmdBackdrop.hidden) closeCmd();
      return;
    }
    if (!cmdBackdrop || cmdBackdrop.hidden) return;
    if (e.key === "ArrowDown" && filteredCmds.length) {
      e.preventDefault();
      activeCmdIdx = (activeCmdIdx + 1) % filteredCmds.length;
      renderCmds();
    } else if (e.key === "ArrowUp" && filteredCmds.length) {
      e.preventDefault();
      activeCmdIdx = (activeCmdIdx - 1 + filteredCmds.length) % filteredCmds.length;
      renderCmds();
    } else if (e.key === "Enter" && filteredCmds[activeCmdIdx]) {
      e.preventDefault();
      const chosen = filteredCmds[activeCmdIdx];
      closeCmd();
      chosen.action();
    }
  });
})();
