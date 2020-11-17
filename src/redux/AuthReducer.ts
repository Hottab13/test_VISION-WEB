import { stopSubmit } from "redux-form"
import { userAPI, securityAPI, ResultCodeEnum  } from "../api/api"
import { InferActionType, BaseThunkActionType } from './ReduxStore';

type ActionType = InferActionType<typeof actions>
export type initionalStateType = typeof initionalState
type ThunkActionType = BaseThunkActionType<ActionType | ReturnType<typeof stopSubmit>>

let initionalState = {
    userId:null as number | null,
    login:null as string | null,
    email:null as string | null,
    isFetching:false,
    isAuth:false,
    captchaUrl:null as string | null
}

const authReducer=(state=initionalState,action:ActionType):initionalStateType=> {
    switch (action.type){
        case "GET_CAPTCHS_SUCCESS":
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
                //isAuth:true
            }   
            default:
            return state;
    }
}

const actions={
    setAuthUserData:(userId:number | null,login:string | null,email:string | null,isAuth:boolean)=> ({type:"SET_USER_DATA", 
        payload:{userId,login,email,isAuth}} as const),
    getCaptchaSuccess:(captchaUrl:string)=> ({type:"GET_CAPTCHS_SUCCESS", payload:{captchaUrl}} as const)
}

export const setAuthUser = ():ThunkActionType => async (dispatch) =>{
    let respons= await  userAPI.getLogin()
    if(respons.resultCode === ResultCodeEnum.Success){
        let {id,login,email} = respons.data
        dispatch(actions.setAuthUserData(id,login,email, true))
    }
}
export const loginUser = (email:string ,password:string ,rememberMe:boolean,captcha:string | null):ThunkActionType=> 
    async(dispatch,getState) =>{
        let respons = await userAPI.getAuthLogin(email,password,rememberMe,captcha);
            if(respons.resultCode === ResultCodeEnum.Success){
                dispatch(setAuthUser());
            } else{
                if(respons.resultCode === ResultCodeEnum.Captcha){
                    dispatch(getCaptchaUrl());
                }
                dispatch(stopSubmit('login',{_error:respons.messages[0]}));
            }
}
export const logOut = ():ThunkActionType =>async(dispatch,getState) =>{
    let data = await userAPI.logout();
    if(data.resultCode === ResultCodeEnum.Success){
        dispatch(actions.setAuthUserData(null,null,null,false));
    }
}
export const getCaptchaUrl = ():ThunkActionType => async(dispatch,getState) =>{
    const respons = await securityAPI.getCaptcha()
    const captchaUrl = respons.url
    dispatch(actions.getCaptchaSuccess(captchaUrl))
}
export default authReducer
/*type SetAuthUserDataActionTypePayload={
    userId:number | null
    login:string | null
    email:string | null
    isAuth:boolean
}
type SetAuthUserDataActionType={
    type: typeof SET_USER_DATA,
    payload:SetAuthUserDataActionTypePayload
}
type GetCaptchaSuccessActionType={
    type: typeof GET_CAPTCHS_SUCCESS
    payload:{captchaUrl:string}
}*/
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
/*const SET_USER_DATA='auth/SET_USER_DATA'
const GET_CAPTCHS_SUCCESS='auth/GET_CAPTCHS_SUCCESS'

export type initionalStateType ={
    userId:number | null
    login:string | null
    email:string | null
    isFetching:boolean
    isAuth:boolean
    captchaUrl:string| null
}*/