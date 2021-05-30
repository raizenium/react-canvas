import React from "react";
import Line from "../tools/line";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/brush";
import Circle from "../tools/circle";
import Eraser from "../tools/eraser";
import Rect from "../tools/rect";



const Toolbar = () => {
    const colorChange = (event) => {
        toolState.setStrokeColor(event.target.value);
        toolState.setFillColor(event.target.value)
    }
    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = canvasState.sessionId + ".jpg";
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={ () => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#brush"></use>
                </svg>
            </button>
            <button className="toolbar__btn rect" onClick={ () => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#rect"></use>
                </svg>
            </button>
            <button className="toolbar__btn circle" onClick={ () => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#circle"></use>
                </svg>
            </button>
            <button className="toolbar__btn eraser" onClick={ () => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#eraser"></use>
                </svg>
            </button>
            <button className="toolbar__btn line" onClick={ () => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#line"></use>
                </svg>
            </button>
            <input type="color" onChange={event => colorChange(event)}/>
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#undo"></use>
                </svg>
            </button>
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()} >
                <svg className="toolbar__icon">
                    <use xlinkHref="#redo"></use>
                </svg>
            </button>
            <button className="toolbar__btn save" onClick={() => download()}>
                <svg className="toolbar__icon">
                    <use xlinkHref="#save"></use>
                </svg>
            </button>
        </div>
    )
}

export default Toolbar;