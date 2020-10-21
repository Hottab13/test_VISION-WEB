import { stopSubmit } from "redux-form";
import { userAPI } from "../api/api";
import { setAuthUser } from "./AuthReducer";

const INITIONALIZED_SUCCESS='INITIONALIZED_SUCCESS';

let initionalState = {
    initionalized:false
}

const appReducer=(state=initionalState,action)=> {
    switch (action.type){
        case INITIONALIZED_SUCCESS:
            return {
                ...state,
                initionalized:true
            }   
            default:
            return state;
    }
}

export const initionalizedSuccess=()=> ({type:INITIONALIZED_SUCCESS});

export const initiolizeApp = () =>{
    return (dispatch) =>{
       let promise = dispatch(setAuthUser()); 
       //debugger
        //dispatch
        //dispatch
        Promise.all([promise])
        .then(()=>{
            dispatch(initionalizedSuccess());
        })
    }   
}

export default appReducer;