import React from 'react';
import styled from 'styled-components';
import Banner from '../components/feature/Banner';
import PostList from '../components/feature/PostList';

const Main = () => {
  return (
    <Layout>
      <Banner />
      <PostList />
    </Layout>
  );
};

const Layout = styled.div`
  padding: 40px 140px;
`;

export default Main;
