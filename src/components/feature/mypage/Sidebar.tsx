import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const SideBar: React.FC<{ tabTypes: string[] }> = ({ tabTypes }) => {
  const [selectedTab, setSelectedTab] = useState('프로필');

  return (
    <>
      <TabsList>
        {tabTypes.map((tab, idx) => (
          <StyledTrigger key={idx} value={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
            {tab}
          </StyledTrigger>
        ))}
      </TabsList>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <IconButton aria-label="Customise options">
            <HamburgerMenuIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content sideOffset={5}>
            <SmallTabsList>
              {tabTypes.map((tab, idx) => (
                <DropdownMenu.Item key={idx}>
                  <StyledTrigger value={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
                    {tab}
                  </StyledTrigger>
                </DropdownMenu.Item>
              ))}
            </SmallTabsList>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SmallTabsList = styled(Tabs.List)`
  background-color: white;
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
    display: block;
    width: 3rem;
    height: 3rem;
    text-align: center;
    background: transparent;
    border: 1.3px solid #8e8e8e9f;
    border-radius: 12px;
  }
`;

export default SideBar;
