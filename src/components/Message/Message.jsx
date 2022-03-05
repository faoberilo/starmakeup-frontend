import "./styles.css";
import React from "react";

function Message({type, msg}){

    const [visible, setVisible]= React.useState(false)

    React.useEffect(()=>{
        
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)
        
        const timer = setTimeout(()=>{
            setVisible(false)
        },3000)

        return ()=> clearTimeout(timer)
    },[msg])

    return (
        <>
            {visible && (
                <div className={`message ${type}`}>{msg}</div>
            )}
        </>
    )
}

export default Message;