import React from 'react';
import { Layout } from '../styles/GlobalStyles';
import BasicInformation from '../components/feature/postCreate/BasicInformation';
import MoreInformation from '../components/feature/postCreate/MoreInformation';
import Button from '../components/common/Button';
import styled from 'styled-components';

const PostCreate = () => {
  return (
    <CreateLayout>
      <BasicInformation />
      <MoreInformation />
      <ButtonSet>
        <Button size="medium" color="black">
          취소
        </Button>
        <Button size="medium" color="primary">
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
