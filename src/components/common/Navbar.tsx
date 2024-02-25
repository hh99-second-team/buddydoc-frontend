import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import LoginModal from '../feature/LoginModal';
import logoUrl from '../../assets/buddydoc-logo.png';
import SignupModal from '../feature/SignupModal';
import { ReactComponent as BellIcon } from '../../assets/bell-icon.svg';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRecoilState } from 'recoil';
import { isSignupOpenState } from '../../store/atomDefinitions';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useRecoilState(isSignupOpenState);

  return (
    <Layout>
      <Logo src={logoUrl} alt="" onClick={() => navigate('/')} />
      <ButtonSet>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NavButton>
              <SearchBox>
                <SearchButton>
                  <MagnifyingGlassIcon />
                </SearchButton>
                <SearchInput type="text" placeholder="찾으려는 내용을 입력해주세요." />
              </SearchBox>
            </NavButton>
          </Dialog.Trigger>
          <Dialog.Portal></Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <IconContainer>
              <div>채팅</div>
              <ChatNotificationDot />
            </IconContainer>
          </Dialog.Trigger>
          <Dialog.Portal></Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <IconContainer>
              <BellIcon />
              <NotificationDot />
            </IconContainer>
          </Dialog.Trigger>
          <Dialog.Portal></Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NavButton>로그인</NavButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <LoginModal />
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root open={isSignupOpen} onOpenChange={setIsSignupOpen}>
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
  height: 8vh;
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
  column-gap: 25px;
  align-items: center;
`;

const NavButton = styled.div`
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #686868;
  }
`;

const SearchBox = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 30px;
  border-style: none;
  letter-spacing: 2px;
  outline: none;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  background-color: #fff;
  padding-right: 40px;
  color: black;

  &::placeholder {
    color: black;
    letter-spacing: 2px;
    font-weight: 100;
  }

  &:focus {
    width: 250px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid #bfc0c4;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: black;
  background-color: transparent;
  pointer-events: painted;

  &:focus ~ ${SearchInput} {
    width: 250px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid #bfc0c4;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

const IconContainer = styled(NavButton)`
  position: relative;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: -5px;
  width: 7px;
  height: 7px;
  background: #ff6c6c;
  border-radius: 50%;
`;

const ChatNotificationDot = styled(NotificationDot)`
  right: -9px;
`;

export default Navbar;
