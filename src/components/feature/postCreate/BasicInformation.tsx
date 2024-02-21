import React from 'react';
import styled from 'styled-components';

const BasicInformation = () => {
  return (
    <div>
      <Title>기본 정보 입력</Title>
      <Container>
        <InputBox>
          <p>모집 구분</p>
        </InputBox>
        <InputBox>
          <p>모집 마감일</p>
        </InputBox>
        <InputBox>
          <p>모집 분야</p>
        </InputBox>
        <InputBox>
          <p>모집 인원</p>
        </InputBox>
        <InputBox>
          <p>프로젝트 시작</p>
        </InputBox>
        <InputBox>
          <p>프로젝트 기간</p>
        </InputBox>
        <InputBox>
          <p>기술 스택</p>
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
  grid-template-columns: repeat(2, 1fr);
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
export default BasicInformation;
