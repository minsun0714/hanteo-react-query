import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { formatDate } from '../../../util/utilFunctions';
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
			alert(document.cookie);
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const { pwConfirm, ...postData } = formFieldData;

		const profileImage = watch('profileImage');

		const today = new Date();
		const createdAt = formatDate(today);

		const payload = {
			...postData,
			profileImage,
			createdAt,
		};

		mutate(payload);
	};

	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default SignUpForm;
