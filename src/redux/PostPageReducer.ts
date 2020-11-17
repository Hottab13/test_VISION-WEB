import { InferActionType, BaseThunkActionType } from './ReduxStore'
import { MessenType, Photos, PostUserType } from './../components/types/type'
import { FormAction, stopSubmit } from "redux-form"
import { userAPI, profileAPI } from "../api/api"
import { ResultCodeEnum  } from "../api/api"

let initionalState = {
    posts:[
        {id:1,messen:"Одна снежинка может согнуть лист бамбука.",like:15},
        {id:2,messen:"— Поверхностны только те, которые считают себя глубокомысленными,а вот я определённо поверхностна. Я не особенно разбираюсь в больших вопросах жизни. Мне нравится только прекрасное. Вот ты принёс сирень — и я уже счастлива, -Это не поверхностность — это высшая философия.",like:0},
        {id:3,messen:"Иногда момент, который ты так долго ждал, приходит в самое неподходящее время...",like:432},
        {id:4,messen:"Каждый человек, появляющийся в твоей жизни, все события, которые с тобой происходят, — все это случается с тобой потому, что это ты притянул их сюда. И то, что ты сделаешь со всем этим дальше, ты выбираешь сам.",like:232},
        {id:5,messen:"Как же неприятно потратить на человека так много времени лишь для того, чтобы узнать, что он так и остался для тебя лишь посторонним.",like:23423},
        {id:6,messen:"UI - Rect, BLL - Redux",like:19}
      ]as Array<MessenType>, 
    postUser:null as PostUserType | null,
    status:"",
    isLoader: false as boolean
}

export type InitionalStateType = typeof initionalState
type ThunkActionType = BaseThunkActionType<ActionType| FormAction>
type ActionType = InferActionType<typeof action>

const postPageReducer=(state=initionalState,action:ActionType):InitionalStateType=> {
switch (action.type){
    case "ADD_POST":
        return {
            ...state,//copy state
            posts: [...state.posts,{
                id:7,
                messen:action.addPost,
                like:0
            }]// copy arr
            //nowPostText:''
        }
    case "SET_STATUS":
        return ({...state,status: action.status})
    case "SET_USERS_POST":
        return {...state, postUser: action.post }
    case "SAVE_PHOTO_SUCCESS":
        return {...state, postUser:{...state.postUser,photos:action.photos }as PostUserType}
    case "TOGGLE_IS_FETING":{
        return { ...state,isLoader:action.isFeting}//loader
            } 
    default:
        return state
    }
}

export const action ={
    AddPostActionCreator:(addPost:string)=> ({ type:"ADD_POST", addPost } as const),
    setUsersPosts :(post:PostUserType) =>({type:"SET_USERS_POST", post}as const),
    setStatus:(status:string)=>({type:"SET_STATUS", status:status}as const),
    savePhotoSuccess:(photos:Photos)=>({type:"SAVE_PHOTO_SUCCESS", photos}as const),
    toggleIsFeting :(isFeting:boolean) =>({type:"TOGGLE_IS_FETING", isFeting}as const)
}

export const setUserId = (userId:number | null):ThunkActionType =>
    async(dispatch,getState) =>{
    let data = await userAPI.getProfile(userId)
    dispatch(action.setUsersPosts(data))
}
export const getStatus = (userId:number):ThunkActionType => async(dispatch,getState) =>{
    let data = await profileAPI.getStatus(userId)
    dispatch(action.setStatus(data))
}
export const updateStatus = (status:string):ThunkActionType =>async(dispatch,getState) =>{
    let response = await  profileAPI.updateStatus(status)
    if(response.resultCode === ResultCodeEnum.Success){
        dispatch(action.setStatus(status))
    }
}
export const savePhoto = (file:File):ThunkActionType=>async(dispatch,getState)=>{
    dispatch (action.toggleIsFeting(true))
    let response = await profileAPI.savePhoto(file)
    if(response.resultCode === ResultCodeEnum.Success){
        dispatch(action.savePhotoSuccess(response.data.photos))
    }
    dispatch (action.toggleIsFeting(false))
} 
export const saveProfile = (file:PostUserType):ThunkActionType=>async(dispatch,getState)=>{
    let usersId = getState().auth.userId
    dispatch (action.toggleIsFeting(true))
    let response = await profileAPI.saveProfile(file)
    if(response.resultCode === ResultCodeEnum.Success){
        dispatch(setUserId(usersId))
        dispatch (action.toggleIsFeting(false))
    }else{
        dispatch(stopSubmit('formData',{_error:response.messages[0]} ) )
        return Promise.reject(response.messages[0])
    }
} 
export default postPageReducer

//AddPostActionCreatorType | SetUsersPostsType | SetStatusType | SavePhotoSuccessType | ToggleIsFetingType

//const ADD_POST='profile/ADD-POST' 
/*type AddPostActionCreatorType={
    type: typeof ADD_POST
    addPost:string
}
type SetUsersPostsType={
    type: typeof SET_USERS_POST
    post:PostUserType
}
type SetStatusType={
    type: typeof SET_STATUS
    status:string
}
type SavePhotoSuccessType={
    type: typeof SAVE_PHOTO_SUCCESS
    photos:Photos
}
type ToggleIsFetingType={
    type: typeof TOGGLE_IS_FETING
    isFeting:boolean
}*/
/*SET_USERS_POST='profile/SET_USERS_POST',
SET_STATUS='profile/SET_STATUS',
SAVE_PHOTO_SUCCESS='profile/SAVE_PHOTO_SUCCESS',
TOGGLE_IS_FETING='profile/TOGGLE_IS_FETING';*/
 //stateCopy.posts.push(newPost);
        //stateCopy.nowPostText='';
        //return stateCopy;
   /* case UPDATE_NEW_POST_TEXT:
        return ({...state,nowPostText: action.newText})*/
        //stateCopy.nowPostText = action.newText;
        //return stateCopy;