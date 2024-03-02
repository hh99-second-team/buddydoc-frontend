import React from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Box } from '@radix-ui/themes';

interface Props {
  tabTypes: string[];
  header: string;
  description: string;
  children: React.ReactNode;
  selectedTab: string;
  setSelectedTab: any;
}

const TabsContent = ({ tabTypes, header, description, children, selectedTab, setSelectedTab }: Props) => {
  return (
    <>
      <SideMenuHeader>{header}</SideMenuHeader>
      <SideMenuDescription>{description}</SideMenuDescription>
      <SideMenuBody>
        <Tabs.Root defaultValue={tabTypes[0]}>
          <StyledTabsList>
            {tabTypes.map((tab) => (
              <StyledTabsTrigger value={tab} onClick={() => setSelectedTab(tab)} aria-selected={selectedTab === tab}>
                {1}개의 {tab}
              </StyledTabsTrigger>
            ))}
          </StyledTabsList>
          <Box pt="5" pb="2">
            {children}
          </Box>
        </Tabs.Root>
      </SideMenuBody>
    </>
  );
};

const SideMenuHeader = styled.div`
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SideMenuDescription = styled.div`
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SideMenuBody = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const StyledTabsList = styled(Tabs.List)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2vw;
`;

const StyledTabsTrigger = styled(Tabs.Trigger)`
  padding: 1rem 0;
  border-radius: 12px;
  border: 2px solid #e6e6e6;
  background-color: #e6e6e6;
  font-size: 18px;
  font-weight: bold;
  transition: border 0.3s;
  &:hover {
    border: 2px solid black;
  }
  &[aria-selected='true'] {
    border: 2px solid black;
    background-color: black;
    color: white;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 0;
    border: none;
    border-radius: 0;
    font-size: 18px;
    font-weight: bold;
    background: transparent;
    transition: border-bottom 0.3s;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid #e6e6e6;
    }
    &[aria-selected='true'] {
      border-bottom: 2px solid black;
    }
  }
`;

export default TabsContent;
