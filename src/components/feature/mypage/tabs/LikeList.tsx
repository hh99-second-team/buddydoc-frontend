import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
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

export default LikeList;
