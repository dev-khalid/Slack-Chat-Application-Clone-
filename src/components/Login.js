import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Checkbox, Spin } from 'antd';
import { Input } from 'antd';

import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import '../Firebase';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [gloading, setGLoading] = useState(false);
  const [componentLoading, setCL] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { 
    const x = () => { 
       onAuthStateChanged(auth, (user) => {
    
    if (user) {
      return navigate('/');
    } else {
      // User is signed out
      // ...
      console.log('signed out');
    }
    setCL(false);
  });
    }
    return x(); 
  },[])
 //ei time a ekbar state take amra set korbo . 

  const onFinish = () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user signed in ');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('something error');
      });

    setLoading(false);
  };

  const googleSignInHandler = () => {
    setGLoading(true);
    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('error hoiche');
        // ...
      });
    setGLoading(false);
  };

  return (
    <>
      {componentLoading ? (
        <Spin size="large" tip="Wait Checking Login information..." />
      ) : (
        <Row>
          <Col
            sm={24}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
            xl={{ span: 12, offset: 6 }}
          >
            <Card
              title="Login To Slack"
              bordered={true}
              hoverable
              align="center"
              direction="vertical"
            >
              <Form
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter your Email!',
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="large size"
                    value={email}
                    prefix={<MailOutlined />}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter your password!',
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="large size"
                    value={password}
                    prefix={<LockOutlined />}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                  </Button>
                  &nbsp;
                  <Button
                    loading={gloading}
                    type="primary"
                    onClick={googleSignInHandler}
                    danger
                  >
                    Sign In With Gooogle &nbsp;
                    <GoogleOutlined />
                  </Button>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  &nbsp;
                  <span>
                    Don't Have An Account ?{' '}
                    <NavLink to="/register" type="primary">
                      Register
                    </NavLink>
                  </span>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      )}{' '}
    </>
  );
};

export default Login;
