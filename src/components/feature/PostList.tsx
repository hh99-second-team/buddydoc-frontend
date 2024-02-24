import React from 'react';
import { useQuery } from 'react-query';
import { PostData } from '../../types/commonTypes';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import api from '../../services/api';

const PostList = () => {
  const { isLoading, data } = useQuery<{ posts: PostData[]; isLastPage: boolean }>('posts', api.getPost);

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
  row-gap: 30px;
  column-gap: 30px;
`;
export default PostList;
