import React from 'react';
import PostItem from './PostItem';
import styled from 'styled-components';

const PostList = () => {
  const testList = Array(20).fill('test');

  return (
    <PostContainer>
      {testList.map((post, idx) => (
        <PostItem post={post} key={idx}></PostItem>
      ))}
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
