import React from 'react';
import '@radix-ui/themes/styles.css';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
// import SimpleProfileInfo from "./components/mypage/SimpleProfileInfo";
import SideBar from '../components/feature/mypage/Sidebar';
import SideMenu from '../components/feature/mypage/SideMenu';

const MyPage = () => {
  return (
    <MyPageBackGround>
      {/* 메인 영역 */}
      <MainContainer>
        <Main>
          <Tabs.Root defaultValue="ManageProfile" style={{ display: 'flex', flexDirection: 'row' }}>
            {/* 좌측 사이드바 메뉴 */}
            <SideBar />

            {/* 우측 메인 */}
            <SideMenu />
          </Tabs.Root>
        </Main>
      </MainContainer>
    </MyPageBackGround>
  );
};

export default MyPage;

const MyPageBackGround = styled.div`
  background-color: #e2e3e5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainContainer = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;
const Main = styled.div`
  position: relative;
  width: 99vw;
  height: inherit;
  background-color: white;
  padding: 50px 30px;
`;
