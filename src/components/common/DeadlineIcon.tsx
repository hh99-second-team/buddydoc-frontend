import React from 'react';
import { getDDayCounter, getDayDiff } from '../../utils/dateUtils';
import styled from 'styled-components';

interface Props {
  date: Date;
}

const DeadlineIcon = ({ date }: Props) => {
  const deadlineLeft = getDDayCounter(date);
  const dayDiff = getDayDiff(date);

  return (
    <DDayBox className={dayDiff > 0 ? 'closed' : dayDiff > -6 ? 'befFive' : dayDiff < -11 ? 'befTen' : 'cool'}>
      {deadlineLeft}
    </DDayBox>
  );
};

const DDayBox = styled.div`
  display: inline-flex;
  padding: 4.026px 8.052px;
  justify-content: center;
  align-items: center;
  gap: 6.442px;
  border-radius: 45.091px;
  background: #ff5858;
  color: white;

  &.closed {
    background: #ced0d3;
  }
  &.befFive {
    background: #ff5858;
  }
  &.befTen {
    background: #6196ff;
  }
  &.cool {
    background: #434855;
  }
`;

export default DeadlineIcon;
