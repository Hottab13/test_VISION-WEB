import React from "react";
import classes from'./Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar = ()=>{
    return(
    <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to="/profile" activeClassName={classes.activeLink}>Профиль</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/dialogs" activeClassName={classes.activeLink}>Сообщени</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/frends" activeClassName={classes.activeLink}>Друзья</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/users" activeClassName={classes.activeLink}>Пользователи</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/settings" activeClassName={classes.activeLink}>Настройки</NavLink>
        </div>
    </nav>
    );
}

export default Navbar;