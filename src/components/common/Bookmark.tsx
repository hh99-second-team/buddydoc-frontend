import React, { useState } from 'react';
import unSelectedbookmark from '../../assets/unselected-bookmark.svg';
import selectedbookmark from '../../assets/selected-bookmark.svg';
import styled from 'styled-components';

interface BookmarkProps {
  count: number;
}

const Bookmark = (props: BookmarkProps) => {
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(props.count);
  const [bookmarkUrl, setBookmarkUrl] = useState(isBookmarkSelected ? selectedbookmark : unSelectedbookmark);

  const handleToggleBookmark = (isBookmarkSelected: boolean) => {
    setIsBookmarkSelected((state) => !state);
    setBookmarkCount((state) => (isBookmarkSelected ? state - 1 : state + 1));
    setBookmarkUrl(() => (isBookmarkSelected ? unSelectedbookmark : selectedbookmark));
  };

  return (
    <BookmarkBox onClick={() => handleToggleBookmark(isBookmarkSelected)}>
      <img src={bookmarkUrl} alt="" />
      <p>{bookmarkCount}</p>
    </BookmarkBox>
  );
};

const BookmarkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 25px;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

export default Bookmark;
