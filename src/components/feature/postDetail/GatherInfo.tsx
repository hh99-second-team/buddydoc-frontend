import React from 'react';
import styled from 'styled-components';
import SkillList from '../../common/SkillList';
import { getDateFomat } from '../../../utils/dateUtils';
import { PostDetailType } from '../../../types/commonTypes';
import { gatherInfo } from '../../../constants/data';

const GatherInfo: React.FC<{ post: PostDetailType }> = ({ post }) => {
  const gatherContent: { [key: string]: any } = {
    '모집 일시': getDateFomat(post.createdAt),
    '모집 분야': post.position,
    '모집 구분': post.postType === '스터디' ? '스터디' : '프로젝트',
    '모집 인원': post.memberCount + '명',
    '프로젝트 시작': getDateFomat(post.startDate),
    '프로젝트 기간': post.period,
    '기술 스택': post.skillList,
  };

  return (
    <Content>
      {gatherInfo.map((info) => (
        <Info key={info}>
          <p>{info}</p>
          {info === '기술 스택' ? <SkillList skillList={gatherContent[info]} /> : <p>{gatherContent[info]}</p>}
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
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
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
