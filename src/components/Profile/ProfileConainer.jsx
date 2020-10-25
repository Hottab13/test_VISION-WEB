import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserId,getStatus,updateStatus, savePhoto } from "../../redux/PostPageReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirectComponents } from "../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {// подгрузка профиля

    refreshProfile(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId =this.props.userId;
        } 
        this.props.setUserId(userId);
        this.props.getStatus(userId);
    }
    componentDidMount(){
        this.refreshProfile();
    }

    componentDidUpdate(prevProps,){
        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
        

    }
    
    render(){
        return <Profile {...this.props} 
            savePhoto={this.props.savePhoto}
            isOwner ={!this.props.match.params.userId}
            postUser={this.props.postUser} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus} />
    }
}



let mapStateToProps =(state) =>({
    postUser: state.postsPage.postUser,
    userId: state.auth.userId,
    status: state.postsPage.status,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps,{setUserId,getStatus,updateStatus,savePhoto}),
    withRouter,
    withAuthRedirectComponents,
)(ProfileContainer)
//let AuthRedirectComponents = withAuthRedirectComponents(ProfileContainer);//HOC редиректа
//let xyz = withRouter(AuthRedirectComponents);//
//export default connect(mapStateToProps,{setUserId}) (xyz);