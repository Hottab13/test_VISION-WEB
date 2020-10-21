import React from "react";
import classes from './DialogsItem.module.css';
import { NavLink } from "react-router-dom";
import Photo from '../../../assets/images/ava.png'

const DialogItem=(props)=>{

    let url = "/dialogs/"+props.id;
    return (
            <div className={classes.dialog + " " + classes.active}>
                <div><img src={Photo}/>
                </div>
                <div className={classes.text}><NavLink to={url}>{props.name}</NavLink></div> 
            </div>
    );
}



export default DialogItem;