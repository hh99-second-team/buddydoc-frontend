import React from 'react';
import styled from 'styled-components';

const Chatting = () => {
  return (
    <Layout>
      <ChatTitleBox>
        <Title>개발 모각코 스터디</Title>
      </ChatTitleBox>
    </Layout>
  );
};

const Layout = styled.div`
  padding-left: 1.75rem;
  padding-right: 4.375rem;
`;

const ChatTitleBox = styled.div`
  width: 761px;
  height: 5rem;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 35px;
`;

const Title = styled.p`
  color: var(--Primary, #000);
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default Chatting;
