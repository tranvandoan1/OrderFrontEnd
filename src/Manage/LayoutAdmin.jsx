import React, { useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import {
  ShoppingCartOutlined,
  ProfileOutlined,
  UserOutlined,
  ClusterOutlined,
  RollbackOutlined,
  BorderlessTableOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../css/LayoutAdmin.module.css";
import '../css/Order.css'
const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const [cateName, setCateName] = useState(false);
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={styles.avatar_header}>
          <Avatar
            src="https://123design.org/wp-content/uploads/2020/07/LOGOLM0200-Chibi-%C4%90%E1%BB%87-nh%E1%BA%A5t-%C4%91%E1%BA%A7u-b%E1%BA%BFp-nh%C3%AD-Vua-%C4%91%E1%BA%A7u-b%E1%BA%BFp.jpg"
            style={{ margin: "10px" }}
            size={60}
            alt=""
          />
          <span className={styles.title_logo}>BOM BOM</span>
        </div>
        <br />
        <Menu
          theme="dark"
          mode="inline"
          className={styles.menu}
          defaultSelectedKeys={["7"]}
          items={[
            {
              key: "7",
              icon: <BarChartOutlined className={styles.icon} />,
              label: "Thông kê",
              itemIcon: <NavLink to="statistical" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },
            {
              key: "1",
              icon: (
                <ProfileOutlined className={cateName == false && styles.icon} />
              ),
              label: "Tầng",
              itemIcon: <NavLink to="floor" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },
            {
              key: "2",
              icon: (
                <BorderlessTableOutlined
                  className={cateName == false && styles.icon}
                />
              ),
              label: "Bàn",
              itemIcon: <NavLink to="table" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },
            {
              key: "3",
              icon: (
                <ProfileOutlined className={cateName == false && styles.icon} />
              ),
              label: "Danh mục",
              itemIcon: <NavLink to="categoris" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },
            {
              key: "4",
              icon: (
                <ClusterOutlined className={cateName == false && styles.icon} />
              ),
              label: "Sản phẩm",
              itemIcon: <NavLink to="products" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },

            {
              key: "5",
              icon: (
                <ShoppingCartOutlined
                  className={cateName == false && styles.icon}
                />
              ),
              label: "Đơn hàng",
              itemIcon: <NavLink to="order" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },
            {
              key: "6",
              icon: (
                <UserOutlined className={cateName == false && styles.icon} />
              ),
              label: "Tài khoản",
              itemIcon: <NavLink to="account" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },

            {
              key: "8",
              icon: <RollbackOutlined className={styles.icon} />,
              label: "Quay lại",
              itemIcon: <NavLink to="/floor" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
              },
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          overflow: "auto",
          height: "100vh",
          marginLeft: 200,
        }}
      >
        <Content style={{ margin: "5px 10px 0" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
