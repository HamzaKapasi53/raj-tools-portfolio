// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        document.body.style.overflow = ""
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Enhanced navbar scroll effect
  let lastScrollY = window.scrollY
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    const currentScrollY = window.scrollY

    if (currentScrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "#ffffff"
      navbar.style.backdropFilter = "none"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .product-card, .brand-card, .feature-card, .value-card",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })

  // Add loading animation for images
  // const images = document.querySelectorAll("img")
  // images.forEach((img) => {
  //   img.addEventListener("load", () => {
  //     img.style.opacity = "1"
  //   })
  //   img.style.opacity = "0"
  //   img.style.transition = "opacity 0.3s ease"
  // })
  document.addEventListener("DOMContentLoaded", () => {
  // Select all images
  const images = document.querySelectorAll("img");

  // Set initial opacity to 0 for all images
  images.forEach((img) => {
    img.style.opacity = "0";  // Hide images initially
    img.style.transition = "opacity 0.3s ease"; // Smooth transition

    // Once the image loads, fade it in by setting opacity to 1
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
    
    // If the image is already loaded, immediately set opacity to 1
    if (img.complete) {
      img.style.opacity = "1";
    }
  });
});

})
