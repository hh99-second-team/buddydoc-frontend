import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import PostList from '../main/PostList';
import { Layout } from '../../styles/GlobalStyles';
import { useNavigate, useParams } from 'react-router-dom';

const SearchPage = () => {
  const { search } = useParams();
  const navigate = useNavigate();

  const [searchTitle, setsearchTitle] = useState(search);

  const handleSearchButton = () => navigate(`/search/${searchTitle}`);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchButton();
    }
  };

  return (
    <Layout>
      <SearchBox>
        <div>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchTitle}
            onChange={(e) => setsearchTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button size="medium" color="black" onClick={handleSearchButton}>
          검색
        </Button>
      </SearchBox>
      <PostList key={search} searchTitle={search} />
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
      width: 100%;
      font-size: 1.3rem;
      border: none;
      &:focus {
        outline: none;
      }
      @media screen and (max-width: 768px) {
        font-size: 1.1rem;
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
