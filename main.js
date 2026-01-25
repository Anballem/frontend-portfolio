// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Dark Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");

  function updateThemeIcon() {
    if (document.documentElement.classList.contains("dark")) {
      themeToggle.textContent = "🌙";
    } else {
      themeToggle.textContent = "☀️";
    }
  }

  // Initialize dark mode based on saved preference or system preference
  function initDarkMode() {
    const savedDarkMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedDarkMode === "true" || (savedDarkMode === null && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    updateThemeIcon();
  }

  initDarkMode();

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    updateThemeIcon();
    
    // Save preference to localStorage
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
  });

  // Smooth Scroll for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      
      // Close mobile menu when a link is clicked
      mobileMenu.classList.add("hidden");
    });
  });

  // Project Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // Set initial active state for "All" button
  const allButton = document.querySelector('[data-filter="all"]');
  if (allButton) {
    allButton.classList.add("bg-indigo-600", "text-white");
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn =>
        btn.classList.remove("bg-indigo-600", "text-white")
      );

      button.classList.add("bg-indigo-600", "text-white");

      projectCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // Contact Form Validation
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector("input[type='text']");
      const emailInput = contactForm.querySelector("input[type='email']");
      const messageInput = contactForm.querySelector("textarea");

      // Simple Validation
      if (!nameInput || !emailInput || !messageInput) {
        console.error("Form inputs not found");
        return;
      }

      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert("Please fill in all fields.");
        return;
      }

      // If all fields are filled, you can proceed with form submission
      alert("Message sent!");
      contactForm.reset();
    });
  }

});

