import React, { useState } from 'react';
import styled from 'styled-components';
import TypeIcon from '../../common/TypeIcon';
import DeadlineIcon from '../../common/DeadlineIcon';
import CircleIcon from '../../common/CircleIcon';
import Bookmark from '../../common/Bookmark';
import Views from '../../common/Views';
import { useNavigate } from 'react-router-dom';
import { getDateFomat } from '../../../utils';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { PostDetailType } from '../../../types';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Menubar from '@radix-ui/react-menubar';
import AlertModal from '../../common/AlertModal';
import api from '../../../api';
import MenuBarTrigger from '../../common/menuBar/MenuBarTrigger';
import PortalContent from '../../common/menuBar/PortalContent';
import { ReactComponent as DotsMenu } from '../../../assets/dots-menu.icon.svg';

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

  const checkUserId = (): boolean => {
    const myUserId = localStorage.getItem('userId');

    if (!myUserId || Number(myUserId) !== post.user?.userId) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Header>
      <Flex>
        <IconSet>
          <ChevronLeftIcon onClick={() => navigate(-1)} />
          <TypeIcon>{post.postType}</TypeIcon>
          <DeadlineIcon date={post.deadLine} />
        </IconSet>
        {checkUserId() && (
          <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Menubar.Root>
              <Menubar.Menu>
                <MenuBarTrigger>
                  <IconButton aria-label="Customise options">
                    <DotsMenu />
                  </IconButton>
                  <PortalContent>
                    <Menubar.Item>
                      <NavButton onClick={() => navigate(`/modify/${post.postId}`, { state: { post } })}>
                        수정
                      </NavButton>
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
              <AlertModal
                postTitle="삭제하시겠습니까?"
                handleClose={handleClose}
                onClick={handleDeletePost}></AlertModal>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        )}
      </Flex>
      <Title>{post.postTitle}</Title>
      <BottomSet>
        <FlexBox>
          <CircleIcon src={post.user.profileImage} fallback={post.user?.userNickname} type="profile" />
          <div>
            <p>{post.user?.userNickname}</p>
            <p>{getDateFomat(post.createdAt)}</p>
          </div>
        </FlexBox>
        <CountBox>
          <Views count={post.views} />
          <Bookmark direction="row" count={post.preference} isToggle={post.isBookmarked} postId={post.postId} />
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
  align-items: center;

  & > svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    &:hover {
      color: gray;
    }
  }
`;

const IconSet = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  & > svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  &:hover {
    color: gray;
  }
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

const IconButton = styled.div`
  all: unset;
  border-radius: 100%;
  height: 1.5rem;
  width: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  &:hover {
    background-color: var(--grey01, #e2e3e5);
    box-shadow: 0 2px 8px var(--grey03, #ced0d3);
  }
`;

export default DetailHeader;
