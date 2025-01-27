if (
    window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    html.setAttribute("data-theme", "dark")
} else {
    html.setAttribute("data-theme", "light")
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
    'change', e => {
        const newColorScheme = e.matches ? "dark" : "light"
        html.setAttribute("data-theme", newColorScheme)
    }
)