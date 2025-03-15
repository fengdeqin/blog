export function dark(isDark) {
    if (isDark){
        if(document.getElementById("drak-style")) return
        const style = `
            html {
                background-color: rgb(255, 255, 255) !important;
                filter: invert(1) contrast(0.95) !important;
            },
            iframe{
                 background-color: rgb(255, 255, 255) !important;
                 filter: invert(1) contrast(0.95) !important;
            }
        `
        const styleSheet = document.createElement("style")
        styleSheet.id = "drak-style"
        styleSheet.textContent = style
        document.head.append(styleSheet)
    }
}