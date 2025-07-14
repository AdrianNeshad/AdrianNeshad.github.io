document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navLinks = document.querySelector(".nav-links");
    const langBtn = document.getElementById("lang-btn");

    let lang = localStorage.getItem("lang") || "sv";

    const texts = {
        sv: {
            heroTitle: "Adrian Neshad",
            heroSubtitle: "Fullstack Utvecklare",
            heroDesc: "Jag skapar moderna webbapplikationer med passion för användarupplevelse och ren kod.",
            projects: "Egna Projekt",
            experience: "Arbetserfarenhet",
            education: "Utbildning",
            contact: "Kontakta mig",
            resume: "Ladda ner CV",
            cta: "© 2025 Adrian Neshad"
        },
        en: {
            heroTitle: "Adrian Neshad",
            heroSubtitle: "Fullstack Developer",
            heroDesc: "I create modern web applications with a passion for user experience and clean code.",
            projects: "Projects",
            experience: "Experience",
            education: "Education",
            contact: "Contact me",
            resume: "Download CV",
            cta: "© 2025 Adrian Neshad"
        }
    };

    const updateLanguage = () => {
        document.documentElement.lang = lang;
        document.querySelector("h1").textContent = texts[lang].heroTitle;
        document.querySelector("h2").textContent = texts[lang].heroSubtitle;
        document.querySelector("section#hero p").textContent = texts[lang].heroDesc;
        document.querySelector("section#projects h2").textContent = texts[lang].projects;
        document.querySelector("section#experience h2").textContent = texts[lang].experience;
        document.querySelector("section#education h2").textContent = texts[lang].education;
        document.querySelector("footer h3").textContent = texts[lang].contact;
        document.querySelector("footer p").textContent = texts[lang].cta;

        // Uppdatera flagga och text
        if (lang === "sv") {
            langBtn.querySelector("img").src = "/assets/images/flag-us.png";
            langBtn.querySelector("span").textContent = "English";
        } else {
            langBtn.querySelector("img").src = "/assets/images/flag-se.png";
            langBtn.querySelector("span").textContent = "Svenska";
        }

        localStorage.setItem("lang", lang);
    };

    langBtn.addEventListener("click", () => {
        lang = lang === "sv" ? "en" : "sv";
        updateLanguage();
    });

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Förbättrad smooth scroll med scroll snap
    document.querySelectorAll("[data-scroll]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.scroll);
            if (target) {
                // Temporärt inaktivera scroll-snap för smooth scrolling
                document.documentElement.style.scrollSnapType = 'none';

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Återaktivera scroll-snap efter scrolling
                setTimeout(() => {
                    document.documentElement.style.scrollSnapType = 'y mandatory';
                }, 1000);

                // Stäng mobilmeny
                navLinks.classList.remove("active");
            }
        });
    });

    // Sektions-navigering med wheel event
    const sections = ['hero', 'projects', 'experience', 'education', 'footer'];
    let currentSectionIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    // Funktion för att hitta nuvarande sektion
    const getCurrentSectionIndex = () => {
        const scrollY = window.scrollY + window.innerHeight / 2;

        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = sectionTop + rect.height;

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    return i;
                }
            }
        }
        return 0;
    };

    // Funktion för att navigera till sektion
    const navigateToSection = (index) => {
        if (index >= 0 && index < sections.length && index !== currentSectionIndex) {
            currentSectionIndex = index;
            isScrolling = true;

            // Inaktivera scroll-snap temporärt
            document.documentElement.style.scrollSnapType = 'none';

            const target = document.getElementById(sections[index]);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Återaktivera scroll-snap och tillåt ny scroll efter animation
            setTimeout(() => {
                document.documentElement.style.scrollSnapType = 'y mandatory';
                isScrolling = false;
            }, 1000);
        }
    };

    // Wheel event för kontrollerad scrolling
    document.addEventListener('wheel', (e) => {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        // Uppdatera nuvarande sektion
        currentSectionIndex = getCurrentSectionIndex();

        // Bestäm scroll-riktning
        if (e.deltaY > 0) {
            // Scrolla ner
            if (currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            }
        } else {
            // Scrolla upp
            if (currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: false });

    // Touch events för mobil
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (isScrolling) return;

        touchEndY = e.changedTouches[0].screenY;
        const deltaY = touchStartY - touchEndY;

        if (Math.abs(deltaY) > minSwipeDistance) {
            currentSectionIndex = getCurrentSectionIndex();

            if (deltaY > 0) {
                // Swipe upp (scrolla ner)
                if (currentSectionIndex < sections.length - 1) {
                    navigateToSection(currentSectionIndex + 1);
                }
            } else {
                // Swipe ner (scrolla upp)
                if (currentSectionIndex > 0) {
                    navigateToSection(currentSectionIndex - 1);
                }
            }
        }
    }, { passive: true });

    // Tangentbordsnavigering
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

    // Uppdatera nuvarande sektion vid första laddning
    setTimeout(() => {
        currentSectionIndex = getCurrentSectionIndex();
    }, 100);

    updateLanguage();
    
    // Navbar hide/show on scroll (only on mobile)
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.nav');

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (window.innerWidth <= 768) { // Gäller endast mobil
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrollar ner
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrollar upp
                nav.style.transform = 'translateY(0)';
            }
        } else {
            // Återställ på desktop
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

});