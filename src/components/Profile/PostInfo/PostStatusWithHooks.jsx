import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const PostStatusWithHooks =(props)=> {
    
    let [editMode,setEditMode] =  useState(false),[status,setStatus] =  useState(props.status);

    useEffect(()=>{//синхранизация с зависимостью, компонет дид маунт, метод жизненного цикла
        setStatus(props.status);
    },[props.status])
    
    const activEditMode=()=>{
        setEditMode(true);
    }
    const deactivEditMode =()=>{
        //debugger
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange =(e)=>{
        setStatus(e.currentTarget.value);
    }
    
    return(  
            <div>
                {!editMode &&
                <div>
                    <span 
                    onDoubleClick ={activEditMode}// двойное нажатие на активацию
                     >{status || "No status"}</span>
                </div>}
                {editMode &&
                <div>
                    <input 
                    onChange={onStatusChange}
                    autoFocus={true} //автофокус
                    onBlur={deactivEditMode}
                    value={status}//принудительное значение
                    />
                </div>}
            </div>  
        )
}

export default PostStatusWithHooks;