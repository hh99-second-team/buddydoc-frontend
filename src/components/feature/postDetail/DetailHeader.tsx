import React, { useState } from 'react';
import styled from 'styled-components';
import StudyTypeIcon from '../../common/StudyTypeIcon';
import DeadlineIcon from '../../common/DeadlineIcon';
import userIcon from '../../../assets/user-circle-icon.svg';
import CircleIcon from '../../common/CircleIcon';
import Bookmark from '../../common/Bookmark';
import Views from '../../common/Views';
import { useNavigate } from 'react-router-dom';
import { getDateFomat } from '../../../utils/dateUtils';
import { ChevronLeftIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { PostDetailType } from '../../../types/commonTypes';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Menubar from '@radix-ui/react-menubar';
import AlertModal from '../../common/AlertModal';
import api from '../../../services/api';
import MenuBarTrigger from '../../common/menuBar/MenuBarTrigger';
import PortalContent from '../../common/menuBar/PortalContent';

const DetailHeader: React.FC<{ post: PostDetailType }> = ({ post }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeletePost = async () => {
    await api.deletePost(post.postId.toString());
    navigate('/');
  };

  return (
    <Header>
      <Flex>
        <ChevronLeftIcon onClick={() => navigate(-1)} />
        <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Menubar.Root>
            <Menubar.Menu>
              <MenuBarTrigger>
                <DotsVerticalIcon />
                <PortalContent>
                  <Menubar.Item>
                    <NavButton onClick={() => navigate(`/modify/${post.postId}`, { state: { post } })}>수정</NavButton>
                  </Menubar.Item>
                  <Menubar.Item>
                    <AlertDialog.Trigger asChild>
                      <NavButton onClick={handleOpen}>삭제</NavButton>
                    </AlertDialog.Trigger>
                  </Menubar.Item>
                </PortalContent>
              </MenuBarTrigger>
            </Menubar.Menu>
          </Menubar.Root>
          <AlertDialog.Portal>
            <AlertModal title="삭제하시겠습니까?" handleClose={handleClose} onClick={handleDeletePost}></AlertModal>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Flex>
      <IconSet>
        <StudyTypeIcon>{post.postType}</StudyTypeIcon>
        <DeadlineIcon date={post.deadLine} />
      </IconSet>
      <Title>{post.title}</Title>
      <BottomSet>
        <FlexBox>
          <CircleIcon src={userIcon} fallback={post.user?.nickname} />
          <div>
            <p>{post.user?.nickname}</p>
            <p>{getDateFomat(post.createdAt)}</p>
          </div>
        </FlexBox>
        <CountBox>
          <Views count={post.views} />
          <Bookmark direction="row" count={post.preference} isToggle={post.bookmarked} postId={post.postId} />
        </CountBox>
      </BottomSet>
    </Header>
  );
};

const Header = styled.div`
  display: grid;
  row-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #d9d9d9;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  & > svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const IconSet = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const Title = styled.p`
  font-size: 34px;
`;

const BottomSet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  & > div > p {
    padding: 3px 0;
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 18px;
`;

const NavButton = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 1.5rem 0;
  border-bottom: 0.6px solid #e2e3e5;

  &:hover {
    background: #e2e3e5;
  }
`;
export default DetailHeader;
