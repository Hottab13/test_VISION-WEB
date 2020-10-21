import postPageReducer from './PostPageReducer';
import dialogPageReducer from './DialogPageReducer';
import sidebarReducer from './SiderbarReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import usersReducer from './UsersReducer';
import authReducer from './AuthReducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './AppReducer';

let reducers = combineReducers({
    postsPage: postPageReducer, 
    dialogsPage: dialogPageReducer,
    sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//хром расширение
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

//let store = createStore(reducers,applyMiddleware(thunk));


window._store_= store; 

export default store;
