import { action } from "../../redux/DialogPageReducer"
import {Dialogs} from "./Dialogs"
import { connect } from "react-redux"
import { withAuthRedirectComponents } from "../hoc/withAuthRedirect"
import { compose } from "redux"
import { AppStateType } from "../../redux/ReduxStore"

let mapStateToProps = (state:AppStateType) =>{
    return{
        dialogsPage:state.dialogsPage
       // isAuth:state.auth.isAuth
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps,{
        AddMessengActionCreator:action.AddMessengActionCreator
    }),
    withAuthRedirectComponents 
)(Dialogs) 

/*********************************************************************** */
/*let mapDispatchToProps = (dispatch) =>{
    return{
        AddMessengActionCreator: (messenges) =>{
            dispatch(action.AddMessengActionCreator(messenges))
        }
    }
}
 /*UPDATE_NEW_MESSEN_TEXT: (messen) =>{
            dispatch(UpdateNewMessenActionCreator(messen));
        },*/
//let AuthRedirectComponents = withAuthRedirectComponents(Dialogs); //HOC редиректа
//const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponents);
//export default DialogsContainer;
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
