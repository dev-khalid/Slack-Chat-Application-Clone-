import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Image,
  Spin,
  Button,
  Modal,
  Form,
  Input,
} from 'antd';
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
import { getDatabase, ref, set, child, push, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../actions/authActions';
import { setCurrentChannelAction } from '../actions/channelActions';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

//
//
//

//
//
//

//
//
//

//
//
//

const Home = () => {
  const db = getDatabase();
  const [visible, setVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelDetails, setChannelDetails] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //about user data
  const authData = useSelector((state) => state.auth);
  const { loading, user } = authData;
  useEffect(() => {
    if (!authData?.user && !authData.loading) {
      dispatch(setUserInfo());
    }
  }, [authData, dispatch]);
  const auth = getAuth();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        return navigate('/login');
      })
      .catch((error) => {
        alert('Something went wrong Please Try again Later');
      });
  };
  //end of user data

  //all about the modal.

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  //end of modal

  //about channel form data
  const addChannelHandler = () => {
    setFormLoading(true);

    const key = push(child(ref(db), 'channels')).key;
    const newChannel = {
      name: channelName,
      details: channelDetails,
      id: key,
      createdBy: {
        name: user?.displayName,
        avatar: user?.photoURL,
      },
    };

    set(ref(db, 'channels/' + key), newChannel)
      .then(() => {
        setFormLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setFormLoading(false);
        setVisible(false);
        console.log('something error happened');
      });
  };
  useEffect(() => {
    const unSubscribe = () => {
      get(child(ref(db), 'channels/'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const channelsData = Object.values(snapshot.val());
            //selecting the first channel on page load .
            if (channelsData.length > 0) {
              dispatch(setCurrentChannelAction(channelsData[0]));
            }
            setChannels(channelsData);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return unSubscribe();
  }, []);

  const changeChannel = (channel) => {
    dispatch(setCurrentChannelAction(channel));
  };

  const { currentChannel } = useSelector((state) => state.channel);

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
            <Title
              level={3}
              style={{ color: '#fff', marginLeft: '1rem', marginTop: '0.5rem' }}
            >
              <SlackOutlined />
              Slack
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['channels', 'channel0']}
            defaultOpenKeys={['channels']}
          >
            <SubMenu
              key="sub1"
              icon={
                <Avatar
                  src={
                    <Image
                      // src="https://joeschmoe.io/api/v1/random"
                      src={
                        user?.photoURL || 'https://joeschmoe.io/api/v1/random'
                      }
                      style={{ width: 32 }}
                    />
                  }
                />
              }
              title={`${user?.displayName || 'UserName'}`}
            >
              <Menu.Item key="sub2" onClick={signOutHandler}>
                Sign Out
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="channels"
              icon={<VideoCameraOutlined />}
              title="Channels"
            >
              {channels.length > 0 &&
                channels.map((channel, idx) => (
                  <Menu.Item
                    key={`channel${idx}`}
                    icon="# "
                    onClick={() => changeChannel(channel)}
                  >
                    {channel.name}
                  </Menu.Item>
                ))}
            </SubMenu>
            {/* </Menu.Item> */}
            <Menu.Item key="3" icon={<UploadOutlined />} onClick={showModal}>
              Add Channel
            </Menu.Item>

            {/* <Menu.Item key="4" icon={<BarChartOutlined />}>
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
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Modal
              title="Add A Channel"
              visible={visible}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={formLoading}
                  onClick={addChannelHandler}
                >
                  Submit
                </Button>,
              ]}
            >
              <Form layout="vertical">
                <Form.Item label="Name Of Channel">
                  <Input
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Enter the name of the channel"
                  />
                </Form.Item>
                <Form.Item label="About The Channel">
                  <Input
                    value={channelDetails}
                    onChange={(e) => setChannelDetails(e.target.value)}
                    placeholder="Enter brief description about channel"
                  />
                </Form.Item>
              </Form>
            </Modal>
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
