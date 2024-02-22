import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  size: 'small' | 'medium' | 'half' | 'full';
  color: string;
  children: React.ReactNode;
  onClick?: any;
}

const Button = ({ size, color, children, onClick }: ButtonProps) => {
  return (
    <StyledButton size={size} color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  padding: ${(props) => getButtonPadding(props.size)};
  width: ${(props) => getButtonWidth(props.size)};
  background-color: ${(props) => getButtonColor(props.color)};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  font-weight: bolder;

  &:hover {
    opacity: 0.8;
  }
`;

const getButtonColor = (color: string) => {
  switch (color) {
    case 'primary':
      return '#007DFa';
    default:
      return color;
  }
};

const getButtonWidth = (size: string) => {
  switch (size) {
    case 'small':
      return '5vw';
    case 'medium':
      return '8vw';
    case 'half':
      return '50%';
    case 'full':
      return '100%';
    default:
      return '8vw';
  }
};

const getButtonPadding = (size: string) => {
  switch (size) {
    case 'small':
      return '8px 16px';
    case 'medium':
      return '12px 24px';
    case 'half':
      return '14px 27px';
    case 'full':
      return '14px 27px';
    default:
      return '17px 30px';
  }
};

export default Button;
