import MyPosts, { MapPropsType,DispatchPropsType } from "./MyPosts"
import { connect } from "react-redux"
//import { compose } from "redux"
import { action } from "../../../redux/PostPageReducer"
import { AppStateType } from "../../../redux/ReduxStore"

let mapStateToProps = (state:AppStateType) =>{
  return{
    posts:state.postsPage.posts,
    postUser:state.postsPage.postUser
    //nowPostText:state.postsPage.nowPostText
  }
}
export default connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, {
    AddPostActionCreator:action.AddPostActionCreator
  }) (MyPosts)

/********************************************************/
 //compose<React.ComponentType>(
/*const MyPostsConainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

let mapDispatchToProps = (dispatch) =>{
  return{
    AddPostActionCreator: (addPost) =>{
        dispatch(action.AddPostActionCreator(addPost));
      }
  }
}

/*UPDATE_NEW_POST_TEXT: (text) =>{
      dispatch(UpdateNewPostActionCreator(text));
      },
export default MyPostsConainer;
/*const MyPostsConainer = ()=>{
    return (
      <StoreContext.Consumer>
        {
        (store)=>{
          let state = store.getState();
          let addText =()=>{ 
            store.dispatch(AddPostActionCreator());
          }
          let postChange =(text)=>{
            let action = UpdateNewPostActionCreator(text);
            store.dispatch(action);
          }
          return (
            <MyPosts 
            UPDATE_NEW_POST_TEXT={postChange} 
            ADD_POST={addText} 
            posts={state.postsPage.posts}
            nowPostText={state.postsPage.nowPostText}/>
          );
        }
      }
      </StoreContext.Consumer>
    );
}*/