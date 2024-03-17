import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import DateFormatter from '../../../util/class/DateFormatter';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

type MyInfoFormProp = {
	children: React.ReactNode;
};

const MyInfoForm = ({ children }: MyInfoFormProp) => {
	const { handleSubmit, watch } = useFormContext();
	const updateMyInfo = async (payload: FieldValues) => {
		return axios.post('http://localhost:4000/sign-up', payload);
	};

	const { mutate } = useMutation({
		mutationFn: (payload: FieldValues) => updateMyInfo(payload),
		retry: 3,
		onMutate: (payload) => {
			for (const key in payload) {
				const value = payload[key];
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
		const name = formFieldData.name;
		const profileImage = watch('profileImage');

		const today = new Date();
		const updatedAt = DateFormatter.formatDate(today);

		const payload = {
			name,
			profileImage,
			updatedAt,
		};

		mutate(payload);
	};
	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default MyInfoForm;
