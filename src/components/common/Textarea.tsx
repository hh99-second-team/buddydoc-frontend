import React from 'react';
import styled from 'styled-components';

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: any;
  rows?: number;
  maxLength: number;
}

const Textarea = ({ placeholder, value, onChange, rows, maxLength }: TextareaProps) => {
  return (
    <TextBox rows={rows} placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength}></TextBox>
  );
};

const TextBox = styled.textarea`
  width: 100%;
  padding: 17px 30px;
  border: 1px solid #e2e3e5;
  border-radius: 12px;
  background-color: transparent;
  resize: none;

  &:focus {
    background-image: none;
    outline: none;
  }
`;

export default Textarea;
