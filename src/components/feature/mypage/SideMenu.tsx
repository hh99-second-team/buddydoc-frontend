import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import ManageProfile from './tabs/ManageProfile';
import ApplyList from './tabs/ApplyList';
import LikeList from './tabs/LikeList';
import MyPostList from './tabs/MyPostList';
import JoinList from './tabs/JoinList';
// import DoneList from './tabs/DoneList';

function SideMenu() {
  return (
    <div>
      {/* 프로필 관리 탭 */}
      <Tabs.Content value="ManageProfile">
        <ManageProfile />
      </Tabs.Content>

      {/* 현재 참여 목록 탭 */}
      <Tabs.Content value="JoinList">
        <JoinList />
      </Tabs.Content>

      {/* 내 신청 현황 탭 */}
      <Tabs.Content value="ApplyList">
        <ApplyList />
      </Tabs.Content>

      {/* 관심 목록 탭 */}
      <Tabs.Content value="LikeList">
        <LikeList />
      </Tabs.Content>

      {/* 작성 목록 탭 */}
      <Tabs.Content value="MyList">
        <MyPostList />
      </Tabs.Content>

      {/* 완료 목록 탭 */}
      {/* <Tabs.Content value="DoneList">
        <DoneList />
      </Tabs.Content> */}
    </div>
  );
}

export default SideMenu;
