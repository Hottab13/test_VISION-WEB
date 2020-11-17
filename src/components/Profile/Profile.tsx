import React from "react"
import classes from './Profile.module.css'
import PostInfo from './PostInfo/PostsInfo'
import MyPostsConainer from "./MyPosts/MyPostsContainer"
import { PostUserType } from "../types/type"

type ProfilePropsDataType={
    isOwner:boolean
    saveProfile:(profile:PostUserType)=>Promise<any>
    //isLoader:boolean
    savePhoto:(file:File)=>void
    //postUser:PostUserType | null
    //status:string
    updateStatus:(status:string)=>void
}

const Profile:React.FC<ProfilePropsDataType> = (props)=>{


    return(
    <div className={classes.content}>
        <PostInfo
        saveProfile={props.saveProfile} 
        //isLoader={props.isLoader}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        //postUser={props.postUser} 
        //status={props.status}
        updateStatus={props.updateStatus}
        />
        <MyPostsConainer /> 
    </div>
    )
}

export default Profile