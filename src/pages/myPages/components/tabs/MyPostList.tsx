import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import api from '../../../../api';
import TabsContent from '../TabsContent';
import Button from '../../../../components/Button';
import { useQuery } from 'react-query';
import { ApplicationType, WriteType } from '../../../../types';
import { getDDayCounter, getDateFomat } from '../../../../utils';
import CardContainer from '../CardContainer';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from '../../../../components/modal/Modal';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import ApplyCard from './ApplyCard';

const MyPostList = () => {
  const tabTypes = ['스터디', '프로젝트'];
  const [selectedTab, setSelectedTab] = useState('스터디');
  const { data } = useQuery<WriteType[]>(['postList'], api.getMyPosts);
  const [application, setApplication] = useState<ApplicationType[]>();
  const handleApplication = async (postId: number) => setApplication(await api.getApplication(postId));

  return (
    <TabsContent
      tabTypes={tabTypes}
      header="작성 목록"
      description="내가 작성한 모집글입니다."
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}>
      {tabTypes.map((tab, idx) => (
        <Tabs.Content key={idx} value={tab}>
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
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}>
                        <Button size="full" color="primary" onClick={() => handleApplication(data.postId)}>
                          신청자 관리
                        </Button>
                      </motion.div>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Modal postTitle="신청자 관리">
                        {application ? (
                          application.map((appItem, idx) => <ApplyCard key={idx} item={appItem} postId={data.postId} />)
                        ) : (
                          <p>아직 신청한 사람이 없습니다.</p>
                        )}
                        <ToastContainer
                          position="top-center"
                          autoClose={2000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="light"
                        />
                      </Modal>
                    </Dialog.Portal>
                  </Dialog.Root>
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
