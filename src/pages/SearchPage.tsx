import React from 'react';
import styled from 'styled-components';
import Button from '../components/common/Button';
import PostList from '../components/feature/main/PostList';
import { Layout } from '../styles/GlobalStyles';

const SearchPage = () => {
  return (
    <Layout>
      <SearchBox>
        <div>
          <input type="text" placeholder="검색어를 입력해주세요." />
        </div>
        <Button size="medium" color="black">
          검색
        </Button>
      </SearchBox>
      <PostList />
    </Layout>
  );
};

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  column-gap: 1.3rem;
  margin-bottom: 4rem;

  & > div {
    width: 30%;
    height: 100%;
    border-bottom: 1px solid var(--Primary, #000);
    padding: 0.4rem;
    @media screen and (max-width: 768px) {
      width: 50%;
    }
    & > input {
      font-size: 1.3rem;
      border: none;
      &:focus {
        outline: none;
      }
    }
  }
  & > button {
    @media screen and (max-width: 768px) {
      width: 25%;
    }
  }
`;

export default SearchPage;
