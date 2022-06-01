import react from "react";
import "./Button.css"

export default props =>
    <button className={`
        button
        ${props.operator ? 'operator' : ''}
        ${props.double ? 'double' : ''}
        ${props.triple ? 'triple' : ''}
    `}
    onClick={e => props.click(props.label)}> 
        {props.label} 
    </button>