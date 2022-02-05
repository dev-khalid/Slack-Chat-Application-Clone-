import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Avatar, Image } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  SlackOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from '@ant-design/icons';
import '../Firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;
const Home = () => {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    setCurrentUser(user);
  });
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        return navigate('/login');
      })
      .catch((error) => {
        alert('Something went wrong Please Try again Later');
      });
  };
  return (
    <>
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
          <div className="logo">
            <Title level={3} style={{ color: '#fff', marginLeft: '1rem' }}>
              <SlackOutlined />
              Slack
            </Title>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1 */}
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="1">
                {currentUser && (
                  <Avatar
                    src={
                      <Image
                        // src="https://joeschmoe.io/api/v1/random"
                        src={
                          currentUser.photoURL ||
                          'https://joeschmoe.io/api/v1/random'
                        }
                        style={{ width: 32 }}
                      />
                    }
                  />
                )}
                &nbsp;
                {currentUser?.displayName
                  ? currentUser.displayName
                  : 'User Name'}
              </Menu.Item>
              <Menu.Item key="sub2" onClick={signOutHandler}>
                Sign Out
              </Menu.Item>
            </SubMenu>
            {/* </Menu.Item> */}
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              nav 4
            </Menu.Item>
            <Menu.Item key="5" icon={<CloudOutlined />}>
              nav 5
            </Menu.Item>
            <Menu.Item key="6" icon={<AppstoreOutlined />}>
              nav 6
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              nav 7
            </Menu.Item>
            <Menu.Item key="8" icon={<ShopOutlined />}>
              nav 8
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: 'center' }}
            >
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default Home;
