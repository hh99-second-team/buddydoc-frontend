import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import topIcon from '../../assets/top.icon.png';

const TopButton = () => {
  const [isShowButton, setIsShowButton] = useState<boolean>(false);

  const ScrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 400) {
        setIsShowButton(true);
      } else {
        setIsShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <>
      <GoToTopButton src={topIcon} alt="" className={isShowButton ? 'show' : ''} onClick={ScrollToTop} />
    </>
  );
};

const GoToTopButton = styled.img`
  width: 5rem;
  height: 5rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 997;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  @media screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

export default TopButton;
