import React, { useState } from 'react';
import unSelectedbookmark from '../../assets/unselected-bookmark.svg';
import selectedbookmark from '../../assets/selected-bookmark.svg';
import styled from 'styled-components';

interface BookmarkProps {
  count: number;
  flexDirection: 'row' | 'column';
}

const Bookmark = ({ count, flexDirection }: BookmarkProps) => {
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(count);
  const [bookmarkUrl, setBookmarkUrl] = useState(isBookmarkSelected ? selectedbookmark : unSelectedbookmark);

  const handleToggleBookmark = (e: React.MouseEvent<HTMLElement>, isBookmarkSelected: boolean) => {
    e.stopPropagation();
    setIsBookmarkSelected((state) => !state);
    setBookmarkCount((state) => (isBookmarkSelected ? state - 1 : state + 1));
    setBookmarkUrl(() => (isBookmarkSelected ? unSelectedbookmark : selectedbookmark));
  };

  return (
    <BookmarkBox flexDirection={flexDirection}>
      <img src={bookmarkUrl} alt="" onClick={(e) => handleToggleBookmark(e, isBookmarkSelected)} />
      <p>{bookmarkCount}</p>
    </BookmarkBox>
  );
};

const BookmarkBox = styled.div<{ flexDirection: 'row' | 'column' }>`
  display: flex;
  align-items: center;
  column-gap: ${(props) => (props.flexDirection === 'row' ? '5px' : '0')};
  flex-direction: ${(props) => (props.flexDirection === 'row' ? 'row' : 'column')};

  & > img {
    width: 25px;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

export default Bookmark;
