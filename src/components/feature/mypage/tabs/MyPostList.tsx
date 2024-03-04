import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import api from '../../../../api';
import TabsContent from '../TabsContent';
import Button from '../../../common/Button';
import { useQuery } from 'react-query';
import { WriteType } from '../../../../types';
import { getDDayCounter, getDateFomat } from '../../../../utils';
import CardContainer from '../CardContainer';

const MyPostList = () => {
  const tabTypes = ['스터디', '프로젝트'];
  const [selectedTab, setSelectedTab] = useState('스터디');

  const { data } = useQuery<WriteType[]>(['postList'], api.getMyPosts);

  return (
    <TabsContent
      tabTypes={tabTypes}
      header="작성 목록"
      description="내가 작성한 모집글입니다."
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}>
      {tabTypes.map((tab) => (
        <Tabs.Content value={tab}>
          {data &&
            data
              .filter((data) => data.postType === tab)
              .map((data, idx) => (
                <CardBox key={idx}>
                  <CardContainer title={data.postTitle} status={getDDayCounter(data.deadLine)} postId={data.postId}>
                    <DateInfo>
                      모집기간: {getDateFomat(data.deadLine)} ~ {getDateFomat(data.createdAt)}
                    </DateInfo>
                  </CardContainer>
                  <Button size="full" color="primary">
                    신청자 관리
                  </Button>
                </CardBox>
              ))}
        </Tabs.Content>
      ))}
    </TabsContent>
  );
};

const CardBox = styled.div`
  display: grid;
  row-gap: 0.5rem;
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
