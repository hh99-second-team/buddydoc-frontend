import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import Input from '../components/common/Input';
import { Button } from '@radix-ui/themes';
import { Layout } from '../styles/GlobalStyles';

interface Message {
  chatId: number;
  chat_message: string;
}

const ChatPage: React.FC = () => {
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
