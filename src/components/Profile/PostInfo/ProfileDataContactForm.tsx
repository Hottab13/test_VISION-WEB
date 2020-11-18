import React from "react";
import {  InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringType, InputControl, Texteria } from "../../common/FormControl/FormControl";
import style from "../../common/FormControl/FormControl.module.css"
import { ContactsType, PostUserType } from "../../types/type";
/**************************************/
import { SettingOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Select, Row, Col } from 'antd';
import TextArea from "antd/lib/input/TextArea";
const FormItem = Form.Item;

const { Option } = Select;

const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 14 },
  };

  const NewITextArea = ({
    ...rest
}) => {
return (
<FormItem>
<Input showCount maxLength={100}  {...rest.input} />
</FormItem>);
}
const NewCheckbox = ({
    ...rest
}) => {
return (
<FormItem>
<Checkbox  {...rest.input}>Yes?</Checkbox>
</FormItem>);
};

 
/***************************************/
type ProfileDataFormValueType={
}
type ProfilePropsType ={
    contact:ContactsType
}
type ProfileDataFormValueTypeKey= GetStringType<PostUserType>

const ProfileDataContactForm:React.FC<InjectedFormProps<PostUserType,ProfilePropsType>& ProfilePropsType> =({handleSubmit,contact,error})=>{
    
    return( <div>
        <Form
        name="basic"
        initialValues={{ remember: true }}
      >
    <form onSubmit={handleSubmit} >
      <Row> 
          <Col span={12} >
        <h3>Контакты: </h3> 
        <div><FormItem><Button type="primary" htmlType="submit">Сохранить</Button></FormItem></div>
        <div><h3>Полное имя: </h3>
        <FormItem {...layout}>
            {createField<ProfileDataFormValueTypeKey >("Введите ваше имя","fullName",[],NewITextArea)}
            </FormItem>
        </div>
        <div><b>Ищу работу: </b> 
        <FormItem {...layout}>
            {createField<ProfileDataFormValueTypeKey >(" ","lookingForAJob",[],NewCheckbox,{type:"checkbox"})}
            </FormItem>
        </div>
        <div>
            <div><b>Мои профессиональные навыки: </b></div> 
            <FormItem {...layout}>
                {createField<ProfileDataFormValueTypeKey >("Введите ваши профессиональные навыки","lookingForAJobDescription",[],NewITextArea)}
                </FormItem>
        </div>
        <div><b>Обо мне: </b>
            <FormItem {...layout}>
                {createField<ProfileDataFormValueTypeKey >("Напишите информацию о вас","aboutMe",[],NewITextArea)}
                </FormItem>
        </div> 
        </Col>

        <Col span={12}>
        <div style={{marginTop:"6px"}}>
        {/*Object.keys(contactOb).map(key =>{*/}
        {Object.entries(contact).map(([key,value]) =>{
             const NewInput = ({
                ...rest
            }) => {
            return (
            <FormItem>
                <b>{key}:</b>
            <Input label="key" addonAfter={<SettingOutlined />}  defaultValue={value?value:key} {...rest.input} />
            </FormItem>)
            }
            return(
                /*<div key={key}>
                    <b>{key}:</b>
                    {createField(key,"contacts." + key,[],InputControl)}
                </div>*/
                <div key={key} style={{ marginBottom: 16 }}>
                    <FormItem {...layout}>{createField(key,"contacts." + key,[],NewInput)}</FormItem>
                </div>
        )})}
        </div>

        {error && <div className={style.formSummaryError}>{error} </div>}
        </Col>
        </Row> 
    </form>
    </Form>
    </div>
)}

const ProfileDataContactFormRedux =  reduxForm<PostUserType,ProfilePropsType>({form:'formData'})(ProfileDataContactForm);
export default ProfileDataContactFormRedux