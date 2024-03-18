import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

const LogOutButton = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate('/');
		alert('로그아웃 되었습니다.');
	};
	return <Button text="로그아웃" onClick={handleLogout} />;
};

export default LogOutButton;
