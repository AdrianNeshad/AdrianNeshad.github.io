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

    // Smooth scroll + stäng mobilmeny
    document.querySelectorAll("[data-scroll]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.scroll);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                navLinks.classList.remove("active");
            }
        });
    });

    updateLanguage();
});
