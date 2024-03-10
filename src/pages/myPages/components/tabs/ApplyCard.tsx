import React, { useState } from 'react';
import { ApplicationType } from '../../../../types';
import styled from 'styled-components';
import Select from '../../../../components/Select';
import SelectedIcon from '../../../../components/SelectedIcon';
import api from '../../../../api';
import { toast } from 'react-toastify';
import Button from '../../../../components/Button';

const ApplyCard: React.FC<{ item: ApplicationType; postId: number }> = ({ item, postId }) => {
  const [statusSelect, setStatusSelect] = useState<'대기 중' | '승인' | '거절'>('대기 중');

  const handleStatusSave = async (postId: number, notiId: number) => {
    if (!statusSelect) {
      toast.error('승인 혹은 거절을 선택해주세요.');
      return;
    }
    await api.createApplicantStatus(postId, notiId, statusSelect);
    toast.success(`${statusSelect}이 완료되었습니다.`);
  };
  const onChangeStatusSelect = (status: '대기 중' | '승인' | '거절') => setStatusSelect(status);

  return (
    <ApplicationBox>
      <InfoBox>
        <Flex>
          <Nickname>{item.userNickname}</Nickname>
          <SelectedIcon type="position" item={item.position} />
        </Flex>
        <MessageBox>{item.noti_message}</MessageBox>
      </InfoBox>

      <Select
        selectValue={statusSelect}
        onValueChange={onChangeStatusSelect}
        items={['대기 중', '승인', '거절']}
        placeholder="신청 상태를 선택해주세요."
      />
      <Button color="primary" size="full" onClick={() => handleStatusSave(postId, item.notiId)}>
        상태 저장
      </Button>
    </ApplicationBox>
  );
};

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

export default ApplyCard;
