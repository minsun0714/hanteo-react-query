import { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
	const { showBoundary } = useErrorBoundary();
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 770 || window.innerWidth < 320) {
				const error = new Error('지원하지 않는 해상도입니다.');
				showBoundary(error.message);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
