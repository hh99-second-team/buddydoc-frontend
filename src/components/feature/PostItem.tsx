import React from 'react';
import styled from 'styled-components';

export interface PostProps {
  post: string;
}

const PostItem = ({ post }: PostProps) => {
  return <Card>{post}</Card>;
};

const Card = styled.div`
  padding: 28px;
  width: 100%;
  height: 350px;
  border-radius: 28px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
`;

export default PostItem;
