export let vw, vh;
resize();

function resize() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

window.addEventListener("resize", () => {
    resize();
});

window.onload = function () {
    document.getElementById("mail-form").reset();
};
