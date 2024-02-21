import React from 'react';
import styled from 'styled-components';
import viewIcon from '../../assets/view-Icon.svg';

interface Props {
  count: number;
}

const Views = ({ count }: Props) => {
  return (
    <ViewsBox>
      <img src={viewIcon} alt="" />
      <p>{count}</p>
    </ViewsBox>
  );
};

const ViewsBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;

  & > img {
    width: 25px;
  }

  & > p {
    font-size: 0.8rem;
  }
`;
export default Views;
