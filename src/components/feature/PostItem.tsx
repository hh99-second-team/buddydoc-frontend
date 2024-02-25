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
import Views from '../common/Views';
import DeadlineIcon from '../common/DeadlineIcon';

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
          <DeadlineIcon date={deadlineDate} />
        </TypeBox>
        <Bookmark direction="column" count={post.preference} />
      </CardHeader>
      <Title>{post.postTitle.length < 45 ? post.postTitle : post.postTitle.slice(0, 42) + ' ...'}</Title>
      <Deadline>마감일 {getDateFomat(deadlineDate)}</Deadline>
      <SkillBox>
        <SkillList skip={true} skillList={post.skillList} size="small" />
      </SkillBox>
      <PostFooter>
        <UserInfo>
          <img src={basicUserIcon} alt="" />
          <p>{post.users?.userNickname}</p>
        </UserInfo>
        <Views count={post.views} />
      </PostFooter>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  padding: 24px 28px;
  width: 528px;
  height: 298px;
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
  position: absolute;
  top: 71px;
  width: 80%;
  height: 62px;
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Deadline = styled.p`
  position: absolute;
  top: 144px;
  height: 21px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SkillBox = styled.div`
  position: absolute;
  top: 194px;
`;

const PostFooter = styled.div`
  position: absolute;
  bottom: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: baseline;
  align-items: center;
  column-gap: 10px;

  & > img {
    width: 30px;
    height: 30px;
  }

  & > p {
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
  }
`;

export default PostItem;
