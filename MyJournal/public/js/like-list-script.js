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
// js/autist-script.js

// Function to fetch and display journal items when the page loads
window.onload = () => {
    fetch('/items')  // Corrected to /items
        .then((response) => response.json())
        .then((data) => {
            const list = document.getElementById('list');
            list.innerHTML = ''; // Clear the current list

            data.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item.content;
                list.appendChild(li);
            });
        })
        .catch((error) => console.error('Error fetching items:', error));
};

// Handle form submission to add a new journal item
const form = document.querySelector('form'); // Select the form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    const contentInput = form.querySelector('textarea[name="content"]');// Get the input by its name attribute
    const content = contentInput.value; // Get the value from the input field

    // Now proceed to send the data
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `content=${content}`,
    })
    .then((response) => response.json())
    .then(() => {
        form.reset(); // Clear the input field after submission
        window.location.reload(); // Refresh the page to show the new item
    })
    .catch((error) => console.error('Error adding item:', error));
});
