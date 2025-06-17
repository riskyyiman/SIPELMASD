import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'swiper/swiper-bundle.css';
import 'flatpickr/dist/flatpickr.css';
import App from './App.tsx';
import { AppWrapper } from './components/common/PageMeta.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo-client.ts'; // Pastikan file ini sudah ada

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
