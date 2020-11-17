import React from "react"
import Profile from "./Profile"
import { connect, useSelector } from "react-redux"
import { setUserId,getStatus,updateStatus, savePhoto, saveProfile } from "../../redux/PostPageReducer"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { withAuthRedirectComponents } from "../hoc/withAuthRedirect"
import { compose } from "redux"
import { AppStateType } from "../../redux/ReduxStore"
import { PostUserType } from "../types/type"

type MapPropsType=ReturnType<typeof mapStateToProps >
type DispatchPropsType={
    setUserId:(userId:number)=>void
    getStatus:(userId:number)=>void
    updateStatus:(test:string)=>void
    savePhoto:(file:File)=>void
    saveProfile:(profile:PostUserType)=>Promise<any>
}
type PathParamsType={
    userId:string
}
type PropsTypr=MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsTypr> {// подгрузка профиля
    refreshProfile(){
        let userId:number | null = +this.props.match.params.userId
        if(!userId){
            userId =this.props.userId
        } 
        this.props.setUserId(userId as number)
        this.props.getStatus(userId as number)
    }
    componentDidMount(){
        this.refreshProfile()
    }
    componentDidUpdate(prevProps:PropsTypr){
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()
        }
    }
    render(){
        return <Profile {...this.props} 
            savePhoto={this.props.savePhoto}
            isOwner ={!this.props.match.params.userId}
            updateStatus={this.props.updateStatus}
            saveProfile={this.props.saveProfile} 
            />
    }
}

let mapStateToProps =(state:AppStateType) =>({
    //postUser: state.postsPage.postUser,
    userId: state.auth.userId,
    //status: state.postsPage.status,
    //isAuth: state.auth.isAuth,
    //isLoader:state.postsPage.isLoader
})

export default compose<React.ComponentType>(
connect(mapStateToProps,{
    setUserId,getStatus
    ,updateStatus
    ,savePhoto,
    saveProfile
}),
withRouter,
withAuthRedirectComponents,
)(ProfileContainer)

/***************************************************/

//let AuthRedirectComponents = withAuthRedirectComponents(ProfileContainer);//HOC редиректа
//let xyz = withRouter(AuthRedirectComponents);//
//export default connect(mapStateToProps,{setUserId}) (xyz);