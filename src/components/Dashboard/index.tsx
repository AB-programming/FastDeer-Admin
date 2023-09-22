import React from 'react';
import {
    HomeOutlined,
    UserOutlined,
    HddOutlined,
    HourglassOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import {Outlet, useNavigate, useRoutes} from "react-router-dom";
import {LABEL} from "../../util/constant";
import routes from "../../routes";
import Title from "antd/es/typography/Title";

const {Header, Content, Footer, Sider} = Layout;

const items: MenuProps['items'] = [
    HomeOutlined,
    UserOutlined,
    HddOutlined,
    HourglassOutlined,
].map((ico, index) => {
    const key = String(index)
    const icon = React.createElement(ico)
    let label = '';
    switch (index) {
        case 0: {
            label = LABEL.HOME;
            break;
        }
        case 1: {
            label = LABEL.USER_LIST;
            break;
        }
        case 2: {
            label = LABEL.POST_LIST;
            break;
        }
        case 3: {
            label = LABEL.Feedback;
            break;
        }
        default: {
            label = LABEL.OTHER;
            break;
        }
    }
    return ({
        key,
        icon,
        label
    })
});


export default function Dashboard() {

    const navigate = useNavigate();
    const route = useRoutes(routes);
    const routeName = route?.props.routeContext.outlet.props.match.route.name;

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    function changeItem(key: string) {
        switch (key) {
            case '0': {
                navigate('/');
                break;
            }
            case '1': {
                navigate('/userList');
                break;
            }
            case '2': {
                navigate('/postList');
                break;
            }
            case '3': {
                navigate('/feedback');
                break;
            }
        }
    }

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
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={items}
                      onClick={event => changeItem(event.key)}/>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Title level={2}>{routeName}</Title>
                </Header>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <Outlet/>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <p>Released under the MIT License.</p>
                    <p>Copyright © 2023-2025 FastDeer Team</p>
                </Footer>
            </Layout>
        </Layout>
    );
}