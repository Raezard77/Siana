let txsldCurrentIndex = 0
const dynamicWordElement = document.querySelector('.dynamic-word')

const changeWord = _ => {
    txsldCurrentIndex = (txsldCurrentIndex + 1) % textSlider.wordList.length
    dynamicWordElement.textContent = textSlider.wordList[txsldCurrentIndex]
}

setInterval(changeWord, textSlider.Interval)
changeWord()