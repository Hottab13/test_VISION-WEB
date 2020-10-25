import React from "react";
import classes from './Profile.module.css';
//import MyPosts from './MyPosts/MyPosts';
import PostInfo from './PostInfo/PostsInfo';
import MyPostsConainer from "./MyPosts/MyPostsContainer";

const Profile = (props)=>{

    return(
    <div className={classes.content}>
        <PostInfo 
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        postUser={props.postUser} 
        status={props.status}
        updateStatus={props.updateStatus}/>
        <MyPostsConainer /> 
        
    </div>
    );
}

export default Profile;