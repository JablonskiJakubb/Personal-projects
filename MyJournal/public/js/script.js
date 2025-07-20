function toggleMenu() {
    const sideMenu = document.getElementById("sidemenu");
    const mainContent = document.querySelector("main");

    // Toggle the 'visible' class to animate the side menu
    if (sideMenu.classList.contains('visible')) {
        sideMenu.classList.remove('visible'); // Slide out to the top
        mainContent.classList.remove('darkened'); // Remove dark effect on the main
    } else {
        sideMenu.classList.add('visible'); // Slide in from the top
        mainContent.classList.add('darkened'); // Darken the main content
    }
}

