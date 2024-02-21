import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDateFomat } from '../utils/DateFormatFunction';
import { Layout } from '../styles/GlobalStyles';
import StudyTypeIcon from '../components/common/StudyTypeIcon';
import DeadlineIcon from '../components/common/DeadlineIcon';
import gobackIcon from '../assets/goback-icon.svg';
import userIcon from '../assets/user-circle-icon.svg';
import CircleIcon from '../components/common/CircleIcon';
import Bookmark from '../components/common/Bookmark';
import Views from '../components/common/Views';
import SkillList from '../components/common/SkillList';

interface GatherContent {
  [key: string]: any;
}

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation().state;
  const post = location.post;
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
    '모집 인원': 4,
    '프로젝트 시작': getDateFomat(post.deadline),
    '프로젝트 기간': '3주',
    '기술 스택': post.skillList,
  };

  return (
    <Layout>
      <Header>
        <img src={gobackIcon} alt="" onClick={() => navigate(-1)} />
        <IconSet>
          <StudyTypeIcon>{post.type}</StudyTypeIcon>
          <DeadlineIcon date={post.deadline} />
        </IconSet>
        <Title>{post.title}</Title>
        <BottomSet>
          <FlexBox>
            <CircleIcon src={userIcon} fallback={post.nickname} />
            <div>
              <p>{post.nickname}</p>
              <p>{getDateFomat(post.createdAt)}</p>
            </div>
          </FlexBox>
          <CountBox>
            <Views count={post.views} />
            <Bookmark flexDirection="row" count={post.bookmark} />
          </CountBox>
        </BottomSet>
      </Header>
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
    </Layout>
  );
};
const Header = styled.div`
  display: grid;
  row-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #d9d9d9;

  & > img {
    cursor: pointer;
  }
`;

const IconSet = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const Title = styled.p`
  font-size: 34px;
`;

const BottomSet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  & > div > p {
    padding: 3px 0;
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 18px;
`;

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

export default PostDetail;
