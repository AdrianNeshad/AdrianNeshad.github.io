document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("lang-toggle");
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
            cta: "Låt oss bygga något fantastiskt tillsammans!"
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
            cta: "Let's build something amazing together!"
        }
    };

    let lang = "sv";

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
    };

    langToggle.addEventListener("change", () => {
        lang = langToggle.checked ? "en" : "sv";
        updateLanguage();
    });

    // Smooth scroll
    document.querySelectorAll("[data-scroll]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.scroll);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });

                // Stäng mobilmenyn om öppen
                const wrapper = document.querySelector(".nav-links-wrapper");
                if (wrapper.classList.contains("open")) {
                    wrapper.classList.remove("open");
                }
            }
        });
    });

    // Burger-meny
    const burger = document.getElementById("burger");
    const navWrapper = document.querySelector(".nav-links-wrapper");
    burger.addEventListener("click", () => {
        navWrapper.classList.toggle("open");
    });

    updateLanguage(); // init
});
