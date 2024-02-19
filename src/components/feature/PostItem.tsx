import React from 'react';
import styled from 'styled-components';
import { skillsIcon } from '../../utils/skillUrlList';
import CircleIcon from '../common/CircleIcon';
import Bookmark from '../common/Bookmark';

/** 게시물 데이터 형식 */
interface PostProps {
  post: { type: string; deadline: string; title: string; skillList: string[]; nickname: string; bookmark: number };

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
  return (
    <Card>
      <div>
        <div></div>
        <TypeBox>{post.type}</TypeBox>
        <div></div>
      </div>
      <p>마감일 {post.deadline}</p>
      <Title>{post.title}</Title>
      <SkillList>
        {post.skillList.slice(0, 5).map((skill, idx) => (
          <CircleIcon key={idx} src={skillsIcon[skill]} fallback={skill} />
        ))}
        {post.skillList.length > 5 && <span>+ {post.skillList.length - 5}</span>}
      </SkillList>
      <PostFooter>
        <Writer>작성자 {post.nickname}</Writer>
        <Bookmark count={post.bookmark} />
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

const TypeBox = styled.div`
  display: inline-flex;
  padding: 4.026px 8.052px;
  justify-content: center;
  align-items: center;
  gap: 6.442px;
  border-radius: 45.091px;
  background: #fff;
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
