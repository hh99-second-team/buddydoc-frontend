import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import PostList from './components/PostList';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Layout } from '../../styles/GlobalStyles';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginOpenState, isSignupOpenState } from '../../store/atomDefinitions';
import { CheckIcon } from '@radix-ui/react-icons';
import { useQueryClient } from 'react-query';

const Main = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [, setIsLoginOpen] = useRecoilState(isLoginOpenState);
  const [, setIsSignupOpen] = useRecoilState(isSignupOpenState);
  const [isEnd, setIsEnd] = useState(false);

  const handleGatherBtn = () => {
    if (!localStorage.getItem('isLogin') || localStorage.getItem('isLogin') === 'false') {
      setIsLoginOpen(true);
      return;
    }
    navigate('/create');
  };

  useEffect(() => {
    if (localStorage.getItem('isLogin') === 'false') {
      setIsSignupOpen(true);
    }
  }, [setIsSignupOpen]);

  const handleToggleIsEnd = () => {
    queryClient.invalidateQueries();
    setIsEnd((state) => !state);
  };

  return (
    <>
      <Banner />
      <Layout>
        <TabsRoot defaultValue="all">
          <TabHeader>
            <TabsList aria-label="게시물 목록">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="스터디">스터디</TabsTrigger>
              <TabsTrigger value="프로젝트">프로젝트</TabsTrigger>
            </TabsList>
            <Button size="large" color="primary" onClick={handleGatherBtn}>
              팀원 모집하기
            </Button>
          </TabHeader>
          <Flex>
            <CheckboxRoot id="check" defaultChecked checked={isEnd} onCheckedChange={handleToggleIsEnd}>
              <CheckboxIndicator>
                <CheckIcon />
              </CheckboxIndicator>
            </CheckboxRoot>
            <Label htmlFor="check">모집 완료 글도 보기</Label>
          </Flex>
          <TabsContent value="all">
            <PostList key={isEnd.toString()} isEnd={isEnd} />
          </TabsContent>
          <TabsContent value="스터디">
            <PostList key={isEnd.toString()} postType="스터디" isEnd={isEnd} />
          </TabsContent>
          <TabsContent value="프로젝트">
            <PostList key={isEnd.toString()} postType="프로젝트" isEnd={isEnd} />
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
  cursor: pointer;
  background-color: white;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: left;
  user-select: none;
  color: var(--grey03, #ced0d3);
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

const CheckboxRoot = styled(Checkbox.Root)`
  all: unset;
  cursor: pointer;
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const CheckboxIndicator = styled(Checkbox.Indicator)`
  color: black; /* 해당 색상은 violet.violet11와 같은 색상으로 대체 가능합니다. */
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #4e4e4e;
`;

const Flex = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem 0.6rem 1rem 0;
`;

export default Main;
