import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { skills, positions, career } from '../../../../constants/data';
import { UserType } from '../../../../types/commonTypes';
import api from '../../../../services/api';
import Input from '../../../common/Input';
import CircleIcon from '../../../common/CircleIcon';
import emptyProfileImg from '../../../../assets/user-circle-icon.svg';
import { ReactComponent as AddPhotoIcon } from '../../../../assets/camera-add.svg';
import Select from '../../../common/Select';
import SelectedIcon from '../../../common/SelectedIcon';
import Button from '../../../common/Button';

const ManageProfile = () => {
  const navigate = useNavigate();

  const { data } = useQuery<UserType>(['userInfo'], api.getMyInfo);

  const [userInfo, setUserInfo] = useState<UserType>(
    data || {
      userId: 0,
      userNickname: '',
      position: '',
      skillList: [],
    }
  );

  const onChangeUserNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInfo({ ...userInfo, userNickname: e.target.value });

  const onChangePosition = (position: string) => setUserInfo({ ...userInfo, position });

  const onChangeSkillList = (skill: string) => {
    if (userInfo.skillList.includes(skill)) {
      return;
    }
    setUserInfo({ ...userInfo, skillList: [...userInfo.skillList, skill] });
  };

  const handleSkillRemove = (skill: string) => {
    const removedSkills = userInfo.skillList.filter((value) => value !== skill);
    setUserInfo({ ...userInfo, skillList: removedSkills });
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSave = () => {};

  return (
    <Layout>
      <ProfileBox>
        <CircleIcon src={emptyProfileImg} isProfile={true} size="10rem" />
        <AddPhotoIcon />
      </ProfileBox>
      <Header>기본 정보</Header>
      <GridGroup>
        <InputBox>
          <p>닉네임</p>
          <Input
            type="text"
            value={userInfo.userNickname}
            onChange={onChangeUserNickname}
            placeholder="닉네임을 입력해주세요."
            isValid="none"
          />
        </InputBox>
        <InputBox>
          <p>포지션</p>
          <Select
            selectValue={userInfo.position}
            onValueChange={onChangePosition}
            items={positions}
            placeholder="포지션을 선택해주세요."
          />
        </InputBox>
        <InputBox>
          <p>경력</p>
          <Select selectValue="" onValueChange={() => {}} items={career} placeholder="경력을 선택해주세요." />
        </InputBox>
        <InputBox>
          <p>기술 스택</p>
          <Select
            selectValue={userInfo.skillList ? userInfo.skillList[userInfo.skillList.length - 1] : ''}
            onValueChange={onChangeSkillList}
            items={skills}
            placeholder="보유 기술 스택을 선택하세요."
          />
          <SkillBox>
            {userInfo.skillList.map((skill) => (
              <SelectedIcon key={skill} type="skill" item={skill} onRemove={handleSkillRemove} removeBtn={true} />
            ))}
          </SkillBox>
        </InputBox>
      </GridGroup>
      <Button size="half" color="primary" onClick={handleSave}>
        저장
      </Button>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  justify-content: center;
  align-items: center;
  padding-left: 5vw;
  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1.3rem 0;
`;

const ProfileBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  & > svg {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #e2e3e5;
  }
`;

const GridGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
  row-gap: 4rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const InputBox = styled.div`
  & > p {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }
`;

const SkillBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.6rem;
  row-gap: 0.6rem;
  padding: 1rem;
  margin: 1rem 0 2rem 0;
  border: 1px solid #e2e3e5;
  border-radius: 12px;

  & > div > span {
    margin-right: 0.3rem;
  }
`;

export default ManageProfile;
