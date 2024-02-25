import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';
import LoginModal from '../feature/LoginModal';
import logoUrl from '../../assets/buddydoc-logo.png';
import SignupModal from '../feature/SignupModal';
import { ReactComponent as BellIcon } from '../../assets/bell-icon.svg';
import { useNavigate } from 'react-router-dom';
import { HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRecoilState } from 'recoil';
import { isSignupOpenState } from '../../store/atomDefinitions';
import * as Popover from '@radix-ui/react-popover';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useRecoilState(isSignupOpenState);

  return (
    <Layout>
      <Logo src={logoUrl} alt="" onClick={() => navigate('/')} />
      <WideMenus>
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
      </WideMenus>
      <ToggleHeader>
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
        <Popover.Root>
          <Popover.Trigger asChild>
            <HamburgerMenuIcon />
          </Popover.Trigger>
          <Popover.Portal>
            <PopoverContent sideOffset={5}>
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
                    <div>알림</div>
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
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
      </ToggleHeader>
    </Layout>
  );
};

const Layout = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 4.375rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: #fff;
  z-index: 998;
  box-shadow: 0 0 1rem rgba(175, 175, 175, 0.5);
`;

const Logo = styled.img`
  width: 8rem;
`;

const WideMenus = styled.ul`
  display: flex;
  column-gap: 1.5625rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ToggleHeader = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
`;

const slideUpAndFade = keyframes`
  0% { opacity: 0; transform: translateY(2px) };
  100% { opacity: 1; transform: translateY(0) };
`;

const slideRightAndFade = keyframes`
  0% { opacity: 0; transform: translateX(-2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const slideDownAndFade = keyframes`
  0% { opacity: 0; transform: translateY(-2px) };
  100% { opacity: 1; transform: translateY(0) };
`;

const slideLeftAndFade = keyframes`
  0% { opacity: 0; transform: translateX(2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const PopoverContent = styled(Popover.Content)`
  z-index: 999;
  border-radius: 4;
  padding: 1rem;
  margin-top: 1rem;
  width: 10rem;
  display: grid;
  row-gap: 1rem;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  &[data-state='open'] {
    &[data-side='top'] {
      animation-name: ${slideDownAndFade};
    }
    &[data-side='right'] {
      animation-name: ${slideLeftAndFade};
    }
    &[data-side='bottom'] {
      animation-name: ${slideUpAndFade};
    }
    &[data-side='left'] {
      animation-name: ${slideRightAndFade};
    }
  }

  &:hover {
    border: none;
  }
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
