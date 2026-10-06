/* =========================================================
   DIVINE MOONLIGHT — SHARED NAVIGATION
   Edit this file to change the navigation across the site.
   ========================================================= */

(function () {
  const logoPath = "media/logo%231.png";

  const navMarkup = `
    <header class="header">
      <div class="container navrow">
        <a aria-label="Divine Moonlight home" class="brand" href="index.html">
          <img alt="Divine Moonlight" src="${logoPath}">
        </a>
        <nav aria-label="Primary" class="desktop-nav">
          <a data-nav="home" href="index.html">Home</a>
          <a data-nav="services" href="services.html">Services</a>
          <a data-nav="about" href="mission.html">About Us</a>
          <a data-nav="service-areas" href="service-areas.html">Service Areas</a>
          <a data-nav="careers" href="careers.html">Careers</a>
          <a data-nav="contact" href="contact.html">Contact</a>
        </nav>
        <div>
          <a class="btn btn-primary" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lUNjZPMURaNVk0UjdXNktGN1ZVVE9MTUhaUS4u">Request Care</a>
          <button aria-expanded="false" aria-label="Open menu" class="mobile-toggle">☰</button>
        </div>
      </div>
      <div class="mobile-nav">
        <nav aria-label="Mobile">
          <a data-nav="home" href="index.html">Home</a>
          <a data-nav="services" href="services.html">Services</a>
          <a data-nav="about" href="mission.html">About Us</a>
          <a data-nav="service-areas" href="service-areas.html">Service Areas</a>
          <a data-nav="careers" href="careers.html">Careers</a>
          <a data-nav="contact" href="contact.html">Contact</a>
          <a class="nav-action-link" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lUNjZPMURaNVk0UjdXNktGN1ZVVE9MTUhaUS4u">Request Care</a>
          <a class="nav-action-link" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lURFkyTFRUS0xTOEg3N1VOQk1XREpQUDBSNS4u">General Inquiry</a>
        </nav>
      </div>
    </header>
  `;

  function initSiteReveals() {
    const selectors = [
      ".section-head",
      ".services-heading",
      ".service-detail",
      ".contact-card",
      ".service-area-layout",
      ".service-area-intro",
      ".service-area-info",
      ".mission-section-heading",
      ".mission-copy > *",
      ".mission-final",
      ".founders-intro",
      ".founders-feature",
      ".founders-josephine",
      ".quote-box",
      ".steps",
      ".careers-hero",
      ".career-card",
      ".footer-grid > div"
    ];

    const targets = document.querySelectorAll(selectors.join(","));
    if (!targets.length) return;

    document.documentElement.classList.add("reveal-ready");
    targets.forEach(element => element.classList.add("site-reveal"));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(element => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });

    targets.forEach(element => observer.observe(element));

    requestAnimationFrame(() => {
      targets.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      });
    });
  }

  function injectNavigation() {
    document.querySelectorAll(".header").forEach(header => header.remove());

    const wrapper = document.createElement("div");
    wrapper.id = "shared-site-navigation";
    wrapper.innerHTML = navMarkup;

    const skip = document.querySelector(".skip");
    if (skip) {
      skip.insertAdjacentElement("afterend", wrapper);
    } else {
      document.body.insertBefore(wrapper, document.body.firstChild);
    }

    const path = window.location.pathname.split("/").pop() || "index.html";
    const pageMap = {
      "index.html": "home",
      "": "home",
      "services.html": "services",
      "mission.html": "about",
      "team.html": "team",
      "service-areas.html": "service-areas",
      "careers.html": "careers",
      "contact.html": "contact"
    };

    const active = pageMap[path];
    wrapper.querySelectorAll("[data-nav]").forEach(link => {
      if (link.dataset.nav === active) link.classList.add("active");
    });


    // Shared scroll reveals run from the navigation loader so they work
    // consistently on every page, including pages with only shared scripts.
    initSiteReveals();

    const header = wrapper.querySelector(".header");
    const toggle = wrapper.querySelector(".mobile-toggle");
    const mobile = wrapper.querySelector(".mobile-nav");

    const updateHeader = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    toggle?.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.textContent = open ? "×" : "☰";
    });

    mobile?.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.textContent = "☰";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNavigation);
  } else {
    injectNavigation();
  }
})();