import { Plexus } from "./plexus.js";

const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
let plexus;

let vw;
let vh;

function main() {
    resize();
    plexus = new Plexus(canvas, ctx, 3, vw, vh);
    plexus.generate(100, 4, 2, 0.05, 50, 20);
    changeBackgroundOnScroll(window.scrollY)
    window.requestAnimationFrame(draw);
}

function resize() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    canvas.width = vw;
    canvas.height = vh;
    canvas.style.width = vw;
    canvas.style.height = vh;
    // return { "vw" : vw, "vh": vh };
}

window.addEventListener("resize", () => {
    resize();
    plexus.draw(vw, vh);
});

function draw() {
    plexus.draw(vw, vh);
    window.requestAnimationFrame(draw);
}

document.addEventListener("scroll", () => {
    changeBackgroundOnScroll(window.scrollY)
})

function changeBackgroundOnScroll(scrollY) {
    if(scrollY == 0) {
        plexus.setBackgroundColor(getComputedStyle(document.documentElement).getPropertyValue("--primary-1"))
    }

    if(scrollY > 0) {
        plexus.setBackgroundColor(getComputedStyle(document.documentElement).getPropertyValue("--primary-2"))
    }
}

main();