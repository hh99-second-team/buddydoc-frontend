import React from 'react';
import { useQuery } from 'react-query';
import { PostCardData } from '../../../types/commonTypes';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import api from '../../../services/api';

const PostList = () => {
  const { isLoading, data } = useQuery<{ posts: PostCardData[]; isLastPage: boolean }>('posts', api.getPost);

  const testPost: PostCardData = {
    postId: 34,
    post_userId: 25,
    postType: 'project',
    createdAt: new Date(),
    updatedAt: new Date(),
    deadline: new Date(),
    postTitle:
      '정말 기깔난 프론트엔드 개발자 구합니다 ~~~ 같이 프로젝트 하시면 네카라쿠배 합격 확률 200%!!! 여기 개발 맛집이에요.',
    position: '프론트엔드',
    skillList: ['React', 'Vue', 'Next.js', 'Svelte', 'Figma', 'MySql'],
    users: {
      userNickname: '오늘은맑음',
    },
    preference: 3,
    views: 23,
  };

  if (!isLoading) {
    data?.posts.push(testPost);
  }

  return (
    <PostContainer>
      {/* 로딩 중일 때 Skeleton UI 표시*/}
      {/* 최초엔 12개의 스켈레톤 표시 */}
      {isLoading && Array.from({ length: 12 }, (_, idx) => <SkeletonPost key={idx} />)}
      {data?.posts && data.posts.map((post) => <PostItem post={post} key={post.postId} />)}
    </PostContainer>
  );
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
