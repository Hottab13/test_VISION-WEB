import React from "react";
import classes from './PostInfo.module.css';
import Loader from "../../Loader";
import frontPhoto from "../../../assets/images/frontPhoto.jpg";
import PostStatusWithHooks from "./PostStatusWithHooks";
import ava from "../../../assets/images/ava.png";

const PostInfo = ({savePhoto,...props})=>{
    
    if(!props.postUser){
        return <Loader/>
    }
    let contact = props.postUser.contacts;
    const onMainPhotoAva =(e)=>{
        if(e.target.files.length){
           savePhoto(e.target.files[0]);
        }
    } 
    return(
        <div>
        <img src={frontPhoto}/>
        <div className={classes.info}>
            <div className={classes.img}>
                <img src={props.postUser.photos.large || ava}/>
                {props.isOwner? <input type={"file"} onChange={onMainPhotoAva}/> : '' }
            </div>
            <div>
                <div><h3>{props.postUser.fullName}</h3></div>
                <PostStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>{props.postUser.aboutMe}</div>
            </div>
            <div>
                <div><h3>Контакты:</h3></div>
                <div>Facebook: </div>
                <div>Website: </div>
                <div>Vk: </div>
                <div>Twitter: </div>
                <div>Instagram: </div>
                <div>Youtube: </div>
                <div>Github: </div>
                <div>MainLink: </div>
            </div>
            <div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div>{contact.facebook ?contact.facebook : "no"}</div>
                <div>{contact.website ? contact.website : "no"}</div>
                <div>{contact.vk ? contact.vk : "no"}</div>
                <div>{contact.twitter ? contact.twitter : "no"}</div>
                <div>{contact.instagram ? contact.instagram : "no"}</div>
                <div>{contact.youtube ? contact.youtube : "no"}</div>
                <div>{contact.github ? contact.github : "no"}</div>
                <div>{contact.mainLink ? contact.mainLink : "no"}</div>
            </div>
            
        </div>
    </div>
    );
}

export default PostInfo;