import React from 'react';
import classes from './users.module.css';
import ava from '../../assets/images/ava.png';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/FormControl/Paginater/Paginator';

let Users =({totalUsersCount,pageSaze,currentPage,onPageChange,...props})=>{
    return (
        <div >
            <Paginator totalUsersCount={totalUsersCount} 
            pageSaze={pageSaze} 
            currentPage={currentPage} 
            onPageChange={onPageChange} />
            <div className={classes.users}>
            {props.users.map(u=>
                <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={`profile/` +u.id}>
                            <img src={u.photos.small !=null ? u.photos.small: ava } className={classes.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed 
                            ? <button disabled={props.followingInProgress.some(id =>id===u.id) }//если toggleIsFollowingProgress истино, то дизейбл
                             onClick={()=> {props.unfollowing(u.id)}
                            } >Отписаться</button >
                            : <button disabled={props.followingInProgress.some(id =>id===u.id)}
                             onClick={()=> {props.following(u.id)}
                            }>Подписаться</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div><h3>{u.name}</h3></div>
                            <div><h6> {u.status? "Статус: "+u.status: ''}</h6></div>
                        </span>
                        {/*<span>
                            <div>Город: {"u.location.city"}</div>
                            <div>Страна: {"u.location.countru"}</div>
                            <div></div>
                        </span>*/}
                    </span>
                </div>
                )
            }
            </div>
        </div>
        )  
}
export default Users;