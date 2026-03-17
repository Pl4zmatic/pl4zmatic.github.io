import headerData from "./i18n/header.json" with { type: "json" };
import profileData from "./i18n/profile.json" with { type: "json" };

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
        videoElements.forEach((video) => {
            video.play();
        });
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

const i18nData = {
    header: {
        elements: headerContainer.querySelectorAll("[data-i18n]"),
        data: headerData,
    },
    profile: {
        elements: profileContainer.querySelectorAll("[data-i18n]"),
        data: profileData,
    },
};

[buttonEN, buttonNL].forEach((button) => {
    if (button.checked) {
        const language = button.getAttribute("value");
        Object.values(i18nData).forEach(({ elements, data }) => {
            setTextLanguage(language, elements, data);
        });
    }

    button.addEventListener("change", () => {
        const language = button.getAttribute("value");
        Object.values(i18nData).forEach(({ elements, data }) => {
            setTextLanguage(language, elements, data);
        });
    });
});

function setTextLanguage(language, elements, data) {
    elements.forEach((obj) => {
        const path = obj.dataset.i18n;
        const textValue = String(path)
            .split(".")
            .reduce((prev, next) => {
                return prev[next];
            }, data[language]);

        obj.innerHTML = textValue;
    });
}
