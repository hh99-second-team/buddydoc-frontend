import React from 'react';
import * as Menubar from '@radix-ui/react-menubar';
import styled from 'styled-components';

const MenuBarTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Trigger>{children}</Trigger>;
};

const Trigger = styled(Menubar.Trigger)`
  all: unset;
`;

export default MenuBarTrigger;
