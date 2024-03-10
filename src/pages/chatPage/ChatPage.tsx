import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import { Layout } from '../../styles/GlobalStyles';
import ToggleSidebar from '../../components/ToggleSideBar';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { useQuery } from 'react-query';
import api from '../../api';
import { ChatRoomType } from '../../types';
import ChatRoom from './components/ChatRoom';

const ChatPage = () => {
  const { data } = useQuery<ChatRoomType[]>(['chatList'], () => api.getChatRoomList());
  const [, setSelectedTab] = useState(data ? data[0].postTitle : '');

  return (
    <Layout>
      {data ? (
        <TabsRoot defaultValue={data[0].postTitle}>
          <Tabs.List>
            <ToggleSidebar title="채팅 목록" tabsItems={data.map((item) => item.postTitle)} changeNavigate={() => {}}>
              <IconButton aria-label="Customise options">
                <ChatBubbleIcon />
              </IconButton>
            </ToggleSidebar>
            <ChatRoomList>
              <ChatRoomTitle>채팅 목록</ChatRoomTitle>
              <div>
                {data.map((item, idx) => (
                  <TabsTrigger key={idx} value={item.postTitle} onClick={() => setSelectedTab(item.postTitle)}>
                    <p>{item.postTitle}</p>
                  </TabsTrigger>
                ))}
              </div>
            </ChatRoomList>
          </Tabs.List>
          <ChatRoomContainer>
            {data.map((item, idx) => (
              <Tabs.Content key={idx} value={item.postTitle}>
                <ChatRoom post={item} />
              </Tabs.Content>
            ))}
          </ChatRoomContainer>
        </TabsRoot>
      ) : (
        <EmptyMessage>스터디 / 프로젝트에 참여해주세요!</EmptyMessage>
      )}
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

  & > div {
    height: 60vh;
    overflow-y: scroll;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ChatRoomContainer = styled.div`
  margin: auto;
  width: 70%;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 2.5rem;
  }
`;

const TabsTrigger = styled(Tabs.Trigger)`
  width: 100%;
  padding: 8px;
  display: flex;
  gap: 8px;
  color: #7a7a7a;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.03em;
  border: none;
  background: none;
  cursor: pointer;
  padding-left: 1rem;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

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

const IconButton = styled.button`
  display: none;

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

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 5vh;
`;

export default ChatPage;
