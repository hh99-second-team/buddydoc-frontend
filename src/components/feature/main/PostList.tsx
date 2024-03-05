import React, { useEffect, useState } from 'react';
import { PostCardType } from '../../../types';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import api from '../../../api';
import { useInView } from 'react-intersection-observer';

interface ParamsType {
  postType?: '스터디' | '프로젝트';
  searchTitle?: string;
  isEnd?: boolean;
}

const usePostLoader = ({ postType, searchTitle, isEnd }: ParamsType) => {
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLastPage) return;

      setIsLoading(true);

      const response = await (postType
        ? api.getPost(page, isEnd, postType)
        : searchTitle
        ? api.getPostSearch(page, searchTitle)
        : api.getPost(page, isEnd));

      setPosts((prevPosts) => [...prevPosts, ...response.posts]);
      setIsLastPage(response.isLastPage);
      setIsLoading(false);
    };

    fetchPosts();
  }, [isEnd, isLastPage, isLoading, page, postType, searchTitle]);

  useEffect(() => {
    if (inView && !isLoading && posts.length > 0) {
      setPage(posts[posts.length - 1].postId);
    }
  }, [inView, isLoading, posts]);

  return { posts, isLoading, ref };
};

const PostList = ({ postType, searchTitle, isEnd }: ParamsType) => {
  const { posts, isLoading, ref } = usePostLoader({ postType, searchTitle, isEnd });

  return (
    <>
      <PostContainer>
        {posts.map((post, idx) => (
          <div key={idx} ref={idx === posts.length - 1 ? ref : undefined}>
            <PostItem post={post} />
          </div>
        ))}
        {isLoading && (
          <>
            {Array.from({ length: posts.length === 0 ? 10 : 4 }, (_, idx) => (
              <SkeletonPost key={idx} />
            ))}
          </>
        )}
      </PostContainer>
      {posts.length === 0 && (
        <EmptyPostTitle>{searchTitle ? `"${searchTitle}" 검색 결과가 없습니다.` : '게시글이 없습니다.'}</EmptyPostTitle>
      )}
    </>
  );
};

const PostContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 54px;
  column-gap: 103px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EmptyPostTitle = styled.p`
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
`;

export default PostList;
