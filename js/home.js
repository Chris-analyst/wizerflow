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

  /* -- FAQ accordion -------------------------------------------------------- */
  document.querySelectorAll(".wf-faq__toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
    });
  });
})();
