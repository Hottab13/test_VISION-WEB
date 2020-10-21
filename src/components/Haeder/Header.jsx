import React from "react";
import classes from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = (props)=>{
    return(
    <header className={classes.heder}>
            <div><h4>ГНЕЗДОСЕТЬ</h4></div>
            <div className={classes.login}>
                {props.isAuth ?
                <div>{props.login} - <button onClick={props.logOut}>Выйти</button></div> 
                :<NavLink to={`/login`}>Login:</NavLink>}
            </div>
    </header> 
    );
}
export default Header;