import React from 'react';
import MessageHeader from './MessageHeader';
import { Comment, Avatar, List } from 'antd';
const Message = () => {
  return (
    <>
      <MessageHeader />
      <div style={{
        height: '440px', 
        overflowY: 'scroll'
      }}>
          <Comment
            author={<a>Khalid Hossain</a>}
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            }
          />
      </div>
      
    </>
  );
};
export default Message;
