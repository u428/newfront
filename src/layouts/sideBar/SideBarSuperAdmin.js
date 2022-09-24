import React from "react";
import { Affix, Menu, Row, Tooltip } from "antd";
import logo from '../../assets/images/bg/logo.png';

import { PieChartOutlined, UserOutlined, TeamOutlined, FileOutlined, ProjectOutlined, UsergroupAddOutlined, ControlOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { SubMenu } = Menu;
function SideBarSuperAdmin(props) {
  const { url } = useRouteMatch();
const { i18n, t } = useTranslation();
  // const { SubMenu } = Menu;
  return (
    <Affix offsetTop={0}>
      <div>
      <div className="logo">
        <Row align="middle" justify="center" gutter={8}>
          <Tooltip placement="right" color={"orange"} title={"Admin Logo"}>
            <img
              src={
                logo
              }
              alt="site logo"
              style={{ width: "90%", height: "auto", margin: "10px" }}
            />
          </Tooltip>
        </Row>
      </div>
      <div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={`${url}/home`}> {t("home")} </Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
          <Link to={`${url}/add-controller`}> Groups </Link>
        </Menu.Item>
        
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
      </div>
      </div>
    </Affix>
  );
}

export default SideBarSuperAdmin;
