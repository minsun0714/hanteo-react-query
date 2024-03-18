import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 770 || window.innerWidth < 320) {
				throw new Error('지원하지 않는 해상도입니다.');
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
