import React, { useEffect } from 'react';
import classes from './users.module.css';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/FormControl/Paginater/Paginator';
import { Formik,Form,Field,  } from 'formik';
import { FilterType,following,getUsersThunkCreator,unfollowing } from '../../redux/UsersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFilter, getCurrentPage, getTotalUsersCount, getUserSuperSelector,getPageSaze,getFollowingInProgress } from '../../redux/UsersSelectors';
import { Avatar, Button, Col, Image, Row } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

export const Users: React.FC =(props)=>{
   
const totalUsersCount = useSelector(getTotalUsersCount)
const currentPage =useSelector(getCurrentPage)
const users = useSelector(getUserSuperSelector)
const pageSaze = useSelector(getPageSaze)
const followingInProgress = useSelector(getFollowingInProgress)
const filter =useSelector(getUserFilter)

const dispatch =useDispatch()

useEffect(()=>{
    dispatch(getUsersThunkCreator(currentPage,pageSaze,filter))
},[])

const followingFC=(userId:number)=>{
    dispatch(following(userId))
}
const unfollowinFC=(userId:number)=>{
    dispatch(unfollowing(userId))
}
const onPageChange = (pageNumber:number) =>{
    dispatch(getUsersThunkCreator(pageNumber,pageSaze,filter))
}
const onFilterCheang=(filter:FilterType)=>{
    dispatch(getUsersThunkCreator(1,pageSaze, filter))
}
//className={classes.users}
    return (
<div >
    <UserSearchForm onFilterCheang={onFilterCheang}/>
    <div style={{marginTop:"50px"}}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {users.map(u=> 
                <Col span={6}>
                    <div key={u.id} >
                        <Row>
                            <Col span={8}> 
                                <div  >
                                    <NavLink to={`profile/` +u.id}>
                                    <Avatar style={{backgroundColor: "#87d068" }} 
                                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} 
                                            src={u.photos.small !=null ? u.photos.small:
                                    <AntDesignOutlined /> }/> 
                                    </NavLink>
                                </div>
                                <div   style={{marginTop:"20px"} }>
                                    {u.followed ?
                                    <Button  disabled={followingInProgress.some(id =>id===u.id) }
                                            onClick={()=> {unfollowinFC(u.id)}}>Отписаться
                                    </Button >
                                    :<Button type="primary" disabled={followingInProgress.some(id =>id===u.id)}
                                            onClick={()=> {followingFC(u.id)}}>Подписаться
                                    </Button>}
                                </div>
                            </Col>
                            <Col span={16}> 
                                <div >
                                    <h3>{u.name}</h3>
                                    <h6> {u.status? "Статус: "+u.status: 'Статус: '}</h6>
                                </div>

                            </Col>
                        </Row>
                    </div>
                </Col>
            )} 
        </Row>
    </div>
    <Row justify="space-around" align="middle">
        <Col span={12}>
            <Paginator totalUsersCount={totalUsersCount} 
            pageSaze={pageSaze} 
            currentPage={currentPage} 
            onPageChange={onPageChange} />
        </Col>
    </Row>
</div>
) }

const userSearchFormValidate=(values:any)=>{
    const errors = {}
    return errors
}
type userSearchFormPropsType ={
    onFilterCheang:(filter:FilterType)=>void
}

const UserSearchForm:React.FC<userSearchFormPropsType>=React.memo((props)=>{

    const submit= (values:FilterType, { setSubmitting }:{ setSubmitting:(isSubmitting: boolean) => void } ) => {
        props.onFilterCheang(values)
      }

    return(
        <Formik
       initialValues={{ term: '',friend:null}}
       validate={userSearchFormValidate}
       onSubmit={submit}>
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
               <option value ="null">Все</option>
               <option value ="true">Друзья</option>
               <option value ="false">Остальные</option>
           </Field>
           <button  type="submit"
           //disabled={isSubmitting} 
           >
             Искать
           </button>
         </Form>
       )}
     </Formik>
    )
})
//export default Users style={{border:"1px solid #ccc", borderRadius: "2%"}}