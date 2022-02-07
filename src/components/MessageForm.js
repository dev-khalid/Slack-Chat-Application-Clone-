import React, { useState } from 'react';
import { Input, Form, Button,Upload } from 'antd';
import {
  PlusOutlined,
  MailOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import '../Firebase';
import { getDatabase, ref, set, push, child } from 'firebase/database';

const db = getDatabase();
const MessageForm = ({ channelId, user }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    setLoading(true);

    const messageKey = push(child(ref(db), 'message/' + channelId)).key;
    const messageObj = {
      content: message,
      timestamp: Date.now(),
      user,
    };
    set(ref(db, 'messages/' + channelId + '/' + messageKey), messageObj)
      .then(() => {
        setLoading(false);
        setMessage('');
        console.log('Data Added successFully');
      })
      .catch((error) => {
        setLoading(false);
        console.log('some Error Occured');
      });
  };
  return (
    <>
      <Form style={{ marginTop: '30px' }} onFinish={submitHandler}>
        <Form.Item
          rules={[{ required: true, message: 'Please Input Message' }]}
        >
          <Input
            addonBefore={<PlusOutlined />}
            placeholder="Enter Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ fontWeight: 'bold', width: '49%' }}
          >
            <MailOutlined /> Add Reply
          </Button>
          <Upload name="logo" action="/upload.do" listType="picture">
            {/* <Button icon={<UploadOutlined />}>Click to upload</Button> */}
            <Button
              type="danger"
              style={{ fontWeight: 'bold', width: '49%', marginLeft: '2%' }}
            >
              <FileImageOutlined /> Upload Media
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
export default MessageForm;
