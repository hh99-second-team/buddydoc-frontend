import { useInfiniteQuery } from 'react-query';
import api from '../api';
import { PostCardType } from '../types';
import useInfiniteScroll from './useInfiniteScroll';

interface ParamsType {
  postType?: '스터디' | '프로젝트';
  searchTitle?: string;
  isEnd?: boolean;
  inView: boolean;
}

const usePostDataFetching = ({ postType, searchTitle, isEnd, inView }: ParamsType) => {
  const fetchPosts = async ({ pageParam = 0 }) => {
    const response = !!postType
      ? await api.getPost(pageParam, isEnd, postType)
      : !!searchTitle
      ? await api.getPostSearch(pageParam, searchTitle)
      : await api.getPost(pageParam, isEnd);
    return response;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfiniteQuery(
    ['posts', postType ? postType : searchTitle ? searchTitle : ''],
    fetchPosts,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.isLastPage) {
          return undefined;
        }
        return allPages.length;
      },
    }
  );

  const posts: PostCardType[] = data?.pages.flatMap((page) => page.posts) || [];

  useInfiniteScroll({
    inView,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    listLen: posts.length,
  });

  return { posts, hasNextPage, isFetchingNextPage, isError, isLoading };
};

export default usePostDataFetching;
