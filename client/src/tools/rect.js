import Tool from "./tool";



export default class Rect extends Tool {
    constructor(canvas, socket, id){
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
                type: "rect",
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
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
            let currentX = event.pageX - event.target.offsetLeft;
            let currentY = event.pageY - event.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    draw(x, y, w, h) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.fill()
            this.ctx.stroke();
        }
        
    }

    static staticDraw(ctx, x, y, w, h, color, strokeСolor, strokeWidth) {
        ctx.fillStyle = color;
        ctx.strokeStyle = strokeСolor;
        ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
    }
}