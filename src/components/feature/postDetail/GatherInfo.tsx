import React from 'react';
import styled from 'styled-components';
import SkillList from '../../common/SkillList';
import { getDateFomat } from '../../../utils/dateUtils';

interface GatherContent {
  [key: string]: any;
}

const GatherInfo = ({ post }: any) => {
  const gatherInfo = [
    '모집 일시',
    '모집 분야',
    '모집 구분',
    '모집 인원',
    '프로젝트 시작',
    '프로젝트 기간',
    '기술 스택',
  ];

  const gathercontent: GatherContent = {
    '모집 일시': getDateFomat(post.createdAt),
    '모집 분야': '프론트엔드',
    '모집 구분': post.type,
    '모집 인원': '4명',
    '프로젝트 시작': getDateFomat(post.deadline),
    '프로젝트 기간': '3주',
    '기술 스택': post.skillList,
  };

  return (
    <Content>
      {gatherInfo.map((info) => (
        <Info key={info}>
          <p>{info}</p>
          {info === '기술 스택' ? (
            <SkillList skillList={gathercontent[info]} />
          ) : info === '모집 분야' ? (
            <p>{gathercontent[info]}</p>
          ) : (
            <p>{gathercontent[info]}</p>
          )}
        </Info>
      ))}
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 40px;
  padding: 40px 0;
  border-bottom: 1px solid #d9d9d9;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  & > p {
    font-size: 20px;
  }
`;

export default GatherInfo;
