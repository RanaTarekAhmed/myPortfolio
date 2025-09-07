// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initTypingEffect();
  initScrollEffects();
  initBackToTop();
  initSkillBars();
  initTabs();
  initPortfolioFilter();
  initContactForm();
  initModal();
  initAnimations();
  initThemeToggle();
});

// Navigation
function initNavigation() {
  const header = document.querySelector(".header");
  const hamburger = document.getElementById("hamburger");
  const navCont = document.querySelector(".nav_cont");
  const navLinks = document.querySelectorAll(".nav_cont ul li a");
  const mobileSidebar = document.querySelector(".mobile-sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const closeSidebar = document.querySelector(".close-sidebar");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
  });

  // Mobile menu toggle for original navigation
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navCont.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  // Close mobile menu when clicking on links (original navigation)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navCont.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Mobile sidebar toggle
  if (hamburger && mobileSidebar) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileSidebar.classList.toggle("active");
      sidebarOverlay.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  // Close mobile sidebar
  function closeMobileSidebar() {
    if (hamburger) hamburger.classList.remove("active");
    if (mobileSidebar) mobileSidebar.classList.remove("active");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  if (closeSidebar && sidebarOverlay) {
    closeSidebar.addEventListener("click", closeMobileSidebar);
    sidebarOverlay.addEventListener("click", closeMobileSidebar);
  }

  // Close sidebar when clicking on links
  if (sidebarLinks) {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", closeMobileSidebar);
    });
  }

  // Smooth scrolling for all navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close any open menus
        closeMobileSidebar();
        if (hamburger) {
          hamburger.classList.remove("active");
          navCont.classList.remove("active");
        }

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

// Typing Effect
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const texts = [
    "Software Engineer",
    "Frontend Developer",
    "Web Designer",
    "Backend Developer",
    "Problem Solver",
    "AI and ML Engineer",
    "Data Engineer",
    "Network Engineer",
  ];

  let textIndex = 0,
    charIndex = 0,
    isDeleting = false,
    typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];
    typingElement.textContent = currentText.substring(
      0,
      charIndex + (isDeleting ? -1 : 1)
    );
    charIndex += isDeleting ? -1 : 1;

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    } else {
      typingSpeed = isDeleting ? 50 : 100;
    }
    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

// Scroll Effects
function initScrollEffects() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    window.addEventListener("scroll", () => {
      scrollIndicator.style.opacity = window.scrollY > 100 ? "0" : "0.7";
    });
  }

  const animateOnScroll = () => {
    document
      .querySelectorAll(
        ".service-card, .resume-item, .portfolio-item, .skill-category"
      )
      .forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight / 1.3) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
  };

  document
    .querySelectorAll(
      ".service-card, .resume-item, .portfolio-item, .skill-category"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;
  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("visible", window.scrollY > 500);
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Animate Skill Bars
function initSkillBars() {
  const skillBars = document.querySelectorAll(".progress");
  if (!skillBars.length) return;
  skillBars.forEach((bar) => {
    const width = bar.classList.contains("html-css")
      ? "90%"
      : bar.classList.contains("javascript")
      ? "85%"
      : bar.classList.contains("react")
      ? "80%"
      : "70%";
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Tabs
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      document
        .getElementById(btn.getAttribute("data-tab"))
        .classList.add("active");
    });
  });
}

// Portfolio Filter
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message)
      return showFormStatus(formStatus, "Please fill in all fields", "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return showFormStatus(
        formStatus,
        "Please enter a valid email address",
        "error"
      );

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    setTimeout(() => {
      contactForm.reset();
      showFormStatus(
        formStatus,
        "Message sent successfully! We will get back to you soon.",
        "success"
      );
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }, 2000);
  });
}

function showFormStatus(element, message, type) {
  element.textContent = message;
  element.className = `form-status ${type}`;
  element.style.display = "block";
}

// Modal System
function initModal() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modal = document.getElementById("projectModal");
  const closeModal = document.querySelector(".close-modal");
  if (!modal) return;

  const projectData = {
    web: {
      title: "Recipe Hub",
      description:
        "RecipeHub is a platform for viewing cooking recipes with a simple UI. It allows searching and filtering, plus an AI agent for cooking help.",
      technologies: ["HTML", "CSS", "JS", "Python", "Django"],
      demoLink: "#",
      codeLink: "#",
    },
    database: {
      title: "Course Management System",
      description:
        "A course management system using SQL Server and C#. It handles students, instructors, courses, and enrollments efficiently.",
      technologies: ["SQL", "C#", "Visual Studio"],
      demoLink: "#",
      codeLink: "#",
    },
    design: {
      title: "Banking App UI",
      description:
        "A modern banking app UI designed with a focus on simplicity and intuitive workflows.",
      technologies: ["Figma", "Adobe XD"],
      demoLink: "#",
      codeLink: "#",
    },
  };

  portfolioItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.tagName === "A") return;
      const category = item.getAttribute("data-category");
      const project = projectData[category];
      if (!project) return;

      document.getElementById("modalTitle").textContent = project.title;
      document.getElementById("modalDescription").textContent =
        project.description;

      const techList = document.getElementById("modalTechList");
      techList.innerHTML = "";
      project.technologies.forEach((tech) => {
        const li = document.createElement("li");
        li.textContent = tech;
        techList.appendChild(li);
      });

      document.getElementById("modalDemoLink").href = project.demoLink;
      document.getElementById("modalCodeLink").href = project.codeLink;

      const modalImage = document.getElementById("modalImage");
      modalImage.innerHTML = "";
      const color =
        category === "web"
          ? "#3498db"
          : category === "database"
          ? "#f39c12"
          : "#2ecc71";
      const img = document.createElement("div");
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.background = `linear-gradient(45deg, ${color}, ${color}40)`;
      img.style.display = "flex";
      img.style.justifyContent = "center";
      img.style.alignItems = "center";
      img.style.color = "white";
      img.style.fontSize = "2rem";
      img.style.fontWeight = "bold";
      img.textContent = project.title;
      modalImage.appendChild(img);

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// Additional Animations
function initAnimations() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-in");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document
    .querySelectorAll(
      ".service-card, .resume-item, .portfolio-item, .skill-category"
    )
    .forEach((el) => observer.observe(el));
}

// Utility debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, iconElement) {
  if (theme === "light") {
    iconElement.className = "fas fa-sun";
  } else {
    iconElement.className = "fas fa-moon";
  }
}
