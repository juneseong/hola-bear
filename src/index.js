import "./styles/index.css";

function smoothScroll(target, duration) {
    const myTarget = document.querySelector(target);
    const targetPosition = myTarget.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

const button = document.querySelector(".main-btn");
button.addEventListener("click", function() {
    smoothScroll(".main", 1000);
});

window.onload = function () {
    const main = document.querySelector(".header-container");
    main.classList.add("active");
};

window.addEventListener("scroll", function() {
    const description = document.querySelector(".first-container");
    const targetPosition = description.getBoundingClientRect().top;

    if (window.pageYOffset > targetPosition) {
        description.classList.add("active");
    }
});