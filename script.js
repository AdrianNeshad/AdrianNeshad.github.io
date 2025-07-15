// script.js
import { texts } from './lang.js';

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navLinks = document.querySelector(".nav-links");
    const langBtn = document.getElementById("lang-btn");
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.getElementById("modal-close");

    let lang = "sv";
    let currentImageIndex = 0;
    let images = [];

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
        document.documentElement.style.visibility = 'visible';
    };

    langBtn.addEventListener("click", () => {
        lang = lang === "sv" ? "en" : "sv";
        updateLanguage();
    });

    const detectAndSetLanguage = async () => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang) {
            lang = storedLang;
            updateLanguage();
            return;
        }

        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            const country = data.country || '';
            lang = country === 'SE' ? 'sv' : 'en';
        } catch (e) {
            const browserLang = navigator.language || navigator.userLanguage;
            lang = browserLang.startsWith('sv') ? 'sv' : 'en';
        }

        updateLanguage();
    };

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
                link.classList.toggle("active-section", scrollTarget === sections[index]);
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

    setTimeout(() => {
        const initialIndex = getCurrentSectionIndex();
        navigateToSection(initialIndex);
    }, 100);

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const nav = document.querySelector('.nav');
        if (window.innerWidth <= 768) {
            nav.style.transform = currentScrollY > 50 ? 'translateY(-100%)' : 'translateY(0)';
        }
        if (!isScrolling) {
            const currentIndex = getCurrentSectionIndex();
            if (currentIndex !== currentSectionIndex) {
                currentSectionIndex = currentIndex;
                document.querySelectorAll(".nav-links a").forEach(link => {
                    const scrollTarget = link.getAttribute("data-scroll");
                    link.classList.toggle("active-section", scrollTarget === sections[currentIndex]);
                });
            }
        }
    });

    const projectData = {
        unifeed: {
            images: ["/assets/images/unifeed1.png", "/assets/images/unifeed2.png", "/assets/images/unifeed3.png", "/assets/images/unifeed4.png", "/assets/images/unifeed5.png"],
            github: null,
            appstore: "https://apps.apple.com/us/app/unifeed-nyhetsfl%C3%B6de/id6746872036",
            descKey: "project1Desc"
        },
        eloque: {
            images: ["/assets/images/eloque1.png", "/assets/images/eloque2.png", "/assets/images/eloque3.png", "/assets/images/eloque4.png", "/assets/images/eloque5.png"],
            github: "https://github.com/AdrianNeshad/Eloque-AI",
            appstore: null,
            descKey: "project2Desc"
        },
        univert: {
            images: ["/assets/images/univert1.png", "/assets/images/univert2.png", "/assets/images/univert3.png", "/assets/images/univert4.png"],
            github: "https://github.com/AdrianNeshad/Univert",
            appstore: "https://apps.apple.com/us/app/univert-unit-converter/id6745692591",
            descKey: "project3Desc"
        },
        swipeflix: {
            images: ["/assets/images/swipeflix1.webp", "/assets/images/swipeflix2.webp", "/assets/images/swipeflix3.webp"],
            github: "https://github.com/AdrianNeshad/SwipeFlix",
            appstore: "https://apps.apple.com/us/app/flixswipe-explore-new-movies/id6746716902",
            descKey: "project4Desc"
        }
    };

    document.querySelectorAll("#projects .card").forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const id = card.querySelector("h3")?.dataset.id;
            const project = projectData[id];
            if (!project) return;

            images = project.images;
            currentImageIndex = 0;

            const imgHTML = images.length > 0 ? `
                <div class="carousel">
                  <img class="carousel-image" src="${images[0]}" alt="Projektbild" />
                  <div class="carousel-controls">
                    <button id="prev-img">&lt;</button>
                    <button id="next-img">&gt;</button>
                  </div>
                </div>` : "";

            const linksHTML = `
                ${project.github ? `<a href="${project.github}" target="_blank" class="modal-icon-link">
                    <img src="/assets/images/github.png" alt="GitHub" class="modal-icon" />
                </a>` : ""}
                ${project.appstore ? `<a href="${project.appstore}" target="_blank" class="modal-icon-link">
                    <img src="/assets/images/appstore.webp" alt="App Store" class="modal-icon" />
                </a>` : ""}`;

            modalBody.innerHTML = `
                <h2>${texts[lang][`project${id === 'unifeed' ? 1 : id === 'eloque' ? 2 : id === 'univert' ? 3 : 4}Title`]}</h2>
                ${imgHTML}
                <div class="modal-links">${linksHTML}</div>
            `;

            modal.classList.remove("hidden");

            setTimeout(() => {
                const imgEl = modal.querySelector(".carousel-image");
                const prevBtn = modal.querySelector("#prev-img");
                const nextBtn = modal.querySelector("#next-img");

                if (prevBtn) prevBtn.onclick = () => {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    imgEl.src = images[currentImageIndex];
                };

                if (nextBtn) nextBtn.onclick = () => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    imgEl.src = images[currentImageIndex];
                };
            }, 0);
        });
    });

    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    detectAndSetLanguage();
});