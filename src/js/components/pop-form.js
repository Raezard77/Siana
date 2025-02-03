const disableScroll = _ => document.body.style.overflow = "hidden"
const enableScroll = _ => document.body.style.overflow = ""
const closeForm = _ => {
    document.querySelector(".pop-form-bg").classList.remove("visible")
    enableScroll()
}

document
    .getElementById("pop-form-open-btn")
    .addEventListener("click", function (event) {
        event.preventDefault()
        document.querySelector(".pop-form-bg").classList.add("visible")
        disableScroll()
    })

document
    .querySelector(".pop-form-bg")
    .addEventListener("click", function (event) {
        if (
            // event.target.id === "pop-form-close-btn"  ||
            event.target.classList.contains("pop-form-bg")
        ) {
            event.preventDefault()
            this.classList.remove("visible")
            enableScroll()
        }
    })
