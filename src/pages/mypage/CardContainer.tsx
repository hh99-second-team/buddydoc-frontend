import React from 'react';
import styled from 'styled-components';
import TypeIcon from '../../components/TypeIcon';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  title: string;
  status: string;
  postId: number;
}

const CardContainer = ({ children, title, status, postId }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <ContentContainer onClick={() => navigate(`/post/${postId}`)}>
        <CardHeader>
          <TopTitle>{title}</TopTitle>
          <TypeIcon>{status}</TypeIcon>
          <BottomTitle>{title}</BottomTitle>
        </CardHeader>
        {children}
      </ContentContainer>
    </motion.div>
  );
};

const ContentContainer = styled.div`
  position: relative;
  height: 12rem;
  border-radius: 30px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--grey01, #f9fafc);
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 1.8rem;
  @media screen and (max-width: 768px) {
    height: 15rem;
    padding: 1rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    display: grid;
    row-gap: 1rem;

    & > div {
      width: 22vw;
    }
  }
`;

const TopTitle = styled.p`
  display: block;
  width: 85%;
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
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BottomTitle = styled.p`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    font-size: 1.5rem;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

export default CardContainer;
