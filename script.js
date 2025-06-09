document.addEventListener("DOMContentLoaded", () => {
    // Mouse follower effect
    const cursorFollower = document.querySelector(".cursor-follower")
    const bgElement1 = document.querySelector(".bg-element-1")
    const bgElement2 = document.querySelector(".bg-element-2")
  
    document.addEventListener("mousemove", (e) => {
      // Update cursor follower position
      const { clientX, clientY } = e
      cursorFollower.style.opacity = "1"
      cursorFollower.style.left = `${clientX}px`
      cursorFollower.style.top = `${clientY}px`
  
      // Parallax effect for background elements
      const moveX1 = clientX * 0.02
      const moveY1 = clientY * 0.02
      const moveX2 = clientX * -0.01
      const moveY2 = clientY * -0.01
  
      bgElement1.style.transform = `translate(${moveX1}px, ${moveY1}px)`
      bgElement2.style.transform = `translate(${moveX2}px, ${moveY2}px)`
    })
  
    // Hide cursor follower when mouse leaves the window
    document.addEventListener("mouseleave", () => {
      cursorFollower.style.opacity = "0"
    })
  
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll(".skill-progress")
  
    const animateSkillBars = () => {
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        bar.style.width = `${width}%`
      })
    }
  
    // Intersection Observer for skill bars
    const skillsSection = document.querySelector(".skills-section")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBars()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
  
    if (skillsSection) {
      observer.observe(skillsSection)
    }
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
  
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Adjust for navbar height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Project hover effects
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const linkBtn = card.querySelector(".project-link-btn")
        if (linkBtn) {
          linkBtn.style.opacity = "1"
          linkBtn.style.transform = "translateY(0)"
        }
      })
  
      card.addEventListener("mouseleave", () => {
        const linkBtn = card.querySelector(".project-link-btn")
        if (linkBtn) {
          linkBtn.style.opacity = "0"
          linkBtn.style.transform = "translateY(-10px)"
        }
      })
    })
  
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll("section")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active")
        }
      })
    })
  })
  