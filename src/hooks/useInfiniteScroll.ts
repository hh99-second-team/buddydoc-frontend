import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { PostCardType } from '../types';
import api from '../api';
import { getUnixTime } from 'date-fns';

interface InfiniteScrollProps {
  inView: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  listLen?: number;
}

const useInfiniteScroll = ({
  inView,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  listLen,
}: InfiniteScrollProps) => {
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage && listLen) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage, listLen]);
};

interface ParamsType {
  postType?: '스터디' | '프로젝트';
  searchTitle?: string;
  isEnd?: boolean;
  inView: boolean;
}

const usePostDataFetching = ({ postType, searchTitle, isEnd, inView }: ParamsType) => {
  const fetchPosts = async ({ pageParam = 0 || '' }) => {
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
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.isLastPage || !lastPage.posts.length) {
          return undefined;
        }

        const lastPostIdx = lastPage.posts.length - 1;
        if (searchTitle && !lastPage.isLastPage) {
          return (
            getUnixTime(new Date(lastPage.posts[lastPostIdx].createdAt)) + ',' + lastPage.posts[lastPostIdx].postId
          );
        }

        return lastPage.posts[lastPostIdx].postId;
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

export { useInfiniteScroll, usePostDataFetching };
