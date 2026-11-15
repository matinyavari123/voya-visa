/**
 * ریل اسلایدی (بخش خدمات، مسیر کار و هر ریل دیگری).
 * - حرکت با منحنی شتاب خودمان، نه اسکرول نرم پیش‌فرض مرورگر
 * - کارت‌هایی که نیمه‌بیرون‌اند کمی کوچک و کم‌رنگ می‌شوند
 * - با موس هم می‌شود ریل را گرفت و کشید
 * راست‌چین و چپ‌چین هر دو کار می‌کنند: لبه‌ی «شروع» از روی موقعیت واقعی
 * عنصرها خوانده می‌شود، نه از روی علامت scrollLeft که بین مرورگرها فرق دارد.
 */
(function () {
  "use strict";

  var DURATION = 560;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function setup(root) {
    var track = root.querySelector("[data-slider-track]");
    if (!track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll("[data-slider-slide]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-slider-dot]"));
    var prev = root.querySelector("[data-slider-prev]");
    var next = root.querySelector("[data-slider-next]");
    if (slides.length < 2) return;

    var rtl = getComputedStyle(track).direction === "rtl";
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var active = 0;
    var anim = null;
    var queued = false;

    /** فاصله‌ی اسلاید تا لبه‌ی شروع ریل، بر حسب پیکسل */
    function offsetFromStart(slide) {
      var t = track.getBoundingClientRect();
      var s = slide.getBoundingClientRect();
      return rtl ? s.right - t.right : s.left - t.left;
    }

    function leadingIndex() {
      var best = 0;
      var bestDist = Infinity;
      for (var i = 0; i < slides.length; i++) {
        var d = Math.abs(offsetFromStart(slides[i]));
        if (d < bestDist - 1) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    }

    /** فاصله‌ی لبه‌ی پایانی اسلاید تا لبه‌ی پایانی ریل؛ در انتهای ریل صفر است */
    function offsetFromEnd(slide) {
      var t = track.getBoundingClientRect();
      var s = slide.getBoundingClientRect();
      return rtl ? s.left - t.left : t.right - s.right;
    }

    // ریل چند پیکسل padding دارد، پس آستانه کمی بازتر از صفر است
    var EDGE = 6;

    function atStart() {
      return Math.abs(offsetFromStart(slides[0])) < EDGE;
    }

    function atEnd() {
      return Math.abs(offsetFromEnd(slides[slides.length - 1])) < EDGE;
    }

    /**
     * نمای سه‌بعدی ریل: هرچه کارت از مرکز دورتر شود، بیشتر به عقب می‌چرخد،
     * کمی دورتر می‌رود و کم‌رنگ‌تر می‌شود.
     */
    function shade() {
      if (reduced) return;
      var t = track.getBoundingClientRect();
      var center = (t.left + t.right) / 2;
      var half = (t.width || 1) / 2;
      for (var i = 0; i < slides.length; i++) {
        var s = slides[i].getBoundingClientRect();
        var shown = Math.max(0, Math.min(s.right, t.right) - Math.max(s.left, t.left));
        var ratio = s.width ? Math.max(0, Math.min(1, shown / s.width)) : 1;
        var eased = ratio * ratio * (3 - 2 * ratio);
        var rel = Math.max(-1, Math.min(1, ((s.left + s.right) / 2 - center) / half));

        slides[i].style.opacity = (0.34 + 0.66 * eased).toFixed(3);
        slides[i].style.transform =
          "perspective(1300px) rotateY(" +
          (-rel * 15).toFixed(2) +
          "deg) translateZ(" +
          (-Math.abs(rel) * 70 - (1 - eased) * 40).toFixed(1) +
          "px) scale(" +
          (0.95 + 0.05 * eased).toFixed(4) +
          ")";
      }
    }

    function paint() {
      active = leadingIndex();
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute("aria-current", i === active ? "true" : "false");
      }
      if (prev) prev.disabled = atStart();
      if (next) next.disabled = atEnd();
      shade();
    }

    function scrollTo(target) {
      if (anim) cancelAnimationFrame(anim);
      var from = track.scrollLeft;
      var delta = target - from;
      if (reduced || Math.abs(delta) < 1) {
        track.scrollLeft = target;
        paint();
        return;
      }
      var started = null;
      (function step(now) {
        if (started === null) started = now;
        var p = Math.min(1, (now - started) / DURATION);
        track.scrollLeft = from + delta * easeInOutCubic(p);
        paint();
        if (p < 1) anim = requestAnimationFrame(step);
        else anim = null;
      })(performance.now());
    }

    function go(i) {
      var n = Math.max(0, Math.min(slides.length - 1, i));
      scrollTo(track.scrollLeft + offsetFromStart(slides[n]));
    }

    if (prev) prev.addEventListener("click", function () { go(active - 1); });
    if (next) next.addEventListener("click", function () { go(active + 1); });
    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { go(i); });
    });

    track.addEventListener("keydown", function (e) {
      var forward = rtl ? "ArrowLeft" : "ArrowRight";
      var back = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) { e.preventDefault(); go(active + 1); }
      else if (e.key === back) { e.preventDefault(); go(active - 1); }
    });

    // کشیدن با موس؛ روی لمس همان اسکرول خود مرورگر کار می‌کند.
    // از setPointerCapture استفاده نمی‌کنیم، چون هدف کلیک را از روی لینک کارت
    // برمی‌دارد و باز شدن لینک‌ها را خراب می‌کند.
    var dragging = false;
    var startX = 0;
    var startScroll = 0;
    var moved = false;

    function onMove(e) {
      if (!dragging) return;
      if (Math.abs(e.clientX - startX) > 6) moved = true;
      track.scrollLeft = startScroll - (e.clientX - startX);
      paint();
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      // فقط کلیکی که بلافاصله بعد از کشیدن می‌آید خنثی می‌شود
      if (moved) setTimeout(function () { moved = false; }, 0);
      go(leadingIndex());
    }

    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      if (anim) cancelAnimationFrame(anim);
      track.classList.add("is-dragging");
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);
    });

    track.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // کشیدن روی یک کارتِ لینک‌دار نباید باز کردن آن لینک حساب شود
    track.addEventListener(
      "click",
      function (e) {
        if (!moved) return;
        moved = false;
        e.preventDefault();
        e.stopPropagation();
      },
      true,
    );

    track.addEventListener(
      "scroll",
      function () {
        if (queued || anim || dragging) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          paint();
        });
      },
      { passive: true },
    );
    window.addEventListener("resize", paint);

    paint();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-slider]"), setup);
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
