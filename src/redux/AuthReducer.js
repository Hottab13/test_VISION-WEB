import { stopSubmit } from "redux-form";
import { userAPI, securityAPI  } from "../api/api";

const SET_USER_DATA='auth/SET_USER_DATA',
GET_CAPTCHS_SUCCESS='auth/GET_CAPTCHS_SUCCESS';

let initionalState = {
    userId:null,
    login:null,
    email:null,
    isFetching:false,
    isAuth:false,
    captchaUrl:null
}

const authReducer=(state=initionalState,action)=> {
    switch (action.type){
        case GET_CAPTCHS_SUCCESS:
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                //isAuth:true
            }   
            default:
            return state;
    }
}

export const setAuthUserData=(userId,login,email,isAuth)=> ({type:SET_USER_DATA, payload:{userId,login,email,isAuth}});
export const getCaptchaSuccess=(captchaUrl)=> ({type:GET_CAPTCHS_SUCCESS, payload:{captchaUrl}});

export const setAuthUser = () => async (dispatch) =>{
    let respons= await  userAPI.getLogin(); //возвращаем промис от зена в инициализацию
    if(respons.data.resultCode === 0){
        let {id,login,email} = respons.data.data;
        dispatch(setAuthUserData(id,login,email, true));
    }
}
export const loginUser = (email,password,rememberMe,captcha) => async(dispatch) =>{
        let respons = await userAPI.getAuthLogin(email,password,rememberMe,captcha);
            if(respons.data.resultCode === 0){
                dispatch(setAuthUser());
            } else{
                if(respons.data.resultCode === 10){
                    dispatch(getCaptchaUrl());
                }
                dispatch(stopSubmit('login',{_error:respons.data.messages[0]}));
            }
}
/*export const loginUser = (email,password,rememberMe) =>{
    return (dispatch) =>{
        //alert(rememberMe)
        userAPI.getAuthLogin(email,password,rememberMe).then(data =>{ 
            if(data.data.resultCode === 0){
                dispatch(setAuthUser());
            } else{
                dispatch(stopSubmit('login',{_error:data.data.messages[0]}));
            }
        })
    }   
}*/
export const logOut = () =>async(dispatch) =>{
    let data = await userAPI.logout();
    if(data.data.resultCode === 0){
        dispatch(setAuthUserData(null,null,null,false));
    }
}
export const getCaptchaUrl = () => async(dispatch) =>{
    const respons = await securityAPI.getCaptcha();
    const captchaUrl = respons.data.url;
    dispatch(getCaptchaSuccess(captchaUrl));
}
export default authReducer;