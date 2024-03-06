import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@radix-ui/themes';
import Input from '../../../components/common/Input';
import styled from 'styled-components';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { getDateFomat } from '../../../utils';
import { JoinType } from '../../../types';
import CircleIcon from '../../common/CircleIcon';
import { motion } from 'framer-motion';

interface MessageType {
  userId: number;
  chatId: number;
  chat_message: string;
  createdAt: Date;
  users: {
    userNickname: string;
    profileImage: string;
  };
}

const ChatRoom: React.FC<{ post: JoinType }> = ({ post }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [, setIsLastPage] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const ENDPOINT = process.env.REACT_APP_API_ROOT + '/chat';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰을 가져옴
    const newSocket = io(ENDPOINT, {
      auth: {
        token: accessToken, // 토큰을 인증용 객체에 포함하여 전달
      },
    });
    setSocket(newSocket);

    newSocket.on('connect', () => console.log('Socket connected'));
    newSocket.on('read-Messages', handleReadMessages);

    return () => {
      newSocket.close();
      console.log('소켓 연결 끊김');
    };
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('요청 중');
      socket.emit('read-Messages', { postId: post.postId, lastMessageId });

      // 서버에서 새로운 메시지를 받으면 처리하는 코드
      const handleReceiveMessage = (data: MessageType) => {
        console.log('새로운 메시지 받음:', data);
        setMessages((prevMessages) => [data, ...prevMessages]);
      };

      socket.on('receive-message', handleReceiveMessage);

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 정리합니다.
        socket.off('receive-message', handleReceiveMessage);
      };
    }
  }, [socket, lastMessageId, post.postId]);

  const handleReadMessages = (data: { messages: MessageType[]; isLastPage: boolean }) => {
    try {
      console.log('응답');
      const receivedMessages = data.messages;
      console.log('Received messages:', receivedMessages);

      if (receivedMessages.length > 0 && receivedMessages[0].chatId === messages[messages.length - 1]?.chatId) {
        console.log('같은 메세지옴?');

        return;
      }

      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);

      if (data.isLastPage) {
        setIsLastPage(true);
      } else {
        setLastMessageId(receivedMessages[receivedMessages.length - 1].chatId);
      }
    } catch (error) {
      console.error('에러남', error);
    }
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
            <motion.div key={idx} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <ChatBox isSentByCurrentUser={message.userId.toString() === localStorage.getItem('userId')}>
                {message.userId.toString() !== localStorage.getItem('userId') && (
                  <CircleIcon src={message.users.profileImage} isProfile={true} />
                )}
                <ChatMessage>{message.chat_message}</ChatMessage>
                <MessageDate>{getDateFomat(message.createdAt)}</MessageDate>
              </ChatBox>
            </motion.div>
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

const ChatBox = styled.div<{ isSentByCurrentUser: boolean }>`
  display: flex;
  align-items: flex-end;
  column-gap: 0.5rem;
  justify-content: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? 'flex-end' : 'flex-start')};

  & > p {
    font-size: 0.7rem;
    color: #626262;
    margin: 0;
    order: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? -1 : 1)};
  }

  & > div {
    background-color: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? '#475f7b' : 'white')};
    color: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? 'white' : 'black')};
    border: ${({ isSentByCurrentUser }) =>
      isSentByCurrentUser ? '1px solid #3e546d' : '1px solid var(--grey02, #e2e3e5)'};
  }
`;

const ChatMessage = styled.div`
  border-radius: 12px;
  padding: 0.4rem 1rem;
`;

const MessageDate = styled.p`
  font-size: 0.7rem;
  color: #626262;
  margin: 0;
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
