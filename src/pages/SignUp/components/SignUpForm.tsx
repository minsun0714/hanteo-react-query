import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

type SignUpFormProps = {
	children: React.ReactNode;
};

const postSignUp = async (data: FieldValues) => {
	return axios.post('http://localhost:4000/sign-up', data);
};

const SignUpForm = ({ children }: SignUpFormProps) => {
	const { handleSubmit, watch } = useFormContext();

	const { mutate } = useMutation({
		mutationFn: (data: FieldValues) => postSignUp(data),
		retry: 3,
		onMutate: (data) => {
			for (const key in data) {
				const value = data[key];
				document.cookie = `${key}=${value}; path=/`;
			}
		},
		onSuccess: () => {
			alert('회원가입이 완료되었습니다.');
		},
		onError: (err) => {
			alert(err.message);
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = ({ id, pw, name }) => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const date = String(today.getDate()).padStart(2, '0');
		const hours = String(today.getHours()).padStart(2, '0');
		const minutes = String(today.getMinutes()).padStart(2, '0');
		const seconds = String(today.getSeconds()).padStart(2, '0');
		const createdAt = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
		const signUpData = {
			id,
			pw,
			name,
			profileImage: watch('profileImage'),
			createdAt,
		};
		mutate(signUpData);
	};
	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default SignUpForm;
