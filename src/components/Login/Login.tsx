import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { loginUser} from '../../redux/AuthReducer'
import {createField, InputControl} from '../common/FormControl/FormControl'
import { maxLengthCreator, requiredField } from '../utils/validators'
import style from '../common/FormControl//FormControl.module.css'
import { AppStateType } from '../../redux/ReduxStore'
//import { Col, Row } from 'antd'
/*************************************** */
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 6 },
};

/************************************************* */
const NewInput = ({
    ...rest
}) => {
return (
<FormItem>
<Input rows={4} {...rest.input} />
</FormItem>);
};
const NewInputPass = ({
    ...rest
}) => {
return (
<FormItem>
<Input.Password rows={4} {...rest.input} />
</FormItem>);
};
const NewCheckbox = ({
    ...rest
}) => {
return (
<FormItem>
<Checkbox  {...rest.input}>Remember me</Checkbox>
</FormItem>);
};

type LoginFormOwnProps={
    captchaUrl:string |null
}
const maxLenght = maxLengthCreator(30)
const LoginForm:React.FC<InjectedFormProps<LoginFormValueType,LoginFormOwnProps>& LoginFormOwnProps> =({handleSubmit, error, captchaUrl }) =>{
    return (<div>
        {/*<Row justify="space-around" align="middle">
        <Col span={4}></Col>
    <Col span={10}>*/}

            <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
      >
        <form onSubmit={handleSubmit}>
        
        <Form.Item label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            {createField<LoginFormValueTypeKey>("Login","login",[requiredField, maxLenght],NewInput)}
        </Form.Item>
        <Form.Item label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            {createField<LoginFormValueTypeKey>("Password","pass",[requiredField, maxLenght],NewInputPass,{type:"password"})}
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked"> {/*createField<LoginFormValueTypeKey>(undefined,"remember_me",[],NewCheckbox,{type:"checkbox"}, "Remember me")*/}
            {createField<LoginFormValueTypeKey>(undefined,"remember_me",[],NewCheckbox,{type:"checkbox"})}
        </Form.Item>
            {error &&<div className={style.formSummaryError}>{error}</div>}
           
            <div>
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormValueTypeKey>("Введите код с картинки","captcha",[],InputControl)}
            </div>
            
            <div>
            <Form.Item {...tailLayout}>
            {/*<button>Login</button>*/}
            <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </div>
            
        </form>
        </Form>
        {/*</Col>
        <Col span={4}></Col>
        </Row>*/}
        </div>)
}
const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({form:'login'})(LoginForm);
type LoginFormValueType ={
    captcha:string 
    remember_me:boolean
    pass:string 
    login:string 
}
type LoginFormValueTypeKey= Extract< keyof LoginFormValueType,string>

export const Login:React.FC =() =>{

const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
const captchaUrl = useSelector((state:AppStateType)=>state.auth.captchaUrl)
const dispatch = useDispatch() 

    const onSubmit = (value:LoginFormValueType )=>{
        dispatch(loginUser(value.login,value.pass, value.remember_me, value.captcha) )
    }
    if(isAuth){
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
           <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}
//export default  connect(null,{loginUser})(Login)
/***********************************************************************/
/*let mapDispatchToProps = (dispatch) =>{
    return{
         GET_REDUX_LOGIN: (login,pass,remember) =>{
            dispatch(GetReduxCreator(login,pass,remember)); 
        }
    }
}*/

/*type MapDispatchPropsType = {
    loginUser:(email:string ,password:string ,rememberMe:boolean,captcha:string | null)=>void
}
type MapStatePropsType = {
    isAuth:boolean
    captchaUrl:string | null
}
type PropsType = MapDispatchPropsType &MapDispatchPropsType*/