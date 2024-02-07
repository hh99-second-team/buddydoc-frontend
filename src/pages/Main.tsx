import React from 'react';
import styled from 'styled-components';
import PostList from '../components/feature/PostList';

const Main = () => {
  return (
    <Layout>
      <PostList />
    </Layout>
  );
};

const Layout = styled.div`
  padding: 40px 140px;
`;

export default Main;
