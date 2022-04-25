import React from 'react'
import { Layout, Menu } from 'antd';
import {
    ShoppingCartOutlined,
    ProfileOutlined,
    UserOutlined,
    ClusterOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const LayoutAdmin = () => {
    return (

        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div style={{ borderBottom: "1px solid rgb(214, 214, 214)", textAlign: 'center' }} >
                    <img src="https://www.jedecore.com/gif/bon-appetit/bon-appetit-017.gif" style={{ width: "60%", padding: "10px" }} alt="" />
                </div>
                <br />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>

                    <Menu.Item key="4" icon={<ProfileOutlined />}>
                        <NavLink to='categoris'> Danh mục</NavLink>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<ClusterOutlined />}>
                        <NavLink to='products'> Sản phẩm</NavLink>

                    </Menu.Item>
                    <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
                        <NavLink to='order'> Đơn hàng</NavLink>

                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <NavLink to='account'>Tài khoản</NavLink>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<RollbackOutlined />}>
                        <NavLink to='/floor'> Quay lại</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{
                overflow: 'auto',
                height: '100vh',
                marginLeft: 200
            }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin