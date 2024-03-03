import React, { SetStateAction, useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import JoinList from '../components/feature/chat/JoinList';
import { Button } from '@radix-ui/themes';
import Input from '../components/common/Input';
import ChatScreen from '../components/feature/chat/ChatScreen';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const joinList = ['웹개발 프로젝트', '리액트 스터디', 'Node.js스터디'];
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastMessageId, setLastMessagId] = useState(0);

  // ENDPOINT 설정
  const ENDPOINT = 'http://localhost:3000/chat';
  // const ENDPOINT = "https://buddydoc.site:3000/chat"

  // 렌더링시 Socket 연결관리
  useEffect(() => {
    // Socket 연결
    const newSocket = io(ENDPOINT); // 기존 백엔드 서버
    setSocket(newSocket); // 소켓 상태관리
    return () => newSocket.close(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
  }, []);

  // 소켓 연결/해제 , 메시지 수신
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected');
      });
      //컴포넌트가 언마운트될 때 소켓 연결 해제
      return () => {
        socket.on('disconnect', () => {
          console.log('Socket disconnected');
        });
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      // 메시지 수신 Request를 보냄
      socket.emit('read-Messages', { postId: 2, lastMessageId: 0 });
      // 메시지 수신 Response를 받음
      socket.on('read-Messages', (data) => {
        console.log('가져온 데이터 : ', data);
        setMessages(data.messages);
        // console.log('마지막페이지 여부 : ', data.isLastPage);
        // console.log('메시지 데이터 : ', data.messages);
        // console.log('마지막 메시지 chatId', data.messages[data.messages.length - 1]);
        // console.log('lastMessageId : ', lastMessageId);
        data.messages.forEach((element) => {
          console.log(element['chatId'], element['users']['userNickname'], element['chat_message']);
        });
      });
    }
  }, [socket]);

  // 메시지 전송
  const sendMessage = (event, inputChatMessage) => {
    event.preventDefault();
    if (socket && inputMessage.trim() !== '') {
      socket.emit('send-message', { chat_message: inputChatMessage, userId: 1, postId: 2 });
      // console.log(inputChatMessage);
      setInputMessage('');
    }
  };

  // const receiveMsg = () => {
  //   if (socket) {
  //     socket.emit('read-Messages', { postId: 2, lastMessageId: 30 });
  //     socket.on('read-Messages', (data) => {
  //       console.log(data);
  //     });
  //   }
  // };

  //   return (
  //     <div>
  //       <div>
  //         {messages.map((msg, index) => (
  //           <div key={index}>
  //             <strong>{msg.userName}: </strong>
  //             {msg.message}
  //           </div>
  //         ))}
  //       </div>
  //       <input
  //         type="text"
  //         value={inputMessage}
  //         onChange={(e) => setInputMessage(e.target.value)}
  //         placeholder="Type your message..."
  //       />
  //       <button onClick={() => sendMessage(inputMessage)}>Send</button>
  //     </div>
  //   );
  // };

  const createChatRoom = (chatRoomTitle) => {
    return (
      <>
        {/* 채팅방 이름 */}
        <ChatRoomTitle>{chatRoomTitle}</ChatRoomTitle>
        {/* 채팅방 영역 */}
        <ChatRoomBody>
          <ul>
            {messages.map((item) => (
              <li key={item['chatId']}>{`${item['chat_message']}`}</li>
            ))}
          </ul>
        </ChatRoomBody>
        {/* 입력창 및 전송버튼 */}
        <ChatRoomInputGroup>
          <Input
            type="text"
            placeholder="메시지 입력"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <SendButton onClick={(e) => sendMessage(e, inputMessage)}>전송</SendButton>
        </ChatRoomInputGroup>
      </>
    );
  };

  return (
    <Layout>
      <TabsRoot defaultValue={joinList[0] ? joinList[0] : ''}>
        <Tabs.List>
          <ChatList>
            <ChatListTitle>채팅</ChatListTitle>
            {joinList.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </ChatList>
        </Tabs.List>
        <ChatRoomContainer>
          {joinList.map((item) => (
            <Tabs.Content key={item} value={item}>
              {createChatRoom(item)}
            </Tabs.Content>
          ))}
        </ChatRoomContainer>
      </TabsRoot>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  background: var(--grey01, #bbbbbb); // 색상 임의 변경
`;
const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: row;
`;
const ChatRoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  padding-top: 60px;
  background-color: #fff;
`;
// const TabsTrigger = styled(Tabs.Trigger)<{ borderBottom?: string }>`
const TabsTrigger = styled(Tabs.Trigger)`
  width: 100%;
  height: 49px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #7a7a7a;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.72px;
  border: none;
  margin-bottom: 10px;
  border-radius: 15px;
  transition: 0.3s;
  ${(props) => (props.borderBottom ? `border-bottom: ${props.borderBottom};` : 'border-bottom: 30px;')}
  &:hover {
    background: #7a7a7a;
    color: #fff;
  }
`;
const TabsContentContainer = styled.div`
  width: 1500px;
  height: 800px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin: 40px 0 0 40px;
`;
const ChatList = styled.div`
  width: 346px;
  height: 800px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fff;
`;
const ChatListTitle = styled.div`
  color: #000;
  text-align: start;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 20px;
`;
const ChatRoomContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 800px;
  flex-shrink: 0;
  margin-left: 20px;
  padding: 0 30px 30px 30px;
  background-color: transparent;
  border-radius: 12px;
`;
const ChatRoomTitle = styled.div`
  width: 1130px;
  height: 84px;
  font-size: 26px;
  font-weight: 700;
  border-radius: 12px;
  flex-shrink: 0;
  background-color: #fff;
  padding: 20px;
`;
const ChatRoomBody = styled.div`
  width: 1130px;
  height: 565px;
  padding: 0 30px;
  border-radius: 10px;
  background-color: transparent;
`;
const SendButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 10px;
  width: 100px;
  height: 40px;
`;
const ChatRoomInputGroup = styled.form`
  position: absolute;
  width: 1130px;
  height: 150px;
  bottom: 0;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

export default ChatPage;

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const ChatRoom = () => {
//   const [userId, setUserId] = useState('');
//   const [postId, setPostId] = useState('');
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:3000/chat');
//     setSocket(newSocket);
//     console.log('소켓 연결');
//     return () => {
//       newSocket.close();
//       console.log('소켓 연결 해제');
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       console.log('실행');
//       socket.on('send-message', (message) => {
//         console.log(message);
//         // setMessages((messages) => [...messages, message])
//       });
//     }
//   }, [socket]);

//   const handleSendMessage = (event) => {
//     event.preventDefault();
//     if (socket && inputMessage.trim() !== '') {
//       socket.emit('send-message', { chat_message: inputMessage, userId: userId, postId: postId });
//       setInputMessage('');
//     } else {
//       alert('전송 실패');
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSendMessage}>
//         <input value={userId} type="text" placeholder="Enter User ID" onChange={(e) => setUserId(e.target.value)} />
//         <input value={postId} type="text" placeholder="Enter Post ID" onChange={(e) => setPostId(e.target.value)} />
//         <input
//           value={inputMessage}
//           type="text"
//           placeholder="Enter Message"
//           onChange={(e) => setInputMessage(e.target.value)}
//         />
//         <button disabled={inputMessage === ''} type="submit">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// export default ChatRoom;
