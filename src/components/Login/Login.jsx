import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
//import { setLoginUser } from '../../redux/AuthReducer';
import { loginUser} from '../../redux/AuthReducer';
import {Input} from '../common/FormControl/FormControl';
import { maxLengthCreator, requiredField } from '../utils/validators';
import style from '../common/FormControl//FormControl.module.css'

const maxLenght = maxLengthCreator(30); 
const LoginForm =({handleSubmit, error, captchaUrl }) =>{
   // alert(captchaUrl)
    return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field component={Input} 
                    name={"login"} 
                    placeholder={"Login"}
                    validate={[requiredField, maxLenght]}/>
                </div>
                <div>
                    <Field 
                    component={Input} 
                    name={"pass"} 
                    placeholder={'Password'}
                    type={"password"}
                    validate={[requiredField, maxLenght]}/>
                </div>
                <div>
                    <Field 
                    component={Input} 
                    name={"remember_me"} 
                    type={'checkbox'}/> remember me
                </div>
                    {error &&<div className={style.formSummaryError}>{error}</div>}
                <div>
                    {captchaUrl && <img src={captchaUrl}/>}
                    {captchaUrl &&<Field 
                    component={Input} 
                    name={"captcha"} 
                    placeholder={"Введите капчу с картинки"}
                    //validate={[requiredField, 4]}
                    /> }
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

const Login =({loginUser,isAuth,captchaUrl}) =>{
    const onSubmit = (value)=>{
         loginUser(value.login,value.pass, value.remember_me, value.captcha )
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

let mapStateToProps =(state) =>({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

/*let mapDispatchToProps = (dispatch) =>{
    return{
         GET_REDUX_LOGIN: (login,pass,remember) =>{
            dispatch(GetReduxCreator(login,pass,remember)); 
        }
    }
}*/

export default  connect(mapStateToProps,{loginUser})(Login); 

//export default Login;