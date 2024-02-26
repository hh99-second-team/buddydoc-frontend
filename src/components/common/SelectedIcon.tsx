import React from 'react';
import styled from 'styled-components';
import { skillsIcon } from '../../constants/data';
import { CrossCircledIcon } from '@radix-ui/react-icons';

const SelectedIcon: React.FC<{ type: string; item: string; onRemove: any }> = ({ type, item, onRemove }) => {
  return (
    <IconBox>
      {type === 'skill' && <img src={skillsIcon[item]} alt="" />}
      <p>{item}</p>
      <CrossCircledIcon onClick={() => onRemove(item)} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.6rem;
  height: 51.5px;
  padding: 0 1rem;
  border-radius: 12px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: #fff;

  & > p {
    color: #000;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    @media screen and (max-width: 768px) {
    }
  }

  & > img {
    width: 2rem;
    height: 2rem;
  }

  & > svg {
    color: #ff6c6c;
  }
`;

export default SelectedIcon;
