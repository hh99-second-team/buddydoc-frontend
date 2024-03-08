import * as Tabs from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../../../api';
import PostTabsContent from '../TabsContent';
import { useQuery } from 'react-query';
import { JoinType } from '../../../../types';
import { getDateFomat } from '../../../../utils';
import CardContainer from '../CardContainer';

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
      {tabTypes.map((tab, idx) => (
        <Tabs.Content key={idx} value={tab}>
          {data &&
            data
              .filter((data) => data.postType === tab)
              .map((data, idx) => (
                <CardContainer key={idx} title={data.postTitle} status={tab} postId={data.postId}>
                  <DateInfo>시작일 : {getDateFomat(data.startDate)}</DateInfo>
                </CardContainer>
              ))}
        </Tabs.Content>
      ))}
    </PostTabsContent>
  );
};

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
