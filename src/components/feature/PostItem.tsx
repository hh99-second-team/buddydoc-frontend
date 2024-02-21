import React from 'react';
import styled from 'styled-components';
import { skillsIcon } from '../../utils/skillUrlList';
import CircleIcon from '../common/CircleIcon';
import Bookmark from '../common/Bookmark';
import { useNavigate } from 'react-router-dom';
import StudyTypeIcon from '../common/StudyTypeIcon';

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
      <p>마감일 {post.deadline.toString()}</p>
      <Title>{post.title}</Title>
      <SkillList>
        {post.skillList.slice(0, 5).map((skill, idx) => (
          <CircleIcon key={idx} src={skillsIcon[skill]} fallback={skill} />
        ))}
        {post.skillList.length > 5 && <span>+ {post.skillList.length - 5}</span>}
      </SkillList>
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

const SkillList = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Writer = styled.div``;

export default PostItem;
