import headerData from "./i18n/header.json" with { type: "json" };
import profileData from "./i18n/profile.json" with { type: "json" };
import projectsData from "./i18n/projects.json" with { type: "json" };
import technologiesData from "./i18n/technologies.json" with { type: "json" };
import contactData from "./i18n/contact.json" with { type: "json" };
import { changeLanguage } from "./i18n/changeLanguage.js";

// ======== projects video events ========

const expandKingdomino = document.getElementById("expand-kingdomino");
const expandPcompose = document.getElementById("expand-pcompose");
const expandDelaware = document.getElementById("expand-delaware");
const expandCampusapp = document.getElementById("expand-campusapp");

const expandButtons = [expandKingdomino, expandPcompose, expandDelaware, expandCampusapp];

const videoLeaderKingdomino = document.getElementById("video-parent-kingdomino");
const videoLeaderPcompose = document.getElementById("video-parent-pcompose");
const videoLeaderDelaware = document.getElementById("video-parent-delaware");
const videoLeaderCampusapp = document.getElementById("video-parent-campusapp");

const videoElements = [videoLeaderKingdomino, videoLeaderPcompose, videoLeaderDelaware, videoLeaderCampusapp];

expandButtons.forEach((button) => {
    const dialog = document.getElementById(button.dataset.target);

    button.addEventListener("click", () => {
        dialog.showModal();
    });

    const closeButton = dialog.getElementsByClassName("icon-button")[0];

    closeButton.addEventListener("click", () => {
        dialog.close();
    });
});

videoElements.forEach((video) => {
    const childVideo = document.getElementById(video.dataset.target);

    const leader = video;
    const follower = childVideo;

    leader.addEventListener("play", () => {
        follower.play();
    });

    leader.addEventListener("pause", () => {
        follower.pause();
    });

    leader.addEventListener("seeking", () => {
        follower.currentTime = leader.currentTime;
    });

    leader.addEventListener("seeked", () => {
        follower.currentTime = leader.currentTime;
    });

    leader.addEventListener("ratechange", () => {
        follower.playbackRate = leader.playbackRate;
    });
});

// ======== i18n ========

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

// ======== viewport ========

let vw, vh;
resize();

function resize() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

window.addEventListener("resize", () => {
    resize();
});

// ======== scroll ========

const header = document.getElementById("header");
const headerButtonProfile = document.getElementById("button-profile");
const headerButtonProjects = document.getElementById("button-projects");
const headerButtonTechnologies = document.getElementById("button-technologies");
let headerButtonPressed = false;

// # provided above
// const profileContainer = document.getElementById("profile");
// const projectsContainer = document.getElementById("projects");
// const technologiesContainer = document.getElementById("technologies");

const sectionButtons = [
    { target: profileContainer, button: headerButtonProfile },
    { target: projectsContainer, button: headerButtonProjects },
    { target: technologiesContainer, button: headerButtonTechnologies },
];

const videoKingdomino = document.getElementById("video-child-kingdomino");
const videoPcompose = document.getElementById("video-child-pcompose");
const videoDelaware = document.getElementById("video-child-delaware");
const videoCampusapp = document.getElementById("video-child-campusapp");

const targets = [
    { target: technologiesContainer, threshold: getIntersectionThreshold(technologiesContainer.clientHeight), callbackFunction: sectionInViewChangeHeader },
    { target: projectsContainer, threshold: getIntersectionThreshold(projectsContainer.clientHeight), callbackFunction: sectionInViewChangeHeader },
    { target: profileContainer, threshold: getIntersectionThreshold(profileContainer.clientHeight), callbackFunction: sectionInViewChangeHeader },
    {
        target: videoKingdomino,
        threshold: getIntersectionThreshold(videoKingdomino.clientHeight),
        callbackFunction: videoInViewChangePlaystate,
    },
    {
        target: videoPcompose,
        threshold: getIntersectionThreshold(videoPcompose.clientHeight),
        callbackFunction: videoInViewChangePlaystate,
    },
    {
        target: videoDelaware,
        threshold: getIntersectionThreshold(videoDelaware.clientHeight),
        callbackFunction: videoInViewChangePlaystate,
    },
    {
        target: videoCampusapp,
        threshold: getIntersectionThreshold(videoCampusapp.clientHeight),
        callbackFunction: videoInViewChangePlaystate,
    },
];

function getIntersectionThreshold(clientHeight) {
    return Math.min(vh / 2 / clientHeight, 1);
}

const observerProfileProject = new IntersectionObserver(observerFunction, { threshold: targets.map((obj) => obj.threshold) });
targets.forEach((obj) => observerProfileProject.observe(obj.target));

function observerFunction(entries, observer) {
    entries.forEach((entry, index) => {
        const target = targets.find((obj) => obj.target == entry.target);
        target.callbackFunction(entry, target);
    });
}

function sectionInViewChangeHeader(entry, target) {
    if (entry.isIntersecting && entry.intersectionRatio > target.threshold) {
        if (entry.target == profileContainer) {
            if (!headerButtonPressed) headerButtonProfile.checked = true;
            // plexus.setTheme("");
        }
        if (entry.target == projectsContainer) {
            if (!headerButtonPressed) headerButtonProjects.checked = true;
            // plexus.setTheme("background-projects-theme");
        }
        if (entry.target == technologiesContainer) {
            if (!headerButtonPressed) headerButtonTechnologies.checked = true;
            // plexus.setTheme("background-technologies-theme");
        }
    }
}

function videoInViewChangePlaystate(entry, targetObj) {
    if (entry.isIntersecting) {
        targetObj.target.play();
    }

    if (!entry.isIntersecting) {
        targetObj.target.pause();
    }
}

sectionButtons.forEach((obj) => {
    obj.button.addEventListener("change", () => {
        headerButtonPressed = true;
        const scrollTarget = obj.target.getBoundingClientRect().top + window.scrollY - header.clientHeight;
        window.scrollTo({
            top: scrollTarget,
            behavior: "smooth",
        });

        window.addEventListener(
            "scrollend",
            () => {
                headerButtonPressed = false;
            },
            { once: true },
        );
    });
});

// ======== mail ========

window.onload = function () {
    document.getElementById("mail-form").reset();
};
