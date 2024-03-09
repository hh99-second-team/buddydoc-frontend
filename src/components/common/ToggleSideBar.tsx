import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

interface Props {
  children: React.ReactNode;
  tabsItems: string[];
  tabsNames?: string[];
  title: string;
  changeNavigate: (tab: string) => void;
}

const ToggleSidebar = ({ children, tabsItems, tabsNames, title, changeNavigate }: Props) => {
  const [isOpen, setIsopen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabsItems[0]);
  const handleToggleSidebar = () => setIsopen((state) => !state);
  const handleTrigger = (tab: string) => {
    setSelectedTab(tab);
    handleToggleSidebar();
    changeNavigate(tab);
  };

  return (
    <>
      <Navbar onClick={handleToggleSidebar}>{children}</Navbar>
      <Sidebar $isopen={isOpen ? 'true' : 'false'}>
        <SidebarHeader>{title}</SidebarHeader>
        <SidebarBody>
          <SidebarList>
            {tabsItems.map((tab, idx) => (
              <StyledTrigger key={idx} value={tab} selected={selectedTab === tab} onClick={() => handleTrigger(tab)}>
                <p>{tabsNames ? tabsNames[idx] : tab}</p>
              </StyledTrigger>
            ))}
          </SidebarList>
        </SidebarBody>
      </Sidebar>
      <SidebarOverlay $isopen={isOpen ? 'true' : 'false'} onClick={handleToggleSidebar}></SidebarOverlay>
    </>
  );
};

const Navbar = styled.nav`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-self: center;
  align-items: center;
`;

const Sidebar = styled.div<{ $isopen: 'true' | 'false' }>`
  padding: 7rem 1rem 0 1rem;
  width: 16rem;
  min-height: 100vh;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: ${({ $isopen }) => ($isopen === 'true' ? '0' : '-100%')};
  z-index: 1;
  transition: left 0.5s;
  z-index: 1001;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.7rem;
  font-weight: 600;
  color: #475f7b;
  padding-left: 0.3rem;
`;

const SidebarOverlay = styled.div<{ $isopen: 'true' | 'false' }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.5s, visibility 0.5s;
  opacity: ${({ $isopen }) => ($isopen === 'true' ? '1' : '0')};
  visibility: ${({ $isopen }) => ($isopen === 'true' ? 'visible' : 'hidden')};
  z-index: 1000;
`;

const SidebarBody = styled.div`
  max-height: calc(100vh - 67px);
  overflow-x: hidden;
  height: 74vh;
  overflow-y: scroll;
`;

const SidebarList = styled(Tabs.List)`
  width: 100%;
  margin-bottom: 0;
  padding: 0;
  display: grid;
  row-gap: 1.6rem;
  margin-top: 2rem;
`;

const StyledTrigger = styled(Tabs.Trigger)<{ selected: boolean }>`
  width: 100%;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => (props.selected ? 'black' : '#CED0D3')};
  text-align: left;
  border: none;
  display: grid;
  & > p {
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export default ToggleSidebar;
