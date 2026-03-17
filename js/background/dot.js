export class Dot {
    x;
    y;
    connectedDots = [];
    opacity;
    direction; // {x, y}
    speed;
    innerBorder; // {start: {x, y}, end: {x, y}}

    constructor(x, y, connectedDots = [], opacity = 100, direction = {x: 0, y: 0}, speed = 0, innerBorderSize = 100) {
        this.x = x;
        this.y = y;
        this.connectedDots = connectedDots;
        this.opacity = opacity;
        this.direction = direction;
        this.speed = speed;
        this.innerBorder = {start: {x: this.x - innerBorderSize, y: this.y - innerBorderSize}, end: {x: this.x + innerBorderSize, y: this.y + innerBorderSize}};
    }

    draw(canvas, dotRadius, color) {
        const opacity = this.#getColorOpacity(this.opacity);
        for(const dot of this.connectedDots) {
            const linearGradient = canvas.createLinearGradient(this.x, this.y, dot.x, dot.y);
            linearGradient.addColorStop(0, `${color}${opacity}`);
            linearGradient.addColorStop(1, `${color}${this.#getColorOpacity(dot.opacity)}`);
            canvas.strokeStyle = linearGradient;

            canvas.beginPath();
            canvas.moveTo(this.x, this.y)
            canvas.lineTo(dot.x, dot.y);
            canvas.stroke();
        }

        canvas.beginPath();
        const fillStyleString = `${color}${opacity}`
        canvas.fillStyle = fillStyleString;
        canvas.arc(this.x, this.y, dotRadius, 0, 2*Math.PI, true);
        canvas.fill();
    }

    #getColorOpacity(opacity) {
        const hexValue = Math.floor(opacity / 100 * 255).toString(16)
        return hexValue;
    }

    move() {
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
    }
}