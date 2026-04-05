class video {
    #isDialogOpen = false;
    #leaderVideo;
    #followerVideo;

    #currentTime = 0;
    #playState = false;
    #playbackRate = 1;

    constructor(leaderId, followerId) {
        this.#leaderVideo = document.getElementById(leaderId);
        this.#followerVideo = document.getElementById(followerId);
    }
}

let isDialogOpen = false;

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
    const leaderVideo = dialog.getElementsByTagName("video")[0];
    const followerVideo = document.getElementById(leaderVideo.dataset.target);

    button.addEventListener("click", () => {
        isDialogOpen = true;
        dialog.showModal();
        leaderVideo.currentTime = followerVideo.currentTime;
        leaderVideo.play();
    });

    const closeButton = dialog.getElementsByClassName("icon-button")[0];

    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("close", (element) => {
        isDialogOpen = false;
        leaderVideo.pause();
    });
});

videoElements.forEach((video) => {
    const childVideo = document.getElementById(video.dataset.target);

    const leader = video;
    const follower = childVideo;

    leader.addEventListener("play", () => {
        if (isDialogOpen) follower.play();
    });

    leader.addEventListener("pause", () => {
        if (isDialogOpen) follower.pause();
    });

    leader.addEventListener("seeking", () => {
        if (isDialogOpen) follower.currentTime = leader.currentTime;
    });

    leader.addEventListener("seeked", () => {
        if (isDialogOpen) follower.currentTime = leader.currentTime;
    });

    leader.addEventListener("ratechange", () => {
        if (isDialogOpen) follower.playbackRate = leader.playbackRate;
    });
});
