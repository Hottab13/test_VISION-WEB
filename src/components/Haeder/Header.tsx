import React from "react";
//import classes from './Header.module.css';
import { NavLink } from "react-router-dom";
import { AppStateType } from "../../redux/ReduxStore";
import Layout, { Header } from "antd/lib/layout/layout";
import { Button, Col, Menu, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/AuthReducer";
import { Typography, Space } from 'antd';

const { Text} = Typography;
export type DispatchPropsType={
    logOut:()=>void
}

export const HeaderCont:React.FC = (props)=>{

const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
const login = useSelector((state:AppStateType)=>state.auth.login)
const dispatch = useDispatch()

const logOutColbeck=()=>{
    dispatch(logOut())
}

return(
  
  <Header className="header">
    <div className="logo" />
      <Row>
        <Col span={20}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          
          {isAuth ?
                <div>
                    <Avatar size={50}>{login}</Avatar>
                    <Text type="success">{login} </Text> <Button type="primary" onClick={logOutColbeck}>Выйти</Button>
                    </div> 
                :<NavLink to={`/login`}><Button type="primary">Войти</Button></NavLink>}
        </Col>
      </Row>
  </Header>
    )
}
/*
<header className={classes.heder}>
            <div><h4>ГНЕЗДОСЕТЬ</h4></div>
            <div className={classes.login}>
                {isAuth ?
                <div>{props.login} - <button onClick={props.logOut}>Выйти</button></div> 
                :<NavLink to={`/login`}>Login:</NavLink>}
            </div>
    </header> */