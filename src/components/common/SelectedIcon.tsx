import React from 'react';
import styled from 'styled-components';
import { skillsIcon } from '../../constants';
import { CrossCircledIcon } from '@radix-ui/react-icons';

interface Props {
  type: string;
  item: string;
  remove?: 'true' | 'false';
  onRemove?: any;
}

const SelectedIcon = ({ type, item, remove, onRemove }: Props) => {
  return (
    <IconBox $remove={remove}>
      {type === 'skill' && <img src={skillsIcon[item]} alt="" />}
      <p>{item}</p>
      {remove === 'true' && <CrossCircledIcon onClick={() => onRemove(item)} />}
    </IconBox>
  );
};

const IconBox = styled.div<{ $remove?: 'true' | 'false' }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$remove === 'true' ? 'space-between' : 'baseline')};
  column-gap: 0.6rem;
  height: 51.5px;
  padding: 0 1rem;
  border-radius: 12px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: #fff;

  & > p {
    color: #000;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  & > img {
    width: 2rem;
    height: 2rem;
  }

  & > svg {
    color: gray;
  }
`;

export default SelectedIcon;
