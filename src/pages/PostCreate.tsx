import React, { useState } from 'react';
import { Layout } from '../styles/GlobalStyles';
import BasicInformation from '../components/feature/postCreate/BasicInformation';
import MoreInformation from '../components/feature/postCreate/MoreInformation';
import Button from '../components/common/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PostCreateType } from '../types/commonTypes';

const PostCreate = () => {
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState<PostCreateType>({
    postType: '',
    postTitle: '',
    position: [],
    skillList: [],
    content: '',
    deadLine: new Date(),
    startDate: new Date(),
    period: '',
    memberCount: 0,
  });

  const handleSubmit = () => {
    if (
      !inputVal.postType ||
      !inputVal.postTitle ||
      !inputVal.position.length ||
      !inputVal.skillList.length ||
      !inputVal.content ||
      !inputVal.deadLine ||
      !inputVal.startDate ||
      !inputVal.period ||
      !inputVal.memberCount
    ) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    navigate('/');
  };

  return (
    <CreateLayout>
      <BasicInformation inputVal={inputVal} setInputVal={setInputVal} />
      <MoreInformation inputVal={inputVal} setInputVal={setInputVal} />
      <ButtonSet>
        <Button size="medium" color="black" onClick={() => navigate('/')}>
          취소
        </Button>
        <Button size="medium" color="primary" onClick={handleSubmit}>
          등록
        </Button>
      </ButtonSet>
    </CreateLayout>
  );
};

const CreateLayout = styled(Layout)`
  display: grid;
  row-gap: 4rem;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2rem;

  & > button {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
`;

export default PostCreate;
