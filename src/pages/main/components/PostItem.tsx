import React from 'react';
import styled from 'styled-components';
import Bookmark from '../../../components/Bookmark';
import SkillList from '../../../components/SkillList';
import TypeIcon from '../../../components/TypeIcon';
import { useNavigate } from 'react-router-dom';
import { getDateFomat } from '../../../utils';
import { PostCardType } from '../../../types';
import { motion } from 'framer-motion';
import studyIcon from '../../../assets/study-icon.svg';
import projectIcon from '../../../assets/project-icon.svg';
import Views from '../../../components/Views';
import DeadlineIcon from '../../../components/DeadlineIcon';
import CircleIcon from '../../../components/CircleIcon';

const PostItem: React.FC<{ post: PostCardType }> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <Card onClick={() => navigate(`/post/${post.postId}`, { state: { post } })}>
        <CardHeader>
          <TypeBox>
            {post.postType === '스터디' ? <img src={studyIcon} alt="" /> : <img src={projectIcon} alt="" />}
            <TypeIcon>{post.postType}</TypeIcon>
            <DeadlineIcon date={post.deadLine} />
          </TypeBox>
          <Bookmark postId={post.postId} direction="column" count={post.preference} isToggle={post.bookmark} />
        </CardHeader>
        <Title>{post.postTitle}</Title>
        <Deadline>마감일 {getDateFomat(post.deadLine)}</Deadline>
        <SkillBox>
          <SkillList skip={true} skillList={post.skillList} size="small" />
        </SkillBox>
        <PostFooter>
          <UserInfo>
            <CircleIcon src={post.users.profileImage} type="profile" />
            <p>{post.users.userNickname}</p>
          </UserInfo>
          <Views count={post.views} />
        </PostFooter>
      </Card>
    </motion.div>
  );
};

const Card = styled.div`
  position: relative;
  padding: 1.5rem 1.75rem;
  width: 100%;
  height: 18.625rem;
  border-radius: 1.75rem;
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
  column-gap: 0.625rem;
`;

const Title = styled.div`
  position: absolute;
  top: 4.4375rem;
  width: 80%;
  height: 3.73rem;
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Deadline = styled.p`
  position: absolute;
  top: 9rem;
  height: 1.3125rem;
  color: #000;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SkillBox = styled.div`
  position: absolute;
  top: 12.125rem;
  & > div > span {
    margin-right: 0.625rem;
  }
`;

const PostFooter = styled.div`
  position: absolute;
  bottom: 1.25rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: baseline;
  align-items: center;
  column-gap: 0.625rem;

  & > img {
    width: 1.875rem;
    height: 1.875rem;
  }

  & > p {
    color: #000;
    font-size: 1rem;
    font-style: normal;
    line-height: normal;
  }
`;

export default PostItem;
