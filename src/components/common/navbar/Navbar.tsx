import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Menubar from '@radix-ui/react-menubar';
import styled from 'styled-components';
import LoginModal from '../../feature/LoginModal';
import logoUrl from '../../../assets/buddydoc-logo.png';
import SignupModal from '../../feature/SignupModal';
import { useNavigate } from 'react-router-dom';
import { HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRecoilState } from 'recoil';
import { isLoginOpenState, isSignupOpenState } from '../../../store/atomDefinitions';
import SearchModal from '../../feature/SearchModal';
import MenuBarTrigger from '../menuBar/MenuBarTrigger';
import PortalContent from '../menuBar/PortalContent';
import CircleIcon from '../CircleIcon';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useRecoilState(isSignupOpenState);
  const [isLoginOpen, setIsLoginOpen] = useRecoilState(isLoginOpenState);
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
        {!!localStorage.getItem('accessToken') && localStorage.getItem('isLogin') === 'true' ? (
          <>
            <IconContainer>
              <div onClick={() => navigate('/chat')}>채팅</div>
            </IconContainer>
            <IconContainer onClick={() => navigate('/mypage/profile')}>
              <CircleIcon src={localStorage.getItem('profileImage') || ''} type="profile" />
            </IconContainer>
          </>
        ) : (
          <>
            <Dialog.Root open={isLoginOpen} onOpenChange={setIsLoginOpen}>
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
        {!!localStorage.getItem('accessToken') && localStorage.getItem('isLogin') === 'true' ? (
          <>
            <Menubar.Root>
              <Menubar.Menu>
                <MenuBarTrigger>
                  <StyledHamburgerMenuIcon />
                  <PortalContent>
                    <Menubar.Item>
                      <NavButton onClick={() => navigate('/mypage/profile')}>마이페이지</NavButton>
                    </Menubar.Item>
                    <Menubar.Item>
                      <IconContainer>
                        <div onClick={() => navigate(`/chat`)}>채팅</div>
                      </IconContainer>
                    </Menubar.Item>
                  </PortalContent>
                </MenuBarTrigger>
              </Menubar.Menu>
            </Menubar.Root>
          </>
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
  cursor: pointer;
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
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledHamburgerMenuIcon = styled(HamburgerMenuIcon)`
  cursor: pointer;
`;

export default Navbar;
