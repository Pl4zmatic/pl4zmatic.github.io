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

main();

const hero = document.getElementById("hero");
const projectsContainer = document.getElementById("projects");
const technologies = document.getElementById("technologies");
const targets = [
    {target: technologies, threshold: (vh / 2 / technologies.clientHeight)},
    {target: projectsContainer, threshold: (vh / 2 / projectsContainer.clientHeight)},
    {target: hero, threshold: (vh / 2 / hero.clientHeight)},
]
const observerProfileProject = new IntersectionObserver(changeBackgroundOnEntry, {threshold: targets.map((obj) => obj.threshold)});
targets.forEach((obj) => observerProfileProject.observe(obj.target))

function changeBackgroundOnEntry(entries, observer) {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting && entry.intersectionRatio > observer.thresholds[index]) {
            if(entry.target == hero) {
                plexus.setTheme("");
            }
            if(entry.target == projectsContainer) {
                plexus.setTheme("background-projects-theme");
            }
            if(entry.target == technologies) {
                plexus.setTheme("background-technologies-theme");
            }
        }
    })
}