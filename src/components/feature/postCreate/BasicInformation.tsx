import React from 'react';
import { period, positions, skills, studyType } from '../../../constants/data';
import styled from 'styled-components';
import Select from '../../common/Select';
import Input from '../../common/Input';
import CustomDatePicker from '../../common/CustomDatePicker';
import RoundBorderIcon from '../../common/RoundBorderIcon';

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

const BasicInformation = ({ inputVal, setInputVal }: Props) => {
  const onChangeType = (type: string) => setInputVal({ ...inputVal, type });

  const onChangeDeadlineDate = (deadlineDate: Date) => setInputVal({ ...inputVal, deadlineDate });

  const onChangeStartDate = (startDate: Date) => setInputVal({ ...inputVal, startDate });

  const onChangePeriod = (period: string) => setInputVal({ ...inputVal, period });

  const onChangeTO = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputVal({ ...inputVal, tableOfOrganization: e.target.value });

  const onChangePositions = (position: string) => {
    if (inputVal.positons.includes(position)) {
      return;
    }
    setInputVal({ ...inputVal, positons: [...inputVal.positons, position] });
  };

  const onChangeSkills = (skill: string) => {
    if (inputVal.selectedSkills.includes(skill)) {
      return;
    }
    setInputVal({ ...inputVal, selectedSkills: [...inputVal.selectedSkills, skill] });
  };

  const handlePositionRemove = (position: string) => {
    const removedPositions = inputVal.positons.filter((value) => value !== position);
    setInputVal({ ...inputVal, positons: removedPositions });
  };

  const handleSkillRemove = (skill: string) => {
    const removedSkills = inputVal.selectedSkills.filter((value) => value !== skill);
    setInputVal({ ...inputVal, selectedSkills: removedSkills });
  };

  return (
    <div>
      <Title>기본 정보 입력</Title>
      <GridBox>
        <InputBox>
          <p>모집 구분</p>
          <Select
            selectValue={inputVal.type}
            onValueChange={onChangeType}
            items={studyType}
            placeholder="모집하는 그룹을 선택하세요."
          />
        </InputBox>
        <InputBox>
          <p>모집 마감일</p>
          <CustomDatePicker selected={inputVal.deadlineDate} onChange={(date: Date) => onChangeDeadlineDate(date)} />
        </InputBox>
        <InputBox>
          <p>프로젝트 시작</p>
          <CustomDatePicker selected={inputVal.startDate} onChange={(date: Date) => onChangeStartDate(date)} />
        </InputBox>
        <InputBox>
          <p>진행 기간</p>
          <Select
            selectValue={inputVal.period}
            onValueChange={onChangePeriod}
            items={period}
            placeholder="스터디/프로젝트 진행 기간을 선택하세요."
          />
        </InputBox>
        <InputBox>
          <p>모집 인원</p>
          <Input
            type="number"
            placeholder="총 모집 인원을 입력해주세요."
            value={inputVal.tableOfOrganization}
            onChange={onChangeTO}
            isValid={true}
          />
        </InputBox>
      </GridBox>
      {inputVal.type === '프로젝트' && (
        <StyledGrid>
          <InputBox>
            <p>필요 포지션</p>
            <MultiSelectedGrid>
              <Select
                selectValue={inputVal.positons[inputVal.positons.length - 1]}
                onValueChange={onChangePositions}
                items={positions}
                placeholder="필요한 포지션을 선택하세요."
              />
              <SelectedBox>
                {inputVal.positons.map((position) => (
                  <RoundBorderIcon key={position} item={position} onRemove={handlePositionRemove} />
                ))}
              </SelectedBox>
            </MultiSelectedGrid>
          </InputBox>

          <InputBox>
            <p>기술 스택</p>
            <MultiSelectedGrid>
              <Select
                selectValue={inputVal.selectedSkills[inputVal.selectedSkills.length - 1]}
                onValueChange={onChangeSkills}
                items={skills}
                placeholder="필요 기술 스택을 선택하세요."
              />
              <SelectedBox>
                {inputVal.selectedSkills.map((skill) => (
                  <RoundBorderIcon key={skill} item={skill} onRemove={handleSkillRemove} />
                ))}
              </SelectedBox>
            </MultiSelectedGrid>
          </InputBox>
        </StyledGrid>
      )}
    </div>
  );
};

const Title = styled.p`
  font-size: 34px;
  margin-bottom: 20px;
`;

const StyledGrid = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 30px;
  padding-top: 40px;
`;

const GridBox = styled(StyledGrid)`
  grid-template-columns: repeat(3, 1fr);
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

const MultiSelectedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 45px;
`;

const SelectedBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 15px;
  align-items: end;
  column-gap: 1rem;
  padding-bottom: 7px;
`;

export default BasicInformation;
