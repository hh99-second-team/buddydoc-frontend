import React from 'react';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';

const PostList = () => {
  const testList = Array(20).fill({
    type: '스터디',
    deadline: '2024.02.21',
    title: 'test',
    skillList: ['react', 'typescript', 'node', 'express', 'aws', 'javascript'],
    writer: '곽민지',
    bookmark: 63,
  });

  return (
    <PostContainer>
      {testList.map((post, idx) => (
        <PostItem post={post} key={idx}></PostItem>
      ))}
      <SkeletonPost />
    </PostContainer>
  );
};

const PostContainer = styled.div`
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 20px;
`;
export default PostList;
