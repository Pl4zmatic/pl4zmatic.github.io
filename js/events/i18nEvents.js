import headerData from "../i18n/header.json" with { type: "json" };
import profileData from "../i18n/profile.json" with { type: "json" };
import projectsData from "../i18n/projects.json" with { type: "json" };
import technologiesData from "../i18n/technologies.json" with { type: "json" };
import contactData from "../i18n/contact.json" with { type: "json" };
import { changeLanguage } from "../i18n/changeLanguage.js";

const buttonEN = document.getElementById("button-language-en");
const buttonNL = document.getElementById("button-language-nl");

const headerContainer = document.getElementById("header");
const profileContainer = document.getElementById("profile");
const projectsContainer = document.getElementById("projects");
const technologiesContainer = document.getElementById("technologies");
const dialogs = document.getElementById("dialogsContainer");
const contact = document.getElementById("mail");

const i18nData = {
    header: {
        elements: headerContainer.querySelectorAll("[data-i18n]"),
        data: headerData,
    },
    profile: {
        elements: profileContainer.querySelectorAll("[data-i18n]"),
        data: profileData,
    },
    projects: {
        elements: projectsContainer.querySelectorAll("[data-i18n]"),
        data: projectsData,
    },
    technologies: {
        elements: technologiesContainer.querySelectorAll("[data-i18n]"),
        data: technologiesData,
    },
    dialog: {
        elements: dialogs.querySelectorAll("[data-i18n]"),
        data: projectsData,
    },
    contact: {
        elements: contact.querySelectorAll("[data-i18n]"),
        data: contactData,
    },
};

[buttonEN, buttonNL].forEach((button) => {
    const lang = localStorage.getItem("language");

    if (lang == null) {
        if (button.checked) {
            const language = button.getAttribute("value");
            changeLanguage(i18nData, language);
            localStorage.setItem("language", language);
        }
    } else {
        const language = button.getAttribute("value");
        if (lang == language) {
            button.checked = true;
            changeLanguage(i18nData, language);
        }
    }

    button.addEventListener("change", () => {
        const language = button.getAttribute("value");
        changeLanguage(i18nData, language);
        localStorage.setItem("language", language);
    });
});
