import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { lazy, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import { fetchProfileAction, SET_PROFILE } from "../../../features/authencation/action";
import Require from './style.module.css';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Movie", "sub1", <UserOutlined />, [
    getItem(
      <NavLink key={2} to="/Moviemanger">
        <p>Movies</p>
      </NavLink>,
      "2"
    ),
    getItem(
      <NavLink key={3} to="/AddFilm">
        <p>Add Moive</p>
      </NavLink>,
      "3"
    ),
  ]),
  getItem("User", "sub2", <UserOutlined />, [
    getItem(
      <NavLink key={4} to="/Managaer">
        <p>Users</p>
      </NavLink>,
      "4"
    ),
    getItem(
      <NavLink key={5} to="/AddUser">
        <p>AddUser</p>
      </NavLink>,
      "5"
    ),
  ]),
];

function Headerr(props) {
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchProfileAction);
}, []);
  const history = useHistory();
  
  const Userr = useSelector((state) => state.auth.profile);

  const goToHome = () => {
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });

    goToHome();
  };

  const [collapsed, setCollapsed] = useState(false);

  const checkSignin = ()=>{
    if(Userr?.hoTen ){
      return  Userr?.hoTen;
    }
    else {
      return "USER";
    }
  }

  const checkLogout = ()=>{
    if(Userr?.hoTen ){
      return "Log out";
    }
    else {
      return "";
    }
  }

  const YeuCauDangNhap = ()=>{
    if(Userr?.hoTen ){
      return "";
    }
    else {
      return "Vui lòng đăng nhập";
    }
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
        <>
        <div style={{display:"flex"}}>
          <p style={{color:"white",fontWeight:"600",fontSize:"20px",marginLeft:'20px'}}>Hello {checkSignin()}</p>

<a className={Require.title} href="/" onClick={handleLogout} style={{color:"white",marginLeft:"980px",fontWeight:"600",fontSize:"20px"}}>{YeuCauDangNhap()}</a>
<a href="#" onClick={handleLogout} style={{color:"white",marginLeft:"20px",fontWeight:"600",fontSize:"20px"}}>
            {checkLogout()}
          </a>
</div>


</>
        </Header>

        {props.children}
      </Layout>
    </Layout>
  );
}

export default Headerr;
