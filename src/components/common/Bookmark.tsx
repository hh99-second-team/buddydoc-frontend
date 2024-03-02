import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark-icon.svg';
import { isLoginOpenState } from '../../store/atomDefinitions';
import { useRecoilState } from 'recoil';
import api from '../../services/api';

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

  const handleToggleBookmark = async (e: React.MouseEvent<HTMLElement>, isBookmarkSelected: boolean) => {
    e.stopPropagation();

    // 로그인 안 했다면 로그인 창 띄워주기
    if (!localStorage.getItem('isLogin') || localStorage.getItem('isLogin') === 'false') {
      setIsLoginOpen(true);
      return;
    }

    await api.updateBookmark(postId);
    setIsBookmarkSelected((state) => !state);
    setBookmarkCount((state) => (isBookmarkSelected ? state - 1 : state + 1));
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
