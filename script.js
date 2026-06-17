document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      body.classList.toggle("menu-open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
      });
    });
  }

  const progressBar = document.querySelector(".scroll-progress");

  const updateProgressBar = () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;
  };

  updateProgressBar();
  window.addEventListener("scroll", updateProgressBar);

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(
    ".portfolio-card[data-category]"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      portfolioCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.style.display = visible ? "block" : "none";
      });
    });
  });

  const bookingForm = document.getElementById("booking-form");
  const bookingSummary = document.getElementById("bookingSummary");
  const confirmation = document.getElementById("confirmation");

  if (bookingForm && bookingSummary) {
    const fields = ["name", "email", "service", "budget", "details"].map((id) =>
      document.getElementById(id)
    );

    const updateSummary = () => {
      const [name, email, service, budget, details] = fields.map(
        (field) => field?.value?.trim() || "—"
      );

      bookingSummary.innerHTML = `
        <strong>Project Summary</strong><br>
        <strong>Name:</strong> ${name}<br>
        <strong>Contact:</strong> ${email}<br>
        <strong>Project:</strong> ${service}<br>
        <strong>Budget:</strong> ${budget}<br>
        <strong>Details:</strong> ${details}
      `;
    };

    fields.forEach((field) => {
      if (!field) return;
      field.addEventListener("input", updateSummary);
      field.addEventListener("change", updateSummary);
    });

    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (confirmation) {
        confirmation.textContent =
          "Your request is ready. Connect this form to Formspree, Netlify Forms, or your email backend to receive submissions.";
      }

      updateSummary();
    });

    updateSummary();
  }

  const rainContainer = document.querySelector(".droplet-rain");

  if (rainContainer) {
    const colors = [
      "#ff006e",
      "#3a86ff",
      "#8338ec",
      "#ffbe0b",
      "#06d6a0",
      "#fb5607",
      "#ff4d6d",
      "#00f5d4",
      "#000000",
      "#f1f1f1"
    ];

    function createDroplet() {
      const drop = document.createElement("div");
      drop.classList.add("droplet");

      const size = Math.random() * 18 + 12;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 4 + 4;

      drop.style.left = `${Math.random() * window.innerWidth}px`;
      drop.style.width = `${size}px`;
      drop.style.height = `${size * 1.4}px`;
      drop.style.background = color;
      drop.style.color = color;
      drop.style.animationDuration = `${duration}s`;

      rainContainer.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, duration * 1000);
    }

    setInterval(createDroplet, 250);
  }
});