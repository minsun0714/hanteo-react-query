import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ErrorFallback from './components/ErrorFallback.tsx';
import './index.css';
import router from './router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 윈도우 포커스 시 새로고침을 하지 않도록 설정
			refetchOnWindowFocus: false,
			// 서버 에러 시 3회 재시도
			retry: 3,
			// get 요청이 없는 한 캐시를 계속 사용하도록 설정
			staleTime: Infinity,
		},
		mutations: {
			// 서버 에러 시 3회 재시도
			retry: 3,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<App />
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>,
);
