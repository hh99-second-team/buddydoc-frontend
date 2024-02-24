import React, { useState } from 'react';
import styled from 'styled-components';
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';

interface BookmarkProps {
  count: number;
  direction: 'row' | 'column';
}

const Bookmark = ({ count, direction }: BookmarkProps) => {
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(count);

  const handleToggleBookmark = (e: React.MouseEvent<HTMLElement>, isBookmarkSelected: boolean) => {
    e.stopPropagation();
    setIsBookmarkSelected((state) => !state);
    setBookmarkCount((state) => (isBookmarkSelected ? state - 1 : state + 1));
  };

  return (
    <BookmarkBox direction={direction}>
      <div onClick={(e) => handleToggleBookmark(e, isBookmarkSelected)}>
        {isBookmarkSelected ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </div>
      {direction === 'row' && <p>{bookmarkCount}</p>}
    </BookmarkBox>
  );
};

const BookmarkBox = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  align-items: center;
  column-gap: ${(props) => (props.direction === 'row' ? '5px' : '0')};
  flex-direction: ${(props) => (props.direction === 'row' ? 'row' : 'column')};

  & > div > svg {
    width: ${(props) => (props.direction === 'row' ? '25px' : '30px')};
    height: ${(props) => (props.direction === 'row' ? '25px' : '30px')};
    color: #007dfa;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

export default Bookmark;
