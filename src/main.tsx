import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ConfigProvider, App } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { queryClient } from './utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={koKR}
        theme={{
          token: {
            colorPrimary: '#0064FF',
          },
        }}
      >
        <App>
          <RouterProvider router={router} />
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
