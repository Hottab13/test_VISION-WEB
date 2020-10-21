import { stopSubmit } from "redux-form";
import { userAPI } from "../api/api";

const SET_USER_DATA='auth/SET_USER_DATA';

let initionalState = {
    userId:null,
    login:null,
    email:null,
    isFetching:false,
    isAuth:false
}

const authReducer=(state=initionalState,action)=> {
    switch (action.type){
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

export const setAuthUser = () => async (dispatch) =>{
    let respons= await  userAPI.getLogin(); //возвращаем промис от зена в инициализацию
    if(respons.data.resultCode === 0){
        let {id,login,email} = respons.data.data;
        dispatch(setAuthUserData(id,login,email, true));
    }
}
export const loginUser = (email,password,rememberMe) => async(dispatch) =>{
        let respons = await userAPI.getAuthLogin(email,password,rememberMe);
            if(respons.data.resultCode === 0){
                dispatch(setAuthUser());
            } else{
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
    if(data.resultCode === 0){
        dispatch(setAuthUserData(null,null,null,false));
    }
}
export default authReducer;