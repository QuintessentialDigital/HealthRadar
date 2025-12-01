const HEALTHRADAR_API_BASE = "https://healthradar-nw8g.onrender.com";

// Dentist preview via HealthRadar API
const dentistForm = document.getElementById("dentist-preview-form");
if (dentistForm) {
  dentistForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postcodeInput = document.getElementById("dentist-postcode");
    const radiusInput = document.getElementById("dentist-radius");
    const statusEl = document.getElementById("dentist-preview-status");
    const resultsEl = document.getElementById("dentist-preview-results");

    const postcode = postcodeInput?.value?.trim();
    const radius = radiusInput?.value || 25;

    if (!postcode) {
      if (statusEl) statusEl.textContent = "Please enter a postcode.";
      return;
    }

    if (statusEl) {
      statusEl.textContent = "Checking live availability...";
    }
    if (resultsEl) {
      resultsEl.innerHTML = "";
    }

    try {
      const url =
        HEALTHRADAR_API_BASE +
        "/api/radar/dentist/preview?postcode=" +
        encodeURIComponent(postcode) +
        "&radiusMiles=" +
        encodeURIComponent(radius);

      const res = await fetch(url);
      const data = await res.json();

      if (!data.ok) {
        if (statusEl) {
          statusEl.textContent =
            "Could not fetch availability at the moment. Please try again.";
        }
        return;
      }

      const matches = Array.isArray(data.matches) ? data.matches : [];
      if (statusEl) {
        statusEl.textContent =
          matches.length === 0
            ? "No practices currently accepting new patients in this area (based on latest data)."
            : `Found ${matches.length} practice(s) currently accepting new patients.`;
      }

      if (resultsEl) {
        if (matches.length === 0) {
          resultsEl.innerHTML = "";
          return;
        }

        const list = document.createElement("ul");
        list.className = "preview-results-list";

        matches.slice(0, 5).forEach((p) => {
          const li = document.createElement("li");
          li.className = "preview-results-item";

          const title = document.createElement("div");
          title.className = "preview-results-item-title";
          title.textContent = p.name || "Practice";

          const meta = document.createElement("div");
          meta.className = "preview-results-item-meta";
          const bits = [];

          if (p.distanceText) bits.push(p.distanceText);
          if (p.postcode) bits.push(p.postcode);
          if (p.phone) bits.push("Phone: " + p.phone);
          meta.textContent = bits.join(" • ");

          li.appendChild(title);
          li.appendChild(meta);
          list.appendChild(li);
        });

        resultsEl.innerHTML = "";
        resultsEl.appendChild(list);
      }
    } catch (error) {
      console.error("Dentist preview error", error);
      if (statusEl) {
        statusEl.textContent =
          "Something went wrong contacting HealthRadar. Please try again.";
      }
      if (resultsEl) {
        resultsEl.innerHTML = "";
      }
    }
  });
}

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
