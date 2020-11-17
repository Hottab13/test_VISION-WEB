import React from "react";
import {  InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringType, InputControl, Texteria } from "../../common/FormControl/FormControl";
import style from "../../common/FormControl/FormControl.module.css"
import { ContactsType, PostUserType } from "../../types/type";

type ProfileDataFormValueType={
}
type ProfilePropsType ={
    contact:ContactsType
}
type ProfileDataFormValueTypeKey= GetStringType<PostUserType>

const ProfileDataContactForm:React.FC<InjectedFormProps<PostUserType,ProfilePropsType>& ProfilePropsType> =({handleSubmit,contact,error})=>{
    return( 
    <form onSubmit={handleSubmit} >
        <h3>Контакты: </h3> 
        <div><button>Сохранить</button></div>
        <div><h3>Полное имя: </h3>
            {createField<ProfileDataFormValueTypeKey >("Введите ваше имя","fullName",[],InputControl)}
        </div>
        <div><b>Ищу работу: </b> 
            {createField<ProfileDataFormValueTypeKey >(" ","lookingForAJob",[],InputControl,{type:"checkbox"})}
        </div>
        <div>
            <div><b>Мои профессиональные навыки: </b></div> 
            {createField<ProfileDataFormValueTypeKey >("Введите ваши профессиональные навыки","lookingForAJobDescription",[],Texteria)}
        </div>
        <div><b>Обо мне: </b>
            {createField<ProfileDataFormValueTypeKey >("Напишите информацию о вас","aboutMe",[],Texteria)}
        </div> 
        {Object.keys(contact).map(key =>{
            return(
                <div key={key}>
                    <b>{key}:</b>
                    {createField(key,"contacts." + key,[],InputControl)}
                </div>
        )})}
        {error && <div className={style.formSummaryError}>{error} </div>}
    </form>
)}

const ProfileDataContactFormRedux =  reduxForm<PostUserType,ProfilePropsType>({form:'formData'})(ProfileDataContactForm);
export default ProfileDataContactFormRedux