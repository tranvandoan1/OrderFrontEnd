import React, { useEffect, useState } from "react";
import { Avatar, Layout, Menu, message } from "antd";
import {
  ShoppingCartOutlined,
  ProfileOutlined,
  UserOutlined,
  ClusterOutlined,
  RollbackOutlined,
  BorderlessTableOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../css/LayoutAdmin.module.css";
import "../css/Order.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductAll } from "./../features/ProductsSlice/ProductSlice";
import { getAllTable } from "../features/TableSlice/TableSlice";
import { getCategori } from "./../features/Categoris/CategoriSlice";
import { getUser } from "../features/User/UserSlice";
const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const [cateName, setCateName] = useState(false);
  const user = useSelector((data) => data.user.value);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const dispatch = useDispatch();
  const products = useSelector((data) => data.product.value);
  const tables = useSelector((data) => data.table.value);
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getCategori());
    dispatch(getAllTable());
  }, []);
  const key = JSON.parse(localStorage.getItem("key"));
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
            src={user.avatarRestaurant}
            style={{ margin: "10px" }}
            size={60}
            alt=""
          />
          <span className={styles.title_logo}>{user.nameRestaurant}</span>
        </div>
        <br />
        <Menu
          theme="dark"
          mode="inline"
          className={styles.menu}
          defaultSelectedKeys={
            key == null
              ? [
                  user?.loginWeb == 0 ||
                  products?.length > 0 ||
                  categoris?.length > 0 ||
                  tables?.length > 0
                    ? "1"
                    : "1",
                ]
              : key
          }
          items={[
            (user?.loginWeb !== 0 ||
              products?.length > 0 ||
              categoris?.length > 0 ||
              tables?.length > 0) && {
              key: "1",
              icon: <BarChartOutlined className={styles.icon} />,
              label: "Thông kê",
              itemIcon: <NavLink to="statistical" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
                localStorage.setItem("key", JSON.stringify(["1"]));
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
                localStorage.setItem("key", JSON.stringify(["2"]));
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
                localStorage.setItem("key", JSON.stringify(["3"]));
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
                localStorage.setItem("key", JSON.stringify(["4"]));
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
                localStorage.setItem("key", JSON.stringify(["5"]));
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
                localStorage.setItem("key", JSON.stringify(["6"]));
              },
            },
            {
              key: "7",
              icon: (
                <SettingOutlined className={cateName == false && styles.icon} />
              ),
              label: "Cài đặt",
              itemIcon: <NavLink to="setting" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
                localStorage.setItem("key", JSON.stringify(["7"]));
              },
            },
            (tables?.length > 0 ||
              products?.length > 0 ||
              categoris?.length > 0) && {
              key: "8",
              icon: <RollbackOutlined className={styles.icon} />,
              label: "Quay lại",
              itemIcon: <NavLink to="/tables" />,
              style: { color: "black" },
              onClick: () => {
                setCateName(true);
                localStorage.removeItem("key");
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
