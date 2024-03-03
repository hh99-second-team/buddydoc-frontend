import * as Tabs from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../../../api';
import PostTabsContent from '../TabsContent';
import TypeIcon from '../../../common/TypeIcon';
import { useQuery } from 'react-query';
import { JoinType } from '../../../../types';
import { getDateFomat } from '../../../../utils';

const JoinList = () => {
  const tabTypes = ['스터디', '프로젝트'];
  const [selectedTab, setSelectedTab] = useState('스터디');
  const { data } = useQuery<JoinType[]>(['joinList'], api.getMyStudylists);

  return (
    <PostTabsContent
      tabTypes={tabTypes}
      header="현재 참여 목록"
      description="현재 참여중인 스터디/프로젝트/커피챗 목록입니다."
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
                  <DateInfo>시작일 : {getDateFomat(data.startDate)}</DateInfo>
                </ContentContainer>
              ))}
        </Tabs.Content>
      ))}
    </PostTabsContent>
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

export default JoinList;
