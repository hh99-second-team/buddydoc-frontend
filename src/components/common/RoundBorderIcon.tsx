import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/close-icon.svg';

interface Props {
  item: string;
  onRemove?: any;
}

const RoundBorderIcon = ({ item, onRemove }: Props) => {
  return (
    <IconBox>
      <p>{item}</p>
      <img src={closeIcon} alt="" onClick={() => onRemove(item)} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  border: 1px solid #e2e3e5;
  box-shadow: 0 0 5px rgba(46, 51, 55, 0.5);
  height: 2rem;

  & > img {
  }
`;

export default RoundBorderIcon;
