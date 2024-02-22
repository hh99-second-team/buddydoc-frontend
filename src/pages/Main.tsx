import React from 'react';
import Banner from '../components/feature/Banner';
import PostList from '../components/feature/PostList';
import styled from 'styled-components';

const Main = () => {
  return (
    <>
      <Banner />
      <Layout>
        <PostList />
      </Layout>
    </>
  );
};

const Layout = styled.div`
  padding: 0 12vw 5vh 12vw;
`;

export default Main;
