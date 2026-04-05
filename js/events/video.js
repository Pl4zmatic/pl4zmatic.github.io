import IntersectionElement from "./intersectionElement.js";

class Video extends IntersectionElement {
    isDialogOpen = false;
    leaderVideo;
    followerVideo;

    currentTime = 0;
    playState = false;
    playbackRate = 1;

    expandButton;

    constructor(leaderId, followerId, expandButtonId) {
        const followerVideo = document.getElementById(followerId);
        super(followerVideo);
        this.followerVideo = followerVideo;
        this.leaderVideo = document.getElementById(leaderId);
        this.expandButton = document.getElementById(expandButtonId);

        this.#setDialogEvents();
        this.#setVideoEvents();
    }

    #setDialogEvents() {
        const dialog = document.getElementById(this.expandButton.dataset.target);

        this.expandButton.addEventListener("click", () => {
            this.isDialogOpen = true;
            this.leaderVideo.currentTime = this.followerVideo.currentTime;
            dialog.showModal();
            this.leaderVideo.play();
        });

        const closeButton = dialog.getElementsByClassName("icon-button")[0];

        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        dialog.addEventListener("close", (element) => {
            this.isDialogOpen = false;
            this.followerVideo.currentTime = this.leaderVideo.currentTime;
            this.leaderVideo.pause();
        });
    }

    #setVideoEvents() {
        this.leaderVideo.addEventListener("seeking", () => {
            if (this.isDialogOpen) this.followerVideo.currentTime = this.leaderVideo.currentTime;
        });

        this.leaderVideo.addEventListener("seeked", () => {
            if (this.isDialogOpen) this.followerVideo.currentTime = this.leaderVideo.currentTime;
        });

        this.leaderVideo.addEventListener("ratechange", () => {
            if (this.isDialogOpen) this.followerVideo.playbackRate = this.leaderVideo.playbackRate;
        });
    }
}

export const videoKingdomino = new Video("video-parent-kingdomino", "video-child-kingdomino", "expand-kingdomino");
export const videoPcompose = new Video("video-parent-pcompose", "video-child-pcompose", "expand-pcompose");
export const videoDelaware = new Video("video-parent-delaware", "video-child-delaware", "expand-delaware");
export const videoCampusapp = new Video("video-parent-campusapp", "video-child-campusapp", "expand-campusapp");

export const videoObjects = [videoKingdomino, videoPcompose, videoDelaware, videoCampusapp];
