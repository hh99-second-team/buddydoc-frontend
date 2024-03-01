import React from 'react';
import { period, positions, skills, studyType } from '../../../constants/data';
import styled from 'styled-components';
import Select from '../../common/Select';
import Input from '../../common/Input';
import CustomDatePicker from '../../common/CustomDatePicker';
import SelectedIcon from '../../common/SelectedIcon';
import { PostCreateType } from '../../../types/commonTypes';

interface Props {
  inputVal: PostCreateType;
  setInputVal: any;
}

const BasicInformation = ({ inputVal, setInputVal }: Props) => {
  const onChangeType = (postType: string) => setInputVal({ ...inputVal, postType });

  const onChangeDeadLine = (deadLine: Date) => setInputVal({ ...inputVal, deadLine });

  const onChangeStartDate = (startDate: Date) => setInputVal({ ...inputVal, startDate });

  const onChangePeriod = (period: string) => setInputVal({ ...inputVal, period });

  const onChangeMemberCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const memberCount = e.target.value;
    // 입력값이 숫자이고 100 이하의 양수인지 확인
    if (memberCount === '' || (/^\d+$/.test(memberCount) && parseInt(memberCount) <= 50)) {
      setInputVal({ ...inputVal, memberCount });
    }
  };

  const onChangePosition = (position: string) => {
    if (inputVal.position.includes(position)) {
      return;
    }
    setInputVal({ ...inputVal, position: [...inputVal.position, position] });
  };

  const onChangeSkillList = (skill: string) => {
    if (inputVal.skillList.includes(skill)) {
      return;
    }
    setInputVal({ ...inputVal, skillList: [...inputVal.skillList, skill] });
  };

  const handlePositionRemove = (position: string) => {
    const removedPositions = inputVal.position.filter((value) => value !== position);
    setInputVal({ ...inputVal, position: removedPositions });
  };

  const handleSkillRemove = (skill: string) => {
    const removedSkills = inputVal.skillList.filter((value) => value !== skill);
    setInputVal({ ...inputVal, skillList: removedSkills });
  };

  return (
    <div>
      <Title>기본 정보 입력</Title>
      <GridBox>
        <InputBox>
          <p>모집 구분</p>
          <Select
            selectValue={inputVal.postType}
            onValueChange={onChangeType}
            items={studyType}
            placeholder="모집하는 그룹을 선택하세요."
          />
        </InputBox>
        <InputBox>
          <p>모집 마감일</p>
          <CustomDatePicker selected={inputVal.deadLine} onChange={(date: Date) => onChangeDeadLine(date)} />
        </InputBox>
        <InputBox>
          <p>모집 인원</p>
          <Input
            type="text"
            placeholder="총 모집 인원을 입력해주세요. (50 이하만 입력 가능)"
            value={inputVal.memberCount}
            onChange={onChangeMemberCount}
            isValid={true}
          />
        </InputBox>
        <InputBox>
          <p>스터디 / 프로젝트 시작일</p>
          <CustomDatePicker selected={inputVal.startDate} onChange={(date: Date) => onChangeStartDate(date)} />
        </InputBox>
        <InputBox>
          <p>진행 기간</p>
          <Select
            selectValue={inputVal.period}
            onValueChange={onChangePeriod}
            items={period}
            placeholder="스터디 / 프로젝트 진행 기간을 선택하세요."
          />
        </InputBox>
      </GridBox>
      {/* {inputVal.postType === '프로젝트' && ( */}
      <StyledGrid>
        <InputBox>
          <p>필요 포지션</p>
          <MultiSelectedGrid>
            <Select
              selectValue={inputVal.position[inputVal.position.length - 1]}
              onValueChange={onChangePosition}
              items={positions}
              placeholder="필요한 포지션을 선택하세요."
            />
            <SelectedBox>
              {inputVal.position.map((position) => (
                <SelectedIcon
                  key={position}
                  type="position"
                  item={position}
                  onRemove={handlePositionRemove}
                  removeBtn={true}
                />
              ))}
            </SelectedBox>
          </MultiSelectedGrid>
        </InputBox>

        <InputBox>
          <p>기술 스택</p>
          <MultiSelectedGrid>
            <Select
              selectValue={inputVal.skillList[inputVal.skillList.length - 1]}
              onValueChange={onChangeSkillList}
              items={skills}
              placeholder="필요 기술 스택을 선택하세요."
            />
            <SelectedBox>
              {inputVal.skillList.map((skill) => (
                <SelectedIcon key={skill} type="skill" item={skill} onRemove={handleSkillRemove} removeBtn={true} />
              ))}
            </SelectedBox>
          </MultiSelectedGrid>
        </InputBox>
      </StyledGrid>
      {/* )} */}
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
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SelectedBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 15px;
  align-items: end;
  column-gap: 1rem;
  padding-bottom: 7px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1rem;
    align-items: center;
  }
`;

export default BasicInformation;
