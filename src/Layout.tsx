import { useMemo } from 'react';
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
