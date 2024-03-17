import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import getCookie from '../../../util/function/getCookie';

type LoginFormProps = {
	children: React.ReactNode;
};

const LoginForm = ({ children }: LoginFormProps) => {
	const navigate = useNavigate();
	const { handleSubmit } = useFormContext();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const cookieData = {
			id: getCookie('id'),
			pw: getCookie('pw'),
		};

		if (
			formFieldData.id !== cookieData.id ||
			formFieldData.pw !== cookieData.pw
		) {
			alert('아이디가 일치하지 않습니다.');
			return;
		}

		navigate('/myinfo');
	};

	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default LoginForm;
