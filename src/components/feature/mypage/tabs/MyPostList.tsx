import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Button } from '@radix-ui/themes';
import api from '../../../../services/api';
import CircleIcon from '../../../common/CircleIcon';
import TabsContent from '../TabsContent';

const dummyDatas = [
  {
    category: '스터디',
    postTitle: '웹 개발 모각코 스터디1',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: '프로젝트',
    postTitle: '웹 프로젝트1',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
  {
    category: '프로젝트',
    postTitle: '웹 프로젝트2',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
];

const MyPostList = () => {
  const tabTypes = ['스터디', '프로젝트'];

  // 선택된 탭 상태관리
  const [selectedTab, setSelectedTab] = useState('스터디');

  // 참여중인 활동별 개수 상태관리
  const [, setStudyCount] = useState(0);
  const [, setProjectCount] = useState(0);
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
    <TabsContent
      tabTypes={tabTypes}
      header="작성 목록"
      description="내가 작성한 모집글입니다."
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
                <PostStatus>{data.postStatus}</PostStatus>
                <ContentButton>프로젝트 홈</ContentButton>
                <ContentButton color="gray" top="105px">
                  신청자 관리
                </ContentButton>
                <DateInfo left="30px">작성일 : {data.postDate}</DateInfo>
                <DateInfo>마감일 : {data.endDate}</DateInfo>
              </ContentContainer>
            ))}
        </Tabs.Content>
      ))}
    </TabsContent>
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

export default MyPostList;
