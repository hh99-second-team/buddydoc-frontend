import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import styled, { css } from 'styled-components';

interface SelectItemProps extends React.ComponentProps<typeof RadixSelect.Item> {}
interface SelectProps {
  selectValue: string;
  onValueChange: any;
  items: string[];
  placeholder: string;
}

const Select = ({ selectValue, onValueChange, items, placeholder }: SelectProps) => {
  return (
    <RadixSelect.Root defaultValue="" value={selectValue} onValueChange={onValueChange}>
      <SelectTrigger>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </SelectTrigger>
      <RadixSelect.Portal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <RadixSelect.Viewport>
            <RadixSelect.Group>
              {items.map((item, idx) => (
                <SelectItemBox key={idx} value={item}>
                  {item}
                </SelectItemBox>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

const SelectItemBox = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardRef) => {
    return (
      <SelectItem className={className} {...props} ref={forwardRef}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <SelectItemIndicator>
          <CheckIcon />
        </SelectItemIndicator>
      </SelectItem>
    );
  }
);

const SelectTrigger = styled(RadixSelect.Trigger)`
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

const SelectContent = styled(RadixSelect.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 9999;
`;

const SelectItem = styled(RadixSelect.Item)`
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

const SelectItemIndicator = styled(RadixSelect.ItemIndicator)`
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

const SelectScrollDownButton = styled(RadixSelect.ScrollDownButton)`
  ${SelectScrollButtonStyles}
`;

const SelectScrollUpButton = styled(RadixSelect.ScrollUpButton)`
  ${SelectScrollButtonStyles}
`;

export default Select;
