/* Wizerflow homepage — the instrument.
   Engine: scroll-craft (js/vendor/scrollcraft.js). Everything else is small,
   vanilla, and progressive: the page is fully readable with JS disabled. */
(function () {
  "use strict";

  /* -- scroll engine ------------------------------------------------------ */
  /* short viewports (landscape phones) cannot hold a 3-span pinned stage:
     degrade the escapement to normal flow before the engine reads it */
  if (matchMedia("(max-height: 640px)").matches) {
    var pin = document.querySelector('[data-sc-act="pin"]');
    if (pin) pin.setAttribute("data-sc-act", "flow");
  }
  if (window.ScrollCraft) {
    try {
      window.ScrollCraft.mount(document.body, { lerp: 0.18 });
    } catch (e) {
      /* the page is plain flow content; engine failure must not break it */
      console.warn("scrollcraft failed to mount", e);
    }
  }

  /* -- header state -------------------------------------------------------- */
  var header = document.querySelector(".wf-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* -- mobile menu --------------------------------------------------------- */
  var menuBtn = document.querySelector(".wf-menu-btn");
  var mobileNav = document.querySelector(".wf-mobile-nav");
  if (menuBtn && mobileNav) {
    var setMenu = function (open) {
      menuBtn.setAttribute("aria-expanded", String(open));
      mobileNav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* -- FAQ answer carousel ---------------------------------------------------
     A continuous track: every card always holds a real slot offset from the
     active one, so navigating glides the whole fan like pages. Cards that
     wrap around the ring snap invisibly at the far, faded edge. */
  var faqSec = document.querySelector(".wf-faqcar");
  if (faqSec) {
    var cards = Array.prototype.slice.call(faqSec.querySelectorAll(".wf-faqcar__card"));
    var arrows = faqSec.querySelectorAll(".wf-faqcar__arrow");
    var count = faqSec.querySelector(".wf-faqcar__count");
    var narrow = window.matchMedia("(max-width: 991px)");
    var n = cards.length;
    /* rhodium drift tints, one per question */
    var tints = ["#e9eaec", "#e7e9ef", "#ecebe7", "#e6ebea", "#eae7ee",
                 "#ebeae6", "#e7ecef", "#ece9ea", "#e9ece9"];
    var active = 0;
    var locked = false;

    var apply = function (animate) {
      cards.forEach(function (card, i) {
        var rel = i - active;
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;
        var prev = card.dataset.rel === undefined ? rel : parseInt(card.dataset.rel, 10);
        var ax = Math.abs(rel);
        /* a card that crossed the ring snaps while fully faded instead of
           sweeping across the stage */
        var crossed = prev !== rel && prev * rel < 0 && Math.abs(prev) > 1 && ax > 1;
        card.classList.toggle("is-snap", !animate || crossed);

        var op = rel === 0 ? 1 : Math.max(0, 0.72 - (ax - 1) * 0.3);
        if (narrow.matches && rel !== 0) op = 0;
        card.style.setProperty("--lx", (rel * 30) + "%");
        card.style.setProperty("--sc", Math.max(0.82, 1 - ax * 0.09).toFixed(3));
        card.style.setProperty("--op", op.toFixed(3));
        card.style.setProperty("--bl", Math.min(7, ax * 2.5).toFixed(1) + "px");
        card.style.setProperty("--dy", (ax === 0 ? 0 : Math.min(10, 4 + ax * 2)) + "%");
        card.classList.toggle("is-center", rel === 0);
        /* neighbours are decorative echoes of real content, not separate tabs */
        card.setAttribute("aria-hidden", rel === 0 ? "false" : "true");
        card.dataset.rel = rel;
        if (card.classList.contains("is-snap")) {
          requestAnimationFrame(function () { card.classList.remove("is-snap"); });
        }
      });
      if (count) {
        count.textContent = String(active + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
      }
      faqSec.style.backgroundColor = tints[active % tints.length];
    };

    var navigate = function (dir) {
      if (locked) return;
      locked = true;
      active = (active + (dir === "next" ? 1 : n - 1)) % n;
      apply(true);
      setTimeout(function () { locked = false; }, 720);
    };

    if (arrows.length === 2) {
      arrows[0].addEventListener("click", function () { navigate("prev"); });
      arrows[1].addEventListener("click", function () { navigate("next"); });
    }
    /* arrow keys drive the carousel while it is on screen */
    window.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var r = faqSec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      navigate(e.key === "ArrowRight" ? "next" : "prev");
    });

    faqSec.classList.add("wf-faqcar--ready");
    apply(false);
  }
})();
