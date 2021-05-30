import Tool from "./tool";


export default class Brush extends Tool {
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
                type: "finish"
            }
        }))
    }
    mouseDownHandler(event) {
        this.mousedown = true
        this.ctx.beginPath();
        this.ctx.moveTo(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
    }
    mouseMoveHandler(event) {
        if(this.mousedown) {
            // this.draw(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
            
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id, 
                figure: {
                    type: "brush",
                    x: event.pageX - event.target.offsetLeft,
                    y: event.pageY - event.target.offsetTop,
                    color: this.ctx.strokeStyle,
                    strokeWidth: this.ctx.lineWidth
                }
            }))
        }
    }
    static draw(ctx, x, y, color, strokeWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}