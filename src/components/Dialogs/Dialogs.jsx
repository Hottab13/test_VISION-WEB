import React from "react";
import classes from './Dialogs.module.css';
import DialogItem from "./DialigItem/DialogsItem";
import Messeges from "./Messenges/Messenges";
import { Field, reduxForm } from 'redux-form';
import { Texteria } from "../common/FormControl/FormControl";
import { maxLengthCreator, requiredField } from "../utils/validators";

const Dialogs = (props)=>{
    let state = props.dialogsPage;
    let dialogsElement = state.dialogs.map((d) =><DialogItem name={d.name} id={d.id} key={d.id}/>);
    
    let messengesElement = state.messenges.map((m) =><Messeges messenges={m.messenges} key={m.id}/>);

    /*let addMesseges = () =>{
        props.ADD_MESSENG();
    };
    
    let onMessenChange = (e) =>{
        let messen = e.target.value;//альтернативный вариант REF
        props.UPDATE_NEW_MESSEN_TEXT(messen);
    };*/
const addNewMesseng =(values)=>{
//alert(values.messenges);
//console.log(values);
props.ADD_MESSENG(values.messenges);
}

return <div>
  <div className={classes.dialogs} > 
    <div className={classes.dialogsItem}>
      {dialogsElement}
    </div>
    <div className={classes.messeges}>
    <MessengReduxForm onSubmit={addNewMesseng}/>
      {/*<textarea 
          placeholder={'Введите ваше сообщение'} 
          onChange={onMessenChange} 
          value={state.nowMessenText}
      />
      <button onClick={addMesseges}>Отправить</button>*/}
      {messengesElement}
    </div></div></div>
}
const maxLenght = maxLengthCreator(15); 
const MessengForm =(props)=>{
    return(
<form onSubmit={props.handleSubmit}>
<div>
    <Field 
    component={Texteria} 
    name={"messenges"} 
    placeholder={"Введите ваше сообщение"}
    validate={[requiredField, maxLenght]}/>
</div>
<div>
    <button>Отправить</button>
</div>
</form>
    )
}
const MessengReduxForm = reduxForm({ 
    form:'addMessengForm'
})(MessengForm);

export default Dialogs;