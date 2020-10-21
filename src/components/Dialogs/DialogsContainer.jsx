//import React from "react";
import { AddMessengActionCreator, UpdateNewMessenActionCreator } from "../../redux/DialogPageReducer";
import Dialogs from "./Dialogs";
//import StoreContext from "../../ReactConext";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import { withAuthRedirectComponents } from "../hoc/withAuthRedirect";
import { compose } from "redux";

/*const DialogsContainer = ()=>{
    
    return (s
    <StoreContext.Consumer>
        {
            (store)=>{
                let state = store.getState().dialogsPage;
                let addMesseges = () =>{
                    store.dispatch(AddMessengActionCreator()); 
                }
                let onMessenChange = (messen) =>{
                    store.dispatch(UpdateNewMessenActionCreator(messen));
                }
               return (
               <Dialogs 
                    UPDATE_NEW_MESSEN_TEXT={onMessenChange} 
                    ADD_MESSENG={addMesseges} 
                    dialogsPage={state}
                    />
               )
            }
        }
    </StoreContext.Consumer>
    )
}*/

let mapStateToProps = (state) =>{
    return{
        dialogsPage:state.dialogsPage,
       // isAuth:state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) =>{
    return{
         /*UPDATE_NEW_MESSEN_TEXT: (messen) =>{
            dispatch(UpdateNewMessenActionCreator(messen));
        },*/
         ADD_MESSENG: (messenges) =>{
            dispatch(AddMessengActionCreator(messenges));
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirectComponents 
)(Dialogs)
//let AuthRedirectComponents = withAuthRedirectComponents(Dialogs); //HOC редиректа
//const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponents);
//export default DialogsContainer;