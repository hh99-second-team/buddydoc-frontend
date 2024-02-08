import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import LoginModal from '../feature/LoginModal';
import logoUrl from '../../assets/buddydoc-logo.png';

const Navbar = () => {
  return (
    <Layout>
      <Logo src={logoUrl} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button violet">로그인</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <LoginModal />
        </Dialog.Portal>
      </Dialog.Root>
    </Layout>
  );
};

const Layout = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 57px;
  padding: 0 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid #d9d9d9;
  background: #fff;
  z-index: 998;
`;

const Logo = styled.img`
  width: 8vw;
`;

export default Navbar;
