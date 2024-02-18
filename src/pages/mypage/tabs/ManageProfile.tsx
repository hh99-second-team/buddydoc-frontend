import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, DropdownMenu, TextArea, TextField } from '@radix-ui/themes';
// import { CaretDownIcon } from '@radix-ui/react-icons';

function ManageProfile() {
  // 분야 상태관리
  const [selectedPositionItem, setSelectedPositionItem] = useState('프론트엔드');
  // 경력 상태관리
  const [selectedCareerItem, setSelectedCareerItem] = useState('신입');
  // 기술스택 상태관리
  const [selectedTechSkillItem, setSelectedTechSkillItem] = useState('React');

  // 드롭다운 생성함수
  const dropdownSetter = (selectedItem: string, contents: string[], category: string) => {
    return (
      <ProfileItemContentContainer>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant="solid"
              color="cyan"
              style={{
                width: '500px',
                height: '36px',
                justifyContent: 'space-between',
              }}>
              {selectedItem}
              {/* <CaretDownIcon /> */}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content style={{ width: '500px' }}>
            {contents.map((item, index) => (
              <DropdownMenu.Item
                key={index}
                onClick={() => {
                  dropdownCategoryHandler(category, item);
                  console.log(selectedItem);
                }}
                style={{ justifyContent: 'center' }}>
                {item}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </ProfileItemContentContainer>
    );
  };
  // 드롭다운 카테고리 분류
  const dropdownCategoryHandler = (category: string, item: string) => {
    if (category === 'position') {
      setSelectedPositionItem(item);
    }
    if (category === 'techSkill') {
      setSelectedTechSkillItem(item);
    }
    if (category === 'career') {
      setSelectedCareerItem(item);
    }
  };
  return (
    <>
      <SideMenuHeader>
        기본 정보
        <Button radius="full" variant="solid" style={{ fontWeight: 'bold' }}>
          수정
        </Button>
      </SideMenuHeader>
      <SideMenuBody>
        {/* 프로필 정보 title */}
        <ProfileItemTitleGroup>
          <ProfileItemTitle>프로필 사진</ProfileItemTitle>
          <ProfileItemTitle marginTop="170px">닉네임</ProfileItemTitle>
          <ProfileItemTitle marginTop="50px">분야</ProfileItemTitle>
          <ProfileItemTitle marginTop="50px">경력</ProfileItemTitle>
          <ProfileItemTitle marginTop="50px">기술스택</ProfileItemTitle>
          <ProfileItemTitle marginTop="50px">한 줄 소개</ProfileItemTitle>
          <ProfileItemTitle marginTop="210px">URL</ProfileItemTitle>
        </ProfileItemTitleGroup>

        {/* 프로필 정보 content */}
        <ProfileItemContentGroup>
          {/* 프로필 이미지 */}
          <ProfileItemContentContainer>
            <ProfifleItemContentImage />
          </ProfileItemContentContainer>

          {/* 닉네임 */}
          <ProfileItemContentContainer>
            <ProfileInput type="text" />
          </ProfileItemContentContainer>

          {/* 분야 */}
          <ProfileItemContentContainer>
            {dropdownSetter(selectedPositionItem, ['프론트엔드', '백엔드', '디자이너 '], 'position')}
          </ProfileItemContentContainer>

          {/* 분야 */}
          <ProfileItemContentContainer>
            {dropdownSetter(selectedCareerItem, ['신입', '1년', '2년'], 'career')}
          </ProfileItemContentContainer>

          {/* 기술 스택 */}
          <ProfileItemContentContainer>
            {dropdownSetter(selectedTechSkillItem, ['React', 'Spring', 'Node.js'], 'techSkill')}
          </ProfileItemContentContainer>

          {/* 한 줄 소개 */}
          <ProfileItemContentContainer>
            <TextArea placeholder="소개글을 작성해보세요." style={{ height: '200px', padding: '10px' }} />
            {/* +글자수 체크 함수부분 */}
          </ProfileItemContentContainer>

          {/* URL */}
          <ProfileItemContentContainer>
            <TextField.Input value="https://" />
            <Button
              style={{
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                color: 'black',
                fontSize: '17px',
                marginTop: '10px',
                padding: '0px',
              }}>
              + 추가
            </Button>
          </ProfileItemContentContainer>
        </ProfileItemContentGroup>
      </SideMenuBody>
    </>
  );
}

export default ManageProfile;

const SideMenuHeader = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const SideMenuBody = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const ProfileItemTitleGroup = styled.div`
  width: 200px;
  padding-left: 30px;
`;
const ProfileItemTitle = styled.h4<{ marginTop?: string }>`
  font-size: 18px;
  font-weight: bold;
  margin-top: ${(props) => props.marginTop || '0px'};
`;
const ProfileItemContentGroup = styled.div`
  width: 550px;
  font-size: 18px;
  font-weight: bold;
`;
const ProfileItemContentContainer = styled.div`
  margin-bottom: 40px;
`;
const ProfifleItemContentImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: #e2e3e5;
`;
const ProfileInput = styled.input`
  width: 400px;
  height: ${(props) => props.height || '40px'};
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  background: #f8f8f8;
  text-align: start;
  box-sizing: border-box;
  padding-left: 10px;
`;
