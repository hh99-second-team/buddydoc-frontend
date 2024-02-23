import React, { useState } from 'react';
import styled from 'styled-components';
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';

interface BookmarkProps {
  count: number;
  flexDirection: 'row' | 'column';
}

const Bookmark = ({ count, flexDirection }: BookmarkProps) => {
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(count);

  const handleToggleBookmark = (e: React.MouseEvent<HTMLElement>, isBookmarkSelected: boolean) => {
    e.stopPropagation();
    setIsBookmarkSelected((state) => !state);
    setBookmarkCount((state) => (isBookmarkSelected ? state - 1 : state + 1));
  };

  return (
    <BookmarkBox flexDirection={flexDirection}>
      <div onClick={(e) => handleToggleBookmark(e, isBookmarkSelected)}>
        {isBookmarkSelected ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </div>
      {flexDirection === 'row' && <p>{bookmarkCount}</p>}
    </BookmarkBox>
  );
};

const BookmarkBox = styled.div<{ flexDirection: 'row' | 'column' }>`
  display: flex;
  align-items: center;
  column-gap: ${(props) => (props.flexDirection === 'row' ? '5px' : '0')};
  flex-direction: ${(props) => (props.flexDirection === 'row' ? 'row' : 'column')};

  & > div > svg {
    width: ${(props) => (props.flexDirection === 'row' ? '25px' : '30px')};
    height: ${(props) => (props.flexDirection === 'row' ? '25px' : '30px')};
    color: #007dfa;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

export default Bookmark;
