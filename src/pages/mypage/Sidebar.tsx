import * as Tabs from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

function SideBar() {
  const [selectedTab, setSelectedTab] = useState('ManageProfile');
  return (
    <SidebarContainer>
      <Tabs.List style={TabsListStyle}>
        {/* 사이드바 메뉴 - 프로필  */}
        <StyledTrigger
          value="ManageProfile"
          selected={selectedTab === 'ManageProfile'}
          onClick={() => setSelectedTab('ManageProfile')}>
          프로필
        </StyledTrigger>

        {/* 사이드바 메뉴 - 현재 참여 목록  */}
        <StyledTrigger
          value="JoinList"
          onClick={() => setSelectedTab('JoinList')}
          selected={selectedTab === 'JoinList'}>
          현재 참여 목록
        </StyledTrigger>

        {/* 사이드바 메뉴 - 내 신청 현황  */}
        <StyledTrigger
          value="ApplyList"
          onClick={() => setSelectedTab('ApplyList')}
          selected={selectedTab === 'ApplyList'}>
          내 신청 현황
        </StyledTrigger>

        {/* 사이드바 메뉴 - 관심 목록  */}
        <StyledTrigger
          value="LikeList"
          onClick={() => setSelectedTab('LikeList')}
          selected={selectedTab === 'LikeList'}>
          관심 목록
        </StyledTrigger>

        {/* 사이드바 메뉴 - 작성 목록  */}
        <StyledTrigger value="MyList" onClick={() => setSelectedTab('MyList')} selected={selectedTab === 'MyList'}>
          작성 목록
        </StyledTrigger>

        {/* 사이드바 메뉴 - 완료 목록  */}
        <StyledTrigger
          value="DoneList"
          onClick={() => setSelectedTab('DoneList')}
          selected={selectedTab === 'DoneList'}>
          완료 목록
        </StyledTrigger>

        {/* 사이드바 메뉴 - 알림  */}
        <StyledTrigger
          value="Settings"
          onClick={() => setSelectedTab('Settings')}
          selected={selectedTab === 'Settings'}>
          설정
        </StyledTrigger>
      </Tabs.List>
    </SidebarContainer>
  );
}

export default SideBar;

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const SidebarContainer = styled.div`
  width: 15%;
  height: 300px;
  box-sizing: border-box;
  padding: 20px 0px 0px 0px;
  margin: 20px 0px 0px 80px;
`;
const TabsListStyle = {
  display: 'flex',
  gap: '10px',
  flexDirection: 'column' as FlexDirection,
};
const StyledTrigger = styled(Tabs.Trigger)<{ selected: boolean }>`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-align: start;
  padding-left: 25px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #000;
      color: #fff;
    `}
`;
