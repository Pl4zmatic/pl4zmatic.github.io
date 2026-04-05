import { vh, vw } from "./window.js";

const header = document.getElementById("header");
const headerButtonProfile = document.getElementById("button-profile");
const headerButtonProjects = document.getElementById("button-projects");
const headerButtonTechnologies = document.getElementById("button-technologies");
let headerButtonPressed = false;

// # provided above
const profileContainer = document.getElementById("profile");
const projectsContainer = document.getElementById("projects");
const technologiesContainer = document.getElementById("technologies");

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
