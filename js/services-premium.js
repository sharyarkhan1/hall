(function () {
  var root = document.querySelector("[data-services-stage]");
  if (!root) return;

  var stageHome = root.querySelector(".services-premium__stage-home");
  var stage = root.querySelector(".services-premium__stage");
  var photos = root.querySelectorAll(".services-premium__photo");
  var meta = root.querySelector(".services-premium__meta");
  var kicker = root.querySelector(".services-premium__meta-kicker");
  var nameEl = root.querySelector(".services-premium__meta-name");
  var copyEl = root.querySelector(".services-premium__meta-copy");
  var items = root.querySelectorAll(".services-premium__item");
  if (photos.length < 2 || !items.length) return;

  var showing = 0;
  var pending = 0;
  var captionTimer = 0;
  var captionToken = 0;
  var mq = window.matchMedia("(max-width: 991px)");

  items.forEach(function (item) {
    var preload = new Image();
    preload.src = item.getAttribute("data-image");
  });

  function isMobile() {
    return mq.matches;
  }

  function placeStage(item) {
    if (!stage || !item) return;
    if (isMobile()) {
      var li = item.closest("li");
      if (li && stage.parentElement !== li) {
        li.appendChild(stage);
      }
      return;
    }
    if (stageHome && stage.parentElement !== stageHome) {
      stageHome.appendChild(stage);
    }
  }

  function setExpanded(item) {
    items.forEach(function (el) {
      el.setAttribute("aria-expanded", el === item ? "true" : "false");
    });
  }

  function setGroup(group) {
    root.classList.toggle("is-internal", group === "Internal");
    root.classList.toggle("is-external", group === "External");
  }

  function setCaption(label, group, copy) {
    if (!nameEl) return;
    var sameName = nameEl.textContent === label;
    var sameGroup = !kicker || kicker.textContent === group;
    var sameCopy = !copyEl || copyEl.textContent === copy;
    if (sameName && sameGroup && sameCopy) return;

    var token = ++captionToken;
    if (meta) meta.classList.add("is-swap");
    window.clearTimeout(captionTimer);
    captionTimer = window.setTimeout(function () {
      if (token !== captionToken) return;
      if (kicker) kicker.textContent = group;
      nameEl.textContent = label;
      if (copyEl) copyEl.textContent = copy;
      if (meta) meta.classList.remove("is-swap");
    }, 220);
  }

  function activate(item, opts) {
    var src = item.getAttribute("data-image");
    var label = item.getAttribute("data-label") || "";
    var group = item.getAttribute("data-group") || "";
    var copy = item.getAttribute("data-copy") || "";
    var currentSrc = photos[showing].getAttribute("src");
    var alreadyActive = item.classList.contains("is-active");

    items.forEach(function (el) {
      el.classList.remove("is-active");
    });
    item.classList.add("is-active");
    setExpanded(item);
    setGroup(group);
    setCaption(label, group, copy);
    placeStage(item);

    if (opts && opts.scroll && isMobile()) {
      window.requestAnimationFrame(function () {
        window.setTimeout(function () {
          var li = item.closest("li");
          if (!li) return;
          var offset = 88;
          var rect = li.getBoundingClientRect();
          if (rect.top < offset - 4 || rect.bottom > window.innerHeight - 12) {
            window.scrollTo({
              top: Math.max(0, window.scrollY + rect.top - offset),
              behavior: "smooth"
            });
          }
        }, 50);
      });
    }

    if (alreadyActive && currentSrc === src) return;
    if (currentSrc === src) return;

    var next = 1 - showing;
    var nextPhoto = photos[next];
    var token = ++pending;

    function reveal() {
      if (token !== pending) return;
      nextPhoto.alt = label;
      photos[showing].classList.remove("is-active");
      nextPhoto.classList.add("is-active");
      photos[showing].setAttribute("aria-hidden", "true");
      nextPhoto.removeAttribute("aria-hidden");
      showing = next;
    }

    if (nextPhoto.getAttribute("src") === src && nextPhoto.complete) {
      reveal();
      return;
    }

    nextPhoto.onload = reveal;
    nextPhoto.src = src;
    if (nextPhoto.complete) reveal();
  }

  items.forEach(function (item) {
    item.setAttribute("aria-expanded", item.classList.contains("is-active") ? "true" : "false");
    item.addEventListener("mouseenter", function () {
      if (isMobile()) return;
      activate(item);
    });
    item.addEventListener("focus", function () {
      if (isMobile()) return;
      activate(item);
    });
    item.addEventListener("click", function () {
      activate(item, { scroll: isMobile() });
    });
  });

  function syncMode() {
    var active = root.querySelector(".services-premium__item.is-active") || items[0];
    placeStage(active);
  }

  if (mq.addEventListener) {
    mq.addEventListener("change", syncMode);
  } else if (mq.addListener) {
    mq.addListener(syncMode);
  }
  window.addEventListener("resize", syncMode);

  syncMode();
})();
