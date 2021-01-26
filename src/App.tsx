import React, { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { connect, Provider, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import store, { AppStateType } from "./redux/ReduxStore";
import { Login } from "./components/Login/Login";
import { Layout, Menu, Result } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { HeaderCont } from "./components/Haeder/Header";
import { Signup } from "./components/Signup/Signup";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const App: React.FC = (props) => {
  const initionalized = useSelector(
    (state: AppStateType) => state.app.initionalized
  );
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(initiolizeApp())
  }, []);
  /*if(!initionalized){
    return <Loader/>
  }*/
  return (
    <Layout>
      <HeaderCont />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="Профиль"
            ></SubMenu>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/" render={() => <ProfileContainer />} />
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route path="/login" render={() => <Login />} />
              <Route path="/signup" render={() => <Signup />} />
              <Route
                path="*"
                render={() => (
                  <Result
                    status="404"
                    title="404"
                    subTitle="К сожалению, посещенная вами страница не существует."
                    extra={<Link to="/">Домой</Link>}
                  />
                )}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const AppConteiner = compose<React.ComponentType>(
  withRouter,
  connect(null, null)
)(App);
export const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppConteiner />
      </Provider>
    </BrowserRouter>
  );
};
export default MainApp;
