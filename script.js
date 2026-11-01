(function () {
  // لو الملف اتحمّل مرتين، النسخة التانية متشتغلش
  if (window.__omnifoodInit) return;
  window.__omnifoodInit = true;

  ///////////////////////////////////////////////////////////
  // Set current year (only if a .year element exists in the page)
  const yearEl = document.querySelector(".year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  ///////////////////////////////////////////////////////////
  // Make mobile navigation work
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  btnNavEl.addEventListener("click", function (e) {
    e.stopImmediatePropagation();
    const isOpen = headerEl.classList.toggle("nav-open");
    document.body.classList.toggle("overflow-hidden", isOpen);
  });

  ///////////////////////////////////////////////////////////
  // Smooth scrolling animation
  const allLinks = document.querySelectorAll("a:link");

  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Only handle in-page links (leave tel:, mailto: etc. alone)
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();

      if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

      if (href !== "#") {
        const sectionEl = document.querySelector(href);
        if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile navigation
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.remove("nav-open");
        document.body.classList.remove("overflow-hidden");
      }
    });
  });

  ///////////////////////////////////////////////////////////
  // Sticky navigation
  const sectionHeroEl = document.querySelector(".section-hero");

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      if (ent.isIntersecting === false) document.body.classList.add("is-sticky");
      if (ent.isIntersecting === true) document.body.classList.remove("is-sticky");
    },
    { root: null, threshold: 0, rootMargin: "-80px" }
  );
  obs.observe(sectionHeroEl);
})();
