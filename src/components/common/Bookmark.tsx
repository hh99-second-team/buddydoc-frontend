import React, { useState } from 'react';
import unSelectedbookmark from '../../assets/bookmark.png';
import selectedbookmark from '../../assets/bookmark-check.png';
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
    <BookmarkBox>
      <img src={bookmarkUrl} alt="" onClick={() => handleToggleBookmark(isBookmarkSelected)} />
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
