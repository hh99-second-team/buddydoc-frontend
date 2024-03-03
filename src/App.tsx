import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Router from './routes/Router';
import TopButton from './components/common/TopButton';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Router />
          <TopButton />
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
