import React from "react"
import classes from './Dialogs.module.css'
import DialogItem from "./DialigItem/DialogsItem"
import Messeges from "./Messenges/Messenges"
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Texteria } from "../common/FormControl/FormControl"
import { maxLengthCreator, requiredField } from "../utils/validators"
import { initionalStateType } from "../../redux/DialogPageReducer"

type OwnPropsType={
    dialogsPage:initionalStateType
    AddMessengActionCreator:(messenges:string)=>void
}
type PropsType={}
const maxLenght = maxLengthCreator(15)
const MessengForm:React.FC <InjectedFormProps<DialogsFormValueType,PropsType>& PropsType> =(props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
            {createField<DialogsFormValueTypeKey >("Введите ваше сообщение","messenges",[requiredField, maxLenght],Texteria)}
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}

const MessengReduxForm = reduxForm<DialogsFormValueType,PropsType>({ form:'addMessengForm'})(MessengForm)

type DialogsFormValueType={
    messenges:string
}
type DialogsFormValueTypeKey= Extract< keyof DialogsFormValueType,string>

export const Dialogs:React.FC< OwnPropsType > = (props)=>{
    let state = props.dialogsPage
    let dialogsElement = state.dialogs.map((d) =><DialogItem name={d.name} id={d.id} key={d.id}/>)
    let messengesElement = state.messenges.map((m) =><Messeges messenges={m.messenges} key={m.id}/>)

    const addNewMesseng =(values:DialogsFormValueType)=>{
        props.AddMessengActionCreator(values.messenges)
    }
return (
    <div>
        <div className={classes.dialogs}> 
            <div className={classes.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={classes.messeges}>
                <MessengReduxForm onSubmit={addNewMesseng}/>
                {messengesElement}
            </div>
        </div>
    </div>
)
}

/*********************************************************************************/
/*<textarea 
          placeholder={'Введите ваше сообщение'} 
          onChange={onMessenChange} 
          value={state.nowMessenText}
      />
      <button onClick={addMesseges}>Отправить</button>
       <Field 
                component={Texteria} 
                name={"messenges"} 
                placeholder={"Введите ваше сообщение"}
                validate={[requiredField, maxLenght]}/>*/
                 /*let onMessenChange = (e) =>{
       
                    let messen = e.target.value;//альтернативный вариант REF
        props.UPDATE_NEW_MESSEN_TEXT(messen);
    }*/