import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPost = () => {
  return (
    <PostBox>
      <SkeletonHeader />
      <SkeletonDeadline />
      <SkeletonContentBox count={2} />
      <SkeletonImgBox>
        <Skeleton count={5} />
      </SkeletonImgBox>
      <SkeletonWriter />
    </PostBox>
  );
};

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8em;
  padding: 1.5rem 1.75rem;
  width: 100%;
  height: 18.625rem;
  border-radius: 1.75rem;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
`;

const SkeletonHeader = styled(Skeleton)`
  width: 40%;
`;

const SkeletonDeadline = styled(Skeleton)`
  width: 70%;
`;

const SkeletonContentBox = styled(Skeleton)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SkeletonImgBox = styled.div`
  & > span {
    display: flex;
    column-gap: 10px;
    & > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      overflow: hidden;
      user-select: none;
      width: 45px;
      height: 45px;
      border-radius: 100%;
    }
  }
`;

const SkeletonWriter = styled(Skeleton)`
  width: 40%;
`;

export default SkeletonPost;
