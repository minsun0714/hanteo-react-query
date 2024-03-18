import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';
import { AuthService } from '../../service/AuthService';
import { getCookie } from '../../util/function/getCookie';
import LogOutButton from './components/LogOutButton';
import MyInfoForm from './components/MyInfoForm';
import { formSchema } from './formSchema';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const MyInfoPage = () => {
	const authService = new AuthService();
	const { data } = authService.useGetMyInfoQuery();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			profileImage: data?.profileImage || getCookie('profileImage') || '-',
			id: data?.id || getCookie('id') || '-',
			name: data?.name || getCookie('name') || '-',
			createdAt: data?.createdAt || getCookie('createdAt') || '-',
			updatedAt: data?.updatedAt || getCookie('updatedAt') || '-',
		},
	});

	const {
		register,
		formState: { errors },
	} = form;

	return (
		<>
			<FormProvider {...form}>
				<MyInfoForm>
					<ImageUpload />
					<div className="input-wrapper">
						<Input readOnly {...register('id')} />
					</div>
					<div className="input-wrapper">
						<Input {...register('name')} placeholder="이름을 입력해주세요" />
						<ErrorMessage errors={errors} name="name" />
					</div>
					<div className="input-wrapper">
						<Input readOnly {...register('createdAt')} />
					</div>
					<div className="input-wrapper">
						<Input readOnly {...register('updatedAt')} />
					</div>
					<div>
						<LogOutButton />
						<Button text="수정" />
					</div>
				</MyInfoForm>
			</FormProvider>
		</>
	);
};

export default MyInfoPage;
