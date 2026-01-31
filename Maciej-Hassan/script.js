let index = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    const inner = document.querySelector('.carousel-inner');
    index = (index + step + slides.length) % slides.length;
    inner.style.transform = `translateX(${-index * 100}%)`;
}
