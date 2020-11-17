import { Button } from "antd"
import React from "react"
import classes from './Posts.module.css'

type PropsType={
    messen:string
    like:number
}
const Posts:React.FC<PropsType> = (props)=>{
    return(
        <div className={classes.item}>
            {props.messen}
            <Button>Нравится {props.like}</Button>
            <Button>Удалить</Button>
        </div>
    )
}

export default Posts 