import React from 'react';
import styled from 'styled-components';
import TypeIcon from '../../common/TypeIcon';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  title: string;
  status: string;
  postId: number;
}

const CardContainer = ({ children, title, status, postId }: Props) => {
  const navigate = useNavigate();

  return (
    <ContentContainer onClick={() => navigate(`/${postId}`)}>
      <CardHeader>
        <Title>{title}</Title>
        <TypeIcon>{status}</TypeIcon>
      </CardHeader>
      {children}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  position: relative;
  height: 10rem;
  border-radius: 30px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 1.8rem;
  @media screen and (max-width: 768px) {
    height: 15rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    display: grid;

    & > div {
      width: 25vw;
    }
  }
`;

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  font-style: normal;
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

export default CardContainer;
