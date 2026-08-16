const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.getElementById("mobile-drawer");
const drawerClose = document.querySelector(".drawer-close");
const backdrop = document.querySelector(".drawer-backdrop");

function openDrawer() {
    drawer.classList.add("is-open");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("is-visible"));
    drawer.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
}

function closeDrawer() {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    drawer.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { backdrop.hidden = true; }, 300);
}

if (menuToggle && drawer && drawerClose && backdrop) {
    menuToggle.addEventListener("click", openDrawer);
    drawerClose.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);

    drawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) {
            closeDrawer();
        }
    });
}

if (window.lucide) {
    lucide.createIcons();
} else {
    window.addEventListener("DOMContentLoaded", () => {
        if (window.lucide) lucide.createIcons();
    });
}
