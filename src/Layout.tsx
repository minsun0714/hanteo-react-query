import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<header>로그인 페이지</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
