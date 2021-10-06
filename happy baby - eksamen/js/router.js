/* Ruter Clara, Sofie, Benjamin & Jeppe */
const _routes = {
    "#/": "about",
    "#/about": "minbaby",
    "#/clients": "clients",
    "#/contact": "contact",
    "#/login": "login",
    "#/minbaby": "minbaby",
    "#/ble": "ble",
    "#/amning": "amning",
    "#/fode": "fode"

};
const _pages = document.querySelectorAll(".page");
const _basePath = location.pathname.replace("index.html", ""); // remove index.html from path
const _navLinks = document.querySelectorAll("nav a");

/* Changing display to none for all pages Clara, Sofie, Benjamin & Jeppe */
function hideAllPages() {
    for (const page of _pages) {
        page.style.display = "none";
    }
}

/* Navigating SPA to specific page by given path Clara, Sofie, Benjamin & Jeppe */
export function navigateTo(path) {
    const userIsAuthenticated = localStorage.getItem("userIsAuthenticated");

if (userIsAuthenticated){
    showTabbar(true);    
} else{
    showTabbar(false);
    path = "#/login";
    
}
console.log(userIsAuthenticated);

    window.history.pushState({}, path, _basePath + path);
    showPage(path);
}

/* Displaying page by given path Clara, Sofie, Benjamin & Jeppe */
function showPage(path) {
    hideAllPages(); // hide all pages
    document.querySelector(`#${_routes[path]}`).style.display = "block"; // show page by given path
    setActiveTab(path);
}

/* sets active menu item by given path Clara, Sofie, Benjamin & Jeppe */
function setActiveTab(path) {
    for (const link of _navLinks) {
        if (path === link.getAttribute("href")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
}

/* Attaching event to nav links and preventing default anchor link event Clara, Sofie, Benjamin & Jeppe */
function attachNavLinkEvents() {
    const navLinks = document.querySelectorAll(".nav-link");
    for (const link of navLinks) {
        link.addEventListener("click", function (event) {
            const path = link.getAttribute("href");
            navigateTo(path);
            event.preventDefault();
        });
    }
}

/* Initialising the router, calling attachNavLinkEvents(), popstate event and navigateTo() Clara, Sofie, Benjamin & Jeppe*/
function initRouter() {
    attachNavLinkEvents();
    window.addEventListener("popstate", () => navigateTo(location.hash)); // change page when using back and forth in browser

    let path = "#/"; // default path
    if (_routes[location.hash]) {
        path = location.hash;
    }
    navigateTo(path);
}

initRouter();