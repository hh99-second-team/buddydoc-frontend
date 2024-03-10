import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (value: any) => void;
  onKeyDown?: (value: any) => void;
  isValid?: 'none' | boolean;
}

const Input = ({ type, placeholder, value, onChange, onKeyDown, isValid }: InputProps) => {
  return (
    <InputBox
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={isValid === 'none' ? '' : isValid ? 'valid' : 'not--valid'}
    />
  );
};

const InputBox = styled.input`
  width: 100%;
  padding: 17px 30px;
  border: 1px solid #e2e3e5;
  border-radius: 12px;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &.valid:focus {
    background-image: none;
    outline: none;
    border-color: #80befc;
    box-shadow: 0 0 5px rgba(128, 190, 252, 0.5);
  }

  &.not--valid {
    border-color: rgb(238, 145, 136);
    box-shadow: 0 0 5px rgba(238, 145, 136, 0.5);
  }
`;
export default Input;
