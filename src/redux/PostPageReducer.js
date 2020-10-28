import { stopSubmit } from "redux-form";
import { userAPI, profileAPI } from "../api/api";

const ADD_POST='profile/ADD-POST',
SET_USERS_POST='profile/SET_USERS_POST',
SET_STATUS='profile/SET_STATUS',
SAVE_PHOTO_SUCCESS='profile/SAVE_PHOTO_SUCCESS',
TOGGLE_IS_FETING='profile/TOGGLE_IS_FETING';

let initionalState = {
    posts:[
        {id:1,messen:"Тестируем первый пост",like:"15"},
        {id:2,messen:"Как дела юзер?",like:"0"},
        {id:3,messen:"js сложный язык",like:"432"},
        {id:4,messen:"тут может быТь юольшой текст",like:"232"},
        {id:5,messen:"отличия UL от BLL",like:"23423"},
        {id:6,messen:"UL - Rect, BLL - Redux",like:"19"}
      ],
    postUser:null,
    status:"",
    isLoader: false
}

const postPageReducer=(state=initionalState,action)=> {
switch (action.type){
    case ADD_POST:
        return {
            ...state,// копия стейта
            posts: [...state.posts,{
                id:7,
                messen:action.addPost,
                like:0
            }]// делаем копию вложенного массива
            //nowPostText:''
        }
        //stateCopy.posts.push(newPost);
        //stateCopy.nowPostText='';
        //return stateCopy;
   /* case UPDATE_NEW_POST_TEXT:
        return ({...state,nowPostText: action.newText})*/
        //stateCopy.nowPostText = action.newText;
        //return stateCopy;
    case SET_STATUS:
        return ({...state,status: action.status});
    case SET_USERS_POST:
        return {...state, postUser: action.post };
    case SAVE_PHOTO_SUCCESS:
        return {...state, postUser:{...state.postUser,photos:action.photos }};
    case TOGGLE_IS_FETING:{
        return { ...state,isLoader:action.isFeting};// прелоудер
            } 
    default:
        return state;
    }
}

export const AddPostActionCreator=(addPost)=> ({ type:ADD_POST, addPost });
//export const UpdateNewPostActionCreator=(text)=>({type:UPDATE_NEW_POST_TEXT, newText:text});
export const setUsersPosts =(post) =>({type:SET_USERS_POST, post});
export const setStatus=(status)=>({type:SET_STATUS, status:status});
export const savePhotoSuccess=(photos)=>({type:SAVE_PHOTO_SUCCESS, photos});
export const toggleIsFeting =(isFeting) =>({type:TOGGLE_IS_FETING, isFeting});

export const setUserId = (userId) =>async(dispatch) =>{
    let data = await userAPI.getProfile(userId);
    dispatch(setUsersPosts(data.data));
}

export const getStatus = (userId) => async(dispatch) =>{
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data.data));
}

export const updateStatus = (status) =>async(dispatch) =>{
    let data = await profileAPI.updateStatus(status);
            dispatch(setStatus(status));
}
export const savePhoto = (file)=>async(dispatch)=>{
    dispatch (toggleIsFeting(true));
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
    dispatch (toggleIsFeting(false));
} 
export const saveProfile = (file)=>async(dispatch,getState)=>{
    let usersId = getState().auth.userId;
    dispatch (toggleIsFeting(true));
    let response = await profileAPI.saveProfile(file);
    if(response.data.resultCode === 0){
        dispatch(setUserId(usersId));
        dispatch (toggleIsFeting(false));
    }else{
        dispatch(stopSubmit('formData',{_error:response.data.messages[0]} ) );
        return Promise.reject(response.data.messages[0]);
    }
} 

export default postPageReducer;