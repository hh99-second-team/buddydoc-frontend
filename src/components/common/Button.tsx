import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  size: 'small' | 'medium' | 'full';
  color: 'primary';
  children: React.ReactNode;
  theme?: {
    colors: {
      button: {
        primary: string;
      };
    };
  };
}

const Button = ({ size, color, children }: ButtonProps) => {
  return (
    <StyledButton size={size} color={color}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  padding: ${(props) => getButtonPadding(props.size)};
  width: ${(props) => getButtonWidth(props.size)};
  background-color: ${(props) => getButtonColor(props)};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  font-weight: bolder;

  &:hover {
    background-color: ${(props) => getButtonHoverColor(props.color)};
  }
`;

const getButtonColor = (props: ButtonProps) => {
  switch (props.color) {
    case 'primary':
      return '#007DFa';
    default:
      return '#007DFa';
  }
};

const getButtonHoverColor = (color: string) => {
  switch (color) {
    case 'primary':
      return 'rgba(0, 125, 250, 0.8)';
    default:
      return 'rgba(0, 125, 250, 0.8)';
  }
};

const getButtonWidth = (size: string) => {
  switch (size) {
    case 'small':
      return '5vw';
    case 'medium':
      return '8vw';
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
    case 'full':
      return '12px 0';
    default:
      return '12px 24px';
  }
};

export default Button;
