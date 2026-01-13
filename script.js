// Modern Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.nav-container');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(15, 23, 42, 0.95)';
      header.style.backdropFilter = 'blur(20px)';
    } else {
      header.style.background = 'rgba(15, 23, 42, 0.8)';
      header.style.backdropFilter = 'blur(20px)';
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    '.section-header, .about-text, .about-image, .expertise-card, .project-card, .contact-info, .contact-form-container'
  );

  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('mobile-open');
    });
  }

  // Card hover effects
  const expertiseCards = document.querySelectorAll('.expertise-card');
  expertiseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });

  // Add cursor follower effect
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  cursorFollower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, ${getComputedStyle(document.documentElement).getPropertyValue('--dark-blue-400').trim()}, transparent 70%);
    border: 1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--dark-blue-400').trim()};
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursorFollower);

  document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';

    // Scale cursor on certain elements
    const target = e.target.closest('.btn, .nav-link, .contact-method, .project-link');
    if (target) {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
    } else {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('.btn, .nav-link, .contact-method, .project-link');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.backgroundColor = 'radial-gradient(circle, #fff, transparent 70%)';
      cursorFollower.style.borderColor = '#fff';
    });

    el.addEventListener('mouseleave', () => {
      cursorFollower.style.backgroundColor = `radial-gradient(circle, ${getComputedStyle(document.documentElement).getPropertyValue('--dark-blue-400').trim()}, transparent 70%)`;
      cursorFollower.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-blue-400').trim();
    });
  });

  // Initialize 3D card rotation effect
  const card3d = document.querySelector('.card-3d');
  if (card3d) {
    document.addEventListener('mousemove', (e) => {
      const rect = card3d.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = (e.clientX - centerX) / 25;
      const rotateX = (centerY - e.clientY) / 25;

      card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    });

    card3d.addEventListener('mouseleave', () => {
      card3d.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }

  // Add scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.id = 'scroll-progress';
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, var(--dark-blue-500), var(--dark-blue-300));
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });

  // Add parallax effect to hero background elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
      const speed = 0.1 + (index * 0.05);
      orb.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });

  // Add typing effect to hero subtitle
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);
  }

  // Add particle background effect
  const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;

    // Add some floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.1 + Math.random() * 0.3};
      `;
      particlesContainer.appendChild(particle);
    }

    document.querySelector('.hero-background').appendChild(particlesContainer);
  };

  // Create particles after DOM loads
  setTimeout(createParticles, 1000);

  // Add theme toggle for light/dark mode (as an enhancement)
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌙';
  themeToggle.id = 'theme-toggle';
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    z-index: 1000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  `;

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  });

  document.body.appendChild(themeToggle);

  // Add scroll-triggered animations for expertise cards
  const expertiseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.expertise-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    expertiseObserver.observe(card);
  });
});