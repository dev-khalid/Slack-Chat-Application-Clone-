import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Checkbox } from 'antd';
import { Input } from 'antd';

import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import '../Firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const auth = getAuth();

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [gloading, setGLoading] = useState(false);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     console.log('signed out');
  //   }
  // });

  const saveUser = (user) => {
    const db = getDatabase();
    set(ref(db, 'users/' + user.uid), {
      displayName: user.displayName,
      avatar: user.photoURL,
    });
  };

  const onFinish = () => {
    setLoading(true);
    if (password !== confirmpassword) {
      alert('Password Does Not match');
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
          photoURL: `https://www.gravatar.com/avatar/${user.email}?d=identicon`,
        })
          .then(() => {
            // Profile updated!
            saveUser(user);
            console.log('data upadted');
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error hoiche');
        // ..
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

        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), {
          displayName: user.displayName,
          avatar: user.photoURL,
        });
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
    <Row>
      <Col
        sm={24}
        md={{ span: 16, offset: 4 }}
        lg={{ span: 12, offset: 6 }}
        xl={{ span: 12, offset: 6 }}
      >
        <Card
          title="Register To Slack" 
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
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please Enter your username!',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="large size"
                prefix={<UserOutlined />}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

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
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: 'Please Confirm your password!',
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="large size"
                prefix={<LockOutlined />}
                value={confirmpassword}
                onChange={(e) => setConPass(e.target.value)}
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
                Already Have An Account ?{' '}
                <NavLink to="/login" type="primary">
                  Login
                </NavLink>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
