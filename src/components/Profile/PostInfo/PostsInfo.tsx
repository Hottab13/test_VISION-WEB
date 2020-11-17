import React, { useState } from "react";
import Loader from "../../Loader";
import banner_1 from "../../../assets/images/banner-1.jpg";
import banner_2 from "../../../assets/images/banner-2.jpg";
import banner_3 from "../../../assets/images/banner-3.jpg";
import banner_4 from "../../../assets/images/banner-4.jpg";
import PostStatusWithHooks from "./PostStatusWithHooks";
import ava from "../../../assets/images/ava.png";
import ProfileDataContactForm from './ProfileDataContactForm'
import { PostUserType , ContactsType } from "../../types/type";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/ReduxStore";
import { Carousel, Col, Row } from 'antd';
import { Upload, message, Button } from 'antd';
import {  } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import {FacebookOutlined, InstagramOutlined, GithubOutlined,
    TwitterOutlined,YoutubeOutlined,LinkedinOutlined,
    GlobalOutlined,AuditOutlined,
    UploadOutlined,EditOutlined } from '@ant-design/icons';

type PropsType={
    savePhoto:(file:File)=>void
    isOwner:boolean
    updateStatus:(status:string)=>void
    saveProfile:(profile:PostUserType)=>Promise<any>
}
const PostInfo:React.FC<PropsType> = ({isOwner,saveProfile,savePhoto,updateStatus})=>{

    const postUser=useSelector((state:AppStateType)=>state.postsPage.postUser)
    const status=useSelector((state:AppStateType)=>state.postsPage.status)
    const isLoader=useSelector((state:AppStateType)=>state.postsPage.isLoader)
    const [editMode,setEditMode] = useState(false)
    if(!postUser){
        return <Loader/>
    }
//todo
    const onSubmit = (value:PostUserType)=>{
        saveProfile(value).then(()=>{
            setEditMode(false)
        })
        //setEditMode(false)
   }
    let contact = postUser.contacts
    /*const onMainPhotoAva =(e:ChangeEvent<HTMLInputElement>)=>{//импорт файла
        console.log(e);
        if(e.target.files?.length){
           savePhoto(e.target.files[0])
        }
    }*/
    const props = {
        onChange(info:any) {
            console.log(info)
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            
          }
          if (info.file.status === 'done') {
            savePhoto(info.fileList[0].originFileObj)
            message.success(`${info.file.name} файл успешно загружен!`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} ошибка загрузки файла`);
          }
        },
      }
return(
<div>
    <div>
      <Carousel autoplay>
      <div>
       <img src={banner_1}/>
      </div>
      <div>
      <img src={banner_2}/>
      </div>
      <div>
      <img src={banner_3}/>
        
      </div>
      <div>
      <img src={banner_4}/>
        
      </div>
      </Carousel>
    </div>
    
    <div >
    {isLoader? <Loader/>  : null}
    <Row>
        <Col span={8}>
        <div>
        <div><h2>{postUser.fullName}</h2></div>
         <PostStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>

        <div style={{marginTop:"30px"}} >
            <Avatar size={200} src={postUser.photos.large || ava} />
        </div>

            
        <div style={{marginTop:"30px"}}>
            {/*<Button size="small" icon={<UploadOutlined />}>Загрузить фото</Button>*/}
            {(editMode===true && isOwner===true)? null : isOwner ? <div><Button size="small" icon={<EditOutlined />} onClick={()=>setEditMode(true)}>Редактировать </Button></div> : null}
            {/*isOwner ? <div><button onClick={()=>setEditMode(true)}>Редактировать</button></div> : null*/}
        </div>
        
        <div>
         {isOwner? <Upload {...props}>
         <Button size="small" icon={<UploadOutlined />}>Загрузить фото</Button>
         </Upload>  : null }
        </div>
        </Col>
        <Col span={16}>
        <div>
            {editMode? <ProfileDataContactForm initialValues={postUser}
            contact={contact} 
            onSubmit={onSubmit}/>:
            //goToEditMode={()=>{ setEditMode(false);} } />: 
        <ProfileDataContact 
            contact={contact} 
            isOwner={isOwner}
            aboutMe={postUser.aboutMe}
            lookingForAJob={postUser.lookingForAJob}
            lookingForAJobDescription={postUser.lookingForAJobDescription}
            fullName={postUser.fullName}
            goToEditMode={()=>{setEditMode(true)}} /> }
        </div>
        </Col>
    </Row>
    </div>
</div>
)}
type ProfileDataPropsType={
    aboutMe:string
    isOwner:boolean
    goToEditMode:()=>void
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    contact:ContactsType
}
const ProfileDataContact:React.FC<ProfileDataPropsType> =({contact,isOwner,goToEditMode,aboutMe,lookingForAJob,lookingForAJobDescription,fullName})=>{
    return <div>
        <h3>Контакты:</h3> 
        {/*isOwner ? <div><button onClick={goToEditMode}>Редактировать</button></div> : null
        <div><h3>{fullName}</h3></div>*/}
        <div><b>Ищу работу: </b>{lookingForAJob? "yes" : "no"} </div>
            <div>{lookingForAJob? <div>
            <b>Мои профессиональные навыки: </b> {lookingForAJobDescription} 
            </div>: null} </div>
        <div><b>Обо мне: </b>{aboutMe? aboutMe : "no"} </div>
    {Object.keys(contact).map((key) =>{
        return <Contacts 
        key={key} 
        ContactTitle={key} 
        ContactValue={contact[key as keyof ContactsType]}
        />
        
        } ) }
    </div>
}

type ContactsPostInfoPropsType={
    ContactTitle:string
    ContactValue:string
}
const Contacts:React.FC<ContactsPostInfoPropsType> =({ContactTitle,ContactValue})=>{
    return <div>{" "} {(ContactTitle==="facebook")?<FacebookOutlined/>:
    (ContactTitle==="github")?<GithubOutlined/>:
    (ContactTitle==="instagram")?<InstagramOutlined/>:
    (ContactTitle==="twitter")?<TwitterOutlined/>:
    (ContactTitle==="youtube")?<YoutubeOutlined/>:
    (ContactTitle==="mainLink")?<LinkedinOutlined/>:
    (ContactTitle==="website")?<GlobalOutlined />:
    (ContactTitle==="vk")?<AuditOutlined />:ContactTitle}
     {ContactValue? ContactValue : "no"}
</div>
}
export default PostInfo

/*******************************************/
/*aboutMe={props.postUser.aboutMe}
            lookingForAJob={props.postUser.lookingForAJob}
            lookingForAJobDescription={props.postUser.lookingForAJobDescription}
            fullName={props.postUser.fullName}*/

/*<div><b> <input type={"file"} onChange={onMainPhotoAva}/>
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