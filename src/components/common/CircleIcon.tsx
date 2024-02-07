import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import styled from 'styled-components';

interface IconProps {
  src: string;
  fallback: string;
}

const CircleIcon = (props: IconProps) => {
  return (
    <AvatarRoot>
      <AvatarImage src={props.src} alt="Colm Tuite" />
      <AvatarFallback delayMs={600}>{props.fallback}</AvatarFallback>
    </AvatarRoot>
  );
};

const AvatarRoot = styled(Avatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: var(--black-a3);
`;

const AvatarImage = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AvatarFallback = styled(Avatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--violet-11);
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
`;

export default CircleIcon;
