let testoCurrentIndex = 0;
const quotes = document.querySelectorAll(".quote")
const quoteWrapper = document.querySelector(".quote-wrapper")
const dots = document.querySelectorAll(".dot")

dots[0].classList.add("active")

let startX = 0
let currentX = 0
let isDragging = false

function updateSlider() {
    quoteWrapper.style.transform = `translateX(${testoCurrentIndex * 100}%)`; // _ direction: rtl
    dots.forEach((dot) => dot.classList.remove("active"))
    dots[testoCurrentIndex].classList.add("active")
}

function nextQuote() {
    testoCurrentIndex = (testoCurrentIndex - 1 + quotes.length) % quotes.length; // _ direction: rtl
    updateSlider()
    resetTimer()
}

function prevQuote() {
    testoCurrentIndex = (testoCurrentIndex + 1) % quotes.length; // _ direction: rtl
    updateSlider()
    resetTimer()
}

function goToQuote(index) {
    testoCurrentIndex = index
    updateSlider()
    resetTimer()
}

let autoSlide = setInterval(nextQuote, 5000)

function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextQuote, 5000)
}



//-- Touch event listeners for mobile dragging
quoteWrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    isDragging = true
    quoteWrapper.style.transition = "none"
})

quoteWrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return
    currentX = e.touches[0].clientX
})

quoteWrapper.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    quoteWrapper.style.transition = "transform 0.3s ease-in-out"

    const diffX = startX - currentX
    if (diffX > 50) nextQuote() // : Swipe left
    else if (diffX < -50) prevQuote() // : Swipe right
})
