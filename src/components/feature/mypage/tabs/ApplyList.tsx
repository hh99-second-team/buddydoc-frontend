import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import TabsContent from '../TabsContent';
import { useQuery } from 'react-query';
import api from '../../../../api';
import { ApplyType } from '../../../../types';
import { getDateFomat } from '../../../../utils';
import CardContainer from '../CardContainer';

const ApplyList = () => {
  const tabTypes = ['스터디', '프로젝트'];
  const [selectedTab, setSelectedTab] = useState('스터디');
  const { data } = useQuery<ApplyType[]>(['applyList'], api.getMyNotilists);

  return (
    <TabsContent
      tabTypes={tabTypes}
      header="내 신청 현황"
      description="신청한 스터디/프로젝트/커피챗 목록입니다."
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}>
      {tabTypes.map((tab, idx) => (
        <Tabs.Content key={idx} value={tab}>
          {data &&
            data
              .filter((data) => data.postType === tab)
              .map((data, idx) => (
                <CardContainer
                  key={idx}
                  title={data.postTitle}
                  status={data.notiStatus === 'reject' ? '거부' : data.notiStatus === 'pending' ? '대기 중' : '승인'}
                  postId={data.postId}>
                  <DateInfo>신청일 : {getDateFomat(data.createdAt)}</DateInfo>
                </CardContainer>
              ))}
        </Tabs.Content>
      ))}
    </TabsContent>
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

export default ApplyList;
