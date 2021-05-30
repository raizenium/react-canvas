import Tool from "./tool";



export default class Circle extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }
    mouseUpHandler(event) {
        this.mousedown = false;
        this.socket.send(JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
                type: "circle",
                x: this.currentX,
                y: this.currentY,
                r: this.radius,
                color: this.ctx.fillStyle,
                strokeColor: this.ctx.strokeStyle,
                strokeWidth: this.ctx.lineWidth
            }
        }))
    }
    mouseDownHandler(event) {
        this.mousedown = true
        this.ctx.beginPath();
        this.startX = event.pageX - event.target.offsetLeft;
        this.startY = event.pageY - event.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(event) {
        if(this.mousedown) {
            this.currentX = event.pageX - event.target.offsetLeft;
            this.currentY = event.pageY - event.target.offsetTop;
            this.width = this.currentX - this.startX;
            this.height = this.currentY - this.startY;
            this.radius = Math.sqrt(this.width**2 + this.height**2);
            this.draw(this.currentX, this.currentY, this.radius);
        }
    }
    draw(x, y, r) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, Math.PI*2);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
    static staticDraw(ctx, x, y, r, color, strokeColor, strokeWidth) {
        ctx.fillStyle = color
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth;
        ctx.arc(x, y, r, 0, Math.PI*2)
        ctx.fill();
        ctx.stroke();
        ctx.beginPath()
    }
}