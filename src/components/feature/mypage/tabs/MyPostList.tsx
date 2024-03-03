import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import api from '../../../../api';
import TabsContent from '../TabsContent';
import TypeIcon from '../../../common/TypeIcon';
import Button from '../../../common/Button';
import { useQuery } from 'react-query';
import { WriteType } from '../../../../types';
import { getDDayCounter, getDateFomat } from '../../../../utils';

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
                  <ContentContainer>
                    <CardHeader>
                      <Title>{data.postTitle}</Title>
                      <TypeIcon>{getDDayCounter(data.deadLine)}</TypeIcon>
                    </CardHeader>

                    <DateInfo left="30px">작성일 : {getDateFomat(data.createdAt)}</DateInfo>
                    <DateInfo>마감일 : {getDateFomat(data.deadLine)}</DateInfo>
                  </ContentContainer>
                  <Button size="full" color="gray">
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
