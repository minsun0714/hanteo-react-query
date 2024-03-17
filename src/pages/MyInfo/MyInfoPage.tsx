import { FormProvider, get, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';
import { getCookie } from '../../util/function/getCookie';
import MyInfoForm from './components/MyInfoForm';
import * as z from 'zod';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	profileImage: z.string().optional(),
	id: z.string(),
	name: z
		.string()
		.min(1, { message: '이름을 입력해주세요' })
		.max(5, { message: '이름은 5자 이하로 입력해주세요' }),
	createdAt: z.string(),
	updatedAt: z.string(),
});

const MyInfoPage = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			profileImage: get('profileImage') || '',
			id: getCookie('id'),
			name: getCookie('name'),
			createdAt: getCookie('createdAt'),
			updatedAt: getCookie('updatedAt') || '-',
		},
	});

	const {
		register,
		formState: { errors },
	} = form;

	return (
		<>
			<FormProvider {...form}>
				<ImageUpload />
				<MyInfoForm>
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
						<Button text="로그아웃" />
						<Button text="수정" />
					</div>
				</MyInfoForm>
			</FormProvider>
		</>
	);
};

export default MyInfoPage;
