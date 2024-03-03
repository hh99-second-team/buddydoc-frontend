import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import TabsContent from '../TabsContent';
import { useQuery } from 'react-query';
import api from '../../../../api';
import { LikeType } from '../../../../types';
import { getDateFomat } from '../../../../utils';
import CardContainer from '../CardContainer';

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
                <CardContainer key={idx} title={data.postTitle} status={tab} postId={data.postId}>
                  <MemberCount>{data.memberCount}</MemberCount>
                  <DateInfo>마감일 : {getDateFomat(data.deadLine)}</DateInfo>
                </CardContainer>
              ))}
        </Tabs.Content>
      ))}
    </TabsContent>
  );
};

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
