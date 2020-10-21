import { userAPI } from "../api/api";

const FOLLOW='FOLLOW', 
UNFOLLOW='UNFOLLOW',
SET_USERS='SET_USERS',
SET_CURRENT_PAGE='SET_CURRENT_PAGE',
SET_TOTAL_COUNT='SET_TOTAL_COUNT', 
TOGGLE_IS_FETING='TOGGLE_IS_FETING',
TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS';

let initionalState = {  
    users:[ ],
    pageSaze:12,// отображение пользователей на странице
    totalUsersCount:0,// количество юзеров
    currentPage: 1 ,// стартовая страница пользователей
    isFetching:false,//прелоудер
    followingInProgress:[]//дизейблы
};

const usersReducer=(state=initionalState,action)=> {
    switch (action.type){
        case FOLLOW:{
            return{
                ...state,// делаем поверхностную копию стейта
                users: state.users.map((u) =>{// проходим весь массив
                    if(u.id === action.userId){// выбираем совпадение id с экшеном
                        return {...u, followed : true};//делаем копию обьекта массива, меняем флаг на true
                    }
                    return u;// если совпадений нету, возвращаем обьект массива
                })
            } 
        }
        case UNFOLLOW:{
            return{
                ...state,
                users: state.users.map((u) =>{
                    if(u.id === action.userId){
                        return {...u, followed : false};
                    }
                    return u;
                })
            } 
        }
        case SET_USERS:{
            //return { ...state, users:[ ...state.users, ...action.users]} перезатераем старых юзеров, юзерами с сервера , путём добавления новых
            return { ...state, users:action.users};// перезатераем старых юзеров, юзерами с сервера    
        }
        case SET_CURRENT_PAGE:{
            return { ...state, currentPage: action.setCurrentPage
                };
            }
        case SET_TOTAL_COUNT:{
            return { ...state, totalUsersCount:action.count};// количество всех пользователей
            }
        case TOGGLE_IS_FETING:{
            return { ...state, isFetching:action.isFeting};// прелоудер
            }   
            case TOGGLE_IS_FOLLOWING_PROGRESS:{
                return { 
                    ...state, 
                    followingInProgress: action.isFeting ?
                    [...state.followingInProgress, action.userId]
                    :state.followingInProgress.filter(id => id !== action.userId)// прелоудер
                } 
            }
            default:
                return state;
    }
}

export const follow=(userId)=> ({type:FOLLOW, userId});//Экшин добавления подписк
export const unfollow=(userId)=>({type:UNFOLLOW, userId});//Экшен отписки
export const setUsers=(users)=>({type:SET_USERS, users});// Экшен прогрузки юзеров с сервака
export const setCurrentPage=(setCurrentPage)=>({type:SET_CURRENT_PAGE, setCurrentPage});// Экшен прогрузки 
export const setTotalCount =(count) =>({type:SET_TOTAL_COUNT, count});
export const toggleIsFeting =(isFeting) =>({type:TOGGLE_IS_FETING, isFeting});
export const toggleIsFollowingProgress =(isFeting,userId) =>({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFeting,userId});

export const getUsersThunkCreator = (currentPage,pageSaze) => async (dispatch) =>{
    dispatch(toggleIsFeting(true));//лоудер вкл
    dispatch(setCurrentPage(currentPage));//выделение жирным цветом
    let data = await userAPI.getUsers(currentPage,pageSaze)//дергаем API с параметрами из стейта
    dispatch(toggleIsFeting(false));//лоудер выкл
    dispatch(setUsers(data.items));//диспачим в стейт юзеров с API
    dispatch(setTotalCount(data.totalCount));//диспачим количество юзеров
}

const followUnfollowFlow =async(dispatch,userId,apiMethod, actionCreator )=>{
    dispatch(toggleIsFollowingProgress(true,userId));//дизейбл кнопки вкл
    let data = await apiMethod(userId);//дёргаем пут запросом подписаться
    if(data.data.resultCode === 0){//если ответ сервера 0, диспечим в стейт
            dispatch(actionCreator(userId));
        }
    dispatch(toggleIsFollowingProgress(false,userId));//дизейбл кнопки выкл
}

export const following = (userId) =>async(dispatch) =>{
   // let apiMethod = userAPI.getFollow.bind(userAPI);
   // let actionCreator = follow;
    followUnfollowFlow(dispatch,userId,userAPI.getFollow.bind(userAPI), follow);
    
}  

export const unfollowing = (userId) => async(dispatch) =>{
   // let apiMethod = userAPI.getUnfollow.bind(userAPI);
   // let actionCreator = unfollow;
    followUnfollowFlow(dispatch,userId,userAPI.getUnfollow.bind(userAPI), unfollow);
}   

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

export default usersReducer;
