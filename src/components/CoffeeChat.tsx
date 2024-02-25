import React from 'react';
import SwiperPerView from './common/SwiperPerView';
import styled from 'styled-components';

const CoffeeChat = () => {
  return (
    <div>
      <Title>📍 인기 파트너</Title>
      <SwiperPerView />
    </div>
  );
};

const Title = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 80px;
`;

export default CoffeeChat;
