import React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import styled, { css } from 'styled-components';

interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {}
interface SelectProps {
  items: string[];
  placeholder: string;
}

const SelectDemo = ({ items, placeholder }: SelectProps) => (
  <Select.Root>
    <SelectTrigger>
      <Select.Value placeholder={placeholder} />
      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </SelectTrigger>
    <Select.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <Select.Viewport>
          <Select.Group>
            {items.map((item) => (
              <SelectItemBox value={item}>{item}</SelectItemBox>
            ))}
          </Select.Group>
        </Select.Viewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </Select.Portal>
  </Select.Root>
);

const SelectItemBox = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectItem className={className} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <SelectItemIndicator>
          <CheckIcon />
        </SelectItemIndicator>
      </SelectItem>
    );
  }
);

const SelectTrigger = styled(Select.Trigger)`
  width: 100%;
  padding: 17px 30px;
  border: 1px solid #e2e3e5;
  border-radius: 12px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;

  &:focus {
    background-image: none;
    outline: none;
    border-color: #80befc;
    box-shadow: 0 0 5px rgba(128, 190, 252, 0.5);
  }
`;

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 9999;
`;

const SelectItem = styled(Select.Item)`
  font-size: 15px;
  line-height: 1;
  color: black;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 20px 35px;
  position: relative;
  user-select: none;

  &:hover {
    background-color: #e2e3e5;
    outline: none;
  }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SelectScrollButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: black;
  cursor: default;
`;

const SelectScrollDownButton = styled(Select.ScrollDownButton)`
  ${SelectScrollButtonStyles}
`;

const SelectScrollUpButton = styled(Select.ScrollUpButton)`
  ${SelectScrollButtonStyles}
`;

export default SelectDemo;
