import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import ManageProfile from './tabs/ManageProfile';
import ApplyList from './tabs/ApplyList';
import LikeList from './tabs/LikeList';
import MyPostList from './tabs/MyPostList';
import JoinList from './tabs/JoinList';
import DoneList from './tabs/DoneList';
import styled from 'styled-components';

function SideMenu() {
  return (
    <SideMenuContainer>
      {/* 프로필 관리 탭 */}
      <Tabs.Content value="ManageProfile" style={TabsContentStyle}>
        <ManageProfile />
      </Tabs.Content>

      {/* 현재 참여 목록 탭 */}
      <Tabs.Content value="JoinList" style={TabsContentStyle}>
        <JoinList />
      </Tabs.Content>

      {/* 내 신청 현황 탭 */}
      <Tabs.Content value="ApplyList" style={TabsContentStyle}>
        <ApplyList />
      </Tabs.Content>

      {/* 관심 목록 탭 */}
      <Tabs.Content value="LikeList" style={TabsContentStyle}>
        <LikeList />
      </Tabs.Content>

      {/* 작성 목록 탭 */}
      <Tabs.Content value="MyList" style={TabsContentStyle}>
        <MyPostList />
      </Tabs.Content>

      {/* 완료 목록 탭 */}
      <Tabs.Content value="DoneList" style={TabsContentStyle}>
        <DoneList />
      </Tabs.Content>

      {/* 설정 탭 */}
      <Tabs.Content value="Settings" style={TabsContentStyle}>
        설정 ( 와이어프레임 미완성 )
      </Tabs.Content>
    </SideMenuContainer>
  );
}

export default SideMenu;

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const SideMenuContainer = styled.div`
  width: 70%;
  min-height: 700px;
  box-sizing: border-box;
  padding: 20px 30px 30px 60px;
  margin: 20px 0px 0px 60px;
  display: flex;
  justify-content: start;
  background-color: #fff;
  border-radius: 20px;
`;
const TabsContentStyle = {
  display: 'flex',
  flexDirection: 'column' as FlexDirection,
  alignItems: 'start',
  gap: '10px',
};
