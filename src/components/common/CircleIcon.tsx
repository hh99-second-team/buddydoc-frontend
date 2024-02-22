import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import styled from 'styled-components';

interface IconProps {
  src: string;
  fallback: string;
  size?: 'small' | 'basic';
}

const CircleIcon = ({ src, fallback, size }: IconProps) => {
  return (
    <AvatarRoot>
      <AvatarImage src={src} alt="Colm Tuite" />
      <AvatarFallback delayMs={600}>{fallback}</AvatarFallback>
    </AvatarRoot>
  );
};

const AvatarRoot = styled(Avatar.Root)<{ size?: 'small' | 'basic' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: ${(props) => (props.size === 'small' ? '30px' : '42px')};
  height: ${(props) => (props.size === 'small' ? '30px' : '42px')};
  border-radius: 100%;
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
  background-color: #1563ff;
  color: white;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
`;

export default CircleIcon;
