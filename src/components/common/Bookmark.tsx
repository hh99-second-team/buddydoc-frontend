import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark-icon.svg';
import { isLoginOpenState } from '../../store/atomDefinitions';
import { useRecoilState } from 'recoil';
import api from '../../api';
import { useMutation, useQueryClient } from 'react-query';

interface BookmarkProps {
  count: number;
  direction: 'row' | 'column';
  isToggle: boolean;
  postId: number;
}

const Bookmark = ({ count, direction, isToggle, postId }: BookmarkProps) => {
  const [, setIsLoginOpen] = useRecoilState(isLoginOpenState);
  const queryClient = useQueryClient();

  const mutation = useMutation(async (postId: number) => await api.updateBookmark(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['postDetail', postId.toString()]);
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['posts', '스터디']);
      queryClient.invalidateQueries(['posts', '프로젝트']);
    },
  });

  const handleToggleBookmark = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    // 로그인 안 했다면 로그인 창 띄워주기
    if (!localStorage.getItem('isLogin') || localStorage.getItem('isLogin') === 'false') {
      setIsLoginOpen(true);
      return;
    }

    await mutation.mutateAsync(postId);
  };

  return (
    <BookmarkBox direction={direction}>
      <div onClick={(e) => handleToggleBookmark(e)}>
        <BookmarkIcon className={isToggle ? 'selected' : ''} />
      </div>
      {direction === 'row' && <p>{count}</p>}
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
