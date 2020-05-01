import "./styles/index.css";

const topBar = document.querySelector(".top-nav");
const logo = document.querySelector(".logo-h");
const menuBar = document.querySelector(".fa-bars");
const sideMenu = document.querySelector(".side-menu");
const mainText = document.querySelector(".right-header-text");
const pieRight = document.querySelector(".pie-right");

window.onload = function () {
    mainText.classList.add("active");
};

menuBar.onclick = e => {
    e.preventDefault();
    menuBar.classList.toggle("fa-times");
    sideMenu.classList.toggle("expand");
};

const handleScroll = () => {
    if (window.scrollY > 0) {
        logo.classList.add("inactive");
        topBar.classList.add("transparent-top-nav");
    } else {
        logo.classList.remove("inactive");
        topBar.classList.remove("transparent-top-nav");
    }

    if (window.scrollY > 1200) {
        pieRight.classList.add("active");
    }
};

window.addEventListener("scroll", handleScroll);