const header        = document.getElementById('header');
const navLinks      = document.querySelectorAll('.nav-item'); // add this class to each <a>
const everything = document.getElementById('body');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const firstSection = document.getElementById('first-section');

let   lastScrollTop = 0;
const triggerHeight = 80;
let   autoHidePaused = false;      // flag

/* ---------- scroll listener ---------- */
window.addEventListener('scroll', () => {
  if (autoHidePaused) return;      // ➊ ignore while paused

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll <= triggerHeight) {
    header.classList.remove('hidden');
    lastScrollTop = currentScroll;
    return;
  }

  if (currentScroll > lastScrollTop) {      // scrolling down
    header.classList.add('hidden');
  } else {                                  // scrolling up
    header.classList.remove('hidden');
  }
  lastScrollTop = currentScroll;
});

/* ---------- nav link click ---------- */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.add('hidden');     // hide immediately
    autoHidePaused = true;              // ➋ pause auto logic
    setTimeout(() => autoHidePaused = false, 600); // resume after 0.6 s
  });
});

everything.addEventListener('click', () => {
  if (!header.classList.contains('hidden')) {
    header.classList.add('hidden');     // hide immediately
    autoHidePaused = true;              // ➋ pause auto logic
    setTimeout(() => autoHidePaused = false, 600); // resume after 0.6 s
  }
});


const showcase = document.getElementById('projects-showcase');

const imageOrder = ['first', 'second', 'third', 'fourth'];

const hrItems = document.querySelectorAll('.hr-item');
const images = document.querySelectorAll('.project');
let isTransitioning = false;  // Flag to prevent multiple clicks during transition

hrItems.forEach(hr => {
  hr.addEventListener('click', () => {
    // If we're already transitioning, ignore the click
    if (isTransitioning) return;

    // Set flag to indicate we're in the middle of a transition
    isTransitioning = true;

    // Remove active class from all hr lines
    hrItems.forEach(h => h.classList.remove('active'));
    hr.classList.add('active');

    // Get the class name of the clicked hr item (e.g., 'first', 'second', etc.)
    const className = Array.from(hr.classList).find(cls => ['first', 'second', 'third', 'fourth'].includes(cls));

    // Get the currently selected image (which should be the one that is displayed)
    const currentSelectedImage = document.querySelector('.project.selected');

    // Determine the image to activate based on hr selection
    let imageClassToActivate;

    // Example logic: If the second HR is clicked, show the third image
    if (className === 'second') {
      imageClassToActivate = 'second';  // Set to the third image when the second HR is clicked
    } else {
      imageClassToActivate = className;  // Otherwise, select the image that matches the HR
    }

    // Get the image to activate
    const selectedImage = document.querySelector(`.project.${imageClassToActivate}`);

    // If the currently selected image is the same as the image to activate, do nothing
    if (currentSelectedImage && currentSelectedImage.classList.contains(imageClassToActivate)) {
      isTransitioning = false;
      return;
    }

    // Remove selected class from the current image
    currentSelectedImage?.classList.remove('selected');

    // Delay adding the selected class to the new image after the fade-out
    setTimeout(() => {
      selectedImage.classList.add('selected');

      // After the transition completes, reset the flag to allow further clicks
      setTimeout(() => {
        isTransitioning = false;
      }, 500); // Delay matching the CSS transition time (0.5s)
    }, 500); // Initial delay for fading out the current image
  });
});

/* ---------- Mobile Menu Toggle ---------- */
if (mobileMenuToggle && firstSection) {
  mobileMenuToggle.addEventListener('click', () => {
    // Toggle the active class on the hamburger button
    mobileMenuToggle.classList.toggle('active');
    
    // Toggle the active class on the navigation menu
    firstSection.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      firstSection.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      firstSection.classList.remove('active');
    }
  });
}
