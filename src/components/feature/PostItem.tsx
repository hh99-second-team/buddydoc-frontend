import React from 'react';
import styled from 'styled-components';
import Bookmark from '../common/Bookmark';
import SkillList from '../common/SkillList';
import StudyTypeIcon from '../common/StudyTypeIcon';
import { useNavigate } from 'react-router-dom';
import { getDateFomat } from '../../utils/dateUtils';
import { PostCardData } from '../../types/commonTypes';
import basicUserIcon from '../../assets/user-circle-icon.svg';
import studyIcon from '../../assets/study-icon.svg';
import projectIcon from '../../assets/project-icon.svg';

const PostItem: React.FC<{ post: PostCardData }> = ({ post }) => {
  const navigate = useNavigate();

  const deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + 10);

  return (
    <Card onClick={() => navigate(`/${post.postId}`, { state: { post } })}>
      <CardHeader>
        <TypeBox>
          {post.postType === 'study' ? <img src={studyIcon} alt="" /> : <img src={projectIcon} alt="" />}
          <StudyTypeIcon>{post.postType}</StudyTypeIcon>
        </TypeBox>
        <Bookmark direction="column" count={post.preference} />
      </CardHeader>
      <Title>{post.postTitle}</Title>
      <Deadline>마감일 {getDateFomat(deadlineDate)}</Deadline>
      <SkillList skip={true} skillList={post.skillList} size="small" />
      <PostFooter>
        <img src={basicUserIcon} alt="" />
        <Writer>{post.users?.userNickname}</Writer>
      </PostFooter>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 28px;
  width: 100%;
  height: 350px;
  border-radius: 28px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TypeBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const Title = styled.div`
  width: 80%;
  height: 20%;
  font-size: 1.5rem;
`;

const Deadline = styled.p``;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 7px;

  & > img {
    width: 25px;
    height: 25px;
  }
`;

const Writer = styled.div``;

export default PostItem;
