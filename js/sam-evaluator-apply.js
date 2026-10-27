/* SAM Evaluator pilot application — compose-and-open mailto.
   Vanilla and progressive: with JS off, the button stays enabled and the
   form posts to the same mailto address as a plain fallback. With JS on,
   every answer is labeled into a plain-text body, encodeURIComponent'd,
   and opened in the visitor's mail app. No backend, nothing stored. */
(function () {
  "use strict";

  var form = document.getElementById("sea-form");
  if (!form) return;

  var OS_NOTE = document.getElementById("sea-note-os");
  var CLAUDE_NOTE = document.getElementById("sea-note-claude");
  var SAM_NOTE = document.getElementById("sea-note-sam");
  var DEAL_COUNT = document.getElementById("sea-deal-count");
  var WHY = document.getElementById("sea-why");
  var ERR = document.getElementById("sea-error");
  var DONE = document.getElementById("sea-done");
  var submitBtn = document.getElementById("sea-submit");

  var RECIPIENT = "chrisnjonjo@wizerflow.com";
  var SUBJECT = "SAM Evaluator pilot application";

  var dealBoxes = Array.prototype.slice.call(form.querySelectorAll('input[name^="deal-"]'));

  var choice = function (name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : "";
  };
  var field = function (name) {
    var el = form.querySelector('input[name="' + name + '"]');
    return el ? el.value.trim() : "";
  };

  var dealAgreed = function () {
    return dealBoxes.filter(function (b) { return b.checked; }).length;
  };
  var eligible = function () {
    return choice("q-os") !== "" && choice("q-claude") !== "no";
  };

  /* -- live state: notes explain every gate the moment it appears -------- */
  var update = function () {
    var os = choice("q-os");
    var claude = choice("q-claude");
    var sam = choice("q-sam");

    if (OS_NOTE) OS_NOTE.hidden = !(os === "windows" || os === "linux" || os === "notsure");
    if (CLAUDE_NOTE) CLAUDE_NOTE.hidden = claude !== "no";
    if (SAM_NOTE) SAM_NOTE.hidden = !(sam === "no" || sam === "notsure");

    var agreed = dealAgreed();
    if (DEAL_COUNT) {
      DEAL_COUNT.textContent = agreed + " of 4 agreed — all four are part of the deal.";
    }

    /* the disabled submit is always explained by a visible line */
    if (submitBtn) submitBtn.disabled = !eligible() || agreed < 4;

    if (WHY) {
      WHY.hidden = eligible() && agreed >= 4;
      WHY.textContent = "";
      if (!eligible()) {
        WHY.textContent = "The button wakes up once the computer and Claude answers above are filled in.";
      } else if (agreed < 4) {
        WHY.textContent = "The button wakes up once all four boxes in the pilot deal are checked.";
      }
    }
  };

  form.addEventListener("change", function (e) {
    if (e.target && (e.target.type === "radio" || e.target.type === "checkbox")) update();
  });

  /* -- compose and open --------------------------------------------------- */
  var line = function (label, value) { return label + ": " + value; };

  var composeBody = function () {
    var osMap = { mac: "Mac", windows: "Windows", linux: "Linux", notsure: "Not sure" };
    var claudeMap = { have: "I have one", willing: "Willing to start one", no: "No" };
    var samMap = { yes: "Yes", no: "No", notsure: "Not sure" };

    return [
      "SAM EVALUATOR PILOT APPLICATION",
      "",
      "THE BASICS",
      line("Computer they'll run it on", osMap[choice("q-os")] || ""),
      line("Claude subscription", claudeMap[choice("q-claude")] || ""),
      line("SAM.gov registration active right now", samMap[choice("q-sam")] || ""),
      "",
      "YOU",
      line("Name", field("f-name")),
      line("Company", field("f-company")),
      line("Email", field("f-email")),
      line("UEI", field("f-uei") || "(not given)"),
      line("CAGE code", field("f-cage") || "(not given)"),
      "",
      "THE PILOT DEAL",
      line("Understood the $247 one-time pilot price and what it covers", "Agreed"),
      line("Will get a free SAM.gov API key before install day", "Agreed"),
      line("Understood support scope (making the system run; features separate)", "Agreed"),
      line("Testimonial, 15-minute case-study call, anonymous reports", "Agreed"),
      "",
      "(Anything else you'd like us to know - what your business does and",
      "what you're chasing on SAM.gov - add it here.)"
    ].join("\n");
  };

  var fail = function (message, focusEl) {
    if (ERR) {
      ERR.textContent = message;
      ERR.hidden = false;
    }
    if (focusEl) focusEl.focus();
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (ERR) ERR.hidden = true;

    /* required fields, with a friendly inline error */
    var missing = [];
    if (!field("f-name")) missing.push("your name");
    if (!field("f-company")) missing.push("your company name");
    if (!field("f-email")) missing.push("your email");
    if (missing.length) {
      fail("Still needed: " + missing.join(", ") + ". Fill those in and press the button again.",
        form.querySelector('input[name="' + (field("f-name") ? (field("f-company") ? "f-email" : "f-company") : "f-name") + '"]'));
      return;
    }
    var email = field("f-email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fail("That email address doesn't look complete — check it and try again.",
        form.querySelector('input[name="f-email"]'));
      return;
    }

    var href = "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(SUBJECT) +
      "&body=" + encodeURIComponent(composeBody());
    window.location.href = href;

    /* the confirmation state: the email is composed, not sent */
    form.hidden = true;
    if (DONE) {
      DONE.hidden = false;
      var h = DONE.querySelector("h2");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* first paint: establish the disabled state and its explanation */
  update();
})();
