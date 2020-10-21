import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Frends from "./components/Frends/Frends";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContianer from "./components/Users/UsersContianer";
import ProfileContainer from "./components/Profile/ProfileConainer";
import HeaderConteiner from "./components/Haeder/HeaderConteiner";
import Login from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initiolizeApp } from "./redux/AppReducer";
import Loader from "./components/Loader";
import store from "./redux/ReduxStore";

class App extends Component {
  componentDidMount(){// логинимся
    this.props.initiolizeApp();
 }
  render(){
    if(!this.props.initionalized){
      return <Loader/>
    }
    return (
    <div className='app-vraper'>
      <HeaderConteiner/>
      <Navbar/>
      <div className='app-vrapper-content'>
        <Route path='/dialogs' 
          render={()=><DialogsContainer/>}/>
        <Route path='/profile/:userId?' 
          render={()=><ProfileContainer/>}/>
        <Route path='/frends' component={Frends}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/users' 
          render={ ()=> <UsersContianer/> } />
        <Route path='/login' 
          render={ ()=> <Login/> } />
      </div>
    </div>
  )}
}
const mapStateToProps=(state)=>({
  initionalized:state.app.initionalized
})

const AppConteiner= compose(
withRouter,
connect(mapStateToProps,{initiolizeApp}))
(App); 

const MainApp=(props)=>{  
  return <BrowserRouter>
      <Provider store={store}>
        <AppConteiner />
      </Provider>
      </BrowserRouter>
}
export default MainApp;