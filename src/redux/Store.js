import postPageReducer from './PostPageReducer';
import dialogPageReducer from './DialogPageReducer';
import sidebarReducer from './SiderbarReducer';

let store={
    _state:{
        postsPage:{
            posts:[
                {id:1,messen:"Тестируем первый пост",like:"15"},
                {id:2,messen:"Как дела юзер?",like:"0"},
                {id:3,messen:"js сложный язык",like:"432"},
                {id:4,messen:"тут может быьб юольшой текст",like:"232"},
                {id:5,messen:"отличия UL от BLL",like:"23423"},
                {id:6,messen:"UL - Rect, BLL - Redux",like:"19"}
              ],
            nowPostText: 'Введите текст'
        },
        dialogsPage:{
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
              ],
            nowMessenText: " "
        },
        sidebar:{}
        
    },
    _rerenderEntire () {
        console.log('Тестим');
    },
    getState() {
        //debugger;
        return this._state;
    },
    subskribe (observer) {
        this._rerenderEntire = observer;
    },
     /*updateNewPostText (newText) {
        this._state.postsPage.nowPostText = newText;
        this._rerenderEntire(this._state);
    },

    addMessenges () {
        let newMesseng={
            id:7,
            messenges:this._state.dialogsPage.nowMessenText
        };
        this._state.dialogsPage.messenges.push(newMesseng);
        this._state.dialogsPage.nowMessenText='';
        this._rerenderEntire(this._state);
    },
   
    updateNewMessengText (newMessen) {
        this._state.dialogsPage.nowMessenText = newMessen;
        this._rerenderEntire(this._state);
    },*/
   
    dispatсh(action){
        
        this._state.postsPage = postPageReducer(this._state.postsPage,action);
        this._state.dialogsPage = dialogPageReducer(this._state.dialogsPage,action);
        this._state.sidebar = sidebarReducer(this._state.sidebar,action);
        this._rerenderEntire(this._state);
    }
}

window.store=store;
export default store;