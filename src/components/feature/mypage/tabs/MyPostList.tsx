import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import api from '../../../../api';
import TabsContent from '../TabsContent';
import TypeIcon from '../../../common/TypeIcon';
import Button from '../../../common/Button';

const dummyDatas = [
  {
    category: '스터디',
    postTitle: '웹 개발 모각코 스터디1',
    postStatus: '모집중',
    postDate: '2024.02.02',
    endDate: '2024.02.03',
  },
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
  const [selectedTab, setSelectedTab] = useState('스터디');

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
                <CardHeader>
                  <Title>{data.postTitle}</Title>
                  <TypeIcon>{data.postStatus}</TypeIcon>
                </CardHeader>

                <DateInfo left="30px">작성일 : {data.postDate}</DateInfo>
                <DateInfo>마감일 : {data.endDate}</DateInfo>
                <Button size="half" color="gray">
                  신청자 관리
                </Button>
              </ContentContainer>
            ))}
        </Tabs.Content>
      ))}
    </TabsContent>
  );
};

const ContentContainer = styled.div`
  position: relative;
  min-height: 10rem;
  border-radius: 30px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 1.8rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
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

export default MyPostList;
