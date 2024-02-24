import React from 'react';
import styled from 'styled-components';
import StudyTypeIcon from '../../common/StudyTypeIcon';
import DeadlineIcon from '../../common/DeadlineIcon';
import userIcon from '../../../assets/user-circle-icon.svg';
import CircleIcon from '../../common/CircleIcon';
import Bookmark from '../../common/Bookmark';
import Views from '../../common/Views';
import { useNavigate } from 'react-router-dom';
import { getDateFomat } from '../../../utils/dateUtils';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { PostDetailData } from '../../../types/commonTypes';

const DetailHeader: React.FC<{ post: PostDetailData }> = ({ post }) => {
  const navigate = useNavigate();

  const deadlineDate = new Date(post.createdAt);
  deadlineDate.setDate(deadlineDate.getDate() + 10);
  console.log(post.createdAt, deadlineDate);

  return (
    <Header>
      <ChevronLeftIcon onClick={() => navigate(-1)} />
      <IconSet>
        <StudyTypeIcon>{post.postType}</StudyTypeIcon>
        <DeadlineIcon date={deadlineDate} />
      </IconSet>
      <Title>{post.title}</Title>
      <BottomSet>
        <FlexBox>
          <CircleIcon src={userIcon} fallback={post.user?.nickname} />
          <div>
            <p>{post.user?.nickname}</p>
            <p>{getDateFomat(post.createdAt)}</p>
          </div>
        </FlexBox>
        <CountBox>
          <Views count={post.views} />
          <Bookmark direction="row" count={post.preference} />
        </CountBox>
      </BottomSet>
    </Header>
  );
};

const Header = styled.div`
  display: grid;
  row-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #d9d9d9;

  & > svg {
    width: 24px;
    height: 24px;
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

export default DetailHeader;
