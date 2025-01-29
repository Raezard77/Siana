let testoCurrentIndex = 0;
const quotes = document.querySelectorAll(".quote");
const quoteWrapper = document.querySelector(".quote-wrapper");
const dots = document.querySelectorAll(".dot");

dots[0].classList.add("active")

function updateSlider() {
    // quoteWrapper.style.transform = `translateX(-${testoCurrentIndex * 100}%)`;
    quoteWrapper.style.transform = `translateX(${testoCurrentIndex * 100}%)`;  // _ direction: rtl
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[testoCurrentIndex].classList.add("active");
}

function nextQuote() {
    // testoCurrentIndex = (testoCurrentIndex + 1) % quotes.length;
    testoCurrentIndex = (testoCurrentIndex - 1 + quotes.length) % quotes.length;    // _ direction: rtl
    updateSlider();
    resetTimer();
}

function prevQuote() {
    // testoCurrentIndex = (testoCurrentIndex - 1 + quotes.length) % quotes.length;
    testoCurrentIndex = (testoCurrentIndex + 1) % quotes.length;    // _ direction: rtl
    updateSlider();
    resetTimer();
}

function goToQuote(index) {
    testoCurrentIndex = index;
    updateSlider();
    resetTimer();
}

let autoSlide = setInterval(nextQuote, 5000);

function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextQuote, 5000);
}
