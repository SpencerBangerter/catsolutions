import React from 'react'
import "../pages/page.css";


const getStyleLogin = (props)=>{
    let baseClass = "alert ";
    if(props.message)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

const getStyleRegister = (props)=>{
    let baseClass = "alert ";
    if(props.message.msgError)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

 export const MessageLogin = props=>{
    return(
        <div className={getStyleLogin(props)} role="alert">
            {props.message}
        </div>
    )
}

export const MessageRegister = props=>{
    return(
        <div className={getStyleRegister(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}