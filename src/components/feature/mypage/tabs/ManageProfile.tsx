import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { skills, positions, career } from '../../../../constants';
import { UserType } from '../../../../types';
import api from '../../../../api';
import Input from '../../../common/Input';
import CircleIcon from '../../../common/CircleIcon';
import { ReactComponent as AddPhotoIcon } from '../../../../assets/add-circle.icon.svg';
import Select from '../../../common/Select';
import SelectedIcon from '../../../common/SelectedIcon';
import Button from '../../../common/Button';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 이미지 업로더
const uploader = Uploader({
  apiKey: 'free', // Get production API keys from Bytescale
});

const options = { multi: false };

const ManageProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery<UserType>(['userInfo'], api.getMyInfo);

  const [userInfo, setUserInfo] = useState<UserType>(
    data || {
      userId: 0,
      userNickname: '',
      position: '',
      career: '',
      skillList: [],
      profileImage: '',
    }
  );

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  const mutation = useMutation(
    async (userData: UserType) => {
      console.log(userData);

      await api.updateMyInfo(userData);
    },
    {
      onSuccess: () => {
        toast.success('저장 성공');
        localStorage.setItem('profileImage', userInfo.profileImage);
        refetch();
      },
      onError: () => {
        toast.error('저장에 실패했습니다.');
      },
    }
  );

  const onChangeUserNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInfo({ ...userInfo, userNickname: e.target.value });

  const onChangePosition = (position: string) => setUserInfo({ ...userInfo, position });

  const onChangeCareer = (career: string) => setUserInfo({ ...userInfo, career });

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

  const modifyProfileImgHandler = (profileImage: string) => {
    if (!!profileImage) {
      setUserInfo({ ...userInfo, profileImage });
      queryClient.setQueryData(['userInfo'], { ...userInfo, profileImage });
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSave = () => mutation.mutateAsync(userInfo);

  return (
    <Layout>
      <UploadButton
        uploader={uploader}
        options={options}
        onComplete={(file) => modifyProfileImgHandler(file.length > 0 ? file[0].fileUrl : '')}>
        {({ onClick }) => (
          <ProfileBox onClick={onClick}>
            <CircleIcon src={userInfo.profileImage} isProfile={true} size="10rem" />
            <AddPhotoIcon />
          </ProfileBox>
        )}
      </UploadButton>
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
          <Select
            selectValue={userInfo.career}
            onValueChange={onChangeCareer}
            items={career}
            placeholder="경력을 선택해주세요."
          />
        </InputBox>
        <InputBox>
          <p>기술 스택</p>
          <Select
            selectValue={userInfo.skillList && userInfo.skillList[userInfo.skillList.length - 1]}
            onValueChange={onChangeSkillList}
            items={skills}
            placeholder="보유 기술 스택을 선택하세요."
          />
          {!!userInfo.skillList.length && (
            <SkillBox>
              {userInfo.skillList.map((skill) => (
                <SelectedIcon key={skill} type="skill" item={skill} onRemove={handleSkillRemove} removeBtn={true} />
              ))}
            </SkillBox>
          )}
        </InputBox>
      </GridGroup>
      <Button size="full" color="primary" onClick={handleSave}>
        저장
      </Button>
      <Button size="full" color="black" onClick={handleLogout}>
        로그아웃
      </Button>
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
    </Layout>
  );
};

const Layout = styled.div`
  row-gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;

  & > svg {
    position: absolute;
    bottom: 0;
    right: -0.3rem;
    color: #e2e3e5;
  }
`;

const GridGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
  row-gap: 2rem;

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
