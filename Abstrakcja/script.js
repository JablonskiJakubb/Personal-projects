// Background Video Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const offerSection = document.getElementById('offer');
    const titleElement = document.querySelector('#title-offer p');
    
    // Guard if carousel elements don't exist (e.g., on oferta.html)
    if (!offerSection || !leftArrow || !rightArrow || !titleElement) return;
    
    let currentIndex = 0;

    // Map images to respective videos
    const carouselData = [
        { video: 'assets/Strzelanie_film.mp4', title: 'Strzelanie', anchor: 'strzelanie' },
        { video: 'assets/Kręcenie_Film.mp4', title: 'Kręcenie', anchor: 'krecenie' },
        { video: 'assets/Chlapanie_film.mp4', title: 'Chlapanie', anchor: 'chlapanie' }
    ];

    // Prepare video elements for crossfade (two videos toggled)
    offerSection.classList.add('use-video');
    const videoA = document.createElement('video');
    const videoB = document.createElement('video');
    [videoA, videoB].forEach(v => {
        v.className = 'offer-bg-video';
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute('playsinline', '');
        v.setAttribute('muted', '');
        v.setAttribute('autoplay', '');
        // Prevent tab stop/focus
        v.setAttribute('tabindex', '-1');
    });

    // Insert videos behind the content panel
    offerSection.appendChild(videoA);
    offerSection.appendChild(videoB);

    let isAActive = true; // which video is currently visible

    function setVideoSource(videoEl, src) {
        if (videoEl.getAttribute('src') !== src) {
            videoEl.setAttribute('src', src);
            // load() ensures new source is applied before play
            try { videoEl.load(); } catch (_) {}
        }
        // Attempt autoplay; ignore promise rejection (mobile policies)
        const p = videoEl.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
    }

    function changeBackgroundAndTitle(index) {
        const currentData = carouselData[index];
        const learnMoreButton = document.getElementById('learn-more-button');

        const incoming = isAActive ? videoB : videoA;
        const outgoing = isAActive ? videoA : videoB;

        // Prepare incoming video and crossfade
        setVideoSource(incoming, currentData.video);

        // Start crossfade once the video has enough data
        const fadeIn = () => {
            incoming.classList.add('visible');
            outgoing.classList.remove('visible');
            isAActive = !isAActive;
        };

        if (incoming.readyState >= 2) {
            fadeIn();
        } else {
            const onReady = () => { incoming.removeEventListener('loadeddata', onReady); fadeIn(); };
            incoming.addEventListener('loadeddata', onReady);
        }

        // Update the title with fade effect
        titleElement.style.opacity = '0';
        setTimeout(() => {
            titleElement.textContent = currentData.title;
            titleElement.style.opacity = '1';
            if (learnMoreButton) learnMoreButton.href = `oferta.html#${currentData.anchor}`;
        }, 250);
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        changeBackgroundAndTitle(currentIndex);
    }

    function previousItem() {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        changeBackgroundAndTitle(currentIndex);
    }

    // Event listeners for arrows
    rightArrow.addEventListener('click', nextItem);
    leftArrow.addEventListener('click', previousItem);

    // Initialize first video, title and link
    (function initFirst() {
        const first = carouselData[0];
        setVideoSource(videoA, first.video);
        videoA.classList.add('visible');
        titleElement.textContent = first.title;
        const learnMoreButton = document.getElementById('learn-more-button');
        if (learnMoreButton) learnMoreButton.href = `oferta.html#${first.anchor}`;
    })();

    // Optional: Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousItem();
        } else if (e.key === 'ArrowRight') {
            nextItem();
        }
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item-creative');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question-creative');
        const answer = item.querySelector('.faq-answer-creative');

        // Accessibility: make question focusable and controllable
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        const answerId = `faq-answer-${index + 1}`;
        answer.id = answerId;
        question.setAttribute('aria-controls', answerId);
        question.setAttribute('aria-expanded', 'false');
        
        function toggleItem() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach((otherItem, i) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question-creative');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        }
        
        question.addEventListener('click', toggleItem);
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem();
            }
        });
    });
});

// Smooth Scrolling for Navigation Links with Mobile Optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links that point to sections on the same page
    const navLinks = document.querySelectorAll('#menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate the offset to account for the fixed header
                const headerHeight = document.getElementById('menu').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to the target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Optional: Add active state to clicked link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Throttled scroll handler for better performance on mobile
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            const headerHeight = document.getElementById('menu').offsetHeight;
            const scrollPosition = window.scrollY + headerHeight + 50; // Add some offset
            
            const sections = document.querySelectorAll('[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Update active navigation link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }, 100); // Throttle to every 100ms
    }, { passive: true });
});

// Mobile Touch Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback for interactive elements
    const touchElements = document.querySelectorAll('.link, .social-link, .carousel-arrow, .submit-btn, .group-btn, .faq-question-creative');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });
    
    // Prevent zoom on double tap for form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.focus();
        });
    });
});

// Responsive Image Loading
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading for images on mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Performance optimization for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('reduced-motion');
    }
    
    // Optimize for mobile viewport changes
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(function() {
            // Recalculate viewport-dependent elements
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 250);
    }, { passive: true });
    
    // Initial viewport calculation
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
