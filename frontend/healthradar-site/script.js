
// Smooth scroll for internal links
document.addEventListener("click", (event) => {
  const target = event.target.closest('a[href^="#"]');
  if (!target) return;

  const href = target.getAttribute("href");
  if (!href || href === "#") return;

  const el = document.querySelector(href);
  if (!el) return;

  event.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// GP waitlist form – for now this is local-only (no backend)
const gpForm = document.getElementById("gp-waitlist-form");
if (gpForm) {
  gpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const messageEl = document.getElementById("form-message");
    if (messageEl) {
      messageEl.textContent = "Thanks – you’re on the list for GPRadar.";
    }

    gpForm.reset();
  });
}
