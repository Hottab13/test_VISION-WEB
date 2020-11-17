import { AppStateType } from './ReduxStore';
import { createSelector } from 'reselect';

export const getUsers =(state:AppStateType)=>{
    return state.usersPage.users;//передаёт пользователей
}

export const getUserSuperSelector = createSelector(getUsers,
    (users)=>{
    return users.filter((u)=> true)
})

export const getUserFilter =(state:AppStateType)=>{
    return state.usersPage.filter
}

export const getPageSaze =(state:AppStateType)=>{
    return state.usersPage.pageSaze;//количество отрисовки юзеров на странице
}

export const getTotalUsersCount =(state:AppStateType)=>{
    return state.usersPage.totalUsersCount;// общее количество юзеров
}

export const getCurrentPage =(state:AppStateType)=>{
    return state.usersPage.currentPage;//активная старница
}

export const getIsFetching =(state:AppStateType)=>{
    return state.usersPage.isFetching;
}

export const getFollowingInProgress =(state:AppStateType)=>{
    return state.usersPage.followingInProgress;
}