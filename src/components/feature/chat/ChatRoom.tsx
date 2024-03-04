import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@radix-ui/themes';
import Input from '../../../components/common/Input';
import styled from 'styled-components';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { getDateFomat } from '../../../utils';
import { JoinType } from '../../../types';

interface MessageType {
  userId: number;
  chatId: number;
  chat_message: string;
  createdAt: Date;
  users: {
    userNickname: string;
  };
}

const ChatRoom: React.FC<{ post: JoinType }> = ({ post }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [, setIsLastPage] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(30);
  const [socket, setSocket] = useState<Socket | null>(null);
  const ENDPOINT = process.env.REACT_APP_API_ROOT + '/chat';

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on('connect', () => console.log('Socket connected'));
    newSocket.on('read-Messages', handleReadMessages);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('read-Messages', { postId: 2, lastMessageId });
    }
  }, [socket, lastMessageId]);

  const handleReadMessages = (data: { messages: MessageType[]; isLastPage: boolean }) => {
    try {
      const receivedMessages = data.messages;
      console.log('Received messages:', receivedMessages);

      if (receivedMessages.length > 0 && receivedMessages[0].chatId === messages[messages.length - 1]?.chatId) {
        return;
      }

      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);

      if (data.isLastPage) {
        setIsLastPage(true);
      } else {
        setLastMessageId(receivedMessages[receivedMessages.length - 1].chatId);
      }
    } catch (error) {}
  };

  const sendMessage = (event: React.FormEvent, inputChatMessage: string) => {
    event.preventDefault();
    if (socket && inputMessage.trim() !== '') {
      socket.emit('send-message', {
        chat_message: inputChatMessage,
        userId: localStorage.getItem('userId'),
        postId: post.postId,
      });
      setInputMessage('');
    }
  };
  return (
    <>
      <ChatRoomTitle>{post.postTitle}</ChatRoomTitle>
      <ChatRoomLayout>
        <ChatRoomBody>
          {messages.map((message, idx) => (
            <div key={idx}>
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
  );
};

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
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  row-gap: 0.6rem;

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

const ChatRoomTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #475f7b;
  padding-left: 1rem;
  @media screen and (max-width: 768px) {
    width: 83%;
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
      background-color: white;
    }
  }
`;

export default ChatRoom;
