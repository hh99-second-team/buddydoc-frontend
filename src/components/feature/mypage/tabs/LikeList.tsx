import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { Button } from '@radix-ui/themes';
import TabsContent from '../TabsContent';
import TypeIcon from '../../../common/TypeIcon';
import { useQuery } from 'react-query';
import api from '../../../../api';
import { LikeType } from '../../../../types';
import { getDateFomat } from '../../../../utils';

const LikeList = () => {
  const tabTypes = ['스터디', '프로젝트'];
  const [selectedTab, setSelectedTab] = useState('스터디');
  const { data } = useQuery<LikeType[]>(['likeList'], api.getMyBookmarks);

  return (
    <TabsContent
      tabTypes={tabTypes}
      header="관심 목록"
      description="북마크한 목록입니다."
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}>
      {tabTypes.map((tab) => (
        <Tabs.Content value={tab}>
          {data &&
            data
              .filter((data) => data.postType === tab)
              .map((data, idx) => (
                <ContentContainer key={idx}>
                  <CategoryContainer>
                    <TypeIcon>{tab}</TypeIcon>
                  </CategoryContainer>
                  <Title>{data.postTitle}</Title>
                  <MemberCount>{data.memberCount}</MemberCount>
                  <DateInfo>마감일 : {getDateFomat(data.deadLine)}</DateInfo>
                  <ContentButton>게시글 확인</ContentButton>
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
  border-radius: 30px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.05);
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

export default LikeList;
