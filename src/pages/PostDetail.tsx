import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDateFomat } from '../utils/DateFormatFunction';
import { Layout } from '../styles/GlobalStyles';
import StudyTypeIcon from '../components/common/StudyTypeIcon';
import DeadlineIcon from '../components/common/DeadlineIcon';
import gobackIcon from '../assets/goback-icon.svg';
import CircleIcon from '../components/common/CircleIcon';
import Bookmark from '../components/common/Bookmark';
import Views from '../components/common/Views';

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation().state;
  const post = location.post;

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
            <CircleIcon src="" fallback={post.nickname} />
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

export default PostDetail;
