/* ==========================================================================
   VEXA — interactions
   Vanilla JS. No dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Config — ganti nomor WhatsApp & email di sini.
     Nomor memakai format internasional tanpa "+" dan tanpa spasi.
     ------------------------------------------------------------------ */
  var CONFIG = {
    waNumber: "62811900188",
    email: "halo@vexadinamika.co.id"
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme: gelap / terang ---------- */
  var THEME_KEY = "vx-theme";
  var themeToggles = document.querySelectorAll("[data-theme-toggle]");
  var themeMeta = document.head.querySelector('meta[name="theme-color"]');
  var themeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function readSavedTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme, persist) {
    var dark = theme === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");

    Array.prototype.forEach.call(themeToggles, function (button) {
      button.setAttribute("aria-pressed", dark ? "true" : "false");
      button.setAttribute(
        "aria-label",
        dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
      );
      button.setAttribute("title", dark ? "Mode terang" : "Mode gelap");
    });

    if (themeMeta) {
      themeMeta.setAttribute("content", dark ? "#071426" : "#f4f8ff");
    }

    if (persist) {
      try {
        window.localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
      } catch (e) {}
    }
  }

  var initialTheme = document.documentElement.getAttribute("data-theme");
  if (initialTheme !== "dark" && initialTheme !== "light") {
    var savedTheme = readSavedTheme();
    initialTheme = savedTheme || (themeQuery.matches ? "dark" : "light");
  }
  applyTheme(initialTheme, false);

  Array.prototype.forEach.call(themeToggles, function (button) {
    button.addEventListener("click", function () {
      var next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next, true);
    });
  });

  function followSystemTheme(event) {
    if (readSavedTheme()) return;
    applyTheme(event.matches ? "dark" : "light", false);
  }

  if (themeQuery.addEventListener) {
    themeQuery.addEventListener("change", followSystemTheme);
  } else if (themeQuery.addListener) {
    themeQuery.addListener(followSystemTheme);
  }


  /* ---------- Autoplay video & reduced motion ---------- */
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var autoVideos = document.querySelectorAll("video[autoplay]");

  function pauseAutoplayVideos() {
    autoVideos.forEach(function (video) {
      if (!motionQuery.matches) return;
      video.pause();
      video.removeAttribute("autoplay");
    });
  }

  pauseAutoplayVideos();
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", pauseAutoplayVideos);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(pauseAutoplayVideos);
  }

  /* ---------- Header state ---------- */
  var header = document.querySelector(".site-header");
  var lastY = 0;

  function onScroll() {
    if (!header) return;
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-scrolled", y > 12);
    lastY = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || menuBtn.contains(e.target)) return;
      closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var duration = 1300;
    var start = null;

    if (isNaN(target)) return;

    function format(value) {
      return value.toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    if (reduceMotion) {
      el.textContent = prefix + format(target) + suffix;
      return;
    }

    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + format(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (el) {
        countObserver.observe(el);
      });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- Tabs ---------- */
  var tabGroups = document.querySelectorAll("[data-tabs]");

  tabGroups.forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));

    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.classList.toggle("is-active", selected);
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.setAttribute("tabindex", selected ? "0" : "-1");
      });

      panels.forEach(function (panel) {
        var show = panel.id === tab.getAttribute("aria-controls");
        panel.classList.toggle("is-active", show);
        panel.hidden = !show;
        if (!show) {
          var hiddenVideos = panel.querySelectorAll(".cap-video, .feature__video");
          Array.prototype.forEach.call(hiddenVideos, function (video) {
            if (!video.paused) video.pause();
          });
        }
      });

      if (!reduceMotion) {
        var activePanel = group.querySelector(".tab-panel.is-active");
        var activeVideo = activePanel && activePanel.querySelector(".cap-video");
        if (activeVideo) playCapVideo(activeVideo);
      }

      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        activate(tab, false);
      });

      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          activate(next, true);
        }
      });
    });
  });

  /* ---------- Feature demo videos ---------- */
  var featureModal = document.querySelector("[data-feature-modal]");
  var featureModalVideo = featureModal && featureModal.querySelector(".feature-modal__video");
  var featureModalTitle = featureModal && featureModal.querySelector(".feature-modal__title");
  var featureModalCaption = featureModal && featureModal.querySelector("[data-feature-caption]");
  var featureModalClose = featureModal && featureModal.querySelector(".feature-modal__close");
  var featureModalTrigger = null;
  var originalBodyOverflow = "";

  function setBodyLocked(locked) {
    if (!document.body) return;
    if (locked) {
      originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow;
    }
  }

  function openFeatureModal(src, title, desc, trigger) {
    if (!featureModal || !featureModalVideo || !src) return;
    featureModalTrigger = trigger || null;
    if (featureModalTitle) featureModalTitle.textContent = title || "Demo ZWCAD";
    if (featureModalCaption) featureModalCaption.textContent = desc || "";
    featureModal.hidden = false;
    setBodyLocked(true);
    featureModalVideo.src = src;
    featureModalVideo.load();
    var promise = featureModalVideo.play();
    if (promise && promise.catch) promise.catch(function () {});
    if (featureModalClose) featureModalClose.focus();
  }

  function closeFeatureModal() {
    if (!featureModal || !featureModalVideo) return;
    featureModalVideo.pause();
    featureModalVideo.removeAttribute("src");
    featureModalVideo.load();
    featureModal.hidden = true;
    setBodyLocked(false);
    if (featureModalTrigger) featureModalTrigger.focus();
    featureModalTrigger = null;
  }

  if (featureModal) {
    featureModal.addEventListener("click", function (e) {
      if (e.target === featureModal) closeFeatureModal();
    });

    var featureCloseButtons = featureModal.querySelectorAll("[data-feature-close]");
    Array.prototype.forEach.call(featureCloseButtons, function (button) {
      button.addEventListener("click", closeFeatureModal);
    });

    featureModal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = featureModal.querySelectorAll(
        'button, [href], video[controls], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !featureModal.hidden) closeFeatureModal();
    });
  }

  var featureVideos = Array.prototype.slice.call(document.querySelectorAll(".feature__video"));

  featureVideos.forEach(function (video) {
    var card = video.closest(".feature");
    if (!card) return;
    var button = card.querySelector(".feature__play");
    if (!button) return;

    button.addEventListener("click", function () {
      var title = card.querySelector("h3");
      var desc = card.querySelector("p");
      openFeatureModal(
        video.getAttribute("data-src"),
        title ? title.textContent.trim() : "",
        desc ? desc.textContent.trim() : "",
        button
      );
    });
  });

  /* ---------- Capability demo videos ---------- */
  var capVideos = Array.prototype.slice.call(document.querySelectorAll(".cap-video"));

  function capFrame(video) {
    return video.closest(".cap-media");
  }

  function ensureCapSource(video) {
    if (!video.getAttribute("src") && video.getAttribute("data-src")) {
      video.setAttribute("src", video.getAttribute("data-src"));
    }
  }

  function formatCapTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "00:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function updateCapProgress(video) {
    var frame = capFrame(video);
    if (!frame) return;
    var time = frame.querySelector(".cap-media__time");
    var bar = frame.querySelector(".cap-media__progress span");
    var duration = video.duration;
    if (time) {
      time.textContent =
        formatCapTime(video.currentTime) + " / " + formatCapTime(duration);
    }
    if (bar) {
      var pct = duration ? Math.min(100, (video.currentTime / duration) * 100) : 0;
      bar.style.width = pct.toFixed(2) + "%";
    }
  }

  function syncCapState(video) {
    var frame = capFrame(video);
    if (!frame) return;
    var button = frame.querySelector(".cap-media__toggle");
    var label = frame.querySelector(".cap-media__label");
    var playing = !video.paused && !video.ended;
    frame.classList.toggle("is-playing", playing);
    if (button) {
      var playLabel =
        button.getAttribute("data-play-label") || button.getAttribute("aria-label");
      if (!button.getAttribute("data-play-label")) {
        button.setAttribute("data-play-label", playLabel);
      }
      button.setAttribute("aria-pressed", playing ? "true" : "false");
      button.setAttribute(
        "aria-label",
        playing
          ? playLabel.replace(/^Putar/, "Jeda")
          : playLabel
      );
    }
    if (label) label.textContent = playing ? "Jeda" : "Putar demo";
  }

  function playCapVideo(video) {
    ensureCapSource(video);
    var promise = video.play();
    if (promise && promise.catch) promise.catch(function () {});
  }

  capVideos.forEach(function (video) {
    var frame = capFrame(video);
    if (!frame) return;
    var button = frame.querySelector(".cap-media__toggle");
    var progress = frame.querySelector(".cap-media__progress");

    if (button) {
      button.addEventListener("click", function () {
        if (video.paused) playCapVideo(video);
        else video.pause();
      });
    }

    video.addEventListener("click", function () {
      if (video.paused) playCapVideo(video);
      else video.pause();
    });

    video.addEventListener("play", function () {
      capVideos.forEach(function (other) {
        if (other !== video && !other.paused) other.pause();
      });
      featureVideos.forEach(function (other) {
        if (!other.paused) other.pause();
      });
      syncCapState(video);
    });

    video.addEventListener("pause", function () {
      syncCapState(video);
    });

    video.addEventListener("loadedmetadata", function () {
      updateCapProgress(video);
    });

    video.addEventListener("timeupdate", function () {
      updateCapProgress(video);
    });

    if (progress) {
      progress.addEventListener("click", function (e) {
        if (!video.duration) return;
        var rect = progress.getBoundingClientRect();
        var ratio = (e.clientX - rect.left) / rect.width;
        video.currentTime =
          Math.max(0, Math.min(1, ratio)) * video.duration;
      });
    }
  });

  var capSection = document.querySelector("#kapabilitas");

  function activeCapVideo() {
    if (!capSection) return null;
    var panel = capSection.querySelector(".tab-panel.is-active");
    return panel ? panel.querySelector(".cap-video") : null;
  }

  if (capSection && "IntersectionObserver" in window) {
    var capAutoStarted = false;
    var capObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (reduceMotion || capAutoStarted) return;
            capAutoStarted = true;
            var video = activeCapVideo();
            if (video && video.paused) playCapVideo(video);
          } else {
            capVideos.forEach(function (video) {
              if (!video.paused) video.pause();
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    capObserver.observe(capSection);
  }

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", function () {
      if (!motionQuery.matches) return;
      capVideos.forEach(function (video) {
        if (!video.paused) video.pause();
      });
      featureVideos.forEach(function (video) {
        if (!video.paused) video.pause();
      });
    });
  }

  /* ---------- Quote form → WhatsApp ---------- */
  var form = document.querySelector("[data-quote-form]");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var status = form.querySelector(".form-status");
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var product = (data.get("product") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var lines = [
        "Halo PT Vexa Dinamika Teknologi,",
        "",
        "Saya " + name + (company ? " dari " + company : "") + ".",
        "Produk yang diminati: " + (product || "Belum ditentukan"),
        "Email: " + email,
        "Telepon: " + phone,
        "",
        "Kebutuhan:",
        message,
        "",
        "(Pesan dikirim dari website vexa — mohon dibalas. Terima kasih.)"
      ];

      var url =
        "https://wa.me/" +
        CONFIG.waNumber +
        "?text=" +
        encodeURIComponent(lines.join("\n"));

      if (status) {
        status.textContent = "Membuka WhatsApp…";
      }

      var opened = window.open(url, "_blank", "noopener");
      if (!opened) {
        window.location.href = url;
      } else if (status) {
        window.setTimeout(function () {
          status.textContent =
            "WhatsApp dibuka di tab baru. Jika tidak muncul, hubungi " +
            CONFIG.waNumber +
            ".";
        }, 1200);
      }
    });
  }

  /* ---------- Scroll spy for sub navigation ---------- */
  var spyLinks = document.querySelectorAll("[data-spy-link]");

  if (spyLinks.length && "IntersectionObserver" in window) {
    var spySections = [];
    spyLinks.forEach(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var section = document.querySelector(id);
      if (section) spySections.push(section);
    });

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          spyLinks.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-current", active);
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    spySections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------- Subtle parallax on blueprint art ---------- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-parallax]").forEach(function (wrap) {
      var art = wrap.querySelector(".blueprint");
      if (!art) return;
      var frame = null;

      wrap.addEventListener("mousemove", function (e) {
        if (frame) return;
        frame = window.requestAnimationFrame(function () {
          var rect = wrap.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          art.style.transform =
            "translate(" + (x * 7).toFixed(2) + "px," + (y * 7).toFixed(2) + "px)";
          frame = null;
        });
      });

      wrap.addEventListener("mouseleave", function () {
        art.style.transform = "";
      });
    });
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
