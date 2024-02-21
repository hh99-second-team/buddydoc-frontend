import React from 'react';
import { Layout } from '../styles/GlobalStyles';
import BasicInformation from '../components/feature/postCreate/BasicInformation';
import MoreInformation from '../components/feature/postCreate/MoreInformation';
import Button from '../components/common/Button';
import styled from 'styled-components';

const PostCreate = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

const ButtonSet = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2rem;
`;

export default PostCreate;
