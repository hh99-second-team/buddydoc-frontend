import React from 'react';
import styled from 'styled-components';
import Bookmark from '../common/Bookmark';
import { useNavigate } from 'react-router-dom';
import StudyTypeIcon from '../common/StudyTypeIcon';
import SkillList from '../common/SkillList';
import { getDateFomat } from '../../utils/dateUtils';

/** 게시물 데이터 형식 */
interface PostProps {
  post: {
    postId: number;
    type: string;
    deadline: Date;
    title: string;
    skillList: string[];
    nickname: string;
    bookmark: number;
  };

  // post: {
  //   postId: number;
  //   type: string;
  //   nickname: string;
  //   title: string;
  //   deadline: string;
  //   skillList: string[];
  //   views: number;
  //   bookmark: number;
  // };
}

const PostItem = ({ post }: PostProps) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/${post.postId}`, { state: { post } })}>
      <div>
        <div></div>
        <StudyTypeIcon>{post.type}</StudyTypeIcon>
        <div></div>
      </div>
      <p>마감일 {getDateFomat(post.deadline)}</p>
      <Title>{post.title}</Title>
      <SkillList skip={true} skillList={post.skillList} />
      <PostFooter>
        <Writer>작성자 {post.nickname}</Writer>
        <Bookmark flexDirection="column" count={post.bookmark} />
      </PostFooter>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 28px;
  width: 100%;
  height: 350px;
  border-radius: 28px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
`;

const Title = styled.div`
  height: 120px;
  font-size: 1.5rem;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Writer = styled.div``;

export default PostItem;
