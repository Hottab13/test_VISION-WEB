import React from "react";
import { Field, reduxForm } from "redux-form";
import { Texteria } from "../../common/FormControl/FormControl";
import { requiredField, maxLengthCreator } from "../../utils/validators";
import classes from './MyPosts.module.css';
import Posts from './Posts/Posts';

const MyPosts =React.memo( (props)=>{
    let postsElement = props.posts.map((p) => <Posts 
        messen={p.messen} 
        like={p.like}
        key={p.id}/>);//отрисовка нового поста
        
const addNewPosts=(values)=>{
            //alert(values.newPosts);
    props.ADD_POST(values.newPosts);
}
    return(
        <div className={classes.item}>
            <h3>Мой пост</h3>
            <PostsReduxForm onSubmit={addNewPosts} />
            {postsElement}
        </div>
    );
})

const maxLenght = maxLengthCreator(15);      
const MyPostForm =(props)=>{
    return(
    <form onSubmit={props.handleSubmit}>
        <Field component={Texteria}  
        name={'newPosts'} 
        placeholder={'Введите ваш текст'}
        validate={[requiredField, maxLenght ]}/> 
        <div className={classes.button}>
            <button> Добавить пост</button>
        </div>
    </form>
 )
}

const PostsReduxForm = reduxForm({ 
    form:'addPostForm'
})(MyPostForm);

export default MyPosts;