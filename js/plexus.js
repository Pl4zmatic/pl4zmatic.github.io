import { Dot } from "./dot.js";

export class Plexus {
    dots = [];
    canvasDom;
    canvas;
    dotRadius;
    vw;
    vh;

    backgroundColor;
    contentColor = "#FFFFFF";

    // backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--accent1");
    // contentColor = "#FFFFFF";

    constructor(canvasDom, canvas, dotRadius, vw, vh) {
        this.canvasDom = canvasDom;
        this.canvas = canvas;
        this.dotRadius = dotRadius;
        this.vw = vw;
        this.vh = vh;
    }

    generate(totalDots, maxSubDots, minSubDots, maxSpeed, maxInnerBorderSize, minInnerBorderSize) {
        for(let i = 0; i < totalDots; i++) {
            let x = Math.floor(Math.random() * this.vw);
            let y = Math.floor(Math.random() * this.vh);
            const opacity = Math.floor(Math.random() * (100 - 10) + 10);
            const directionX = Math.fround(Math.random() * 3 - 1, 2); // direction can be [-1, 0 ,1] 
            const directionY = Math.fround(Math.random() * 3 - 1, 2);
            const speed = Math.random() * maxSpeed;
            const innerBorderSize = Math.floor(Math.random() * (maxInnerBorderSize - minInnerBorderSize) + minInnerBorderSize);
            const dot = new Dot(x, y, [], opacity, {x: directionX, y: directionY}, speed, innerBorderSize);
            this.dots.push(dot);
        }

        for(let i = 0; i < this.dots.length; i++) {
            const currentDot = this.dots[i];
            let sublist = this.dots.filter((dot, index, dots) => index != i && !dot.connectedDots.includes(dots[i])); //filter out currentDot, and who do have currentDot as subdot
            sublist = sublist.sort((dot1, dot2) => this.#getDistance(currentDot, dot1) - this.#getDistance(currentDot, dot2)) // sort for closest possible subdots
            sublist = sublist.slice(0, maxSubDots + 1); // get the n smallest from the list, n = maxsubdots

            const subdotAmount = Math.floor(Math.random() * (maxSubDots - minSubDots) + minSubDots);

            for(let a = 0; a < subdotAmount && sublist.length != 0; a++) {
                const subDot = sublist[Math.floor(Math.random() * sublist.length)];
                sublist = sublist.filter((dot) => dot != subDot);
                this.dots[i].connectedDots.push(subDot);
            }
        }
    }

    setBackgroundImage(backgroundImage) {
        this.canvasDom.style.backgroundImage = backgroundImage;
    }
    
    setBackgroundColor(backgroundColor) {
        if(this.backgroundColor != backgroundColor) {
            this.canvasDom.style.backgroundColor = backgroundColor;
            this.backgroundColor = backgroundColor;
        }
    }

    setContentColor(contentColor) {
        if(this.contentColor != contentColor) {
            this.contentColor = contentColor;
        }
    }

    #getDistance(dot1, dot2) {
        return Math.sqrt(Math.pow(Math.abs(dot1.x - dot2.x), 2) + Math.pow(Math.abs(dot1.y - dot2.y), 2))
    }

    draw(vw, vh) {
        this.canvas.clearRect(0, 0, vw, vh);
        let xMultiplier = vw / this.vw
        let yMultiplier = vh / this.vh
        
        for(const dot of this.dots) {
            dot.x *= xMultiplier
            dot.y *= yMultiplier
            dot.innerBorder.start.x *= xMultiplier;
            dot.innerBorder.end.x *= xMultiplier;
            dot.innerBorder.start.y *= yMultiplier;
            dot.innerBorder.end.y *= yMultiplier;
            dot.draw(this.canvas, this.dotRadius, this.contentColor);

            if(dot.x <= 0 || dot.x >= vw || dot.x <= dot.innerBorder.start.x || dot.x >= dot.innerBorder.end.x) {
                dot.direction.x *= -1
            }

            if(dot.y <= 0 || dot.y >= vh || dot.y <= dot.innerBorder.start.y || dot.y >= dot.innerBorder.end.y) {
                dot.direction.y *= -1
            }
            dot.move();
        }

        this.vw = vw;
        this.vh = vh;
    }
}