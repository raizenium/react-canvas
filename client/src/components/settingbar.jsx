import React from "react";
import toolState from "../store/toolState";


const Setting = () => {
    return (
        <div className="settingbar">
            <label>Толщина кисти</label>
            <input onChange={event => toolState.setLineWidth(event.target.value)} type="number" min={1} defaultValue={1} max={50}/>
            <label>Цвет обводки</label>
            <input onChange={event => toolState.setStrokeColor(event.target.value)} type="color"/>
        </div>
    )
}
export default Setting;