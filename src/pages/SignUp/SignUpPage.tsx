import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';
import SignUpForm from './components/SignUpForm';
import { formSchema } from './formSchema';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpPage = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const {
		register,
		formState: { errors },
	} = form;

	return (
		<>
			<FormProvider {...form}>
				<ImageUpload />
				<SignUpForm>
					<div className="input-wrapper">
						<Input {...register('id')} placeholder="ID를 입력해주세요" />
						<ErrorMessage errors={errors} name="id" />
					</div>
					<div className="input-wrapper">
						<Input {...register('pw')} placeholder="PW를 입력해주세요" />
						<ErrorMessage errors={errors} name="pw" />
					</div>
					<div className="input-wrapper">
						<Input {...register('pwConfirm')} placeholder="PW 확인" />
						<ErrorMessage errors={errors} name="pwConfirm" />
					</div>
					<div className="input-wrapper">
						<Input {...register('name')} placeholder="이름을 입력해주세요" />
						<ErrorMessage errors={errors} name="name" />
					</div>
					<div>
						<Button text="회원가입" />
					</div>
				</SignUpForm>
			</FormProvider>
		</>
	);
};

export default SignUpPage;
