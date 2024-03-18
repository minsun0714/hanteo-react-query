import { FieldValues } from 'react-hook-form';
import { queryClient } from '../main';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IMyInfo {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	profileImage: string;
}

export class AuthService {
	URL = 'http://localhost:4000';

	private getMyInfo = async (): Promise<IMyInfo> => {
		return axios.get(`${this.URL}/api/auth/my-info`);
	};

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
			queryClient.invalidateQueries({ queryKey: ['myInfo'] });
		},
		onError: (err: AxiosError | unknown) => {
			if (axios.isAxiosError(err)) {
				alert(err.message);
				return;
			}
			alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
		},
	};
	public useGetMyInfoQuery = () => {
		return useQuery({
			queryKey: ['myInfo'],
			queryFn: this.getMyInfo,
		});
	};

	public useSignUpMutation = () => {
		return useMutation({
			mutationFn: (payload: FieldValues) => this.postSignUp(payload),
			...this.mutationOptions,
		});
	};

	public useUpdateMyInfoMutation = () => {
		return useMutation({
			mutationFn: (payload: FieldValues) => this.updateMyInfo(payload),
			...this.mutationOptions,
		});
	};
}
