/* =========================================================
   DIVINE MOONLIGHT — SHARED FOOTER
   One injected footer keeps contact details and branding
   consistent across every page.
   ========================================================= */

(function () {
  const logoPath = "media/logo%231.png";
  const requestCareUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lUNjZPMURaNVk0UjdXNktGN1ZVVE9MTUhaUS4u";
  const inquiryUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lURFkyTFRUS0xTOEg3N1VOQk1XREpQUDBSNS4u";

  const footerMarkup = `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand-column">
          <a class="footer-brand" href="index.html" aria-label="Divine Moonlight home">
            <img src="${logoPath}" alt="Divine Moonlight">
          </a>
          <p class="footer-description">
            Divine Moonlight Home Service LLC provides personalized home services and senior support for families across Wake, Durham, and Orange Counties, North Carolina.
          </p>
          <p class="footer-tagline">Crowning your golden years</p>
        </div>

        <div>
          <div class="footer-title">Explore</div>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="mission.html">Our Mission</a></li>
            <li><a href="mission.html">About Us</a></li>
            <li><a href="index.html#testimonials">Testimonials</a></li>
            <li><a href="careers.html">Work With Us</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-title">For families</div>
          <ul>
            <li><a href="${inquiryUrl}">General Inquiry</a></li>
            <li><a href="${requestCareUrl}">Request Care</a></li>
            <li><a href="index.html#testimonials">Leave a Review</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-title">Contact</div>
          <ul class="footer-contact">
            <li><a href="tel:+19843890943">984-389-0943</a></li>
            <li><a href="mailto:divine.moonlight.hc@gmail.com">divine.moonlight.hc@gmail.com</a></li>
            <li>Raleigh, NC</li>
          </ul>
          <p class="footer-service-note">Serving Wake, Durham, and Orange Counties.</p>
        </div>
      </div>

      <div class="container copyright">
        <span>&copy; 2026 Divine Moonlight Home Service LLC. All rights reserved.</span>
      </div>
    </footer>
  `;

  function injectFooter() {
    const existingFooters = document.querySelectorAll(".footer");
    existingFooters.forEach(footer => footer.remove());

    // Reuse the page's existing mount point. This avoids duplicate IDs
    // and keeps the footer exactly where the page expects it.
    let mount = document.getElementById("shared-site-footer");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "shared-site-footer";
      document.body.appendChild(mount);
    }

    mount.innerHTML = footerMarkup;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectFooter);
  } else {
    injectFooter();
  }
})();
