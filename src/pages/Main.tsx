import React from 'react';
import Banner from '../components/feature/Banner';
import PostList from '../components/feature/PostList';
import { Layout } from '../styles/GlobalStyles';

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

export default Main;
