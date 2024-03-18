import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../function/getCookie';

const useCheckAccount = () => {
	const [loginTryCount, setLoginTryCount] = useState(0);

	const navigate = useNavigate();

	const cookieData = {
		id: getCookie('id'),
		pw: getCookie('pw'),
	};

	const handleCheckAccount = (id: string, pw: string) => {
		if (id !== cookieData.id) {
			alert('존재하지 않는 아이디입니다.');
			return;
		}
		if (pw !== cookieData.pw) {
			alert('비밀번호가 일치하지 않습니다.');
			setLoginTryCount(loginTryCount + 1);
			return;
		}
		navigate('/myinfo');
	};

	useEffect(() => {
		if (loginTryCount >= 3) {
			throw new Error('잘못된 로그인 시도 3회 초과');
		}
	}, [loginTryCount]);

	return { handleCheckAccount };
};

export default useCheckAccount;
