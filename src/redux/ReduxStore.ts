import postPageReducer from './PostPageReducer'
import dialogPageReducer from './DialogPageReducer'
import sidebarReducer from './SiderbarReducer'
import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import usersReducer from './UsersReducer'
import authReducer from './AuthReducer'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './AppReducer'
import { ThunkAction } from 'redux-thunk'

let reducers = combineReducers({
    postsPage: postPageReducer, 
    dialogsPage: dialogPageReducer,
    sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducersType = typeof reducers
export type AppStateType = ReturnType<RootReducersType>

type PropertiesType<T> = T extends {[key:string]:infer U}? U:never
export type InferActionType<T extends {[key:string]:(...args:any[])=>any}>= ReturnType<PropertiesType<T>>

export type BaseThunkActionType<AT extends Action ,R= Promise<void> > = ThunkAction<R,AppStateType,unknown,AT>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose//хром расширение
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

//let store = createStore(reducers,applyMiddleware(thunk));

//@ts-ignore
window._store_= store

export default store
