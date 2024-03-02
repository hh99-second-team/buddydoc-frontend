import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const ChatScreen = () => {
  const [userId, setUserId] = useState('');
  const [postId, setPostId] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = io('http://localhost:3000/chat');
  // const socket = io('https://buddydoc.site/chat');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit('join-room', { postId });
  };

  const handleSubmitNewMessage = () => {
    console.log(postId);
    console.log(message);
    console.log(userId);
    socket.emit('send-message', {
      message,
      userId,
      postId,
    });
    setMessage('');
  };

  return (
    <Layout>
      <div>
        받은 메시지
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{`${msg.userId}: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <input type="text" placeholder="Enter User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type="text" placeholder="Enter Post ID" value={postId} onChange={(e) => setPostId(e.target.value)} />
        <button onClick={handleJoinRoom}>Join Room</button>
        <input type="text" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSubmitNewMessage}>Submit</button>
      </div>
    </Layout>
  );
};

export default ChatScreen;

const Layout = styled.div`
  padding-left: 1.75rem;
  padding-right: 4.375rem;
`;

// const ChatTitleBox = styled.div`
//   width: 100%;
//   height: 5rem;
//   border-bottom: 1px solid #ccc;
//   display: flex;
//   align-items: center;
//   padding: 0 35px;
// `;

const Title = styled.p`
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;

// const ChatContentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 300px;
//   overflow-y: auto;
//   padding: 20px;
// `;
