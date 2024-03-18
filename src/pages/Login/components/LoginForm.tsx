import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ErrorFallback from '../../../components/ErrorFallback';
import { getCookie } from '../../../util/function/getCookie';

type LoginFormProps = {
	children: React.ReactNode;
};

const LoginForm = ({ children }: LoginFormProps) => {
	const [loginTryCount, setLoginTryCount] = useState(0);
	const navigate = useNavigate();
	const { handleSubmit } = useFormContext();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const cookieData = {
			id: getCookie('id'),
			pw: getCookie('pw'),
		};

		if (formFieldData.id !== cookieData.id) {
			alert('존재하지 않는 아이디입니다.');
			return;
		}
		if (formFieldData.pw !== cookieData.pw) {
			alert('비밀번호가 일치하지 않습니다.');
			setLoginTryCount(loginTryCount + 1);

			if (loginTryCount >= 2) {
				alert('로그인 시도 횟수를 초과하였습니다. 잠시 후 다시 시도해주세요.');
				throw new Error('잘못된 로그인 시도 3회 초과');
			}
			return;
		}

		navigate('/myinfo');
	};

	useEffect(() => {
		if (loginTryCount >= 3) {
			throw new Error('잘못된 로그인 시도 3회 초과');
		}
	}, [loginTryCount]);

	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default LoginForm;
