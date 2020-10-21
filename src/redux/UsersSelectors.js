import { createSelector } from 'reselect';

export const getUsers =(state)=>{
    return state.usersPage.users;//передаёт пользователей
}

export const getUserSuperSelector = createSelector(getUsers,(users)=>{
    return users.filter((u)=> true)
})

export const getPageSaze =(state)=>{
    return state.usersPage.pageSaze;//количество отрисовки юзеров на странице
}

export const getTotalUsersCount =(state)=>{
    return state.usersPage.totalUsersCount;// общее количество юзеров
}

export const getCurrentPage =(state)=>{
    return state.usersPage.currentPage;//активная старница
}

export const getIsFetching =(state)=>{
    return state.usersPage.isFetching;
}

export const getFollowingInProgress =(state)=>{
    return state.usersPage.followingInProgress;
}