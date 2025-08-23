const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const track = document.querySelector(".track");
let slides = document.querySelectorAll(".slide-item");

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll(".slide-item");

let currentIndex = 1;
const slideWidth = 100;
let isAutoPlaying = true;
let autoPlayInterval = null;
let isAnimating = false;

function setTranslateByIndex(idx) {
    track.style.transform = `translateX(${idx * -slideWidth}%)`;
}

track.style.transition = "none";
setTranslateByIndex(currentIndex);

function moveToSlide(step) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex += step;
    track.style.transition = "transform 0.4s ease-in-out";
    setTranslateByIndex(currentIndex);

    const onEnd = () => {
        track.removeEventListener("transitionend", onEnd);
        if (slides[currentIndex] === firstClone) {
            track.style.transition = "none";
            currentIndex = 1;
            setTranslateByIndex(currentIndex);
        }
        else if (slides[currentIndex] === lastClone) {
            track.style.transition = "none";
            currentIndex = slides.length - 2;
            setTranslateByIndex(currentIndex);
        }
        setTimeout(() => { isAnimating = false; }, 0);
    };

    track.addEventListener("transitionend", onEnd);
}

function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        if (isAutoPlaying) moveToSlide(1);
    }, 5000);
}

prev.addEventListener("click", () => moveToSlide(-1));
next.addEventListener("click", () => moveToSlide(1));

const carousel = document.querySelector(".carousel") || track.parentElement;
document.addEventListener("mouseenter", (e) => {
    if (carousel && carousel.contains(e.target)) {
        isAutoPlaying = false;
    }
}, true);

document.addEventListener("mouseleave", (e) => {
    if (carousel && carousel.contains(e.target)) {
        isAutoPlaying = true;
    }
}, true);

startAutoPlay();
