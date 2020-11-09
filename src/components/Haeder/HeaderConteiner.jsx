import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logOut} from "../../redux/AuthReducer.ts";

class HeaderConteiner extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

const mapToPropsState = (state) =>({
    login:state.auth.login,
    isAuth:state.auth.isAuth
})

export default connect(mapToPropsState,{logOut}) (HeaderConteiner);