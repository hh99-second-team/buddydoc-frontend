import React from 'react';
import styled from 'styled-components';
import { skillSet } from '../../utils/skillUrlList';
import CircleIcon from '../common/CircleIcon';

interface PostProps {
  post: { type: string; deadline: string; title: string; skillList: string[]; writer: string; bookmark: number };
}

const PostItem = (props: PostProps) => {
  return (
    <Card>
      <div>
        <div></div>
        <TypeBox>{props.post.type}</TypeBox>
        <div></div>
      </div>
      <p>마감일 {props.post.deadline}</p>
      <h2>{props.post.title}</h2>
      <SkillList>
        {props.post.skillList.map((skill) => (
          <CircleIcon src={skillSet[skill]} fallback={skill} />
        ))}
      </SkillList>
      <div>
        <div>작성자 {props.post.writer}</div>
        <div>{props.post.bookmark}</div>
      </div>
    </Card>
  );
};

const Card = styled.div`
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

const SkillList = styled.div`
  display: flex;
  column-gap: 10px;
`;

export default PostItem;
