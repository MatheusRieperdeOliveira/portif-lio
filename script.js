const container = document.getElementById("player");
const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");


function updateControls() {
    playBtn.classList.add("hidden");
    pauseBtn.classList.add("hidden");

    if (video.paused) {
        playBtn.classList.remove("hidden");
    } else {
        pauseBtn.classList.remove("hidden");
    }
}

container.addEventListener("mouseenter", () => {
    video.classList.add("brightness");
    updateControls();
});

container.addEventListener("mouseleave", () => {
    video.classList.remove("brightness");
    playBtn.classList.add("hidden");
    pauseBtn.classList.add("hidden");
});

playBtn.addEventListener("click", () => {
    video.play();
});

pauseBtn.addEventListener("click", () => {
    video.pause();
});

video.addEventListener("play", () => {
    video.classList.remove("brightness");
    updateControls();
});

video.addEventListener("pause", () => {
    video.classList.remove("brightness");
    updateControls();
});

lucide.createIcons();