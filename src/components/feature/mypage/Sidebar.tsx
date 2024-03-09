import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import ToggleSidebar from '../../common/ToggleSideBar';
import { useNavigate, useParams } from 'react-router-dom';

const SideBar: React.FC<{ tabsNav: string[] }> = ({ tabsNav }) => {
  const { tabType } = useParams();

  const tabsNames: string[] = ['프로필', '현재 참여 목록', '내 신청 현황', '관심 목록', '작성 목록'];
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(tabType);

  const handleTab = (tab: string) => {
    setSelectedTab(tab);
    changeNavigate(tab);
  };

  const changeNavigate = (tab: string) => navigate(`/mypage/${tab}`);

  return (
    <Tabs.List>
      <SideMenuList>
        {tabsNav.map((tab, idx) => (
          <StyledTrigger key={idx} value={tab} selected={selectedTab === tab} onClick={() => handleTab(tab)}>
            {tabsNames[idx]}
          </StyledTrigger>
        ))}
      </SideMenuList>
      <ToggleSidebar
        title="마이페이지"
        tabsItems={tabsNav.map((tab) => tab)}
        changeNavigate={changeNavigate}
        tabsNames={tabsNames}>
        <IconButton aria-label="Customise options">
          <HamburgerMenuIcon />
        </IconButton>
      </ToggleSidebar>
    </Tabs.List>
  );
};

const SideMenuList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
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

export default SideBar;
