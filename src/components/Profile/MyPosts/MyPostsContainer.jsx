import MyPosts from "./MyPosts"
import { connect } from "react-redux"
import { compose } from "redux"
import { action } from "../../../redux/PostPageReducer"

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

let mapStateToProps = (state) =>{
  return{
    posts:state.postsPage.posts,
    nowPostText:state.postsPage.nowPostText
  }
}
let mapDispatchToProps = (dispatch) =>{
  return{
    /*UPDATE_NEW_POST_TEXT: (text) =>{
      dispatch(UpdateNewPostActionCreator(text));
      },*/
      ADD_POST: (addPost) =>{
        //debugger
        dispatch(action.AddPostActionCreator(addPost));
      }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps))
  (MyPosts)
/*const MyPostsConainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsConainer;*/