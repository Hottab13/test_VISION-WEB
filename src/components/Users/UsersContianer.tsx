import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import {getIsFetching} from '../../redux/UsersSelectors'
import { Users } from './Users'

export const UserPage:React.FC=(props)=>{
const isFetching = useSelector(getIsFetching)
return <>
    {isFetching? <Loader/>  : null}
    <Users/>
   </>
}

/*******************************************/
/*type MapDispatchPropsType={
    getUsersThunkCreator:(currentPage:number,pageSaze:number,filter:FilterType)=>void
    following:(userId:number)=>void
    unfollowing:(userId:number)=>void
}
type MapOwnPropsType={
}
type MapStatePropsType={
    currentPage:number
    pageSaze:number
    isFetching:boolean
    //users:Array<UsersType>
    //totalUsersCount:number
    followingInProgress:Array<number>
    filter:FilterType
}
type PropsType = MapDispatchPropsType & MapStatePropsType & MapOwnPropsType
*/
/*
class UsersAPIComponent  extends React.Component<PropsType>{ 
    componentDidMount(){
       this.props.getUsersThunkCreator(this.props.currentPage,this.props.pageSaze,this.props.filter)//thunk loader users
    }
    onPageChange = (pageNumber:number) =>{
        this.props.getUsersThunkCreator(pageNumber,this.props.pageSaze, this.props.filter)
    }
    onFilterCheang =(filter:FilterType)=>{
         this.props.getUsersThunkCreator(1,this.props.pageSaze, filter)
    }
    render() {
       return <>
        {this.props.isFetching? <Loader/>  : null}
       <Users 
        //onFilterCheang={this.onFilterCheang}
        onPageChange={this.onPageChange}
        followingInProgress ={this.props.followingInProgress}
        following ={this.props.following}
        unfollowing ={this.props.unfollowing}
       />
       </>
    }
}
let mapStateToProps = (state:AppStateType):MapStatePropsType =>{
    return {
        //users:getUserSuperSelector(state),
        pageSaze:getPageSaze(state),
        //totalUsersCount:getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter:getUserFilter(state)
    }
}
export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,MapOwnPropsType,AppStateType>(mapStateToProps,{
        getUsersThunkCreator,following,unfollowing}),
    //withAuthRedirectComponents
)(UsersAPIComponent)       
/************************************* */
//this.props.toggleIsFeting(true);
        //this.props.setCurrentPage(pageNumber);
        //userAPI.getUsers(pageNumber,this.props.pageSaze).then(data =>{
        //this.props.toggleIsFeting(false);
        //this.props.setUsers(data.items);
        //})     
    //pageSaze={this.props.pageSaze}
        //currentPage={this.props.currentPage}
        //users={this.props.users}