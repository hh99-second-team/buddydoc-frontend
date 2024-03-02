import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

function SideBar() {
  const [selectedTab, setSelectedTab] = useState('ManageProfile');

  return (
    <TabsList>
      {/* 사이드바 메뉴 - 프로필  */}
      <StyledTrigger
        value="ManageProfile"
        selected={selectedTab === 'ManageProfile'}
        onClick={() => setSelectedTab('ManageProfile')}>
        프로필
      </StyledTrigger>

      {/* 사이드바 메뉴 - 현재 참여 목록  */}
      <StyledTrigger value="JoinList" onClick={() => setSelectedTab('JoinList')} selected={selectedTab === 'JoinList'}>
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
      <StyledTrigger value="LikeList" onClick={() => setSelectedTab('LikeList')} selected={selectedTab === 'LikeList'}>
        관심 목록
      </StyledTrigger>

      {/* 사이드바 메뉴 - 작성 목록  */}
      <StyledTrigger value="MyList" onClick={() => setSelectedTab('MyList')} selected={selectedTab === 'MyList'}>
        작성 목록
      </StyledTrigger>

      {/* 사이드바 메뉴 - 완료 목록  */}
      {/* <StyledTrigger value="DoneList" onClick={() => setSelectedTab('DoneList')} selected={selectedTab === 'DoneList'}>
        완료 목록
      </StyledTrigger> */}
    </TabsList>
  );
}

const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    overflow: scroll;
  }
`;

const StyledTrigger = styled(Tabs.Trigger)<{ selected: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: start;
  transition: background-color 0.3s;
  background-color: ${(props) => props.selected && '#e2e3e5'};

  &:hover {
    background-color: #e2e3e5;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

export default SideBar;
