import Tool from "./tool";


export default class Line extends Tool {
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
                type: "line",
                currentX: this.currentX,
                currentY: this.currentY,
                x: event.pageX - event.target.offsetLeft,
                y: event.pageY - event.target.offsetTop,
                color: this.ctx.strokeStyle,
                strokeWidth: this.ctx.lineWidth
            }
        }))
    }
    mouseDownHandler(event) {
        this.mousedown = true
        this.currentX = event.pageX - event.target.offsetLeft;
        this.currentY = event.pageY - event.target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(event) {
        if(this.mousedown) {
            this.draw(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
            
        }
    }
    draw(x, y) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
    static staticDraw(ctx, x, y, currentX, currentY, color, strokeWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.moveTo(currentX, currentY)
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
    }
}