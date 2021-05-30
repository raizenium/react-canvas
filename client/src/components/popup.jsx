import React, { useRef } from "react";
import "../assets/popup.scss"
import canvasState from "../store/canvasState";

const Popup = ({active, setActive}) => {
    const usernameRef = useRef();

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setActive(false)
    }
    return (
        <div className={active ? "popup active" : "popup"}>
            <div className="popup__inner">
                <div className="popup__title">Введите ваше имя</div>
                <input type="text" className="popup__input" ref={usernameRef}/>
                <button className="popup__button" onClick={() => connectHandler()}>Отправить</button>
            </div>
        </div>
    )
}
export default Popup;