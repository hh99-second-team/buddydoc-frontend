// import React, { useEffect, useState } from 'react';
// import * as Tabs from '@radix-ui/react-tabs';
// import styled from 'styled-components';
// import JoinList from '../components/feature/chat/JoinList';
// import { Button } from '@radix-ui/themes';
// import Input from '../components/common/Input';
// import ChatScreen from '../components/feature/chat/ChatScreen';
// import { io } from 'socket.io-client';

// const ChatPage = () => {
//   const joinList = ['웹개발 프로젝트', '리액트 스터디', 'Node.js스터디'];
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const [lastMessageId, setLastMessagId] = useState(30);

//   // ENDPOINT 설정
//   const ENDPOINT = 'http://localhost:3000/chat';
//   // const ENDPOINT = "https://buddydoc.site:3000/chat"

//   // // 렌더링시 Socket 연결관리
//   // useEffect(() => {
//   //   // Socket 연결
//   //   const newSocket = io(ENDPOINT); // 기존 백엔드 서버
//   //   setSocket(newSocket); // 소켓 상태관리
//   //   return () => newSocket.close(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
//   // }, []);

//   // // 소켓 연결/해제 , 메시지 수신
//   // useEffect(() => {
//   //   if (socket) {
//   //     socket.on('connect', () => {
//   //       console.log('Socket connected');
//   //     });
//   //     //컴포넌트가 언마운트될 때 소켓 연결 해제
//   //     return () => {
//   //       socket.on('disconnect', () => {
//   //         console.log('Socket disconnected');
//   //       });
//   //     };
//   //   }
//   // }, [socket]);

//   useEffect(() => {
//     // Socket 연결
//     const newSocket = io(ENDPOINT); // 기존 백엔드 서버
//     setSocket(newSocket); // 소켓 상태관리

//     // Socket 연결 이벤트 리스너 추가
//     newSocket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     // 컴포넌트가 언마운트될 때 소켓 연결 해제
//     return () => {
//       // Socket 연결 해제
//       newSocket.close();
//       console.log('Socket disconnected');
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       console.log('시작');
//       // 메시지 수신 Request를 보냄
//       socket.emit('read-Messages', { postId: 2, lastMessageId: lastMessageId });
//       console.log('req 보내자마자 lastMessageId : ', lastMessageId);
//       // 메시지 수신 Response를 받음
//       socket.on('read-Messages', (data) => {
//         try {
//           console.log(data.messages, data.isLastPage);
//           const messagesData = data.messages;

//           // 채팅데이터의 마지막 페이지인지 확인
//           messagesData.forEach((element) => {
//             console.log(element['chatId'], element['users']['userNickname'], element['chat_message']);
//           });

//           // 마지막 메시지 ID 저장
//           console.log('로그찍고 나서의 lastMessageid', messagesData[messagesData.length - 1]['chatId']);
//           setLastMessagId(messagesData[messagesData.length - 1]['chatId']);
//           console.log('끝');
//         } catch (error) {
//           console.error('Error while processing messages:', error);
//         }
//       });
//     }
//   }, [socket]);

//   // 메시지 전송
//   const sendMessage = (event, inputChatMessage) => {
//     event.preventDefault();
//     if (socket && inputMessage.trim() !== '') {
//       socket.emit('send-message', { chat_message: inputChatMessage, userId: 1, postId: 2 });
//       // console.log(inputChatMessage);
//       setInputMessage('');
//     }
//   };

//   const createChatRoom = (chatRoomTitle) => {
//     return (
//       <>
//         {/* 채팅방 이름 */}
//         <ChatRoomTitle>{chatRoomTitle}</ChatRoomTitle>
//         {/* 채팅방 영역 */}
//         <ChatRoomBody>
//           <ul></ul>
//         </ChatRoomBody>
//         {/* 입력창 및 전송버튼 */}
//         <ChatRoomInputGroup>
//           <Input
//             type="text"
//             placeholder="메시지 입력"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//           />
//           <SendButton onClick={(e) => sendMessage(e, inputMessage)}>전송</SendButton>
//         </ChatRoomInputGroup>
//       </>
//     );
//   };

//   return (
//     <Layout>
//       <TabsRoot defaultValue={joinList[0] ? joinList[0] : ''}>
//         <Tabs.List>
//           <ChatList>
//             <ChatListTitle>채팅</ChatListTitle>
//             {joinList.map((item) => (
//               <TabsTrigger key={item} value={item}>
//                 {item}
//               </TabsTrigger>
//             ))}
//           </ChatList>
//         </Tabs.List>
//         <ChatRoomContainer>
//           {joinList.map((item) => (
//             <Tabs.Content key={item} value={item}>
//               {createChatRoom(item)}
//             </Tabs.Content>
//           ))}
//         </ChatRoomContainer>
//       </TabsRoot>
//     </Layout>
//   );
// };

// const Layout = styled.div`
//   display: flex;
//   background: var(--grey01, #bbbbbb); // 색상 임의 변경
// `;
// const TabsRoot = styled(Tabs.Root)`
//   display: flex;
//   flex-direction: row;
// `;
// const ChatRoomList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   width: 200px;
//   height: 100%;
//   flex-shrink: 0;
//   padding-top: 60px;
//   background-color: #fff;
// `;
// // const TabsTrigger = styled(Tabs.Trigger)<{ borderBottom?: string }>`
// const TabsTrigger = styled(Tabs.Trigger)`
//   width: 100%;
//   height: 49px;
//   padding: 8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
//   color: #7a7a7a;
//   text-align: center;
//   font-family: Pretendard;
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 800;
//   line-height: normal;
//   letter-spacing: 0.72px;
//   border: none;
//   margin-bottom: 10px;
//   border-radius: 15px;
//   transition: 0.3s;
//   ${(props) => (props.borderBottom ? `border-bottom: ${props.borderBottom};` : 'border-bottom: 30px;')}
//   &:hover {
//     background: #7a7a7a;
//     color: #fff;
//   }
// `;
// const TabsContentContainer = styled.div`
//   width: 1500px;
//   height: 800px;
//   display: flex;
//   flex-direction: row;
//   box-sizing: border-box;
//   margin: 40px 0 0 40px;
// `;
// const ChatList = styled.div`
//   width: 346px;
//   height: 800px;
//   flex-shrink: 0;
//   border-radius: 12px;
//   background: #fff;
// `;
// const ChatListTitle = styled.div`
//   color: #000;
//   text-align: start;
//   font-family: Pretendard;
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
//   padding: 20px;
// `;
// const ChatRoomContainer = styled.div`
//   position: relative;
//   width: 1200px;
//   height: 800px;
//   flex-shrink: 0;
//   margin-left: 20px;
//   padding: 0 30px 30px 30px;
//   background-color: transparent;
//   border-radius: 12px;
// `;
// const ChatRoomTitle = styled.div`
//   width: 1130px;
//   height: 84px;
//   font-size: 26px;
//   font-weight: 700;
//   border-radius: 12px;
//   flex-shrink: 0;
//   background-color: #fff;
//   padding: 20px;
// `;
// const ChatRoomBody = styled.div`
//   width: 1130px;
//   height: 565px;
//   padding: 0 30px;
//   border-radius: 10px;
//   background-color: transparent;
// `;
// const SendButton = styled(Button)`
//   position: absolute;
//   right: 20px;
//   bottom: 10px;
//   width: 100px;
//   height: 40px;
// `;
// const ChatRoomInputGroup = styled.form`
//   position: absolute;
//   width: 1130px;
//   height: 150px;
//   bottom: 0;
//   border-radius: 10px;
//   background-color: #fff;
//   display: flex;
//   flex-direction: row;
// `;

// export default ChatPage;

// -------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import * as Tabs from '@radix-ui/react-tabs';
// import styled from 'styled-components';
// import { io } from 'socket.io-client';
// import Input from '../components/common/Input';
// import { Button } from '@radix-ui/themes';

// const ChatPage = () => {
//   const joinList = ['웹개발 프로젝트', '리액트 스터디', 'Node.js스터디'];
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const [lastMessageId, setLastMessageId] = useState(30);

//   const ENDPOINT = 'http://localhost:3000/chat';

//   useEffect(() => {
//     const newSocket = io(ENDPOINT);
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     return () => {
//       newSocket.close();
//       console.log('Socket disconnected');
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       console.log('Requesting messages');
//       socket.emit('read-Messages', { postId: 2, lastMessageId });
//     }
//   }, [socket, lastMessageId]);

//   useEffect(() => {
//     if (socket) {
//       socket.on('read-Messages', (data) => {
//         try {
//           console.log('Received messages:', data.messages);
//           const receivedMessages = data.messages;
//           const updatedMessages = [...messages, ...receivedMessages];
//           setMessages(updatedMessages);

//           if (data.isLastPage) {
//             setIsLastPage(true);
//           } else {
//             setLastMessageId(receivedMessages[receivedMessages.length - 1].chatId);
//           }
//         } catch (error) {
//           console.error('Error while processing messages:', error);
//         }
//       });
//     }
//   }, [socket, messages]);

//   const sendMessage = (event, inputChatMessage) => {
//     event.preventDefault();
//     if (socket && inputMessage.trim() !== '') {
//       socket.emit('send-message', { chat_message: inputChatMessage, userId: 1, postId: 2 });
//       setInputMessage('');
//     }
//   };

//   return (
//     <Layout>
//       <TabsRoot defaultValue={joinList[0] ? joinList[0] : ''}>
//         <Tabs.List>
//           <ChatList>
//             <ChatListTitle>채팅</ChatListTitle>
//             {joinList.map((item) => (
//               <TabsTrigger key={item} value={item}>
//                 {item}
//               </TabsTrigger>
//             ))}
//           </ChatList>
//         </Tabs.List>
//         <ChatRoomContainer>
//           {joinList.map((item) => (
//             <Tabs.Content key={item} value={item}>
//               <>
//                 <ChatRoomTitle>{item}</ChatRoomTitle>
//                 <ChatRoomBody>
//                   <ul>
//                     {messages.map((message, index) => (
//                       <li key={index}>{message.chat_message}</li>
//                     ))}
//                   </ul>
//                 </ChatRoomBody>
//                 <ChatRoomInputGroup>
//                   <Input
//                     type="text"
//                     placeholder="메시지 입력"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                   />
//                   <SendButton onClick={(e) => sendMessage(e, inputMessage)}>전송</SendButton>
//                 </ChatRoomInputGroup>
//               </>
//             </Tabs.Content>
//           ))}
//         </ChatRoomContainer>
//       </TabsRoot>
//     </Layout>
//   );
// };

// const Layout = styled.div`
//   display: flex;
//   background: var(--grey01, #bbbbbb); // 색상 임의 변경
// `;
// const TabsRoot = styled(Tabs.Root)`
//   display: flex;
//   flex-direction: row;
// `;
// const ChatRoomList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   width: 200px;
//   height: 100%;
//   flex-shrink: 0;
//   padding-top: 60px;
//   background-color: #fff;
// `;
// // const TabsTrigger = styled(Tabs.Trigger)<{ borderBottom?: string }>`
// const TabsTrigger = styled(Tabs.Trigger)`
//   width: 100%;
//   height: 49px;
//   padding: 8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
//   color: #7a7a7a;
//   text-align: center;
//   font-family: Pretendard;
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 800;
//   line-height: normal;
//   letter-spacing: 0.72px;
//   border: none;
//   margin-bottom: 10px;
//   border-radius: 15px;
//   transition: 0.3s;
//   ${(props) => (props.borderBottom ? `border-bottom: ${props.borderBottom};` : 'border-bottom: 30px;')}
//   &:hover {
//     background: #7a7a7a;
//     color: #fff;
//   }
// `;
// const TabsContentContainer = styled.div`
//   width: 1500px;
//   height: 800px;
//   display: flex;
//   flex-direction: row;
//   box-sizing: border-box;
//   margin: 40px 0 0 40px;
// `;
// const ChatList = styled.div`
//   width: 346px;
//   height: 800px;
//   flex-shrink: 0;
//   border-radius: 12px;
//   background: #fff;
// `;
// const ChatListTitle = styled.div`
//   color: #000;
//   text-align: start;
//   font-family: Pretendard;
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
//   padding: 20px;
// `;
// const ChatRoomContainer = styled.div`
//   position: relative;
//   width: 1200px;
//   height: 800px;
//   flex-shrink: 0;
//   margin-left: 20px;
//   padding: 0 30px 30px 30px;
//   background-color: transparent;
//   border-radius: 12px;
// `;
// const ChatRoomTitle = styled.div`
//   width: 1130px;
//   height: 84px;
//   font-size: 26px;
//   font-weight: 700;
//   border-radius: 12px;
//   flex-shrink: 0;
//   background-color: #fff;
//   padding: 20px;
// `;
// const ChatRoomBody = styled.div`
//   width: 1130px;
//   height: 565px;
//   padding: 0 30px;
//   border-radius: 10px;
//   background-color: transparent;
// `;
// const SendButton = styled(Button)`
//   position: absolute;
//   right: 20px;
//   bottom: 10px;
//   width: 100px;
//   height: 40px;
// `;
// const ChatRoomInputGroup = styled.form`
//   position: absolute;
//   width: 1130px;
//   height: 150px;
//   bottom: 0;
//   border-radius: 10px;
//   background-color: #fff;
//   display: flex;
//   flex-direction: row;
// `;

// export default ChatPage;

// --------------------------------------------------

import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import Input from '../components/common/Input';
import { Button } from '@radix-ui/themes';

const ChatPage = () => {
  const joinList = ['웹개발 프로젝트', '리액트 스터디', 'Node.js스터디'];
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(30);

  const ENDPOINT = 'http://localhost:3000/chat';

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    return () => {
      newSocket.close();
      console.log('Socket disconnected');
    };
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('Requesting>>');
      socket.emit('read-Messages', { postId: 2, lastMessageId });
    }
  }, [socket, lastMessageId]);

  useEffect(() => {
    if (socket) {
      console.log('Response<<');
      socket.on('read-Messages', (data) => {
        try {
          console.log('Received messages:', data.messages);
          const receivedMessages = data.messages;

          // 첫 번째 메시지의 chatId를 확인하여 중복을 방지
          if (receivedMessages.length > 0 && receivedMessages[0].chatId === messages[messages.length - 1]?.chatId) {
            console.log('Duplicate message received, skipping...');
            return;
          }

          const updatedMessages = [...messages, ...receivedMessages];
          setMessages(updatedMessages);

          if (data.isLastPage) {
            setIsLastPage(true);
          } else {
            setLastMessageId(receivedMessages[receivedMessages.length - 1].chatId);
          }
        } catch (error) {
          console.error('Error while processing messages:', error);
        }
      });
    }
  }, [socket, messages]);

  const sendMessage = (event, inputChatMessage) => {
    event.preventDefault();
    if (socket && inputMessage.trim() !== '') {
      socket.emit('send-message', { chat_message: inputChatMessage, userId: 1, postId: 2 });
      setInputMessage('');
    }
  };

  return (
    <Layout>
      <TabsRoot defaultValue={joinList[0] ? joinList[0] : ''}>
        <Tabs.List>
          <ChatRoomList>
            <ChatRoomTitle>채팅</ChatRoomTitle>
            {joinList.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </ChatRoomList>
        </Tabs.List>
        <ChatRoomContainer>
          {joinList.map((item) => (
            <Tabs.Content key={item} value={item}>
              <>
                <ChatRoomTitle>{item}</ChatRoomTitle>
                <ChatRoomBody>
                  <ul>
                    {messages.map((message, index) => (
                      <li key={index}>{message.chat_message}</li>
                    ))}
                  </ul>
                </ChatRoomBody>
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
  letter-spacing: 0.03em;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    background-color: var(--grey03);
    color: #0b7cad;
  }
  &:focus {
    outline: none;
  }
  &[data-state='active'] {
    background-color: var(--grey03);
    color: #0b7cad;
  }
`;
const ChatRoomContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 40px;
  background: #fff;
`;
const ChatRoomTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;
const ChatRoomBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
const ChatRoomInputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
const SendButton = styled(Button)`
  background-color: #1dc9b7;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #15a18a;
  }
`;

export default ChatPage;
