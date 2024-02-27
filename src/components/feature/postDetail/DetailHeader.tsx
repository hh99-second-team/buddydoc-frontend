import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
import * as Popover from '@radix-ui/react-popover';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import AlertModal from '../../common/AlertModal';
import api from '../../../services/api';

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
        <Popover.Root>
          <Popover.Trigger asChild>
            <DotsVerticalIcon />
          </Popover.Trigger>
          <Popover.Portal>
            <PopoverContent sideOffset={5}>
              <NavButton onClick={() => navigate('/modify')}>수정하기</NavButton>
              <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Trigger asChild>
                  <NavButton onClick={handleOpen}>삭제</NavButton>
                </Trigger>
                <AlertDialog.Portal>
                  <AlertModal
                    title="삭제하시겠습니까?"
                    handleClose={handleClose}
                    onClick={handleDeletePost}></AlertModal>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
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

const Trigger = styled(AlertDialog.Trigger)``;

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

const slideUpAndFade = keyframes`
  0% { opacity: 0; transform: translateY(20px) };
  100% { opacity: 1; transform: translateY(0) };
`;

const slideRightAndFade = keyframes`
  0% { opacity: 0; transform: translateX(-2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const slideDownAndFade = keyframes`
  0% { opacity: 0; transform: translateY(-2px) };
  100% { opacity: 1; transform: translateY(0) };
`;

const slideLeftAndFade = keyframes`
  0% { opacity: 0; transform: translateX(2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const PopoverContent = styled(Popover.Content)`
  z-index: 999;
  border-radius: 4;
  margin-top: 1rem;
  width: 10rem;
  display: grid;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  &[data-state='open'] {
    &[data-side='top'] {
      animation-name: ${slideDownAndFade};
    }
    &[data-side='right'] {
      animation-name: ${slideLeftAndFade};
    }
    &[data-side='bottom'] {
      animation-name: ${slideUpAndFade};
    }
    &[data-side='left'] {
      animation-name: ${slideRightAndFade};
    }
  }

  &:hover {
    border: none;
  }
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
