import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalStyles from './styles/GlobalStyles';
import Router from './routes/Router';
import TopButton from './components/common/TopButton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2분
    },
  },
});

const FallbackComponent = () => {
  return <div>에러페이지</div>;
};

const App = () => {
  return (
    <ErrorBoundary fallback={<FallbackComponent />}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <Router />
            <TopButton />
          </QueryClientProvider>
        </RecoilRoot>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
