import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import UserTable from "../UserTable";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

function changeItem(key: string) {
    console.log("change", key)
}

export default function Dashboard() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} onClick={event => changeItem(event.key)}/>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} >

                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <UserTable />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <p>Released under the MIT License.</p>
                    <p>Copyright © 2023-2025 FastDeer Team</p>
                </Footer>
            </Layout>
        </Layout>
    );
}