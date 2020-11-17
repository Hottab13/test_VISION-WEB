import React, { useEffect, useState } from 'react';
import classes from './Paginator.module.css';
import { Pagination } from 'antd';


type PropsType={
    totalUsersCount:number
    pageSaze:number
    currentPage:number
    onPageChange:(pageNumber:number)=>void
    portionSize?:number
}
let Paginator:React.FC<PropsType> =({totalUsersCount,pageSaze,currentPage,onPageChange,portionSize=10})=>{
    const pageCount:number = Math.ceil (totalUsersCount/pageSaze);//pageCount количество страниц с юзерами
    let page:Array<number> =[];//page массив из количества страниц юзеров
    for (let i=1; i<=pageCount; i++ ){//array pages
        page.push(i);
    }

    //let portionCount = Math.ceil(pageCount/portionSize)//portionCount порция пагинатора
    let [portionNumber, setPortionNumber] = useState(1)//стейт для

    useEffect(()=>{
        onPageChange(portionNumber)
    },[portionNumber])
    
    //let leftPortionNumber = (portionNumber -1)* portionSize+1//левая кнопка вперёд одну порцию
    //let rightPortionNumber = portionNumber * portionSize//правая кнопка вперёд 1 порцию

return (
<div >
    {/*<div>
    {portionNumber >1 &&
    <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Назад</button> }
    {page
        .filter(p=>p >= leftPortionNumber && p<=rightPortionNumber)
        .map(p=>{ //number page 
            return( 
                <span className={`${currentPage === p?classes.selectedPage:null} +${classes.pageNumber} `/*cn({
                    [classes.selectedPage]:currentPage === p} 
                    ,classes.pageNumber
                )*//*}
                key ={p}
                onClick={(e)=>{
                    onPageChange(p)}}>{p}</span>
                )})}
    {portionCount> portionNumber&&
    <button onClick={()=>{setPortionNumber(portionNumber+1)}}>Вперёд</button> }  
    </div>*/}

    <div>
        <Pagination 
        current={portionNumber} 
        onChange={setPortionNumber} 
        total={totalUsersCount}
        defaultPageSize={12} />
    </div>
</div>
    )
}
export default Paginator;
/*<span className={ ( 
                    {[classes.selectedPage]:currentPage === p} 
                    ,classes.pageNumber) } //&& classes.selectedPage}
                    <Pagination defaultCurrent={1} total={50} />*/