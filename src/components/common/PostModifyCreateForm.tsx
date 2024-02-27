import React from 'react';
import BasicInformation from '../feature/postCreate/BasicInformation';
import MoreInformation from '../feature/postCreate/MoreInformation';
import { useNavigate } from 'react-router-dom';
import { PostCreateType } from '../../types/commonTypes';
import styled from 'styled-components';
import { Layout } from '../../styles/GlobalStyles';
import Button from './Button';

interface Props {
  inputVal: PostCreateType;
  setInputVal: any;
  handleSubmit: any;
}

const PostModifyCreateForm = ({ inputVal, setInputVal, handleSubmit }: Props) => {
  const navigate = useNavigate();

  const handleSubmitButton = async () => {
    if (
      !inputVal.postType ||
      !inputVal.postTitle ||
      !inputVal.content ||
      !inputVal.deadLine ||
      !inputVal.startDate ||
      !inputVal.period ||
      !inputVal.memberCount ||
      (inputVal.postType === 'project' && (!inputVal.position.length || !inputVal.skillList.length))
    ) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    await handleSubmit();
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
        <Button size="medium" color="primary" onClick={handleSubmitButton}>
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

export default PostModifyCreateForm;
