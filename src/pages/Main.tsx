import React from 'react';
import Banner from '../components/feature/main/Banner';
import PostList from '../components/feature/main/PostList';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Layout } from '../styles/GlobalStyles';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <Banner />
      <Layout>
        <TabsRoot defaultValue="all">
          <TabHeader>
            <TabsList aria-label="게시물 목록">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="study">스터디</TabsTrigger>
              <TabsTrigger value="project">프로젝트</TabsTrigger>
            </TabsList>
            <Button size="large" color="primary" onClick={() => navigate('/create')}>
              팀원 모집하기
            </Button>
          </TabHeader>
          <TabsContent value="all">
            <PostList />
          </TabsContent>
          <TabsContent value="study">
            <PostList postType="study" />
          </TabsContent>
          <TabsContent value="project">
            <PostList postType="project" />
          </TabsContent>
        </TabsRoot>
      </Layout>
    </>
  );
};

const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: block;

    & > button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

const TabsList = styled(Tabs.List)`
  display: flex;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TabsTrigger = styled(Tabs.Trigger)`
  all: unset;
  background-color: white;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: left;
  user-select: none;
  color: var(--grey03, #ced0d3);
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 40px;

  &:hover {
    color: darkgray;
  }
  &[data-state='active'] {
    color: #000;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    justify-content: center;
    margin: 0 20px;
  }
`;

const TabsContent = styled(Tabs.Content)`
  flex-grow: 1;
  padding: 20;
  background-color: white;
  border-bottom-left-radius: 6;
  border-bottom-right-radius: 6;
  outline: none;
`;

export default Main;
