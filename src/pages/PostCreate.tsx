import React, { useState } from 'react';
import { Layout } from '../styles/GlobalStyles';
import BasicInformation from '../components/feature/postCreate/BasicInformation';
import MoreInformation from '../components/feature/postCreate/MoreInformation';
import Button from '../components/common/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface inputInterface {
  type: string;
  deadlineDate: Date;
  startDate: Date;
  period: string;
  tableOfOrganization: string;
  positons: string[];
  selectedSkills: string[];
  title: string;
  content: string;
}

const PostCreate = () => {
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState<inputInterface>({
    type: '',
    deadlineDate: new Date(),
    startDate: new Date(),
    period: '',
    tableOfOrganization: '',
    positons: [],
    selectedSkills: [],
    title: '',
    content: '',
  });

  const handleSubmit = () => {
    if (
      !inputVal.type ||
      !inputVal.deadlineDate ||
      !inputVal.startDate ||
      !inputVal.period ||
      !inputVal.tableOfOrganization ||
      !inputVal.positons ||
      !inputVal.selectedSkills ||
      !inputVal.title ||
      !inputVal.content
    ) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    console.log(inputVal);
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
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2rem;
`;

export default PostCreate;
