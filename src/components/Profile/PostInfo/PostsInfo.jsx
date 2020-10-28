import React, { useState } from "react";
import classes from './PostInfo.module.css';
import Loader from "../../Loader";
import frontPhoto from "../../../assets/images/frontPhoto.jpg";
import PostStatusWithHooks from "./PostStatusWithHooks";
import ava from "../../../assets/images/ava.png";
import ProfileDataContactForm from './ProfileDataContactForm'

const PostInfo = ({savePhoto,isOwner,saveProfile,...props})=>{

    const [editMode,setEditMode] = useState(false);
    
    if(!props.postUser){//пока нет данных с сервера, крутить лоудер
        return <Loader/>
    }

    const onSubmit = (value)=>{
        saveProfile(value).then(()=>{
            setEditMode(false);
        })
        //setEditMode(false)
   }
    let contact = props.postUser.contacts;
    const onMainPhotoAva =(e)=>{//импорт файла
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
                {props.isLoader? <Loader/>  : null}
                {isOwner? <input type={"file"} onChange={onMainPhotoAva}/> : null }
            </div>
            <div>
                <PostStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
            {editMode? <ProfileDataContactForm initialValues={props.postUser}
            contact={contact} 
            /*aboutMe={props.postUser.aboutMe}
            lookingForAJob={props.postUser.lookingForAJob}
            lookingForAJobDescription={props.postUser.lookingForAJobDescription}
            fullName={props.postUser.fullName}*/
            onSubmit={onSubmit}
            goToEditMode={()=>{setEditMode(false)}} />: 
            <ProfileDataContact 
            contact={contact} 
            isOwner={isOwner}
            aboutMe={props.postUser.aboutMe}
            lookingForAJob={props.postUser.lookingForAJob}
            lookingForAJobDescription={props.postUser.lookingForAJobDescription}
            fullName={props.postUser.fullName}
            goToEditMode={()=>{setEditMode(true)}} /> }
            
        </div>
    </div>
    );
}
const ProfileDataContact =({contact,isOwner,goToEditMode,aboutMe,lookingForAJob,lookingForAJobDescription,fullName})=>{
    return <div>
        <h3>Контакты: </h3> 
        {isOwner ? <div><button onClick={goToEditMode}>Редактировать</button></div> : null}
        <div><h3>{fullName}</h3></div>
        <div><b>Ищу работу: </b>{lookingForAJob? "yes" : "no"} </div>
                <div>{lookingForAJob? <div>
                <b>Мои профессиональные навыки: </b> {lookingForAJobDescription} 
                </div>: null} </div>
        <div><b>Обо мне: </b>{aboutMe? aboutMe : "no"} </div>
    {Object.keys(contact).map(key =>{
        return <Contacts 
        key={key} 
        ContactTitle={key} 
        ContactValue={contact[key]}/>
        } ) }
    </div>
}
const Contacts =({ContactTitle,ContactValue})=>{
    //console.log(ContactValue)
    return <div><b>{ContactTitle}</b> : {ContactValue? ContactValue : "no"}
</div>
}
export default PostInfo;

/*<div><b>
<div><h3>Контакты:</h3></div>
<div>Facebook: </div>
<div>Website: </div>
<div>Vk: </div>
<div>Twitter: </div>
<div>Instagram: </div>
<div>Youtube: </div>
<div>Github: </div>
<div>MainLink: </div></b>
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
</div>*/