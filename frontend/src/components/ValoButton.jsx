function ValoButton(props) {
    return (
        <button id={props.id} onClick={props.onClick} className={` ${props.className}`} style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}>{props.text}</button>
    )
}

export default ValoButton