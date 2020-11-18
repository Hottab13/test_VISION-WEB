import React from "react"
import { InjectedFormProps, reduxForm, Field } from "redux-form"
//import { InitionalStateType } from "../../../redux/PostPageReducer"
import { createField, GetStringType, Texteria } from "../../common/FormControl/FormControl"
import { MessenType, PostUserType } from "../../types/type"
import { requiredField, maxLengthCreator } from "../../utils/validators"
import classes from './MyPosts.module.css'
import { Demo } from "./Posts/MyPostComment"
import Posts from './Posts/Posts'
import { AppStateType } from "../../../redux/ReduxStore"
import { useSelector } from "react-redux"
import { App } from "./Posts/MyPostComment_2"
import { Input,Form, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 0, span: 14 },
  };



export type MapPropsType={
    posts:Array<MessenType>
    //postUser: PostUserType 
}
export type DispatchPropsType={
    AddPostActionCreator:(messenges:string)=>void
}
type PropsType={}

const maxLenght = maxLengthCreator(1000)

const NewInput = ({
    ...rest
}) => {
return (
<FormItem>
<TextArea showCount maxLength={1000} rows={4} {...rest.input} />
</FormItem>);
};

const MyPostForm:React.FC<InjectedFormProps<MyPostsFormValueType,PropsType>& PropsType> =(props)=>{
    return(
<div style={{marginTop:"60px"}}  >
    <form onSubmit={props.handleSubmit}>
    <Form.Item {...tailLayout}>{createField<MyPostsFormValueTypeKey >("Введите ваш текст","newPosts",[requiredField, maxLenght],NewInput)}</Form.Item>
        <Form.Item {...tailLayout}><Button type="primary" htmlType="submit">Добавить пост</Button></Form.Item>
    </form>
</div>
)}

type MyPostsFormValueType={
    newPosts:string
}

type MyPostsFormValueTypeKey= GetStringType<MyPostsFormValueType>

const PostsReduxForm = reduxForm<MyPostsFormValueType,PropsType>({form:'addPostForm'})(MyPostForm)

const MyPosts:React.FC<DispatchPropsType & MapPropsType> =React.memo( (props)=>{
   // let state = props.posts
    let postsElement = props.posts.map((p) => <Posts messen={p.messen} like={p.like} key={p.id}/>)//отрисовка нового поста
    let postsComment = props.posts.map((p) => <Demo messen={p.messen} like={p.like} key={p.id}/>)
    
    
const addNewPosts=(values:MyPostsFormValueType)=>{
    props.AddPostActionCreator(values.newPosts);
}
    return(
        <div >
            <h3></h3>
            <PostsReduxForm onSubmit={addNewPosts} />
          {/*<App/>*/}
            {postsComment}
           
        </div>
    )
})

export default MyPosts