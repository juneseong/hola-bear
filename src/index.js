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
    const descTargetPosition = description.getBoundingClientRect().top;
    const pieContent = document.querySelector(".pie-right");
    const pieContainer = document.querySelector(".pie-chart-container");
    const pieTargetPosition = window.pageYOffset - pieContainer.getBoundingClientRect().top;
    const funContent = document.querySelector(".fun-facts");
    const funContainer = document.querySelector(".fun-facts");
    const funTargetPosition = window.pageYOffset - funContainer.getBoundingClientRect().top;

    if (window.pageYOffset > descTargetPosition) {
        description.classList.add("active");
    }

    if (window.pageYOffset < pieTargetPosition + 500) {
        pieContent.classList.add("shift");
    }

    if (window.scrollY - 700 < funTargetPosition) {
        funContent.classList.add("shift");
    }
});