const { default: Axios } = require("axios");

const instance = Axios.create({
    withCredentials:true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY":"3ca4ab82-365c-4127-887b-51dee27a74b0"
    }
})

export const userAPI= {//получить всех юзеров
    getUsers (currentPage, pageSaze) {
        return instance.get(`users?page=${currentPage}&count=${pageSaze}`)
        .then(response =>{
            return response.data;
        })
    },
    getUnfollow (id) {//отписаться
        return  instance.delete(`follow/${id}`);
    },
    getFollow (id) {//подписаться
        return  instance.post(`follow/${id}`);
    },
    getProfile (userId) {//загрузить данные профиля пользователя
        console.warn('Используется устаревший метод. Пожалуйста используйте новый метот profileAPI');
        return profileAPI.getProfile(userId);
    },
    getLogin () {//логиниться, получить мои данные профиля
        return instance.get(`auth/me`);
    },
    getAuthLogin (email,password,rememberMe= false ) {//отправить логин с паролем
        return instance.post(`auth/login`, {email,password,rememberMe });
    },
    logout () {//отправить логин с паролем
        return instance.delete(`auth/login`);
    }
} ;

export const profileAPI= {//получить всех юзеров
    getProfile (userId) {//загрузить данные профиля пользователя
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId){//загрузить статус
        return instance.get(`/profile/status/`+userId);
    },
    updateStatus(status){//обновить статус
        return instance.put(`/profile/status`,{status:status});
    }
};