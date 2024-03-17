import { FieldValues } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export class AuthService {
	private postSignUp = async (payload: FieldValues) => {
		return axios.post('http://localhost:4000/sign-up', payload);
	};

	private updateMyInfo = async (payload: FieldValues) => {
		return axios.patch('http://localhost:4000/my-info', payload);
	};

	private signUpMutationOptions = {
		retry: 3,
		onMutate: (payload: FieldValues) => {
			Object.entries(payload).forEach(([key, value]) => {
				document.cookie = `${key}=${value}; path=/`;
			});
		},
		onSuccess: () => {
			alert('회원가입이 완료되었습니다.');
		},
		onError: (err: any) => {
			alert(err.message);
			alert(document.cookie);
		},
	};

	public useSignUpMutation = () => {
		const { mutate } = useMutation({
			mutationFn: this.postSignUp,
			...this.signUpMutationOptions,
		});

		return mutate;
	};

	public useUpdateMyInfoMutation = () => {
		const { mutate } = useMutation({
			mutationFn: this.updateMyInfo,
			...this.signUpMutationOptions,
		});

		return mutate;
	};
}
