import React from 'react';
import styled from 'styled-components';
import SkillList from '../../common/SkillList';
import { getDateFomat } from '../../../utils';
import { PostDetailType } from '../../../types';
import { gatherInfo } from '../../../constants';

const GatherInfo: React.FC<{ post: PostDetailType }> = ({ post }) => {
  const gatherContent: { [key: string]: any } = {
    '모집 구분': post.postType === '스터디' ? '스터디' : '프로젝트',
    '모집 인원': post.memberCount + '명',
    '모집 마감일': getDateFomat(post.deadLine),
    '모집 포지션': post.position,
    '프로젝트 시작': getDateFomat(post.startDate),
    '프로젝트 기간': post.period,
    '기술 스택': post.skillList,
  };

  return (
    <Content>
      {gatherInfo.map((info) => (
        <Info key={info}>
          <p>{info}</p>
          {info === '기술 스택' ? (
            <SkillList skillList={gatherContent[info]} />
          ) : info === '모집 포지션' ? (
            <p>{gatherContent[info].join(' / ')}</p>
          ) : (
            <p>{gatherContent[info]}</p>
          )}
        </Info>
      ))}
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  row-gap: 40px;
  padding: 40px 0;
  border-bottom: 1px solid #d9d9d9;
  grid-template-columns: repeat(2, 1fr);
  & > *:nth-child(n + 7) {
    grid-column: span 2; /* 네 번째 줄에 있는 요소는 1열로 설정 */
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    & > *:nth-child(n + 7) {
      grid-column: 1; /* 네 번째 줄에 있는 요소는 1열로 설정 */
    }
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 9rem auto;
  align-items: baseline;
  & > p {
    font-size: 1.25rem;
  }
  & > div > span {
    margin-left: 0.3rem;
    margin-bottom: 0.3rem;
  }
`;

export default GatherInfo;
