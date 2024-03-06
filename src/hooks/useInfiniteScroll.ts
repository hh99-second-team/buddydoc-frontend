import { useEffect } from 'react';

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

export default useInfiniteScroll;
