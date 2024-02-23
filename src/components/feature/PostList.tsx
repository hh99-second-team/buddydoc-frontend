import React from 'react';
import PostItem from './PostItem';
import styled from 'styled-components';
import SkeletonPost from './SkeletonPost';
import { useQuery } from 'react-query';
import api from '../../services/api';

/** 게시물 데이터 형식 */
interface PostData {
  postId: number;
  type: string;
  nickname: string;
  title: string;
  deadline: Date;
  skillList: string[];
  views: number;
  bookmark: number;
}

const PostList = () => {
  const { isLoading, data, isError, error } = useQuery<PostData[]>('posts', api.getPost);

  const createDate = new Date();
  const deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + 10);
  const testList = Array(20).fill({
    postId: 1,
    type: '프로젝트',
    nickname: '오늘은맑음',
    title: '개발자 매칭 플랫폼 Web FE 팀원 추가 모집합니다~!',
    createdAt: createDate,
    deadline: deadlineDate,
    skillList: ['react', 'typescript', 'node', 'express', 'aws', 'javascript'],
    views: 278,
    bookmark: 63,
  });

  return (
    <PostContainer>
      {/* 로딩 중일 때 Skeleton UI 표시*/}
      {/* 최초엔 12개의 스켈레톤 표시 */}
      {isLoading && Array.from({ length: 12 }, (_, idx) => <SkeletonPost />)}
      {testList && testList.map((post, idx) => <PostItem post={post} key={idx} />)}
    </PostContainer>
  );
};

const PostContainer = styled.div`
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 20px;
`;
export default PostList;
