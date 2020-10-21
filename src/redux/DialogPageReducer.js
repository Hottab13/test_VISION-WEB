const ADD_MESSENG='ADD-MESSENG';

let initionalState = {
    dialogs:[
        {id:1,name:"Алексей Андреевич"},
        {id:2,name:"Яночка"},
        {id:3,name:"Татарин"},
        {id:4,name:"Норм пацан"},
        {id:5,name:"User 5"},
        {id:6,name:"User 6"}
    ],
    messenges :[
        {id:1,messenges:"В пизду эту вёрстку"},
        {id:2,messenges:"Проебал 2 часа на какую то хуиту"},
        {id:3,messenges:"Работает отлично"},
        {id:4,messenges:"Тест сообщения 4"},
        {id:5,messenges:"тест 5"},
        {id:6,messenges:"Почему бы не 6"},
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