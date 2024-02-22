import React from 'react';
import styled from 'styled-components';
import Input from '../../common/Input';

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

interface Props {
  inputVal: inputInterface;
  setInputVal: any;
}

const MoreInformation = ({ inputVal, setInputVal }: Props) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setInputVal({ ...inputVal, title: e.target.value });

  return (
    <div>
      <Title>상세 정보 입력</Title>
      <Container>
        <InputBox>
          <p>제목</p>
          <Input
            type="text"
            placeholder="모집 글 제목을 입력해주세요."
            value={inputVal.title}
            onChange={onChangeTitle}
            isValid="none"
          />
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
    margin-bottom: 12px;
  }
`;

export default MoreInformation;
