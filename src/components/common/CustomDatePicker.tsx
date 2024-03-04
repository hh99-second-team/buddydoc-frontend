import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';

interface Props {
  selected: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker = ({ selected, onChange }: Props) => {
  return (
    <StyledDatePicker
      selected={selected}
      onChange={(date: Date) => onChange(date)}
      locale={ko}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
    />
  );
};

const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
  width: 100%;
  padding: 17px 30px;
  border: 1px solid #e2e3e5;
  border-radius: 12px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
`;

export default CustomDatePicker;
