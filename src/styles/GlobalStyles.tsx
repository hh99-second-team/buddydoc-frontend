import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{box-sizing: border-box;}
`;

export const Layout = styled.div`
  padding: 40px 140px;
`;

export default GlobalStyles;
