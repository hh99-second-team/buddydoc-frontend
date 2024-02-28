import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Avatar, Box, Button } from '@radix-ui/themes';
import api from '../../../services/api';
import { PostCardType } from '../../../types/commonTypes';

const dummyDatas = [
  {
    category: 'study',
    title: '웹 개발 모각코 스터디1',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: 'project',
    title: '웹 프로젝트1',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: 'project',
    title: '웹 프로젝트2',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
];

function MyPostList() {
  // 선택된 탭 상태관리
  const [selectedTab, setSelectedTab] = useState('study');

  // 참여중인 활동별 개수 상태관리
  const [studyCount, setStudyCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  // const [myPosts, setMyPosts] = useState<PostCardType>();

  // 내 정보 작성 게시글 목록 api 호출
  const fetchMyPosts = async () => {
    try {
      const response = await api.getMyPosts(); // API 호출
      console.log(response);
      // setMyPosts(response); // 가져온 정보를 상태에 저장
    } catch (error) {
      console.error('Error fetching my info:', error);
      // 에러 처리
    }
  };

  // 페이지 로드 시 내 정보 가져오기
  useEffect(() => {
    fetchMyPosts();
  }, []);

  // 페이지 렌더링 시 카테고리별 데이터 개수를 계산하여 useState에 설정
  useEffect(() => {
    const counts = dummyDatas.reduce(
      (acc, data) => {
        switch (data.category) {
          case 'study':
            acc.study++;
            break;
          case 'project':
            acc.project++;
            break;
          default:
            break;
        }
        return acc;
      },
      { study: 0, project: 0 }
    );
    setStudyCount(counts.study);
    setProjectCount(counts.project);
  }, []);

  // 각 활동 탭에 해당하는 데이터 분류해주는 함수
  const filteredData = dummyDatas.filter((data) => data.category === selectedTab);

  // 분류에 따라 content를 다르게 렌더링하는 함수
  const renderData = (category: string) => {
    switch (category) {
      // category가 study인 데이터
      case 'study':
        return filteredData.map((data, index) => (
          <ContentContainer key={index}>
            <CategoryContainer>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="studyIcon"
              />
              <Category>스터디</Category>
            </CategoryContainer>
            <Title>{data.title}</Title>
            <PostStatus>{data.postStatus}</PostStatus>
            <ContentButton>게시물 확인</ContentButton>
            <ContentButton color="gray" top="105px">
              신청자 관리
            </ContentButton>
            <DateInfo left="30px">작성일 : {data.postDate}</DateInfo>
            <DateInfo>마감일 : {data.endDate}</DateInfo>
          </ContentContainer>
        ));
      // category가 project인 데이터
      case 'project':
        return filteredData.map((data, index) => (
          <ContentContainer key={index}>
            <CategoryContainer>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="studyIcon"
              />
              <Category>프로젝트</Category>
            </CategoryContainer>
            <Title>{data.title}</Title>
            <PostStatus>{data.postStatus}</PostStatus>
            <ContentButton>프로젝트 홈</ContentButton>
            <ContentButton color="gray" top="105px">
              신청자 관리
            </ContentButton>
            <DateInfo left="30px">작성일 : {data.postDate}</DateInfo>
            <DateInfo>마감일 : {data.endDate}</DateInfo>
          </ContentContainer>
        ));
      default:
        return <p>신청한 목록이 없습니다.</p>;
    }
  };
  return (
    <>
      <SideMenuHeader>작성 목록</SideMenuHeader>
      <SideMenuDescription>내가 작성한 모집글입니다.</SideMenuDescription>
      <SideMenuBody>
        <Tabs.Root defaultValue="study">
          <StyledTabsList>
            <StyledTabsTrigger
              value="study"
              onClick={() => setSelectedTab('study')}
              aria-selected={selectedTab === 'study' ? 'true' : 'false'}>
              {studyCount}
              <br />
              스터디
            </StyledTabsTrigger>
            <StyledTabsTrigger
              value="project"
              onClick={() => setSelectedTab('project')}
              aria-selected={selectedTab === 'project' ? 'true' : 'false'}>
              {projectCount}
              <br />
              프로젝트
            </StyledTabsTrigger>
          </StyledTabsList>
          <Box pt="5" pb="2">
            <StyledTabsContent value="study">{renderData('study')}</StyledTabsContent>
            <StyledTabsContent value="project">{renderData('project')}</StyledTabsContent>
          </Box>
        </Tabs.Root>
      </SideMenuBody>
    </>
  );
}

export default MyPostList;

const SideMenuHeader = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const SideMenuDescription = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const SideMenuBody = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const StyledTabsList = styled(Tabs.List)`
  width: 900px;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const StyledTabsTrigger = styled(Tabs.Trigger)`
  width: 435px;
  height: 100px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  &[aria-selected='true'] {
    background-color: #000;
    color: #fff;
  }
`;
const StyledTabsContent = styled(Tabs.Content)`
  border: 2px solid black;
  border-radius: 10px;
  min-height: 200px;
  padding: 10px;
`;
const ContentContainer = styled.div`
  position: relative;
  min-height: 230px;
  background-color: #e6e6e6;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 15px;
`;
const CategoryContainer = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Category = styled.p`
  border: 2px solid gray;
  border-radius: 20px;
  padding: 1px 12px;
  font-size: 18px;
  font-weight: 700;
  background-color: #fff;
`;
const Title = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-top: 15px;
`;
const DateInfo = styled.p<{ left?: string }>`
  position: absolute;
  bottom: 30px;
  ${(props) => (props.left ? `left: ${props.left};` : 'right: 30px;')}
  margin: 0px;
  font-weight: 700;
  color: #787878;
  text-align: end;
`;
const PostStatus = styled.div`
  position: absolute;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 10px;
  top: 20px;
  right: 30px;
  padding: 3px 5px;
`;
const ContentButton = styled(Button)<{ top?: string }>`
  position: absolute;
  background-color: #000;
  border-radius: 10px;
  font-weight: 800;
  font-size: 18px;
  top: 60px;
  right: 30px;
  width: 170px;
  height: 50px;
`;
