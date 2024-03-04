import React from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

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
                {tab}
              </StyledTabsTrigger>
            ))}
          </StyledTabsList>
          <CardList>{children}</CardList>
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
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  transition: border-bottom 0.3s;
  transition: color 0.3s;
  border-bottom: 2px solid transparent;
  color: var(--grey03, #ced0d3);
  &:hover {
    border-bottom: 2px solid #e6e6e6;
    color: darkgray;
  }
  &[aria-selected='true'] {
    border: none;
    background-color: transparent;
    color: black;
    border-bottom: 2px solid black;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const CardList = styled.div`
  margin-top: 2rem;
  & > div {
    display: grid;
    row-gap: 1.125rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: 1.4rem;
  }
`;

export default TabsContent;
