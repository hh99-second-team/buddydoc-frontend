import * as Tabs from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const dummyDatas = [
  {
    category: 'study',
    title: '풀스택 스터디',
    memberCount: 7,
  },
  {
    category: 'study',
    title: 'REACT 스터디',
    memberCount: 5,
  },
  {
    category: 'study',
    title: 'NodeJS 스터디',
    memberCount: 2,
  },
  {
    category: 'project',
    title: '웹 개발 프로젝트1',
    myPosition: '프론트엔드',
    memberCount: 7,
  },
  {
    category: 'project',
    title: '웹 개발 프로젝트2',
    myPosition: '프론트엔드',
    memberCount: 10,
  },
  {
    category: 'coffeeChat',
    mentorName: 'JH Kim',
    mentorCompanyName: '회사명',
    mentorPosition: '백엔드',
    mentorCareer: 5,
    mentorCoffChatCount: 20,
    mentorIntroduce: '개발독학으로 한번에 입사하는 비법과 면접꿀팁을 알려드립니다.',
  },
];

function JoinListContent() {
  // 현재 선택된 탭 상태 관리
  const [selectedTab, setSelectedTab] = useState('study');
  // 참여중인 활동별 개수 상태관리
  const [studyCount, setStudyCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [coffeeChatCount, setCoffeeChatCount] = useState(0);

  // 멤버 이미지 리턴함수
  const memberImage = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M17.5992 12.5452C18.7609 13.4132 19.7992 15.5986 19.7992 16.9452C19.7992 17.3647 19.4931 17.7047 19.1156 17.7047H18.6992M14.2992 8.98743C15.0507 8.5527 15.5564 7.74015 15.5564 6.80951C15.5564 5.87887 15.0507 5.06633 14.2992 4.63159M2.88284 17.7047H14.9251C15.3027 17.7047 15.6087 17.3647 15.6087 16.9452C15.6087 14.3083 13.4057 12.1707 8.90398 12.1707C4.40221 12.1707 2.19922 14.3083 2.19922 16.9452C2.19922 17.3647 2.50529 17.7047 2.88284 17.7047ZM11.4183 6.80951C11.4183 8.19811 10.2926 9.3238 8.90398 9.3238C7.51538 9.3238 6.38969 8.19811 6.38969 6.80951C6.38969 5.42091 7.51538 4.29523 8.90398 4.29523C10.2926 4.29523 11.4183 5.42091 11.4183 6.80951Z"
          stroke="black"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    );
  };

  useEffect(() => {
    // 페이지 렌더링 시 카테고리별 데이터 개수를 계산하여 useState에 설정
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

  const renderData = (category: string) => {
    switch (category) {
      // category가 study인 데이터
      case 'study':
        return filteredData.map((data, index) => (
          <CardContainer key={index}>
            <CardUpperArea>{data.memberCount}</CardUpperArea>
            <CardLowerArea>
              <CardTitle>{data.title}</CardTitle>
              <CardMemberCount>
                {memberImage()}
                {data.memberCount}명
              </CardMemberCount>
            </CardLowerArea>
          </CardContainer>
        ));
      // category가 project인 데이터
      case 'project':
        return filteredData.map((data, index) => (
          <CardContainer key={index}>
            <CardUpperArea>{data.memberCount}</CardUpperArea>
            <CardLowerArea>
              <CardTitle>{data.title}</CardTitle>
              <CardMemberCount>
                {memberImage()}
                {data.memberCount}명
              </CardMemberCount>
              <CardMyPosition>{data.myPosition} 분야로 참여중</CardMyPosition>
            </CardLowerArea>
          </CardContainer>
        ));
      // category가 coffeeChat인 데이터
      case 'coffeeChat':
        return filteredData.map((data, index) => (
          <CardContainer key={index} height="320px">
            <CardUpperArea>
              <MentorName>{data.mentorName}</MentorName>
              <MentorCompanyName>{data.mentorCompanyName}</MentorCompanyName>
              <MentorCareer>
                개발팀 {data.mentorPosition} / {data.mentorCareer}년
              </MentorCareer>
            </CardUpperArea>
            <CardLowerArea>
              <MentorCoffeeChatCount>커피챗 {data.mentorCoffChatCount}회</MentorCoffeeChatCount>
              <MentorIntroduce>{data.mentorIntroduce}</MentorIntroduce>
            </CardLowerArea>
          </CardContainer>
        ));
      default:
        return <p>참여중인 목록이 없습니다.</p>;
    }
  };

  return (
    <Tabs.Root defaultValue="study">
      <TabsList>
        <TabsTrigger value="study" isSelected={selectedTab === 'study'} onClick={() => setSelectedTab('study')}>
          스터디({studyCount})
        </TabsTrigger>
        <TabsTrigger value="project" isSelected={selectedTab === 'project'} onClick={() => setSelectedTab('project')}>
          프로젝트({projectCount})
        </TabsTrigger>
        <TabsTrigger
          value="coffeeChat"
          isSelected={selectedTab === 'coffeeChat'}
          onClick={() => setSelectedTab('coffeeChat')}>
          커피챗({coffeeChatCount})
        </TabsTrigger>
      </TabsList>
      <ContentContainer>
        {/* 스터디 카드 영역 */}
        <TabsContent value="study">{renderData('study')}</TabsContent>
        {/* 프로젝트 카드 영역 */}
        <TabsContent value="project">{renderData('project')}</TabsContent>
        {/* 커피챗 카드 영역 */}
        <TabsContent value="coffeeChat">{renderData('coffeeChat')}</TabsContent>
      </ContentContainer>
    </Tabs.Root>
  );
}

export default React.memo(JoinListContent);

const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 40px;
`;
const TabsTrigger = styled(Tabs.Trigger)<{ isSelected?: boolean }>`
  border: none;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
  color: ${({ isSelected }) => (isSelected ? '#000' : '#e2e3e5')};
  transition-duration: 0.3s;
  &:hover {
    color: #000;
  }
`;
const TabsContent = styled(Tabs.Content)`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
const ContentContainer = styled.div`
  height: 650px;
  padding: 5px;
`;
const CardContainer = styled.div<{ height?: string }>`
  position: relative;
  box-sizing: border-box;
  width: 330px;
  ${(props) => (props.height ? `height: ${props.height};` : 'height: 234px;')}
  border: none;
  border-radius: 12px;
  background-color: #f0f0f0;
  box-shadow: 1px 1px 3px 3px #f0f0f0;
`;
const CardUpperArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 20px;
`;
const CardLowerArea = styled.div`
  position: absolute;
  width: inherit;
  height: 106px;
  border-radius: 0px 0px 12px 12px;
  background-color: #fff;
  bottom: 0px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
`;
const CardTitle = styled.h3`
  margin: 0px;
`;
const CardMemberCount = styled.h4`
  margin: 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CardMyPosition = styled.h5`
  margin: 0px;
`;
const MentorName = styled.h2`
  margin: 0px;
`;
const MentorCompanyName = styled.h4`
  margin: 0px;
`;
const MentorCareer = styled.h4`
  margin: 0px;
`;
const MentorCoffeeChatCount = styled.h5`
  margin: 0px;
`;
const MentorIntroduce = styled.h5`
  margin: 0px;
`;
