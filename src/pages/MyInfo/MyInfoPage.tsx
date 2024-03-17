import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';
import { getCookie } from '../../util/function/getCookie';
import * as z from 'zod';
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
			id: getCookie('id'),
			name: getCookie('name'),
			createdAt: getCookie('createdAt'),
			updatedAt: getCookie('updatedAt') || '-',
		},
	});

	const { register } = form;

	return (
		<>
			<FormProvider {...form}>
				<ImageUpload />
				<form>
					<div className="input-wrapper">
						<Input readOnly {...register('id')} />
					</div>
					<div className="input-wrapper">
						<Input placeholder="이름을 입력해주세요" {...register('name')} />
					</div>
					<div className="input-wrapper">
						<Input readOnly {...register('createdAt')} />
					</div>
					<div className="input-wrapper">
						<Input readOnly {...register('updatedAt')} />
					</div>
					<div>
						<Button text="회원가입" />
						<Button text="회원가입" />
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default MyInfoPage;
