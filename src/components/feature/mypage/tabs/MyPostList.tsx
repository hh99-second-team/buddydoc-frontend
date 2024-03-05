import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import api from '../../../../api';
import TabsContent from '../TabsContent';
import Button from '../../../common/Button';
import { useQuery } from 'react-query';
import { ApplicationType, WriteType } from '../../../../types';
import { getDDayCounter, getDateFomat } from '../../../../utils';
import CardContainer from '../CardContainer';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from '../../../common/Modal';
import Select from '../../../common/Select';
import SelectedIcon from '../../../common/SelectedIcon';
import { motion } from 'framer-motion';

const MyPostList = () => {
  const tabTypes = ['스터디', '프로젝트'];
  const [selectedTab, setSelectedTab] = useState('스터디');
  const { data } = useQuery<WriteType[]>(['postList'], api.getMyPosts);
  const [application, setApplication] = useState<ApplicationType[]>();
  const [statusSelect, setStatusSelect] = useState('');

  const handleApplication = async (postId: number) => setApplication(await api.getApplication(postId));
  const handleStatusSave = async (userId: number, postId: number) => {};
  const onChangeStatusSelect = (status: string) => setStatusSelect(status);

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
                          application.map((appItem, idx) => (
                            <ApplicationBox key={idx}>
                              <InfoBox>
                                <Flex>
                                  <Nickname>{appItem.userNickname}</Nickname>
                                  <SelectedIcon type="position" item={appItem.position} removeBtn={false} />
                                </Flex>
                                <MessageBox>{appItem.noti_message}</MessageBox>
                              </InfoBox>

                              <Select
                                selectValue={statusSelect}
                                onValueChange={onChangeStatusSelect}
                                items={['대기 중', '승인', '거절']}
                                placeholder="신청 상태를 선택해주세요."
                              />
                              <Button
                                color="primary"
                                size="full"
                                onClick={() => handleStatusSave(appItem.noti_userId, data.postId)}>
                                상태 저장
                              </Button>
                            </ApplicationBox>
                          ))
                        ) : (
                          <p>아직 신청한 사람이 없습니다.</p>
                        )}
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

const ApplicationBox = styled.div`
  border-radius: 12px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  display: grid;
  row-gap: 1rem;
  margin-bottom: 2rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--grey02, #e2e3e5);
`;

const InfoBox = styled.div``;

const Nickname = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
`;

const MessageBox = styled.div`
  margin-top: 1rem;
  padding: 2rem 0;
`;

export default MyPostList;
