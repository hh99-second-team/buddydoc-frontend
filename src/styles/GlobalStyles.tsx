import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
  margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  
  html {
    touch-action: none;
    user-select: none;
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  fieldset {
    border: none;
  }
`;

export const Layout = styled.div`
  padding: 5vh 140px;
  @media screen and (max-width: 768px) {
    padding: 5vh 3%;
  }
`;

export default GlobalStyles;
