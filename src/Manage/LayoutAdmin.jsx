import React, { useState } from "react";
import { Layout, Menu } from "antd";
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
        <div
          style={{
            borderBottom: "1px solid rgb(240, 240, 240)",
            textAlign: "center",
          }}
        >
          <img
            src="https://www.jedecore.com/gif/bon-appetit/bon-appetit-017.gif"
            style={{ width: "40%", padding: "10px" }}
            alt=""
          />
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
