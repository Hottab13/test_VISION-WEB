import React from "react"
import classes from './Messenges.module.css'

type OwnPropsType={
    messenges:string
}
const Messeges:React.FC<OwnPropsType> = (props) =>{
    return (
        <div>
            <div className={classes.dialog}>
                {props.messenges}
            </div>
        </div>
    )
}
export default Messeges

/************************************************/

  // let state = props.store.getState();
    //let newMesseges = React.createRef();
    /*let addMesseges = () =>{
        //let messen = newMesseges.current.value;
        //alert(messen);
        props.store.dispatch(AddMessengActionCreator()); 
    };
    let onMessenChange = (e) =>{
        //debugger;
        //let messen = newMesseges.current.value;
        let messen = e.target.value;//альтернативный вариант REF
        props.store.dispatch(UpdateNewMessenActionCreator(messen));
    };*/