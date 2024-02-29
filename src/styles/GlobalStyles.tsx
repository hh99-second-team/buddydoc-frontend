import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Poppins",  'Apple SD Gothic Neo', sans-serif;
  }
`;

export const Layout = styled.div`
  padding: 5vh 140px;
  @media screen and (max-width: 768px) {
    padding: 5vh 3%;
  }
`;

export default GlobalStyles;
