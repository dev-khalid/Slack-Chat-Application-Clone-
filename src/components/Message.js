import React, { useState, useEffect, useRef } from 'react';
import MessageHeader from './MessageHeader';
import { Comment, Avatar, List } from 'antd';
import '../Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
const db = getDatabase();

const Message = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [toUpdate, setToUpdate] = useState(true);
  const messageEl = useRef(null);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  let data;
  //conditionally run korlei to mite jay  ?
  if (toUpdate)
    onValue(ref(db, 'messages/' + channelId), (snapshot) => {
      data = Object.values(snapshot.val());
      setMessages(data);
      setDataLength(data.length);
      setToUpdate(false);
    });

  onValue(ref(db, 'messages/' + channelId), (snapshot) => {
    console.log(snapshot.val());
    data = Object.values(snapshot.val());
    if (data.length !== dataLength) {
      setDataLength(data.length);
      setToUpdate(true);
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
        {dataLength &&
          messages.map((message, idx) => (
            <Comment
              author={<a>{message.user.displayName}</a>}
              avatar={<Avatar src={message.user.photoURL} />}
              content={<p style={{ textAlign: 'start' }}>{message.content}</p>}
              datetime={new Date(message.timestamp).toDateString()}
            />
          ))}
      </div>
    </>
  );
};
export default Message;
