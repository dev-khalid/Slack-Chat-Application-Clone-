import React, { useState, useEffect, useRef } from 'react';
import MessageHeader from './MessageHeader';
import { Comment, Avatar, Empty } from 'antd';
import '../Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
const db = getDatabase();

const Message = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [toUpdate, setToUpdate] = useState();
  console.log('ki ache re vai ', toUpdate);
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    setToUpdate(true);
  }, [channelId]);
  let data = [];
  //conditionally run korlei to mite jay  ?
  if (toUpdate) {
    console.log('eto update abar koi hocche');
    onValue(ref(db, 'messages/' + channelId), (snapshot) => {
      if (snapshot.exists()) {
        data = Object.values(snapshot.val());
        setMessages(data);
        setDataLength(data.length);
        setToUpdate(false);
      } else {
        setMessages([]);
        setDataLength(0);
        setToUpdate(false);
      }
    });
  }

  onValue(ref(db, 'messages/' + channelId), (snapshot) => {
    if (snapshot.exists()) {
      data = Object.values(snapshot.val());
      if (data.length !== dataLength) {
        setDataLength(data.length);
        setToUpdate(true);
      }
    }
  });
  return (
    <>
      <MessageHeader />
      <div
        style={{
          height: '440px',
          overflowY: 'scroll',
        }}
        ref={messageEl}
      >
        {messages.length ? (
          messages.map((message, idx) => (
            <Comment
              key={idx}
              author={<a>{message.user.displayName}</a>}
              avatar={<Avatar src={message.user.photoURL} />}
              content={<p style={{ textAlign: 'start' }}>{message.content}</p>}
              datetime={new Date(message.timestamp).toDateString()}
            />
          ))
        ) : (
          <Empty
            style={{
              marginTop: 180,
            }}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<b>No Message To Show</b>}
          />
        )}
      </div>
    </>
  );
};
export default Message;
