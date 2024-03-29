import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Avatar, Box, Button } from '@radix-ui/themes';

const dummyDatas = [
  {
    category: '스터디',
    postTitle: '웹개발 스터디1',
    period: '2024.05.05 ~ 2025.05.05',
    participationStatus: '참여 완료',
  },
  {
    category: '프로젝트',
    postTitle: '웹 프로젝트2',
    period: '2024.05.05 ~ 2025.05.05',
    participationStatus: '참여 완료',
  },
];

function LikeList() {
  // 선택된 탭 상태관리
  const [selectedTab, setSelectedTab] = useState('스터디');
  // 참여중인 활동별 개수 상태관리
  const [studyCount, setStudyCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  // 페이지 렌더링 시 카테고리별 데이터 개수를 계산하여 useState에 설정
  useEffect(() => {
    const counts = dummyDatas.reduce(
      (acc, data) => {
        switch (data.category) {
          case '스터디':
            acc.study++;
            break;
          case '프로젝트':
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
      case '스터디':
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
            <ParticipationStatus>{data.participationStatus}</ParticipationStatus>
            <ContentButton>스터디 홈</ContentButton>
            <DateInfo>기간 : {data.period}</DateInfo>
          </ContentContainer>
        ));
      // category가 project인 데이터
      case '프로젝트':
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
            <ParticipationStatus>{data.participationStatus}</ParticipationStatus>
            <DateInfo>기간 : {data.period}</DateInfo>
            <ContentButton>프로젝트 홈</ContentButton>
          </ContentContainer>
        ));
      default:
        return <p>참여중인 목록이 없습니다.</p>;
    }
  };
  return (
    <>
      <SideMenuHeader>완료 목록</SideMenuHeader>
      <SideMenuDescription>기간이 지난 커피챗 목록, 완수한 스터디/프로젝트 목록입니다.</SideMenuDescription>
      <SideMenuBody>
        <Tabs.Root defaultValue="스터디">
          <StyledTabsList>
            <StyledTabsTrigger
              value="스터디"
              onClick={() => setSelectedTab('스터디')}
              aria-selected={selectedTab === '스터디' ? 'true' : 'false'}>
              {studyCount}
              <br />
              스터디
            </StyledTabsTrigger>
            <StyledTabsTrigger
              value="프로젝트"
              onClick={() => setSelectedTab('프로젝트')}
              aria-selected={selectedTab === '프로젝트' ? 'true' : 'false'}>
              {projectCount}
              <br />
              프로젝트
            </StyledTabsTrigger>
          </StyledTabsList>
          <Box pt="5" pb="2">
            <StyledTabsContent value="스터디">{renderData('스터디')}</StyledTabsContent>
            <StyledTabsContent value="프로젝트">{renderData('프로젝트')}</StyledTabsContent>
            <StyledTabsContent value="coffeeChat">{renderData('coffeeChat')}</StyledTabsContent>
          </Box>
        </Tabs.Root>
      </SideMenuBody>
    </>
  );
}

export default LikeList;

const SideMenuHeader = styled.div`
  color: #000;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const SideMenuDescription = styled.div`
  color: #000;
  text-align: center;
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
const ParticipationStatus = styled.h4`
  position: absolute;
  bottom: 10px;
  left: 30px;
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
const ContentButton = styled(Button)`
  position: absolute;
  background-color: #000;
  border-radius: 10px;
  font-weight: 800;
  font-size: 18px;
  top: 40px;
  right: 30px;
  width: 170px;
  height: 50px;
`;
