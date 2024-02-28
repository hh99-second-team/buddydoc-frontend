import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Avatar, Box, Button } from '@radix-ui/themes';

const dummyDatas = [
  {
    category: 'study',
    postTitle: '웹 개발 모각코 스터디1',
    postStatus: '모집중',
    startDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: 'project',
    postTitle: '웹 프로젝트1',
    postStatus: '모집중',
    startDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: 'project',
    postTitle: '웹 프로젝트2',
    postStatus: '모집중',
    startDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: 'coffeeChat',
    MentorName: 'JY Kim',
    companyName: 'company A',
    scheduledDate: '2024.01.01',
    scheduledTime: '21시',
    devPosition: '개발팀 프론트엔드',
    postStatus: '모집중',
    career: 5,
  },
];

function MyPostList() {
  // 선택된 탭 상태관리
  const [selectedTab, setSelectedTab] = useState('study');

  // 참여중인 활동별 개수 상태관리
  const [studyCount, setStudyCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [coffeeChatCount, setCoffeeChatCount] = useState(0);

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
          case 'coffeeChat':
            acc.coffeeChat++;
            break;
          default:
            break;
        }
        return acc;
      },
      { study: 0, project: 0, coffeeChat: 0 }
    );
    setStudyCount(counts.study);
    setProjectCount(counts.project);
    setCoffeeChatCount(counts.coffeeChat);
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
            <Title>{data.postTitle}</Title>
            <PostStatus>{data.postStatus}</PostStatus>
            <ContentButton>게시물 확인</ContentButton>
            <ContentButton color="gray" top="105px">
              신청자 관리
            </ContentButton>
            <DateInfo left="30px">작성일 : {data.startDate}</DateInfo>
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
            <Title>{data.postTitle}</Title>
            <PostStatus>{data.postStatus}</PostStatus>
            <ContentButton>프로젝트 홈</ContentButton>
            <ContentButton color="gray" top="105px">
              신청자 관리
            </ContentButton>
            <DateInfo left="30px">작성일 : {data.startDate}</DateInfo>
            <DateInfo>마감일 : {data.endDate}</DateInfo>
          </ContentContainer>
        ));
      // category가 coffeeChat인 데이터
      case 'coffeeChat':
        return filteredData.map((data, index) => (
          <ContentContainer key={index}>
            <CategoryContainer>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="studyIcon"
              />
              <Category>커피챗</Category>
            </CategoryContainer>
            <MentorInfoContainer>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="MentorProfileImage"
                size="7"
                radius="full"
              />
              <MentorInfoText>
                <MentorName>{data.MentorName}</MentorName>
                <CompanyName>{data.companyName}</CompanyName>
                <MentorCareer>
                  {data.devPosition} / {data.career}년
                </MentorCareer>
              </MentorInfoText>
            </MentorInfoContainer>
            <ScheduledDate>
              예정된 커피챗 : {data.scheduledDate}
              <br />
              {data.scheduledTime}
            </ScheduledDate>
            <PostStatus>{data.postStatus}</PostStatus>
            <ContentButton>파트너 홈</ContentButton>
            <ContentButton color="gray" top="105px">
              신청자 관리
            </ContentButton>
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
            <StyledTabsTrigger
              value="coffeeChat"
              onClick={() => setSelectedTab('coffeeChat')}
              aria-selected={selectedTab === 'coffeeChat' ? 'true' : 'false'}>
              {coffeeChatCount}
              <br />
              커피챗
            </StyledTabsTrigger>
          </StyledTabsList>
          <Box pt="5" pb="2">
            <StyledTabsContent value="study">{renderData('study')}</StyledTabsContent>
            <StyledTabsContent value="project">{renderData('project')}</StyledTabsContent>
            <StyledTabsContent value="coffeeChat">{renderData('coffeeChat')}</StyledTabsContent>
          </Box>
        </Tabs.Root>
      </SideMenuBody>
    </>
  );
}

export default MyPostList;

const SideMenuHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const SideMenuDescription = styled.div`
  font-size: 15px;
  font-weight: bold;
`;
const SideMenuBody = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const StyledTabsList = styled(Tabs.List)`
  width: 700px;
  height: 90px;
  display: flex;
  justify-content: space-between;
`;
const StyledTabsTrigger = styled(Tabs.Trigger)`
  width: 220px;
  height: 100%;
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
  min-height: 170px;
  background-color: lightgray;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 15px;
`;
const CategoryContainer = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Category = styled.p`
  border: 2px solid black;
  border-radius: 20px;
  padding: 1px 10px;
  background-color: #fff;
`;
const Title = styled.h3``;
const DateInfo = styled.p<{ left?: string }>`
  position: absolute;
  bottom: 30px;
  ${(props) => (props.left ? `left: ${props.left};` : 'right: 30px;')}
  margin: 0px;
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
  background-color: ${(props) => props.color || '#000'};
  border-radius: 10px;
  top: ${(props) => props.top || '60px'};
  right: 30px;
  width: 150px;
  height: 40px;
`;
const MentorName = styled.h2`
  margin-bottom: 0px;
`;
const CompanyName = styled.p`
  margin: 0px;
`;
const MentorCareer = styled.p``;
const MentorInfoContainer = styled.p`
  margin: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const MentorInfoText = styled.p``;
const ScheduledDate = styled.p`
  position: absolute;
  bottom: 30px;
  right: 30px;
  margin: 0px;
  display: flex;
  text-align: end;
`;
