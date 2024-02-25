import { Avatar, Flex } from '@radix-ui/themes';
import React from 'react';
import styled from 'styled-components';

function SimpleProfileInfo() {
  return (
    <SimpleProfleInfo>
      {/* LEFT */}
      <AccountInfos>
        {/* 프로필 이미지 */}
        <ProfileImage>
          <Flex gap="2">
            <Avatar
              size="9"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
              radius="full"
            />
          </Flex>
        </ProfileImage>
        <AccountInfo>
          {/* 유저 닉네임 */}
          <UserNickname>버디버디</UserNickname>
          {/* 유저 이메일 */}
          <UserEmail>buddy@gmail.com</UserEmail>
          {/* 유저 경력 */}
          <UserCareer>n년차 개발자</UserCareer>
        </AccountInfo>
      </AccountInfos>

      {/* RIGHT */}
      <OngoingWorkInfo>
        {/* 스터디 & 프로젝트 참여 카운트 */}
        <OngoingStatus>
          {/* 스터디 카드 */}
          <CountWrapper>
            <OngoingTitle>스터디</OngoingTitle>
            <OngoingCount>2</OngoingCount>
          </CountWrapper>
          {/* 프로젝트 카드 */}
          <CountWrapper>
            <OngoingTitle>프로젝트</OngoingTitle>
            <OngoingCount>1</OngoingCount>
          </CountWrapper>
        </OngoingStatus>
        {/* 진행중 텍스트 */}
        <OngoingText>진행중</OngoingText>
      </OngoingWorkInfo>
    </SimpleProfleInfo>
  );
}

export default SimpleProfileInfo;

const SimpleProfleInfo = styled.div`
  width: 70%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  background-color: #ced0d3;
`;
const AccountInfos = styled.div`
  width: 55%;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 40px;
  box-sizing: border-box;
`;
const AccountInfo = styled.div`
  margin-left: 50px;
`;
const ProfileImage = styled.div``;
const UserNickname = styled.h2`
  color: #f9fafc;
  font-weight: bold;
  margin: 0px 0px 10px 0px;
`;
const UserEmail = styled.h4`
  color: #e2e3e5;
  margin: 0px 0px 5px 0px;
`;
const UserCareer = styled.h4`
  background-color: white;
  text-align: center;
  width: 80%;
  border-radius: 30px;
  margin: 0px;
`;
const OngoingWorkInfo = styled.div`
  width: 45%;
  height: inherit;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const OngoingStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const CountWrapper = styled.div`
  background-color: #e2e3e5;
  width: 200px;
  height: 70px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const OngoingTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;
const OngoingCount = styled.div`
  font-weight: bold;
  text-align: center;
`;
const OngoingText = styled.div`
  width: 400px;
  height: 50px;
  background-color: #e2e3e5;
  color: blue;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
