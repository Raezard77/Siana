// - Basic
const lg = val => console.log(val)
const $S = selector => document.querySelector(selector)
const $A = selector => document.querySelectorAll(selector)
const html = document.documentElement



// - Utils
const c = _ => html.classList.toggle("debug")  // _ Toggle CSS Debug



// - Toggle Theme On The Spot
const d = _ => {
    if (!html.getAttribute("data-theme") || html.getAttribute("data-theme") == "light") {
        html.setAttribute("data-theme", "dark")
    }
    else {
        html.setAttribute("data-theme", "light")
    }   
}
