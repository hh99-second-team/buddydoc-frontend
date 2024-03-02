import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import JoinList from '../components/feature/chat/tabs/JoinList';
import Settings from '../components/feature/mypage/tabs/Settings';
// import ChatPageSideBar from '../components/feature/chat/ChatPageSideBar';
// import ChatPageMain from '../components/feature/chat/ChatPageMain';

const ChatPage = () => {
  const tabTitle = ['현재참여목록', '채팅', '설정'];
  return (
    <Layout>
      <TabsRoot defaultValue="현재참여목록">
        <Tabs.List>
          <ChatRoomList>
            {tabTitle.map((title) => (
              <TabsTrigger key={title} value={title}>
                {title}
              </TabsTrigger>
            ))}
          </ChatRoomList>
        </Tabs.List>
        <TabsContentContainer>
          <Tabs.Content value="현재참여목록">
            <JoinList />
          </Tabs.Content>
          <Tabs.Content value="채팅">
            <TabsRoot defaultValue="채팅1">
              <Tabs.List>
                <ChatList>
                  <ChatListTitle>채팅</ChatListTitle>
                  <TabsTrigger value="채팅1" borderBottom="1px solid #B5B5B5">
                    채팅1
                  </TabsTrigger>
                  <TabsTrigger value="채팅2" borderBottom="1px solid #B5B5B5">
                    채팅2
                  </TabsTrigger>
                  <TabsTrigger value="채팅3">채팅3</TabsTrigger>
                </ChatList>
              </Tabs.List>
              <ChatScreen>
                <Tabs.Content value="채팅1">
                  <ChatRoomTitle>채팅방 제목1</ChatRoomTitle>
                </Tabs.Content>
                <Tabs.Content value="채팅2">
                  <ChatRoomTitle>채팅방 제목2</ChatRoomTitle>
                </Tabs.Content>
                <Tabs.Content value="채팅3">
                  <ChatRoomTitle>채팅방 제목3</ChatRoomTitle>
                </Tabs.Content>
              </ChatScreen>
            </TabsRoot>
          </Tabs.Content>
          <Tabs.Content value="설정">
            <Settings />
          </Tabs.Content>
        </TabsContentContainer>
      </TabsRoot>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  background: var(--grey01, #dadde2);
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
const TabsTrigger = styled(Tabs.Trigger)<{ borderBottom?: string }>`
  display: flex;
  width: 100%;
  height: 49px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: #7a7a7a;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.72px;
  border: none;
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
const ChatScreen = styled.div`
  width: 761px;
  height: 800px;
  flex-shrink: 0;
  margin: 0 0 0 30px;
  padding: 30px;
  background-color: transparent;
  border-radius: 12px;
`;
const ChatRoomTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
  border-radius: 12px;
  width: 700px;
  height: 84px;
  flex-shrink: 0;
  background-color: #fff;
  padding: 20px;
`;

export default ChatPage;
