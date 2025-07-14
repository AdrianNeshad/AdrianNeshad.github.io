// script.js
import { texts } from './lang.js';

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navLinks = document.querySelector(".nav-links");
    const langBtn = document.getElementById("lang-btn");

    let lang = localStorage.getItem("lang") || "sv";

    const updateLanguage = () => {
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (texts[lang][key]) {
                el.textContent = texts[lang][key];
            }
        });

        langBtn.querySelector("img").src = lang === "sv"
            ? "/assets/images/flag-us.png"
            : "/assets/images/flag-se.png";

        langBtn.querySelector("span").textContent = lang === "sv"
            ? "English"
            : "Svenska";

        localStorage.setItem("lang", lang);
        document.documentElement.style.visibility = 'visible'; // Visa efter språket är satt
    };

    langBtn.addEventListener("click", () => {
        lang = lang === "sv" ? "en" : "sv";
        updateLanguage();
    });

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    const sections = ['hero', 'projects', 'experience', 'education', 'footer'];
    let currentSectionIndex = 0;
    let isScrolling = false;

    const navigateToSection = (index) => {
        if (index >= 0 && index < sections.length && index !== currentSectionIndex) {
            currentSectionIndex = index;
            isScrolling = true;

            document.documentElement.style.scrollSnapType = 'none';
            const target = document.getElementById(sections[index]);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            document.querySelectorAll(".nav-links a").forEach(link => {
                const scrollTarget = link.getAttribute("data-scroll");
                if (index === 0 || scrollTarget === "hero") {
                    link.classList.remove("active-section");
                } else if (scrollTarget === sections[index]) {
                    link.classList.add("active-section");
                } else {
                    link.classList.remove("active-section");
                }
            });

            setTimeout(() => {
                document.documentElement.style.scrollSnapType = 'y mandatory';
                isScrolling = false;
            }, 1000);
        }
    };

    document.querySelectorAll("[data-scroll]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.dataset.scroll;
            const targetIndex = sections.indexOf(targetId);
            if (targetIndex !== -1) {
                navigateToSection(targetIndex);
            }
            navLinks.classList.remove("active");
        });
    });

    const getCurrentSectionIndex = () => {
        const scrollY = window.scrollY + window.innerHeight / 2;
        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const rect = section.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;
                if (scrollY >= top && scrollY < bottom) return i;
            }
        }
        return 0;
    };

    document.addEventListener('wheel', (e) => {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        currentSectionIndex = getCurrentSectionIndex();

        if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            navigateToSection(currentSectionIndex + 1);
        } else if (e.deltaY < 0 && currentSectionIndex > 0) {
            navigateToSection(currentSectionIndex - 1);
        }
    }, { passive: false });

    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        const touchEndY = e.changedTouches[0].screenY;
        const deltaY = touchStartY - touchEndY;
        const minSwipeDistance = 50;

        currentSectionIndex = getCurrentSectionIndex();

        if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0 && currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            } else if (deltaY < 0 && currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;

        currentSectionIndex = getCurrentSectionIndex();

        if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
            e.preventDefault();
            navigateToSection(currentSectionIndex + 1);
        } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            e.preventDefault();
            navigateToSection(currentSectionIndex - 1);
        }
    });

    setTimeout(() => {
        const initialIndex = getCurrentSectionIndex();
        navigateToSection(initialIndex);
    }, 100);

    updateLanguage();

    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.nav');
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
});
