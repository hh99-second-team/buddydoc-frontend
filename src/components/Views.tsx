import React from 'react';
import styled from 'styled-components';
import { EyeOpenIcon } from '@radix-ui/react-icons';

interface Props {
  count: number;
}

const Views = ({ count }: Props) => {
  return (
    <ViewsBox>
      <EyeOpenIcon />
      <p>{count}</p>
    </ViewsBox>
  );
};

const ViewsBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;

  & > svg {
    width: 25px;
    height: 25px;
    color: #434855;
  }

  & > p {
    font-size: 0.8rem;
  }
`;
export default Views;
