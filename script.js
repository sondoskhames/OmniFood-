
///////////////////////////////////////////////////////////
// 1. Set Current Year

const yearEl = document.querySelector(".year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


///////////////////////////////////////////////////////////
// 2. Mobile Navigation

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", function () {

    // Open / Close Navigation
    headerEl.classList.toggle("nav-open");

    // Update accessibility attribute
    const isOpen = headerEl.classList.contains("nav-open");

    btnNavEl.setAttribute("aria-expanded", isOpen);

  });
}


///////////////////////////////////////////////////////////
// 3. Smooth Scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {

  link.addEventListener("click", function (e) {

    const href = link.getAttribute("href");

    // Ignore external links and empty links
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();

    // Scroll to top
    if (href === "#") {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }

    // Scroll to another section
    else {

      const sectionEl = document.querySelector(href);

      if (sectionEl) {
        sectionEl.scrollIntoView({
          behavior: "smooth",
        });
      }

    }

    // Close mobile navigation after clicking a menu link
    if (link.classList.contains("main-nav-link")) {

      if (headerEl) {
        headerEl.classList.remove("nav-open");
      }

      if (btnNavEl) {
        btnNavEl.setAttribute("aria-expanded", "false");
      }

    }

  });

});


///////////////////////////////////////////////////////////
// 4. Sticky Navigation

const sectionHeroEl = document.querySelector(".section-hero");

if (sectionHeroEl && "IntersectionObserver" in window) {

  const obs = new IntersectionObserver(

    function (entries) {

      const ent = entries[0];

      if (!ent.isIntersecting) {

        document.body.classList.add("is-sticky");

      } else {

        document.body.classList.remove("is-sticky");

      }

    },

    {
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }

  );

  obs.observe(sectionHeroEl);

}
