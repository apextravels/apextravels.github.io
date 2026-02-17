(function () {
  const phone = "92320797715";
  const defaultMessage = "Hello APEX TRAVELS, I would like to inquire about visa services.";

  const waUrl = (text) => {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${phone}?text=${encoded}`;
  };

  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("href", href);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  };

  const bindClickOpen = (id, text) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      const href = waUrl(text);
      el.setAttribute("href", href);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      // For buttons with href="#" prevent jump
      if (el.getAttribute("href") === "#") e.preventDefault();
      // If href was #, open directly
      if (e.defaultPrevented) window.open(href, "_blank", "noopener,noreferrer");
    });
  };

  // Set static WhatsApp links
  const defaultHref = waUrl(defaultMessage);
  [
    "getFreeConsultationHero",
    "whatsAppQuick",
    "whatsAppTextLink",
    "whatsAppContactLink",
    "whatsAppButton",
    "whatsAppFooterLink",
    "contactServicesCta",
    "contactDetailsCta",
  ].forEach((id) => setHref(id, defaultHref));

  // Top buttons
  setHref("getFreeConsultationTop", defaultHref);
  // Contact Us top goes to contact section (smooth scroll), not WhatsApp

  // Contact form => open WhatsApp with composed message
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phoneInput = String(data.get("phone") || "").trim();
      const message = String(data.get("message") || "").trim();

      const composed =
        `Hello APEX TRAVELS, I would like to inquire about visa services.%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phoneInput)}%0A` +
        `Message: ${encodeURIComponent(message)}`;

      window.open(`https://wa.me/${phone}?text=${composed}`, "_blank", "noopener,noreferrer");
    });
  }

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("aria-hidden", String(!open));
      mobileNav.style.display = open ? "block" : "none";
    };
    setOpen(false);

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    // Close menu on link click
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
  }
})();
