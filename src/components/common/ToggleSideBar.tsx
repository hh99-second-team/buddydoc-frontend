import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

interface Props {
  children: React.ReactNode;
  tabsItems: string[];
  title: string;
}

const ToggleSidebar = ({ children, tabsItems, title }: Props) => {
  const [isOpen, setIsopen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabsItems[0]);
  const handleToggleSidebar = () => setIsopen((state) => !state);
  const handleTrigger = (tab: string) => {
    setSelectedTab(tab);
    handleToggleSidebar();
  };

  return (
    <>
      <Navbar onClick={handleToggleSidebar}>{children}</Navbar>
      <Sidebar isOpen={isOpen}>
        <SidebarHeader>{title}</SidebarHeader>
        <SidebarBody>
          <SidebarList>
            {tabsItems.map((tab, idx) => (
              <StyledTrigger key={idx} value={tab} selected={selectedTab === tab} onClick={() => handleTrigger(tab)}>
                <p>{tab}</p>
              </StyledTrigger>
            ))}
          </SidebarList>
        </SidebarBody>
      </Sidebar>
      <SidebarOverlay isOpen={isOpen} onClick={handleToggleSidebar}></SidebarOverlay>
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

const Sidebar = styled.div<{ isOpen: boolean }>`
  padding: 7rem 1rem;
  width: 16rem;
  min-height: 100vh;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  z-index: 1;
  transition: left 0.5s;
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

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.5s, visibility 0.5s;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

const SidebarBody = styled.div`
  max-height: calc(100vh - 67px);
  overflow-x: hidden;
`;

const SidebarList = styled(Tabs.List)`
  width: 100%;
  margin-bottom: 0;
  padding: 0;
  display: grid;
  row-gap: 1.4rem;
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
  }
`;

export default ToggleSidebar;
