// Get the necessary elements
const sideMenu = document.getElementById("sidemenu");
const mainContent = document.querySelector("main");
const textarea = document.getElementById('custom-textarea');
const charCount = document.getElementById('char-count');

// Toggle the menu visibility and darken effects
function toggleMenu() {
    if (sideMenu.classList.contains('visible')) {
        sideMenu.classList.remove('visible'); // Slide out to the top
        mainContent.classList.remove('darkened'); // Remove dark effect on the main
        textarea.classList.remove('darkened'); // Remove dark effect on textarea
    } else {
        sideMenu.classList.add('visible'); // Slide in from the top
        mainContent.classList.add('darkened'); // Darken the main content
        textarea.classList.add('darkened'); // Darken the textarea
    }
}

// Update character count as user types
textarea.addEventListener('input', () => {
    const remaining = 200 - textarea.value.length;
    charCount.textContent = `${remaining} characters remaining`;
});
