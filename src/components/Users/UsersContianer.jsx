import React from 'react';
import { connect } from 'react-redux';
import {following,unfollowing,getUsersThunkCreator } from '../../redux/UsersReducer';
import Users from './Users';
import Loader from '../Loader';
//import { withAuthRedirectComponents } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUserSuperSelector,getPageSaze,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress} from '../../redux/UsersSelectors';

class UsersAPIComponent  extends React.Component{ 

    componentDidMount(){// дёргаем данные пользователей, сайд эфекты
       this.props.getUsersThunkCreator(this.props.currentPage,this.props.pageSaze);//дёргаем санки с загрузкой пользователей
    }

    onPageChange = (pageNumber) =>{
        this.props.getUsersThunkCreator(pageNumber,this.props.pageSaze);
        //this.props.toggleIsFeting(true);
        //this.props.setCurrentPage(pageNumber);
        //userAPI.getUsers(pageNumber,this.props.pageSaze).then(data =>{
        //this.props.toggleIsFeting(false);
        //this.props.setUsers(data.items);
        //})
    }
  
    render() {// отправляем данные в UI
       return <>
        {this.props.isFetching? <Loader/>  : null}
       <Users 
        totalUsersCount={this.props.totalUsersCount}
        pageSaze={this.props.pageSaze}
        currentPage={this.props.currentPage}
        onPageChange={this.onPageChange}
        users={this.props.users}
        followingInProgress ={this.props.followingInProgress}
        following ={this.props.following}
        unfollowing ={this.props.unfollowing}
       />
       </>
    }
}


let mapStateToProps = (state) =>{//передаёт из стейта нужные данные, зарегестрированы в комбайне как  usersPage, обрабатывается селектором
    return {
        users:getUserSuperSelector(state),
        pageSaze:getPageSaze(state),
        totalUsersCount:getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
/*let mapDispatchToProps = (dispatch) =>{
    return{
        follow : (userId) =>{
            dispatch(followAC(userId));
        },
        unfollow : (userId) =>{
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) =>{
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (setCurrentPage)=>{ 
            dispatch(setCurrentPageAC(setCurrentPage));
        },
        setTotalCount: (count) =>{
            dispatch(setTotalCountAC(count));
        },
        toggleIsFeting: (isFeting) =>{
            dispatch(toggleIsFetingAC(isFeting));}}}*/

export default compose(
    connect(mapStateToProps,{getUsersThunkCreator,following,unfollowing}),
    //withAuthRedirectComponents
)(UsersAPIComponent)            
//let AuthRedirectComponents = withAuthRedirectComponents(UsersAPIComponent);//HOC редиректа
//export default connect(mapStateToProps,{getUsersThunkCreator,following,unfollowing})(AuthRedirectComponents); 
//follow,//подписаться
//unfollow,//отписаться
//setUsers,// загрузить пользователей
//setCurrentPage,// текущая страница
//setTotalCount,// загрузить количество пользователей
// toggleIsFeting,// прелоудер 
//toggleIsFollowingProgress,
    