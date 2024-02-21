import React from 'react';
import styled from 'styled-components';

const MoreInformation = () => {
  return (
    <div>
      <Title>상세 정보 입력</Title>
      <Container>
        <InputBox>
          <p>제목</p>
        </InputBox>
        <InputBox>
          <p>본문 내용</p>
        </InputBox>
      </Container>
    </div>
  );
};

const Title = styled.p`
  font-size: 34px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 40px;
  padding: 40px 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 10px;

  & > p {
    font-size: 20px;
  }
`;

export default MoreInformation;
