/* ==========================================================================
   SGRusso.com — Interactive Dossier Controller
   Zero external runtime dependencies. Fast, accessible, keyboard-first.
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.SGR_DATA;
  if (!DATA) return;

  /* ------------------------------------------------------------------------
     1. Theme Management (Slate Dark Default <-> Warm Archival Paper Light)
     ------------------------------------------------------------------------ */
  const rootEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  function getCurrentTheme() {
    return rootEl.getAttribute("data-theme") || "dark";
  }

  function applyTheme(theme) {
    rootEl.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("sgr-theme", theme);
    } catch (_) {
      /* ignore storage restrictions */
    }
    if (themeLabel) {
      themeLabel.textContent = theme === "dark" ? "PAPER" : "SLATE";
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to warm paper light mode" : "Switch to slate dark mode"
      );
    }
  }

  // Sync label on initial load
  applyTheme(getCurrentTheme());

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const next = getCurrentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Toggle
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
     3. GEORGE AI Interactive System Topology & Inspector
     ------------------------------------------------------------------------ */
  const topologyMount = document.getElementById("george-topology");
  const inspectorMount = document.getElementById("george-inspector");

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderGeorgeInspector(layer) {
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
      "<div>" +
      '<div class="inspector-eyebrow">' + escapeHtml(layer.eyebrow) + "</div>" +
      '<h3 class="inspector-title">' + escapeHtml(layer.title) + "</h3>" +
      '<p class="inspector-summary">' + escapeHtml(layer.summary) + "</p>" +
      '<ul class="inspector-list">' + bulletsHtml + "</ul>" +
      "</div>" +
      '<div><div class="spec-tags">' + tagsHtml + "</div></div>";
  }

  function selectGeorgeLayer(layerId) {
    const selected =
      DATA.georgeLayers.find(function (l) {
        return l.id === layerId;
      }) || DATA.georgeLayers[0];

    if (topologyMount) {
      topologyMount.querySelectorAll(".topology-node").forEach(function (btn) {
        const active = btn.getAttribute("data-layer-id") === selected.id;
        btn.classList.toggle("is-selected", active);
        btn.setAttribute("aria-selected", String(active));
        const ind = btn.querySelector(".node-indicator");
        if (ind) ind.textContent = active ? "ACTIVE ▸" : "INSPECT";
      });
    }
    renderGeorgeInspector(selected);
  }

  if (topologyMount && inspectorMount) {
    const parts = [];
    DATA.georgeLayers.forEach(function (layer, idx) {
      parts.push(
        '<button type="button" role="tab" class="topology-node' +
          (idx === 0 ? " is-selected" : "") +
          '" data-layer-id="' +
          escapeHtml(layer.id) +
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

      if (idx < DATA.georgeLayers.length - 1) {
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
    renderGeorgeInspector(DATA.georgeLayers[0]);

    topologyMount.addEventListener("click", function (e) {
      const btn = e.target.closest(".topology-node");
      if (!btn) return;
      selectGeorgeLayer(btn.getAttribute("data-layer-id"));
    });
  }

  /* ------------------------------------------------------------------------
     4. Selected Enterprise Case Studies Ledger + Filter
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
          '<article class="case-item' +
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
      caseMount.querySelectorAll(".case-item").forEach(function (item) {
        const match =
          filter === "all" || item.getAttribute("data-category") === filter;
        item.hidden = !match;
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. Capabilities Matrix & Career Ledger Rendering
     ------------------------------------------------------------------------ */
  const capMount = document.getElementById("capabilities-grid");
  if (capMount) {
    capMount.innerHTML = DATA.capabilities
      .map(function (cap) {
        const itemsHtml = cap.items
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("");
        return (
          '<div class="capability-cell">' +
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
          '<article class="timeline-entry">' +
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
     6. Copy-to-Clipboard Controls
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
     7. Contact Dispatch Form (Zero-Backend GitHub Pages Ready + Optional Endpoint)
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
      const topic = String(fd.get("topic") || "Senior Infrastructure / Architecture Role").trim();
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
      navigator.clipboard.writeText(
        "To: stephen@sgrusso.com\nSubject: " + subject + "\n\n" + fullBody
      ).catch(function () {});
    }

    if (formStatus) {
      formStatus.textContent = "OPENING MAIL CLIENT (MESSAGE ALSO COPIED TO CLIPBOARD)";
      formStatus.classList.add("is-success");
    }

    window.location.href =
      "mailto:stephen@sgrusso.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(fullBody);
  }

  /* ------------------------------------------------------------------------
     8. Scroll-Spy Navigation Active Highlight
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
     9. Command Palette (⌘K / Ctrl+K Quick Jump)
     ------------------------------------------------------------------------ */
  const cmdBackdrop = document.getElementById("cmd-backdrop");
  const cmdInput = document.getElementById("cmd-input");
  const cmdResults = document.getElementById("cmd-results");
  const cmdOpenBtn = document.getElementById("cmd-open-btn");

  const COMMANDS = [
    {
      title: "Jump to GEORGE Enterprise AI Platform (H100 / vLLM)",
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
        applyTheme(next);
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
        window.open("https://www.linkedin.com/in/stephen-russo-506b18", "_blank", "noopener");
      }
    }
  ].concat(
    DATA.caseStudies.map(function (cs) {
      return {
        title: "Case " + cs.num + ": " + cs.title,
        cat: "Case Study",
        action: function () {
          const filterAll = document.querySelector('.filter-chip[data-filter="all"]');
          if (filterAll) filterAll.click();
          const el = document.getElementById("case-" + cs.num);
          if (el) {
            el.classList.add("is-open");
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

