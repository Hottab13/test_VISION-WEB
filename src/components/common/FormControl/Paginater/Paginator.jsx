import React, { useState } from 'react';
import classes from './Paginator.module.css';

let Paginator =({totalUsersCount,pageSaze,currentPage,onPageChange,portionSize=10})=>{
    let pageCount = Math.ceil (totalUsersCount/pageSaze);// получем количество номеров страниц
    let page =[];//собираем массив с количеством старниц
    for (let i=1; i<=pageCount; i++ ){//собираем массив старниц
        page.push(i);
    }

    let portionCount = Math.ceil(pageCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber -1)* portionSize+1;
    let rightPortionNumber = portionNumber * portionSize;

return (
<div className ={classes.pagination}>
    {portionNumber >1 &&
    <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Назад</button> }

    {page
        .filter(p=>p >= leftPortionNumber && p<=rightPortionNumber)
        .map(p=>{ //блок отрисовки номеров страниц
            return( 
                <span className={currentPage === p && classes.selectedPage}
                key ={p}
                onClick={(e)=>{
                    onPageChange(p)}}>{p}</span>
                )})}
    {portionCount> portionNumber&&
    <button onClick={()=>{setPortionNumber(portionNumber+1)}}>Вперёд</button> }  
</div>)
}
export default Paginator;
/*<span className={ ( 
                    {[classes.selectedPage]:currentPage === p} 
                    ,classes.pageNumber) } //&& classes.selectedPage}*/