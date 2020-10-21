import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserId,getStatus,updateStatus } from "../../redux/PostPageReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirectComponents } from "../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {// подгрузка профиля

    componentDidMount(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId =this.props.userId;
        } 
        this.props.setUserId(userId);
        /*userAPI.getProfile(userId).then(data =>{
            this.props.setUsersPosts(data);
            }
        )*/
        this.props.getStatus(userId);
    }
    
    render(){
        return <Profile {...this.props} 
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
    connect(mapStateToProps,{setUserId,getStatus,updateStatus}),
    withRouter,
    withAuthRedirectComponents,
)(ProfileContainer)
//let AuthRedirectComponents = withAuthRedirectComponents(ProfileContainer);//HOC редиректа
//let xyz = withRouter(AuthRedirectComponents);//
//export default connect(mapStateToProps,{setUserId}) (xyz);