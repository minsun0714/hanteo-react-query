import { FieldValues } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

export class AuthService {
	URL = 'http://localhost:4000';

	private postSignUp = async (payload: FieldValues) => {
		return axios.post(`${this.URL}/api/auth/sign-up`, payload);
	};

	private updateMyInfo = async (payload: FieldValues) => {
		return axios.patch(`${this.URL}/api/auth/my-info`, payload);
	};

	private mutationOptions = {
		retry: 3,
		onMutate: (payload: FieldValues) => {
			Object.entries(payload).forEach(([key, value]) => {
				document.cookie = `${key}=${value}; path=/`;
			});
		},
		onSuccess: () => {
			alert('회원가입이 완료되었습니다.');
		},
		onError: (err: AxiosError | unknown) => {
			if (axios.isAxiosError(err)) {
				alert(err.message);
				return;
			}
			alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
		},
	};

	public useSignUpMutation = () => {
		return useMutation({
			mutationFn: this.postSignUp,
			...this.mutationOptions,
		});
	};

	public useUpdateMyInfoMutation = () => {
		return useMutation({
			mutationFn: this.updateMyInfo,
			...this.mutationOptions,
		});
	};
}
