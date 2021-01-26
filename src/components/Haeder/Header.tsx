import React from "react";
//import classes from './Header.module.css';
import { NavLink } from "react-router-dom";
import { AppStateType } from "../../redux/ReduxStore";
import Layout, { Header } from "antd/lib/layout/layout";
import { Button, Col, Menu, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
//import { logOut } from "../../redux/AuthReducer";
import { Typography, Space } from 'antd';

const { Text} = Typography;
export type DispatchPropsType={
    logOut:()=>void
}
export const HeaderCont:React.FC = (props)=>{

const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
const login = useSelector((state:AppStateType)=>state.auth)
const dispatch = useDispatch()

const logOutColbeck=()=>{
    //dispatch(logOut())
}
return(
  <Header className="header">
    <div className="logo" />
      <Row>
        <Col span={4}>
          {isAuth ?
                <div>
                    <Avatar size={50}>{login.name}</Avatar>
                    <Text type="success">{login.name} </Text> <Button type="primary" onClick={logOutColbeck}>Выйти</Button>
                    </div> 
                :<NavLink to={`/login`}><Button type="primary">Войти</Button></NavLink>}
        </Col>
      </Row>
  </Header>
    )
}