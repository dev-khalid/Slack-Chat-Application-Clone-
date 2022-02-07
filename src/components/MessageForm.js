import React from 'react';
import { Input, Form, Button } from 'antd';
import {
  PlusOutlined,
  MailOutlined,
  FileImageOutlined,
} from '@ant-design/icons';

const MessageForm = () => {
  return (
    <>
      <Form style={{ marginTop: '30px' }}>
        <Form.Item
          rules={[{ required: true, message: 'Please Input Message' }]}
        >
          <Input
            addonBefore={<PlusOutlined />}
            placeholder="Enter Message..."
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ fontWeight: 'bold', width: '49%' }}
          >
            <MailOutlined /> Add Reply
          </Button>
          <Button
            type="danger"
            htmlType="submit"
            style={{ fontWeight: 'bold', width: '49%', marginLeft: '2%' }}
          >
            <FileImageOutlined /> Upload Media
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default MessageForm;
