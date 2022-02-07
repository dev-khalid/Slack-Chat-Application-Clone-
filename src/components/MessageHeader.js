import React from 'react';
import { Typography, Card, Row, Col, Input } from 'antd';
import { StarOutlined, UserOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const MessageHeader = () => {
  return (
    <Row justify="space-between">
      <Col>
        <Title level={3}>
          Channel
          <StarOutlined />
        </Title>
        <Text type="secondary">
          <UserOutlined />
          &nbsp;2 Users
        </Text>
      </Col>
      <Col style={{ alignContent: 'right' }}>
        <Input.Search placeholder="Search Message" />
      </Col>
    </Row>
  );
};

export default MessageHeader;
