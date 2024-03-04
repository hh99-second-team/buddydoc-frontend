import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import Input from '../components/common/Input';
import { Button } from '@radix-ui/themes';
import { Layout } from '../styles/GlobalStyles';
import ToggleSidebar from '../components/common/ToggleSideBar';
import { ChatBubbleIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { getDateFomat } from '../utils/dateUtils';

interface Message {
  userId: number;
  chatId: number;
  chat_message: string;
  createdAt: Date;
  users: {
    userNickname: string;
  };
}

const ChatPage = () => {
  const joinList = ['웹개발 프로젝트', '리액트 스터디', 'Node.js스터디'];
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setIsLastPage] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(30);

  const ENDPOINT = 'http://localhost:3000/chat';

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on('connect', () => console.log('Socket connected'));
    newSocket.on('read-Messages', handleReadMessages);

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

  const handleReadMessages = (data: { messages: Message[]; isLastPage: boolean }) => {
    try {
      console.log('Response<<');
      const receivedMessages = data.messages;
      console.log('Received messages:', receivedMessages);

      if (receivedMessages.length > 0 && receivedMessages[0].chatId === messages[messages.length - 1]?.chatId) {
        console.log('Duplicate message received, skipping...');
        return;
      }

      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);

      if (data.isLastPage) {
        setIsLastPage(true);
      } else {
        setLastMessageId(receivedMessages[receivedMessages.length - 1].chatId);
      }
    } catch (error) {
      console.error('Error while processing messages:', error);
    }
  };

  const sendMessage = (event: React.FormEvent, inputChatMessage: string) => {
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
          <ToggleSidebar title="채팅 목록" tabsItems={joinList}>
            <IconButton aria-label="Customise options">
              <ChatBubbleIcon />
            </IconButton>
          </ToggleSidebar>
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
                <ChatRoomLayout>
                  <ChatRoomBody>
                    {messages.map((message, index) => (
                      <div key={index}>
                        <ChatBox>{message.chat_message}</ChatBox>
                        <p>{getDateFomat(message.createdAt)}</p>
                      </div>
                    ))}
                  </ChatRoomBody>
                </ChatRoomLayout>
                <ChatRoomInputGroup>
                  <Input
                    type="text"
                    placeholder="메시지를 입력해주세요."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    isValid="none"
                  />
                  <SendButton onClick={(e) => sendMessage(e, inputMessage)}>
                    <PaperPlaneIcon />
                  </SendButton>
                </ChatRoomInputGroup>
              </>
            </Tabs.Content>
          ))}
        </ChatRoomContainer>
      </TabsRoot>
    </Layout>
  );
};

const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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

  @media screen and (max-width: 768px) {
    display: none;
  }
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
  margin: auto;
  width: 70%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ChatRoomTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #475f7b;
  padding-left: 1rem;
`;

const ChatRoomLayout = styled.div`
  height: 64vh;
  border-radius: 29.792px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;

  @media screen and (max-width: 768px) {
    display: grid;
    row-gap: 1rem;
  }
`;

const ChatRoomBody = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: grid;
  row-gap: 0.6rem;
  width: 100%;

  & > div {
    display: flex;
    align-items: end;
    column-gap: 0.5rem;

    & > p {
      font-size: 0.7rem;
      color: #626262;
    }
  }
`;

const ChatBox = styled.div`
  border: 1px solid var(--grey02, #e2e3e5);
  border-radius: 12px;
  padding: 0.4rem 1rem;
  background: white;
`;

const SendButton = styled(Button)`
  background-color: #475f7b;
  color: #fff;
  border: none;
  height: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media screen and (max-width: 768px) {
    border-radius: 0;
    height: 100%;
  }
`;

const IconButton = styled.button`
  display: none;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 3rem;
    height: 3rem;
    text-align: center;
    border-radius: 12px;
    border: 1px solid var(--grey02, #e2e3e5);
    background: white;

    & > svg {
      color: #475f7b;
    }
  }
`;

const ChatRoomInputGroup = styled.div`
  display: grid;
  grid-template-columns: 90% auto;
  gap: 10px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    bottom: 0;
    left: 0;
    grid-template-columns: 80% auto;
    gap: 0;
    position: fixed;
    width: 100%;

    & > input {
      border-radius: 0;
    }
  }
`;

export default ChatPage;
