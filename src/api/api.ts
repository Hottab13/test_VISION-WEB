import { UsersType, PostUserType, Photos } from './../components/types/type';
//const { default: Axios } = require("axios");
import  Axios from"axios"
const instance = Axios.create({
    withCredentials:true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY":"3ca4ab82-365c-4127-887b-51dee27a74b0"
    }
})
export enum ResultCodeEnum {
    Success = 0,
    Error=1,
    Captcha=10
}
type GetUsersResType={
    items:Array<UsersType>
    totalCount:number
    error:string | null
}
type ResponseData<D={}>={
    data:D
    resultCode:ResultCodeEnum
    messages:Array<string>
}
type GetLoginResType={
    id:number
    email:string
    login:string 
}
type GetAuthLoginResType={
    userId:number
}
export const userAPI= {//получить всех юзеров
    getUsers (currentPage:number, pageSaze:number,term:string="",friend:null |boolean = null) {
        return instance.get<GetUsersResType>(`users?page=${currentPage}&count=${pageSaze}&term=${term}` +(friend===null? " ": `&friend=${friend}`))
        .then((res) =>res.data)
    },
    getUnfollow (id:number) {//отписаться
        return  instance.delete<ResponseData>(`follow/${id}`);
    },
    getFollow (id:number) {//подписаться
        return  instance.post<ResponseData>(`follow/${id}`)
    },
    getProfile (userId:number | null) {//загрузить данные профиля пользователя
        console.warn('Используется устаревший метод. Пожалуйста используйте новый метот profileAPI');
        return profileAPI.getProfile(userId)
    },
    getLogin () {//логиниться, получить мои данные профиля
        return instance.get<ResponseData<GetLoginResType>>(`auth/me`).then((res)=>res.data)
    },
    getAuthLogin (email:string,password:string,rememberMe= false,captcha:null|string=null ) {//отправить логин с паролем
        return instance.post<ResponseData<GetAuthLoginResType>>(`auth/login`, {email,password,rememberMe,captcha }).then((res)=>res.data)
    },
    logout () {
        return instance.delete<ResponseData>(`auth/login`).then((res)=>res.data)
    }
} 
type SavePhotosType={
    photos:Photos
}
export const profileAPI= {//получить всех юзеров
    getProfile (userId:number | null) {//загрузить данные профиля пользователя
        return instance.get<PostUserType>(`profile/${userId}`).then((res)=>res.data)
    },
    getStatus(userId:number){//загрузить статус
        return instance.get<string>(`profile/status/`+userId).then((res)=>res.data)
    },
    updateStatus(status:string){//обновить статус
        return instance.put<ResponseData>(`profile/status`,{status:status}).then((res)=>res.data)
    },
    saveProfile(fileProfile:PostUserType){//обновить статус
        return instance.put<ResponseData>(`profile`,fileProfile).then((res)=>res.data)
    },
    savePhoto(photos:File){
        const formData = new FormData();
        formData.append("imige",photos)
        return instance.put<ResponseData<SavePhotosType>>(`profile/photo`,formData,{
            headers:{
                //'authorization': 'authorization-text'
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>res.data)
    }
}
type GetCaptcha={
    url:string
}
export const securityAPI= {
    getCaptcha () {
        return instance.get<GetCaptcha>(`/security/get-captcha-url`).then((res)=>res.data)
    }
}