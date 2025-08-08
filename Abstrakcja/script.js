// Background Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backgroundImages = document.querySelectorAll('.bg-image');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const offerSection = document.getElementById('offer');
    const titleElement = document.querySelector('#title-offer p');
    
    let currentImageIndex = 0;
    
    // Array of background images and corresponding titles
    const carouselData = [
        {
            image: 'placeholder-image.png',
            title: 'Strzelanie'
        },
        {
            image: 'placeholder-image.png',
            title: 'Kręcenie'
        },
        {
            image: 'placeholder-image.png',
            title: 'Chlapanie'
        }
    ];
    
    // Function to change background image and title
    function changeBackgroundAndTitle(index) {
        const currentData = carouselData[index];
        const learnMoreButton = document.getElementById('learn-more-button');
        
        // Update the CSS background-image of the #offer::before pseudo-element
        let styleElement = document.getElementById('dynamic-bg-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-bg-style';
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            #offer::before {
                background-image: url('${currentData.image}') !important;
                transition: background-image 0.5s ease-in-out;
            }
        `;
        
        // Update the title with fade effect
        titleElement.style.opacity = '0';
        setTimeout(() => {
            titleElement.textContent = currentData.title;
            titleElement.style.opacity = '1';
            
            // Update the learn more button href with current title
            if (learnMoreButton) {
                learnMoreButton.href = `oferta.html#${currentData.title.toLowerCase()}`;
            }
        }, 250); // Half of the transition time for smooth effect
    }
    
    // Function to go to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % carouselData.length;
        changeBackgroundAndTitle(currentImageIndex);
    }
    
    // Function to go to previous image
    function previousImage() {
        currentImageIndex = (currentImageIndex - 1 + carouselData.length) % carouselData.length;
        changeBackgroundAndTitle(currentImageIndex);
    }
    
    // Event listeners for arrows
    rightArrow.addEventListener('click', nextImage);
    leftArrow.addEventListener('click', previousImage);
    
    // Initialize with first background and title
    changeBackgroundAndTitle(currentImageIndex);
    
    // Optional: Auto-play carousel (uncomment if you want automatic sliding)
    /*
    setInterval(nextImage, 4000); // Change image every 4 seconds
    */
    
    // Optional: Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                icon.textContent = '+';
            } else {
                item.classList.add('active');
                icon.textContent = '×';
            }
        });
    });
});