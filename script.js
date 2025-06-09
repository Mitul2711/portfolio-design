document.addEventListener("DOMContentLoaded", () => {
  // Bubble cursor effect
  const bubbleContainer = document.querySelector(".bubble-container")
  const cursorFollower = document.querySelector(".cursor-follower")
  const bgElement1 = document.querySelector(".bg-element-1")
  const bgElement2 = document.querySelector(".bg-element-2")

  // Colors for bubbles
  const bubbleColors = [
    "rgba(139, 92, 246, 0.6)", // Purple
    "rgba(59, 130, 246, 0.6)", // Blue
    "rgba(236, 72, 153, 0.6)", // Pink
    "rgba(16, 185, 129, 0.6)", // Green
  ]

  let mouseMoving = false
  let mouseTimeout = null

  // Create bubbles
  const createBubbles = () => {
    // Clear existing bubbles
    while (bubbleContainer.firstChild) {
      bubbleContainer.removeChild(bubbleContainer.firstChild)
    }

    // Create new bubbles
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement("div")
      bubble.className = "bubble"

      // Random size between 8px and 25px
      const size = Math.random() * 17 + 8
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`

      // Random color from our theme colors
      const colorIndex = Math.floor(Math.random() * bubbleColors.length)
      bubble.style.backgroundColor = bubbleColors[colorIndex]

      // Random box-shadow for glow effect
      bubble.style.boxShadow = `0 0 ${size / 2}px ${bubbleColors[colorIndex]}`

      // Set initial position off-screen
      bubble.style.left = "-100px"
      bubble.style.top = "-100px"
      bubble.style.opacity = "0"

      // Add to container
      bubbleContainer.appendChild(bubble)
    }
  }

  // Initialize bubbles
  createBubbles()

  // Get all bubbles
  let bubbles = document.querySelectorAll(".bubble")

  // Function to hide bubbles
  const hideBubbles = () => {
    bubbles.forEach((bubble) => {
      bubble.style.opacity = "0"
    })
  }

  // Set mouse as not moving initially
  mouseMoving = false

  // Mouse move handler
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e

    // Set mouse as moving
    mouseMoving = true

    // Clear any existing timeout
    if (mouseTimeout) {
      clearTimeout(mouseTimeout)
    }

    // Update cursor follower
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

    // Show and animate bubbles with different speeds and delays
    bubbles.forEach((bubble, index) => {
      // Make bubble visible
      bubble.style.opacity = "0.8"

      // Calculate delay based on index
      const delay = index * 30

      // Calculate position with delay
      setTimeout(() => {
        // Add some randomness to position
        const offsetX = (Math.random() - 0.5) * 40
        const offsetY = (Math.random() - 0.5) * 40

        bubble.style.left = `${clientX + offsetX}px`
        bubble.style.top = `${clientY + offsetY}px`
      }, delay)
    })

    // Set timeout to detect when mouse stops moving
    mouseTimeout = setTimeout(() => {
      mouseMoving = false
      hideBubbles()
    }, 300) // Hide bubbles after 300ms of no movement
  })

  // Hide bubbles when mouse leaves the window
  document.addEventListener("mouseleave", () => {
    mouseMoving = false
    cursorFollower.style.opacity = "0"
    hideBubbles()
  })

  // Recreate bubbles periodically to refresh the effect
  setInterval(() => {
    if (mouseMoving) {
      createBubbles()
      bubbles = document.querySelectorAll(".bubble")
    }
  }, 15000)

  // Rest of the existing code remains the same...
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
