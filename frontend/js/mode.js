document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const navbar = document.querySelector(".navbar"); 
    const themeIcon = document.querySelector(".theme-icon i"); 

    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        enableDarkMode();
    }

    themeToggle.addEventListener("click", function () {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        navbar.classList.add("navbar-dark"); 
        navbar.classList.remove("navbar-light");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        navbar.classList.remove("navbar-dark");
        navbar.classList.add("navbar-light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
    }
});
