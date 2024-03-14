import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/Login/LoginPage';
import MyInfoPage from './pages/MyInfo/MyInfoPage';
import SignUpPage from './pages/SignUp/SignUpPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <LoginPage />,
			},
			{
				path: 'signup',
				element: <SignUpPage />,
			},
			{
				path: 'myinfo',
				element: <MyInfoPage />,
			},
		],
	},
]);

export default router;
