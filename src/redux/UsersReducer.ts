
import { ResultCodeEnum } from './../api/api'
import { BaseThunkActionType, InferActionType } from './ReduxStore'
import { UsersType } from './../components/types/type'
import { userAPI } from "../api/api"
import { Dispatch } from 'react'

let initionalState = {  
    users:[ ] as Array<UsersType>,
    pageSaze:12 as number ,// country users page
    totalUsersCount:0 as number,// country users
    currentPage: 1 as number,// start users page
    isFetching:false as boolean,//prelouder
    followingInProgress:[]as Array<number>, //arrey of users ids
    filter:{
        term:"",
        friend:null as null |boolean
    } 
}

export type InitionalStateType = typeof initionalState
export type FilterType = typeof initionalState.filter 
type ActionType = InferActionType <typeof action>
type ThunkActionType = BaseThunkActionType<ActionType>

const usersReducer=(state=initionalState,action:ActionType):InitionalStateType => {
    switch (action.type){
        case "FOLLOW":{
            return{
                ...state,// делаем поверхностную копию стейта
                users: state.users.map((u:UsersType) =>{// проходим весь массив
                    if(u.id === action.userId){// выбираем совпадение id с экшеном
                        return {...u, followed : true};//делаем копию обьекта массива, меняем флаг на true
                    }
                    return u;// если совпадений нету, возвращаем обьект массива
                })}}
        case "UNFOLLOW":{
            return{
                ...state,
                users: state.users.map((u:UsersType) =>{
                    if(u.id === action.userId){
                        return {...u, followed : false};
                    }
                    return u;
                })} }
        case "SET_USERS":{
            //return { ...state, users:[ ...state.users, ...action.users]} перезатераем старых юзеров, юзерами с сервера , путём добавления новых
            return { ...state, users:action.users}// перезатераем старых юзеров, юзерами с сервера    
        }
        case "SET_CURRENT_PAGE":{
            return { ...state, currentPage: action.setCurrentPage
                }
            }
        case "SET_TOTAL_COUNT":{
            return { ...state, totalUsersCount:action.count}// количество всех пользователей
            }
        case "SET_FILTER":{
                return { ...state, filter:action.peyload}
                }
        case "TOGGLE_IS_FETING":{
            return { ...state, isFetching:action.isFeting}// прелоудер
            }   
            case "TOGGLE_IS_FOLLOWING_PROGRESS":{
                return { 
                    ...state, 
                    followingInProgress: action.isFeting ?
                    [...state.followingInProgress, action.userId]
                    :state.followingInProgress.filter(id => id !== action.userId)// прелоудер
                }  }
            default:
                return state
    }
}

export const action={
    follow:(userId:number)=> ({type:"FOLLOW", userId}as const),//Экшин добавления подписк
    unfollow:(userId:number)=>({type:"UNFOLLOW", userId}as const),//Экшен отписки
    setUsers:(users:Array<UsersType>)=>({type:"SET_USERS", users}as const),// Экшен прогрузки юзеров с сервака
    setCurrentPage:(setCurrentPage:number)=>({type:"SET_CURRENT_PAGE", setCurrentPage}as const),// Экшен прогрузки
    setTotalCount :(count:number) =>({type:"SET_TOTAL_COUNT", count}as const),
    toggleIsFeting :(isFeting:boolean) =>({type:"TOGGLE_IS_FETING", isFeting}as const),
    toggleIsFollowingProgress:(isFeting:boolean,userId:number) =>({type:"TOGGLE_IS_FOLLOWING_PROGRESS", isFeting,userId}as const),
    setFilter :(filter:FilterType) =>({type:"SET_FILTER", peyload:filter}as const)
}

export const getUsersThunkCreator = (currentPage:number,pageSaze:number,filter:FilterType):ThunkActionType => 
    async (dispatch, getState) =>{
    dispatch(action.toggleIsFeting(true))//лоудер вкл
    dispatch(action.setCurrentPage(currentPage))//выделение жирным цветом
    dispatch(action.setFilter(filter))
    let data = await userAPI.getUsers(currentPage,pageSaze,filter.term,filter.friend)//дергаем API с параметрами из стейта
    dispatch(action.toggleIsFeting(false))//лоудер выкл
    dispatch(action.setUsers(data.items))//диспачим в стейт юзеров с API
    dispatch(action.setTotalCount(data.totalCount))//диспачим количество юзеров
}
const followUnfollowFlow =async(dispatch:Dispatch<ActionType>,userId:number,apiMethod:any, actionCreator:(userId:number)=>ActionType )=>{
    dispatch(action.toggleIsFollowingProgress(true,userId))//дизейбл кнопки вкл
    let data = await apiMethod(userId)//дёргаем пут запросом подписаться
    if(data.data.resultCode === ResultCodeEnum.Success){//если ответ сервера 0, диспечим в стейт
            dispatch(actionCreator(userId))
        }
    dispatch(action.toggleIsFollowingProgress(false,userId))//дизейбл кнопки выкл
}
export const following = (userId:number):ThunkActionType =>async(dispatch) =>{
    followUnfollowFlow(dispatch,userId,userAPI.getFollow.bind(userAPI), action.follow)
}  
export const unfollowing = (userId:number):ThunkActionType => async(dispatch) =>{
    followUnfollowFlow(dispatch,userId,userAPI.getUnfollow.bind(userAPI), action.unfollow)
}   
export default usersReducer

/*********************************************************************************************************/

// let apiMethod = userAPI.getUnfollow.bind(userAPI);
   // let actionCreator = unfollow;

    // let apiMethod = userAPI.getFollow.bind(userAPI);
   // let actionCreator = follow;

/*export const unfollowing = (userId) =>async(dispatch) =>{
    dispatch(toggleIsFollowingProgress(true,userId));//дизейбл кнопки вкл
    let data = await userAPI.getUnfollow(userId);//дёргаем пут запросом подписаться
        if(data.data.resultCode === 0){//если ответ сервера 0, диспечим в стейт
            dispatch(unfollow(userId));
        }
    dispatch(toggleIsFollowingProgress(false,userId));//дизейбл кнопки выкл
} 
export const following = (userId) =>async(dispatch) =>{
    dispatch(toggleIsFollowingProgress(true,userId));//дизейбл кнопки вкл
    let data = await userAPI.getFollow(userId);//дёргаем пут запросом подписаться
        if(data.data.resultCode === 0){//если ответ сервера 0, диспечим в стейт
            dispatch(follow(userId));
        }
    dispatch(toggleIsFollowingProgress(false,userId));//дизейбл кнопки выкл
}    */
/*type FollowActionType={
    type: typeof FOLLOW
    userId: number
}
type UnfollowActionType={
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersType={
    type: typeof SET_USERS
    users: Array<UsersType>
}
type SetCurrentPageType={
    type: typeof SET_CURRENT_PAGE
    setCurrentPage: number
}
type SetTotalCountType={
    type: typeof SET_TOTAL_COUNT
    count: number
}
type ToggleIsFetingType={
    type: typeof TOGGLE_IS_FETING
    isFeting: boolean
}
type ToggleIsFollowingProgressType={
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFeting: boolean
    userId:number
}*/
/*const FOLLOW='FOLLOW', 
UNFOLLOW='UNFOLLOW',
SET_USERS='SET_USERS',
SET_CURRENT_PAGE='SET_CURRENT_PAGE',
SET_TOTAL_COUNT='SET_TOTAL_COUNT', 
TOGGLE_IS_FETING='TOGGLE_IS_FETING',
TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS';*/