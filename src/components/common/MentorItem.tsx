import React from 'react';
import styled from 'styled-components';
import CircleIcon from './CircleIcon';

const MentorItem = () => {
  return (
    <Container>
      <CardBox>
        <CircleIcon src="" fallback="" size="86px" />
      </CardBox>
    </Container>
  );
};

const Container = styled.div`
  width: 330px;
  height: 357px;
  flex-shrink: 0;
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: #f9fafc;
`;

const CardBox = styled.div`
  padding: 30px 20px;
`;

export default MentorItem;
