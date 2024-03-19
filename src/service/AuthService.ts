import { FieldValues } from 'react-hook-form';
import { queryClient } from '../main';
import { getCookie } from '../util/function/getCookie';
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
	private getMyInfo = async (): Promise<IMyInfo> => {
		const myInfo = {
			id: getCookie('id') || '',
			name: getCookie('name') || '',
			createdAt: getCookie('createdAt') || '',
			updatedAt: getCookie('updatedAt') || '',
			profileImage: getCookie('profileImage') || '',
		};
		return myInfo;
	};

	private postMyInfo = async (payload: FieldValues) => {
		return Object.entries(payload).forEach(([key, value]) => {
			document.cookie = `${key}=${value}; path=/`;
		});
	};

	private mutationOptions = {
		onSuccess: () => {
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
	public useMyInfoQuery = () => {
		return useQuery({
			queryKey: ['myInfo'],
			queryFn: this.getMyInfo,
		});
	};

	public useMyInfoMutation = () => {
		return useMutation({
			mutationFn: (payload: FieldValues) => this.postMyInfo(payload),
			...this.mutationOptions,
		});
	};
}
