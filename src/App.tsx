import React, { useEffect } from "react"
import "./App.css"
import 'antd/dist/antd.css';
//import Navbar from "./components/Navbar/Navbar"
import Frends from "./components/Frends/Frends"
import Settings from "./components/Settings/Settings"
import { BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import ProfileContainer from "./components/Profile/ProfileConainer"
//import HeaderConteiner from "./components/Haeder/HeaderConteiner"
import { connect, Provider, useDispatch, useSelector } from "react-redux"
import { compose } from "redux"
import { initiolizeApp } from "./redux/AppReducer"
import Loader from "./components/Loader"
import store, { AppStateType } from "./redux/ReduxStore"
import { UserPage } from "./components/Users/UsersContianer"
import { Login } from "./components/Login/Login"
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { HeaderCont } from "./components/Haeder/Header";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


const App:React.FC = (props)=>{
  const initionalized = useSelector((state:AppStateType)=>state.app.initionalized)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initiolizeApp())
  },[])

  if(!initionalized){
    return <Loader/>
  }
  return (
    <Layout>
    <HeaderCont/>

  <Layout>
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Профиль">
          <Menu.Item key="1"><Link to="/profile" >Мой профиль</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/dialogs" >Мои сообщения</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/frends" >Друзья</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="sub2" icon={<LaptopOutlined />} title="Пользователи">
        <Link to="/users" >Пользователи</Link>
         {/* <Menu.Item key="5"><Link to="/users" >Пользователи</Link></Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
         width={200}
  <Menu.Item key="8">option8</Menu.Item>*/}
        </Menu.Item>
        <SubMenu key="sub3" icon={<NotificationOutlined />} title="Настройки">
          <Menu.Item key="9"><Link to="/settings">Настройки</Link></Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
      
    </Sider>
  
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Switch>
      <Route exact path='/' 
        render={()=><ProfileContainer/>}/>
      <Route path='/dialogs' 
        render={()=><DialogsContainer/>}/>
      <Route path='/profile/:userId?' 
        render={()=><ProfileContainer/>}/>
      <Route path='/frends' component={Frends}/>
      <Route path='/settings' component={Settings}/>
      <Route path='/users' render={ ()=> <UserPage/> } />
      <Route path='/login' 
        render={ ()=> <Login /> } />
      <Route path='*' 
        render={ ()=> <div>404</div> } />
        </Switch> 
      </Content>
    </Layout>
  </Layout>
</Layout>)
}

const AppConteiner= compose<React.ComponentType>(
  withRouter,
  connect(null,null))(App)
  //basename={process.env.PUBLIC_URL}
export const MainApp:React.FC=()=>{  
    return <BrowserRouter >
        <Provider store={store}>
          <AppConteiner />
        </Provider>
        </BrowserRouter>
  }

export default MainApp
  
/************************************************************************/
/*type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initiolizeApp:()=>void
}*/
/*class App extends Component<DispatchPropsType > {
  componentDidMount(){// логинимся
    this.props.initiolizeApp();
 }
  render(){
    if(!this.props.initionalized){
      return <Loader/>
    }
    return (
<Layout>
    <Header className="header">
      <div className="logo" />
        <Row>
          <Col span={20}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Col>
          <Col span={4}>
            <Avatar size={40}>USER</Avatar>
          </Col>
        </Row>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >

          <SubMenu key="sub1" icon={<UserOutlined />} title="Профиль">
            <Menu.Item key="1"><Link to="/profile" >Мой профиль</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/dialogs" >Мои сообщения</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/frends" >Друзья</Link></Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Пользователи">
            <Menu.Item key="5"><Link to="/users" >Пользователи</Link></Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Настройки">
            <Menu.Item key="9"><Link to="/settings">Настройки</Link></Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
        <Route exact path='/' 
          render={()=><ProfileContainer/>}/>
        <Route path='/dialogs' 
          render={()=><DialogsContainer/>}/>
        <Route path='/profile/:userId?' 
          render={()=><ProfileContainer/>}/>
        <Route path='/frends' component={Frends}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/users' render={ ()=> <UserPage/> } />
        <Route path='/login' 
          render={ ()=> <Login /> } />
        <Route path='*' 
          render={ ()=> <div>404</div> } />
          </Switch> 
        </Content>
      </Layout>
    </Layout>
  </Layout>
    /*<div className='app-vraper'>
      <HeaderConteiner/>
      <Navbar/>
      <div className='app-vrapper-content'>
       <Switch>
        <Route exact path='/' 
          render={()=><ProfileContainer/>}/>
        <Route path='/dialogs' 
          render={()=><DialogsContainer/>}/>
        <Route path='/profile/:userId?' 
          render={()=><ProfileContainer/>}/>
        <Route path='/frends' component={Frends}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/users' render={ ()=> <UserPage/> } />
        <Route path='/login' 
          render={ ()=> <Login /> } />
        <Route path='*' 
          render={ ()=> <div>
            <Button type={"primary"}>Ok</Button>404</div> } />
          </Switch> 
      </div>
    </div>
  )}
}
/*const mapStateToProps=(state:AppStateType)=>({
  initionalized:state.app.initionalized
})*/

