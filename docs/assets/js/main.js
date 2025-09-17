// Takedown Atlas - Interactive Elements

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Persona tabs functionality
  const personaTabs = document.querySelectorAll(".persona-tab");
  const personaContents = document.querySelectorAll(".persona-content");

  personaTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const persona = this.getAttribute("data-persona");

      // Remove active class from all tabs and contents
      personaTabs.forEach((t) => t.classList.remove("active"));
      personaContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const targetContent = document.querySelector(
        `.persona-content[data-persona="${persona}"]`,
      );
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Stats counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        animateCounter(entry.target);
        entry.target.classList.add("counted");
      }
    });
  }, observerOptions);

  // Observe stat numbers for animation
  const statNumbers = document.querySelectorAll(".stat-number, .mini-number");
  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  function animateCounter(element) {
    const targetText = element.textContent;
    const isPercentage = targetText.includes("%");
    const targetNumber = parseInt(targetText.replace(/[,%]/g, ""));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        current = targetNumber;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (targetText.includes(",") && displayValue >= 1000) {
        displayValue = displayValue.toLocaleString();
      }
      if (isPercentage) {
        displayValue += "%";
      }

      element.textContent = displayValue;
    }, duration / steps);
  }

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear the timeout
    clearTimeout(scrollTimeout);

    // Set a timeout to run after scrolling stops
    scrollTimeout = setTimeout(() => {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up or at top
        header.style.transform = "translateY(0)";
      }
      lastScrollTop = scrollTop;
    }, 100); // Delay in milliseconds
  });

  // Add transition to header
  header.style.transition = "transform 0.3s ease-in-out";

  // Animated elements on scroll
  const animatedObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Observe animated elements
  const animatedElements = document.querySelectorAll(
    ".step, .trust-card, .impact-card, .cta-card",
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    animatedObserver.observe(el);
  });

  // Interactive button hover effects with enhanced feedback
  const buttons = document.querySelectorAll(".btn, .cta-card, .persona-tab");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Enhanced CTA tracking with visual feedback
  const ctaButtons = document.querySelectorAll(
    'a[href="#report-removal"], a[href="#explore-map"], a[href="#claim-business"]',
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Log interaction (in production, this would send to analytics)
      console.log(
        "CTA clicked:",
        this.textContent.trim(),
        "Target:",
        this.getAttribute("href"),
      );

      // Show placeholder message for non-implemented features
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        showPlaceholderMessage(this.textContent.trim());
      }
    });
  });

  function showPlaceholderMessage(actionName) {
    // Create a simple toast notification
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--brand-primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      z-index: 10000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;
    toast.textContent = `${actionName} - Coming soon! This is a demo site.`;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(400px)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Accessibility enhancements
  document.addEventListener("keydown", function (e) {
    // Allow Enter key to activate persona tabs
    if (e.key === "Enter" && e.target.classList.contains("persona-tab")) {
      e.target.click();
    }
  });

  // Make persona tabs keyboard accessible
  personaTabs.forEach((tab, index) => {
    tab.setAttribute("tabindex", "0");
    tab.setAttribute("role", "tab");
    tab.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const direction = e.key === "ArrowLeft" ? -1 : 1;
        const newIndex =
          (index + direction + personaTabs.length) % personaTabs.length;
        personaTabs[newIndex].focus();
        personaTabs[newIndex].click();
      }
    });
  });

  // Dynamic loading states for external links
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const originalText = this.textContent;
      this.style.opacity = "0.7";
      this.textContent = "Opening...";

      setTimeout(() => {
        this.style.opacity = "1";
        this.textContent = originalText;
      }, 1000);
    });
  });

  // Privacy notice interaction
  const privacyElements = document.querySelectorAll(
    ".hero-privacy, .trust-card",
  );
  privacyElements.forEach((element) => {
    element.addEventListener("click", function () {
      // Highlight privacy commitment
      this.style.background = "rgba(29, 167, 161, 0.1)";
      this.style.borderRadius = "0.5rem";
      this.style.padding = "1rem";
      this.style.transition = "all 0.3s ease";

      setTimeout(() => {
        this.style.background = "";
        this.style.padding = "";
      }, 2000);
    });
  });

  // Scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--brand-accent), var(--brand-teal));
    z-index: 10000;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = Math.min(scrolled, 100) + "%";
  });

  // Initialize any counters that are already visible
  statNumbers.forEach((stat) => {
    const rect = stat.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!stat.classList.contains("counted")) {
        animateCounter(stat);
        stat.classList.add("counted");
      }
    }
  });

  // Log successful initialization
  console.log("🎯 Takedown Atlas: Interactive elements initialized");
  console.log("📊 Persona tabs:", personaTabs.length);
  console.log("📈 Animated stats:", statNumbers.length);
  console.log("🔗 External links:", externalLinks.length);
});
