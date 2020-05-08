import React from 'react'
import "../pages/page.css";


const getStyle = (props)=>{
    let baseClass = "alert ";
    if(props.message.msgError)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}

export default Message;