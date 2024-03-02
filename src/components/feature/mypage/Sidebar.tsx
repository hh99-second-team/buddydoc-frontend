import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

const SideBar: React.FC<{ tabTypes: string[] }> = ({ tabTypes }) => {
  const [selectedTab, setSelectedTab] = useState('ManageProfile');

  return (
    <TabsList>
      {tabTypes.map((tab) => (
        <StyledTrigger value={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
          {tab}
        </StyledTrigger>
      ))}
    </TabsList>
  );
};

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
