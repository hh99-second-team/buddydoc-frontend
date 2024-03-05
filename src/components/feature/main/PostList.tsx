import React, { useCallback, useEffect, useState } from 'react';
import { PostCardType } from '../../../types';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import api from '../../../api';
import { useInView } from 'react-intersection-observer';

interface ParamsType {
  postType?: '스터디' | '프로젝트';
  searchTitle?: string;
  isEnd?: boolean;
}

const PostList = ({ postType, searchTitle, isEnd }: ParamsType) => {
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();

  const fetchPosts = useCallback(async () => {
    if (isLastPage) {
      return;
    }
    setIsLoading(true);

    const response = !!postType
      ? await api.getPost(page, isEnd, postType)
      : !!searchTitle
      ? await api.getPostSearch(page, searchTitle)
      : await api.getPost(page, isEnd);

    setPosts((prevState) => [...prevState, ...response.posts]);
    setIsLastPage(response.isLastPage);
    setIsLoading(false);
  }, [isEnd, isLastPage, page, postType, searchTitle]);

  // fetchPosts이 바뀔 때마다 함수 실행
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !isLoading) {
      setPage(posts[posts.length - 1].postId);
    }
  }, [inView, isLoading, posts]);

  const renderPostList = () => {
    return (
      <>
        {posts.map((post, idx) => (
          <React.Fragment key={idx}>
            {posts.length - 1 === idx ? (
              <div ref={ref}>
                <PostItem post={post} />
              </div>
            ) : (
              <div>
                <PostItem post={post} />
              </div>
            )}
          </React.Fragment>
        ))}
        {/* 로딩 중일 때 Skeleton UI 표시*/}
        {/* 최초엔 10개의 스켈레톤 표시 */}
        {isLoading && posts.length === 0 && Array.from({ length: 10 }, (_, idx) => <SkeletonPost key={idx} />)}
        {/* 그 이후에는 4 개의 스켈레톤만 보여주기 */}
        {isLoading && posts.length > 1 && Array.from({ length: 4 }, (_, idx) => <SkeletonPost key={idx} />)}
      </>
    );
  };

  return (
    <>
      <PostContainer>{renderPostList()}</PostContainer>
      {posts.length === 0 && (
        <EmptyPostTitle>{searchTitle ? `"${searchTitle}" 검색 결과가 없습니다.` : '게시글이 없습니다.'}</EmptyPostTitle>
      )}
    </>
  );
};

const PostContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 54px;
  column-gap: 103px;

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
