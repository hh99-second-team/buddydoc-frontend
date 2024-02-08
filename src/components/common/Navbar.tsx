import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import LoginModal from '../feature/LoginModal';
import logoUrl from '../../assets/buddydoc-logo.png';
import SignupModal from '../feature/SignupModal';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Logo src={logoUrl} alt="" onClick={() => navigate('/')} />
      <ButtonSet>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NavButton>로그인</NavButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <LoginModal />
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NavButton>회원가입</NavButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <SignupModal />
          </Dialog.Portal>
        </Dialog.Root>
      </ButtonSet>
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
  background: #fff;
  z-index: 998;
  box-shadow: 0 0 15px rgba(175, 175, 175, 0.5);
`;

const Logo = styled.img`
  width: 8vw;
`;

const ButtonSet = styled.div`
  display: flex;
  column-gap: 17px;
`;

const NavButton = styled.div`
  cursor: pointer;
  width: 60px;
  text-align: center;

  &:hover {
    color: #686868;
  }
`;

export default Navbar;
