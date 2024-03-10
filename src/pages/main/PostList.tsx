import React from 'react';
import { useInView } from 'react-intersection-observer';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import { usePostDataFetching } from '../../hooks/useInfiniteScroll';

interface ParamsType {
  postType?: '스터디' | '프로젝트';
  searchTitle?: string;
  isEnd?: boolean;
}

const PostList = ({ postType, searchTitle, isEnd }: ParamsType) => {
  const [ref, inView] = useInView();
  const { posts, isFetchingNextPage, isError, isLoading } = usePostDataFetching({
    postType,
    searchTitle,
    isEnd,
    inView,
  });

  const renderPostList = () => {
    return (
      <>
        {posts.map((post, idx) => (
          <div key={idx}>
            <PostItem post={post} />
          </div>
        ))}
        {isFetchingNextPage && Array.from({ length: 4 }, (_, idx) => <SkeletonPost key={idx} />)}
        {isError && <div>Error fetching data</div>}
      </>
    );
  };

  return (
    <>
      {isLoading && <SkeletonPost />}
      {!isLoading && posts.length === 0 && (
        <EmptyPostTitle>{searchTitle ? `"${searchTitle}" 검색 결과가 없습니다.` : '게시글이 없습니다.'}</EmptyPostTitle>
      )}
      <PostContainer>
        {renderPostList()}
        <div ref={ref}></div>
      </PostContainer>
    </>
  );
};

const PostContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 54px;
  column-gap: 103px;
  min-height: 20rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EmptyPostTitle = styled.p`
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
`;
export default PostList;
