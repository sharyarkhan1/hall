(function () {
  var section = document.querySelector(".projects-premium");
  var stage = document.querySelector(".projects-premium__stage");
  var scroller = document.querySelector(".projects-premium__scroller");
  var track = document.querySelector(".projects-premium__track");
  var prevBtn = document.querySelector("[data-projects-prev]");
  var nextBtn = document.querySelector("[data-projects-next]");
  var currentEl = document.querySelector("[data-projects-current]");
  var totalEl = document.querySelector("[data-projects-total]");
  if (!section || !scroller || !track) return;

  var cards = Array.prototype.slice.call(track.querySelectorAll(".projects-premium__card"));
  if (!cards.length) return;

  var desktopST = null;
  var desktopTween = null;
  var pendingX = null;
  var pendingTimer = 0;

  cards.forEach(function (card) {
    card.setAttribute("tabindex", "0");
  });

  if (totalEl) totalEl.textContent = pad(cards.length);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function gap() {
    var style = window.getComputedStyle(track);
    return parseFloat(style.columnGap || style.gap) || 24;
  }

  function cardStep() {
    var width = cards[0].getBoundingClientRect().width || 400;
    return width + gap();
  }

  function travel() {
    return Math.max(track.scrollWidth - window.innerWidth + 80, 0);
  }

  function progressX() {
    if (desktopST) return desktopST.progress * travel();
    return scroller.scrollLeft;
  }

  function currentIndex() {
    var step = cardStep() || 1;
    return Math.max(0, Math.min(cards.length - 1, Math.round(progressX() / step)));
  }

  function updateUi() {
    var x = pendingX != null ? pendingX : progressX();
    var max = travel();
    var step = cardStep() || 1;
    var index = Math.max(0, Math.min(cards.length - 1, Math.round(x / step)));

    if (currentEl) currentEl.textContent = pad(index + 1);
    if (prevBtn) {
      prevBtn.disabled = x <= Math.max(40, step * 0.2);
      prevBtn.setAttribute("aria-disabled", prevBtn.disabled ? "true" : "false");
    }
    if (nextBtn) {
      nextBtn.disabled = x >= max - Math.max(40, step * 0.2);
      nextBtn.setAttribute("aria-disabled", nextBtn.disabled ? "true" : "false");
    }

    if (pendingX != null && Math.abs(progressX() - pendingX) < 8) pendingX = null;
  }

  function getLenis() {
    return window.lenis || document.documentElement._lenis || null;
  }

  function scrollPageTo(y) {
    var lenis = getLenis();
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(y, { duration: 1.05 });
      return;
    }
    if (desktopST && typeof desktopST.scroll === "function") {
      desktopST.scroll(y);
      return;
    }
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function go(dir) {
    var max = travel();
    var step = cardStep();
    if (!max || !step) return;

    var from = pendingX != null ? pendingX : progressX();
    var nextX = Math.max(0, Math.min(max, from + dir * step));
    if (Math.abs(nextX - from) < 2) return;

    pendingX = nextX;
    updateUi();

    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(function () {
      pendingX = null;
      updateUi();
    }, 1100);

    if (desktopST) {
      var range = desktopST.end - desktopST.start;
      scrollPageTo(desktopST.start + (nextX / max) * range);
      return;
    }

    scroller.scrollTo({ left: nextX, behavior: "smooth" });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      go(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      go(1);
    });
  }

  scroller.addEventListener("scroll", updateUi, { passive: true });

  cards.forEach(function (card) {
    card.addEventListener("pointerup", function (event) {
      if (event.pointerType === "mouse") return;
      cards.forEach(function (item) {
        item.classList.toggle("is-open", item === card);
      });
    });
  });

  function initDesktop() {
    var tween = gsap.to(track, {
      x: function () {
        return -travel();
      },
      ease: "none",
      onUpdate: updateUi,
      scrollTrigger: {
        trigger: stage || scroller,
        pin: true,
        scrub: 1.15,
        start: "top 12%",
        end: function () {
          return "+=" + Math.max(travel(), window.innerHeight);
        },
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: updateUi,
        onRefresh: updateUi
      }
    });

    desktopTween = tween;
    desktopST = tween.scrollTrigger;
    updateUi();
    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
      updateUi();
    });

    return function () {
      window.clearTimeout(pendingTimer);
      pendingX = null;
      desktopST = null;
      desktopTween = null;
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
      gsap.set(track, { x: 0 });
    };
  }

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    var mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", function () {
      return initDesktop();
    });
    mm.add("(max-width: 991px)", function () {
      updateUi();
      return function () {};
    });
  } else {
    updateUi();
  }

  updateUi();
  window.addEventListener("load", function () {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    updateUi();
  });
})();
