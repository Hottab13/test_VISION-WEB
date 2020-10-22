const ADD_MESSENG='ADD-MESSENG';

let initionalState = {
    dialogs:[
        {id:1,name:"Алексей Андреевич"},
        {id:2,name:"User 2"},
        {id:3,name:"User 3"},
        {id:4,name:"User 4"},
        {id:5,name:"User 5"},
        {id:6,name:"User 6"}
    ],
    messenges :[
        {id:1,messenges:"Messenges 1"},
        {id:2,messenges:"Messenges 2"},
        {id:3,messenges:"Messenges 3"},
        {id:4,messenges:"Messenges 4"},
        {id:5,messenges:"Messenges 5"},
        {id:6,messenges:"Messenges 6"},
      ]
};
const dialogPageReducer=(state=initionalState,action)=> {
    switch (action.type){
        case ADD_MESSENG:{
            let body = action.messenge;
            return {
                ...state,
                messenges:[...state.messenges, {id:7, messenges:body} ]
            };
        }
        default:
            return state;
    }
};

export const AddMessengActionCreator=(messenge)=> ({type:ADD_MESSENG,messenge});
/*export const UpdateNewMessenActionCreator=(messen)=>{
    return {
        type:UPDATE_NEW_MESSEN_TEXT, newMessen:messen
    }
};*/

export default dialogPageReducer;