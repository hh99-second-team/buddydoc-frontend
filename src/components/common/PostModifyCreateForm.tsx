import React from 'react';
import BasicInformation from '../feature/postCreate/BasicInformation';
import MoreInformation from '../feature/postCreate/MoreInformation';
import { useNavigate } from 'react-router-dom';
import { PostCreateType } from '../../types';
import styled from 'styled-components';
import { Layout } from '../../styles/GlobalStyles';
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      !inputVal.position.length ||
      !inputVal.skillList.length
    ) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    await handleSubmit();
    navigate(-1);
  };
  return (
    <CreateLayout>
      <BasicInformation inputVal={inputVal} setInputVal={setInputVal} />
      <MoreInformation inputVal={inputVal} setInputVal={setInputVal} />
      <ButtonSet>
        <Button size="medium" color="black" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button size="medium" color="primary" onClick={handleSubmitButton}>
          등록
        </Button>
      </ButtonSet>
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
