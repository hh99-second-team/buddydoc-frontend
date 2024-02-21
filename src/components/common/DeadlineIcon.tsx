import React from 'react';
import { getDDayCounter } from '../../utils/DateFormatFunction';
import styled from 'styled-components';

interface Props {
  date: Date;
}

const DeadlineIcon = ({ date }: Props) => {
  const deadlineLeft = getDDayCounter(date);

  return <DDayBox>{deadlineLeft}</DDayBox>;
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
`;

export default DeadlineIcon;
