import React, { useState } from 'react';
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
import SearchModal from '../feature/SearchModal';
import emptyUserIcon from '../../assets/user-circle-icon.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useRecoilState(isSignupOpenState);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Layout>
      <Logo src={logoUrl} alt="" onClick={() => navigate('/')} />
      <WideMenus>
        <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <Dialog.Trigger asChild>
            <StyledMagnifyingGlassIcon />
          </Dialog.Trigger>
          <Dialog.Portal>
            <SearchModal onOpenChange={setIsSearchOpen} />
          </Dialog.Portal>
        </Dialog.Root>
        {!!localStorage.getItem('accessToken') && localStorage.getItem('isLoggined') === 'true' ? (
          <>
            <IconContainer>
              <div onClick={() => navigate(`/chat`)}>채팅</div>
              <ChatNotificationDot />
            </IconContainer>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <IconContainer>
                  <BellIcon />
                  <NotificationDot />
                </IconContainer>
              </Dialog.Trigger>
              <Dialog.Portal></Dialog.Portal>
            </Dialog.Root>
            <IconContainer onClick={() => navigate('/mypage')}>
              <img src={emptyUserIcon} alt="" />
            </IconContainer>
          </>
        ) : (
          <>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <NavButton>로그인</NavButton>
              </Dialog.Trigger>
              <Dialog.Portal>
                <LoginModal />
              </Dialog.Portal>
            </Dialog.Root>
            <Dialog.Root open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <Dialog.Portal>
                <SignupModal />
              </Dialog.Portal>
            </Dialog.Root>
          </>
        )}
      </WideMenus>
      <ToggleHeader>
        <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <Dialog.Trigger asChild>
            <StyledMagnifyingGlassIcon />
          </Dialog.Trigger>
          <Dialog.Portal>
            <SearchModal onOpenChange={setIsSearchOpen} />
          </Dialog.Portal>
        </Dialog.Root>
        {!!localStorage.getItem('accessToken') && localStorage.getItem('isLoggined') === 'true' ? (
          <Popover.Root>
            <Popover.Trigger asChild>
              <HamburgerMenuIcon />
            </Popover.Trigger>
            <Popover.Portal>
              <PopoverContent sideOffset={5}>
                <NavButton onClick={() => navigate('/mypage')}>마이페이지</NavButton>
                <IconContainer>
                  <div onClick={() => navigate(`/chat`)}>채팅</div>
                </IconContainer>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <IconContainer>
                      <div>알림</div>
                    </IconContainer>
                  </Dialog.Trigger>
                  <Dialog.Portal></Dialog.Portal>
                </Dialog.Root>
              </PopoverContent>
            </Popover.Portal>
          </Popover.Root>
        ) : (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <div>로그인</div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <LoginModal />
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </ToggleHeader>
    </Layout>
  );
};

const Layout = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 4.375rem;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: #fff;
  z-index: 998;
  box-shadow: 0 0 1rem rgba(175, 175, 175, 0.5);
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
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
  padding: 1rem 0;
  @media screen and (max-width: 768px) {
    border-bottom: 0.6px solid #e2e3e5;
  }

  &:hover {
    color: #686868;
  }
`;

const IconContainer = styled(NavButton)`
  position: relative;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 1rem;
  right: -5px;
  width: 7px;
  height: 7px;
  background: #ff6c6c;
  border-radius: 50%;
`;

const ChatNotificationDot = styled(NotificationDot)`
  right: -9px;
`;

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

export default Navbar;
