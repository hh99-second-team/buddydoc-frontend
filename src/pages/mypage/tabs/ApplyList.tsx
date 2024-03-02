import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Avatar, Box, Button } from '@radix-ui/themes';
import api from '../../../services/api';

const dummyDatas = [
  {
    category: '스터디',
    postTitle: '웹 개발 모각코 스터디1',
    applyDate: '2024.02.03',
    applyStatus: '대기중',
    memberCount: 5,
  },
  {
    category: '스터디',
    postTitle: '웹 개발 모각코 스터디2',
    applyDate: '2024.02.04',
    applyStatus: '불발',
    memberCount: 5,
  },
  {
    category: '프로젝트',
    postTitle: '웹 프로젝트1',
    applyDate: '20244.02.03',
    applyStatus: '불발',
    memberCount: 10,
  },
  {
    category: '프로젝트',
    postTitle: '웹 프로젝트2',
    applyDate: '20244.02.04',
    applyStatus: '대기중',
    memberCount: 11,
  },
];

function ApplyList() {
  // 선택된 탭 상태관리
  const [selectedTab, setSelectedTab] = useState('스터디');

  // 참여중인 활동별 개수 상태관리
  const [studyCount, setStudyCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  // 페이지 렌더링할때 카테고리별 데이터 개수를 계산하여 useState에 설정
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

  const mypageMainRender = (category: string) => {
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
            <MemberCount>{data.memberCount}</MemberCount>
            <ApplyStatus>{data.applyStatus}</ApplyStatus>
            <ContentButton>스터디 홈</ContentButton>
            <DateInfo>신청일 : {data.applyDate}</DateInfo>
          </ContentContainer>
        ));
      // category가 project인 데이터
      case '프로젝트':
        return filteredData.map((data, index) => (
          <ContentContainer key={index}>
            <CategoryContainer>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="projectIcon"
              />
              <Category>프로젝트</Category>
            </CategoryContainer>
            <Title>{data.postTitle}</Title>
            <MemberCount>{data.memberCount}</MemberCount>
            <ApplyStatus>{data.applyStatus}</ApplyStatus>
            <ContentButton>프로젝트 홈</ContentButton>
            <DateInfo>신청일 : {data.applyDate}</DateInfo>
          </ContentContainer>
        ));
      default:
        return <p>신청한 목록이 없습니다.</p>;
    }
  };

  // 각 활동 탭에 해당하는 데이터를 분류해주는 함수
  const filteredData = dummyDatas.filter((data) => data.category === selectedTab);

  return (
    <>
      <SideMenuHeader>내 신청 현황</SideMenuHeader>
      <SideMenuDescription>신청한 스터디/프로젝트/커피챗 목록입니다.</SideMenuDescription>
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

export default ApplyList;

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
const MemberCount = styled.p`
  position: absolute;
  bottom: 30px;
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
const ApplyStatus = styled.div`
  position: absolute;
  font-weight: 700;
  border: 2px solid black;
  border-radius: 10px;
  top: 20px;
  right: 30px;
  padding: 3px 5px;
  background-color: #fff;
`;
const ContentButton = styled(Button)`
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
