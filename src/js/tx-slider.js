let currentIndex = 0
const dynamicWordElement = document.querySelector('.dynamic-word')

const changeWord = _ => {
    currentIndex = (currentIndex + 1) % textSlider.wordList.length
    dynamicWordElement.textContent = textSlider.wordList[currentIndex]
}

setInterval(changeWord, textSlider.Interval)
changeWord()