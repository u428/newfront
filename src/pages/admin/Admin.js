import React, { useState } from "react";
import { Layout, Breadcrumb, Affix } from "antd";
import Fade from "react-reveal/Fade";
import SideBar from "../../layouts/sideBar/SideBar";
import TopBar from "../../layouts/topBar/TopBar";
import "./Admin.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import {
  Redirect,
  Switch,
  useRouteMatch,
  Route,
  useLocation,
} from "react-router-dom";
import { useBreadCrumb } from "../../hooks/useBreadCrumb";
import Home from "./home/Home";
import Setting from "./setting/Setting";
import Products from "./products/Products";
import Teachers from "./teachers/Teachers";
import { collapseend } from "react-reveal/globals";


function Admin () {
  const { Header, Content, Footer, Sider } = Layout;
  const [ width ] = useWindowSize();
  let location = useLocation();
  const [ breadcrumbItems ] = useBreadCrumb( location );
  let { path } = useRouteMatch();

  const [ state, setState ] = useState( {
    collapseds: false,
  } );

  const onCollapse = ( collapseds ) => {
    setState( { collapseds } );
  };

  const { collapseds } = state;

  return (
    <Fade>
      <Layout style={ { minHeight: "100vh" } }>
        <Sider
          collapsible
          collapsed={ width < 768 ? true : collapseds }
          onCollapse={ onCollapse }
        >
          <SideBar/>
        </Sider>

        <Layout className="site-layout">
          <Affix offsetTop={ 0 }>
            <Header
              className="site-layout-background"
              style={ { padding: "0 16px", borderBottom: "1px solid lightgrey" } }
            >
              <TopBar />
            </Header>
          </Affix>

          <Content style={ { margin: "0 16px" } }>
            <div style={ { padding: 24 } }>
              <Breadcrumb>{ breadcrumbItems }</Breadcrumb>
              <Switch>
                <Redirect exact from={ `${ path }` } to={ `${ path }/home` } />
                <Route
                  path={ `${ path }/home` }
                  render={ ( props ) => <Home { ...props } /> }
                />
                <Route
                  path={ `${ path }/setting` }
                  render={ ( props ) => <Setting { ...props } /> }
                />
                <Route
                  path={ `${ path }/products` }
                  render={ ( props ) => <Products { ...props } /> }
                />
                <Route
                  path={ `${ path }/teacher` }
                  render={ ( props ) => <Teachers { ...props } /> }
                />
              </Switch>
            </div>
          </Content>
          <Footer style={ { textAlign: "center" } }>
            { " " }
            2022 Created by Muhammad Amin 🐝
          </Footer>
        </Layout>
      </Layout>
    </Fade>
  );
}

export default Admin;
