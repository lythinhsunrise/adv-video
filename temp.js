const script = document.createElement("script")
script.src = "/video.js/dist/video.js"
script.addEventListener("load", () => {

})
window.parent.document.getElementsByTagName("head")[0].append(script)