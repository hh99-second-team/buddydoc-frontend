import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Footer = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/chat')) return <></>;

  return (
    <FooterBox>
      <div>
        <Wave id="wave1"></Wave>
        <Wave id="wave2"></Wave>
        <Wave id="wave3"></Wave>
        <Wave id="wave4"></Wave>
      </div>
      <p>곽민지 | 박성진 | 임희원 | 김기민 | 최예은</p>
      <p>&copy;2024 항해 18기 2조 | All Rights Reserved</p>
    </FooterBox>
  );
};

const FooterBox = styled.footer`
  position: relative;
  width: 100%;
  background: #3586ff;
  min-height: 100px;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 200px;

  & > p {
    color: #fff;
    margin: 15px 0 10px 0;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const animateWaves = keyframes`
    0% {
      background-position-x: 1000px;
    }
    100% {
      background-positon-x: 0px;
    }
`;

const animate = keyframes`
  0% {
      
      background-position-x: -1000px;
    }
    100% {
        background-positon-x: 0px;
    }
`;

const Wave = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('https://i.ibb.co/wQZVxxk/wave.png');
  background-size: 1000px 100px;

  &#wave1 {
    z-index: 996;
    opacity: 1;
    bottom: 0;
    animation: ${animateWaves} 4s linear infinite;
  }
  &#wave2 {
    z-index: 995;
    opacity: 0.5;
    bottom: 10px;
    animation: ${animate} 4s linear infinite !important;
  }
  &#wave3 {
    z-index: 996;
    opacity: 0.2;
    bottom: 15px;
    animation: ${animateWaves} 3s linear infinite;
  }
  &#wave4 {
    z-index: 995;
    opacity: 0.7;
    bottom: 20px;
    animation: ${animate} 3s linear infinite;
  }
`;

export default Footer;
