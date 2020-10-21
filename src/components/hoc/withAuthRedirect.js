import { Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

let mapStateToPropsForRedirect =(state) =>({
    isAuth: state.auth.isAuth
})

export const withAuthRedirectComponents =(Component)=>{ 
    class RedirectComponent extends React.Component {
        render(){
            if(!this.props.isAuth) return <Redirect to='/login'/>//редирект на логин, пр  оут логине
            return <Component {...this.props}/>
        }
}
const ConnectRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); 
return ConnectRedirectComponent;
}