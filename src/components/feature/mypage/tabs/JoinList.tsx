import { Button } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../../services/api';
import PostTabsContent from '../TabsContent';
import CircleIcon from '../../../common/CircleIcon';

const dummyDatas = [
  {
    category: '스터디',
    postTitle: '웹개발 스터디1',
    startDate: '2024.05.05',
    memberCount: 12,
  },
  {
    category: '프로젝트',
    postTitle: '웹 프로젝트2',
    startDate: '20244.02.03',
    memberCount: 12,
  },
];

const JoinList = () => {
  const tabTypes = ['스터디', '프로젝트'];

  // 선택된 탭 상태관리
  const [selectedTab, setSelectedTab] = useState('스터디');

  // 참여중인 활동별 개수 상태관리
  const [, setStudyCount] = useState(0);
  const [, setProjectCount] = useState(0);

  // 내 정보 참여 스터디 목록 api 호출
  const fetchMyStudylists = async () => {
    try {
      const response = await api.getMyStudylists(); // API 호출
      console.log(response);
      // setMyStudyLists(response); // 가져온 정보를 상태에 저장
    } catch (error) {
      console.error('Error fetching my studylists:', error);
      // 에러 처리
    }
  };

  // 페이지 로드 시 내가 참여중인 스터디리스트 가져오기
  useEffect(() => {
    fetchMyStudylists();
  }, []);

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

  return (
    <PostTabsContent
      tabTypes={tabTypes}
      header="현재 참여 목록"
      description="현재 참여중인 스터디/프로젝트/커피챗 목록입니다."
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}>
      {tabTypes.map((tab) => (
        <Tabs.Content value={tab}>
          {dummyDatas
            .filter((data) => data.category === tab)
            .map((data, idx) => (
              <ContentContainer key={idx}>
                <CategoryContainer>
                  <CircleIcon src="" />
                  <Category>프로젝트</Category>
                </CategoryContainer>
                <Title>{data.postTitle}</Title>
                <MemberCount>{data.memberCount}</MemberCount>
                <DateInfo>시작일 : {data.startDate}</DateInfo>
                <ContentButton>프로젝트 홈</ContentButton>
              </ContentContainer>
            ))}
        </Tabs.Content>
      ))}
    </PostTabsContent>
  );
};

const ContentContainer = styled.div`
  position: relative;
  min-height: 230px;
  border-radius: 15px;
  border: 2px solid black;
  border-radius: 10px;
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

export default JoinList;
