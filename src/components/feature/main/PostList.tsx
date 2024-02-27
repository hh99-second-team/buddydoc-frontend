import React, { useCallback, useEffect, useState } from 'react';
import { PostCardType } from '../../../types/commonTypes';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import api from '../../../services/api';
import { useInView } from 'react-intersection-observer';

interface ParamsType {
  postType?: 'study' | 'project';
  searchTitle?: string;
}

const PostList = ({ postType, searchTitle }: ParamsType) => {
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
      ? await api.getPost(page, postType)
      : !!searchTitle
      ? await api.getPost(page)
      : await api.getPost(page);

    const testPost: PostCardType = {
      postId: 34,
      post_userId: 25,
      postType: 'project',
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: new Date(),
      deadLine: new Date(),
      postTitle:
        '정말 기깔난 프론트엔드 개발자 구합니다 ~~~ 같이 프로젝트 하시면 네카라쿠배 합격 확률 200%!!! 여기 개발 맛집이에요.',
      memberCount: 4,
      period: '3개월 이상',
      position: ['프론트엔드', '백엔드'],
      skillList: ['React', 'Vue', 'Next.js', 'Svelte', 'Figma', 'MySql'],
      users: {
        userNickname: '오늘은맑음',
      },
      preference: 3,
      bookmark: true,
      views: 23,
    };

    setPosts((prevState) => [...prevState, testPost, ...response.posts]);
    setIsLastPage(response.isLastPage);
    setIsLoading(false);
  }, [page]);

  // fetchPosts이 바뀔 때마다 함수 실행
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !isLoading) {
      setPage(posts[posts.length - 1].postId);
    }
  }, [inView, isLoading]);

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
        {/* 최초엔 12개의 스켈레톤 표시 */}
        {isLoading && posts.length === 0 && Array.from({ length: 3 }, (_, idx) => <SkeletonPost key={idx} />)}
        {/* 그 이후에는 한 개의 스켈레톤만 보여주기 */}
        {isLoading && posts.length > 1 && <SkeletonPost />}
      </>
    );
  };

  return <PostContainer>{renderPostList()}</PostContainer>;
};

const PostContainer = styled.div`
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 54px;
  column-gap: 103px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default PostList;
