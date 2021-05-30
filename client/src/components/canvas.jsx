import React, { useEffect, useRef, useState } from "react";
import "../assets/canvas.scss"
import canvasState from "../store/canvasState";
import {observer} from "mobx-react-lite";
import toolState from "../store/toolState";
import {useParams} from "react-router-dom"
import axios from "axios"
import Brush from "../tools/brush"
import Popup from "./popup.jsx"
import Rect from "../tools/rect";
import Circle from "../tools/circle";
import Eraser from "../tools/eraser";
import Line from "../tools/line";

const Canvas = observer(() => {
    const [popup, setActive] = useState(true);
    const params = useParams()
    const canvasRef = useRef()
    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
        .then(response => console.log(response.data))
    }
    const drawHandler = (message) => {
        const figure = message.figure
        const ctx = canvasRef.current.getContext("2d")
        switch(figure.type) {
            case "brush": 
                Brush.draw(ctx, figure.x, figure.y, figure.color, figure.strokeWidth)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor, figure.strokeWidth);
                break
            case "circle":
                Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color, figure.strokeColor, figure.strokeWidth)
                break
            case "eraser": 
                Eraser.draw(ctx, figure.x, figure.y, figure.strokeWidth)
                break
            case "line": 
                Line.staticDraw(ctx, figure.x, figure.y, figure.currentX, figure.currentY, figure.color, figure.strokeWidth)
                break
            case "finish": 
                ctx.beginPath();
                break
        }
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext("2d");
        axios.get(`http://localhost:5000/image?id=${params.id}`).then(response => {
            const img = new Image()
            img.src = response.data
            img.onload = () => {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
            }
        })
    }, [])
    
    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log("подлючено")
                socket.send(JSON.stringify({
                    username: canvasState.username,
                    id: params.id,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let message = JSON.parse(event.data);
                switch(message.method) {
                    case "connection":
                        console.log(`${message.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(message)
                        break; 
                    case "undo": 
                        drawHandler(message)
                        break;
                    case "redo": 
                        drawHandler(message)
                        break;
                }
            }
        }
    }, [canvasState.username])
    
    return (
        <div className="canvas">
            <Popup active={popup} setActive={setActive} />
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={700} height={500}></canvas>
        </div>
    )
})

export default Canvas;