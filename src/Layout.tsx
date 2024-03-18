import { useEffect, useMemo } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import { PATH_NAME } from './util/constants/path';

const Layout = () => {
	const matches = useMatches();
	const pageTitle = useMemo(() => {
		const match = matches[matches.length - 1]?.pathname as
			| keyof typeof PATH_NAME
			| undefined;
		return match ? PATH_NAME[match] : '페이지를 찾을 수 없습니다.';
	}, [matches]);

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
			<header>{pageTitle}</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
