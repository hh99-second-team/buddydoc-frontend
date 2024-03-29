import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import styled from 'styled-components';
import emptyProfileImg from '../assets/user-circle-icon.svg';

interface IconProps {
  src: string;
  fallback?: string;
  size?: string;
  type?: 'profile';
}

const CircleIcon = ({ src, fallback, size, type }: IconProps) => {
  return (
    <AvatarRoot size={size} type={type}>
      <AvatarImage src={src ? src : type ? emptyProfileImg : ''} alt="Colm Tuite" />
      <AvatarFallback delayMs={600}>{fallback}</AvatarFallback>
    </AvatarRoot>
  );
};

const getButtonSize = (size: string | undefined) => {
  switch (size) {
    case 'small':
      return '30px';
    case 'medium':
      return '42px';
    default:
      return size || '30px';
  }
};

const AvatarRoot = styled(Avatar.Root)<{ size?: string; type?: string }>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: ${(props) => getButtonSize(props.size)};
  height: ${(props) => getButtonSize(props.size)};
  background: #fff;
  border-radius: 100%;
  border: ${(props) => (props.type ? '' : '1px solid var(--grey03, #ced0d3)')};
  /* filter: ${(props) => (props.type ? 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' : '')}; */
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
  background: #e2e3e5;
  color: var(--text1, #434855);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  stroke-width: 1px;
  stroke: var(--grey03, #ced0d3);
`;

export default CircleIcon;
