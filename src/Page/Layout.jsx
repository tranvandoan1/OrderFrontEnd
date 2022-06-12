import React, { useEffect } from "react";
import { Layout, Menu, Dropdown, Button, Avatar, Row, Col, Select } from "antd";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTable } from "../features/TableSlice/TableSlice";
import { getSaveOrder } from "../features/saveorderSlice/saveOrderSlice";
import styles from "../css/Home.module.css";
import {
  SettingOutlined,
  LogoutOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { getFloor } from "../features/FloorSlice/FloorSlice";
import CheckTable from "./CheckTable";
const { Header, Content, Footer, Sider } = Layout;

const LayoutWeb = () => {
  const dispatch = useDispatch();
  const floors = useSelector((data) => data.floor.value);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getTable());
    dispatch(getSaveOrder());
    dispatch(getFloor());
  }, []);

  const signOut = () => {
    if (confirm("Bạn có muốn đăng xuất không !")) {
      localStorage.removeItem("user");
    }
  };

  const menu = (
    <Menu className={styles.dropdown}>
      <Menu.Item key="userInfo">
        <Link className={styles.link} to="/case-manager/statistical">
          <Button type="text" icon={<SettingOutlined />}>
            Quản lý
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<LogoutOutlined />} type="text" onClick={() => signOut()}>
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{ backgroundColor: "rgb(243, 243, 243)" }}
      className={styles.main}
    >
      <Header className={styles.header}>
        <Row>
          <Col xs={12} sm={4} md={12} lg={18} xl={18}>
            <CheckTable />
          </Col>
          <Col
            xs={12}
            sm={4}
            md={12}
            lg={6}
            xl={6}
            style={{ textAlign: "right" }}
          >
            <Dropdown overlay={menu} arrow>
              <span>
                <Avatar size={44} src={user.avatar} /> <span>{user.name}</span>
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider className={styles.sider}>
          <Menu className={styles.menu} theme="dark" mode="inline">
            {floors.map((item, index) => {
              return (
                <Menu.Item
                  key={index}
                  icon={
                    <ApartmentOutlined
                      style={{ color: "black", fontSize: "1.1rem" }}
                    />
                  }
                >
                  <NavLink
                    style={{ color: "black" }}
                    to={`/floor/floor_id=${item._id}`}
                  >
                    {item.name}
                  </NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div className="layout-website">
            <Content className={styles.content}>
              <Outlet />
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutWeb;
