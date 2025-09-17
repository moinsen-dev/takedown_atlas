// Takedown Atlas - GitHub Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Add transition to header
  header.style.transition = 'transform 0.3s ease-in-out';

  // Feature cards animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards and status cards
  const animatedElements = document.querySelectorAll('.feature-card, .status-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // GitHub stars counter (placeholder functionality)
  async function fetchGitHubStars() {
    try {
      const response = await fetch('https://api.github.com/repos/moinsen-dev/takedown_atlas');
      const data = await response.json();
      const starsElement = document.getElementById('github-stars');
      if (starsElement && data.stargazers_count !== undefined) {
        starsElement.textContent = `⭐ ${data.stargazers_count} stars`;
      }
    } catch (error) {
      console.log('Could not fetch GitHub stars:', error);
    }
  }

  // Call GitHub API with rate limiting consideration
  if (Math.random() < 0.1) { // Only call 10% of the time to avoid rate limits
    fetchGitHubStars();
  }

  // Add copy-to-clipboard functionality for any code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-button';
    button.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--brand-accent);
      color: var(--brand-dark);
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    `;

    block.parentElement.style.position = 'relative';
    block.parentElement.appendChild(button);

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });

  // Simple analytics event tracking
  function trackEvent(action, category = 'engagement') {
    console.log(`Analytics: ${category} - ${action}`);
    // In production, this would send to actual analytics service
  }

  // Track button clicks
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      trackEvent(`Button clicked: ${e.target.textContent.trim()}`);
    });
  });

  // Track external link clicks
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
      trackEvent(`External link: ${e.target.href}`, 'outbound');
    });
  });

  console.log('🎯 Takedown Atlas GitHub Pages loaded successfully');
});