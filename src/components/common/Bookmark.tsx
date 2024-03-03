import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark-icon.svg';
import { isLoginOpenState } from '../../store/atomDefinitions';
import { useRecoilState } from 'recoil';
import api from '../../api';
import { useMutation, useQueryClient } from 'react-query';
import { PostDetailType } from '../../types';

interface BookmarkProps {
  count: number;
  direction: 'row' | 'column';
  isToggle: boolean;
  postId: number;
}

const Bookmark = ({ count, direction, isToggle, postId }: BookmarkProps) => {
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(isToggle);
  const [bookmarkCount, setBookmarkCount] = useState(count);
  const [, setIsLoginOpen] = useRecoilState(isLoginOpenState);
  const queryClient = useQueryClient();

  const mutation = useMutation(async (postId: number) => await api.updateBookmark(postId), {
    onSuccess: () => {
      const postDetailData: PostDetailType = queryClient.getQueryData(['postDetail', postId.toString()])!;
      console.log(isBookmarkSelected, bookmarkCount);

      queryClient.setQueryData(['postDetail', postId.toString()], {
        ...postDetailData,
        isBookmarked: !isBookmarkSelected,
        preference: isBookmarkSelected ? bookmarkCount - 1 : bookmarkCount + 1,
      });
    },
  });

  const handleToggleBookmark = async (e: React.MouseEvent<HTMLElement>, isBookmarkSelected: boolean) => {
    e.stopPropagation();

    // 로그인 안 했다면 로그인 창 띄워주기
    if (!localStorage.getItem('isLogin') || localStorage.getItem('isLogin') === 'false') {
      setIsLoginOpen(true);
      return;
    }

    setIsBookmarkSelected((state) => !state);
    setBookmarkCount((state) => (isBookmarkSelected ? state - 1 : state + 1));
    await mutation.mutateAsync(postId);
  };

  return (
    <BookmarkBox direction={direction}>
      <div onClick={(e) => handleToggleBookmark(e, isBookmarkSelected)}>
        <BookmarkIcon className={isBookmarkSelected ? 'selected' : ''} />
      </div>
      {direction === 'row' && <p>{bookmarkCount}</p>}
    </BookmarkBox>
  );
};

const BookmarkBox = styled.div<{ direction: 'row' | 'column' }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: ${(props) => (props.direction === 'row' ? '5px' : '0')};
  flex-direction: ${(props) => (props.direction === 'row' ? 'row' : 'column')};

  & > div > svg {
    width: ${(props) => (props.direction === 'row' ? '25px' : '30px')};
    height: ${(props) => (props.direction === 'row' ? '25px' : '30px')};
    stroke: #434855;

    &.selected {
      stroke: #007dfa;
      fill: #007dfa;
    }
  }

  & > p {
    font-size: 0.8rem;
  }
`;

export default Bookmark;
