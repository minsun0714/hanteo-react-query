import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoginForm from './components/LoginForm';
import { formSchema } from './formSchema';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginPage = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const {
		register,
		formState: { errors },
	} = form;

	return (
		<FormProvider {...form}>
			<LoginForm>
				<div className="input-wrapper">
					<Input {...register('id')} placeholder="ID를 입력해주세요" />
					<ErrorMessage errors={errors} name="id" />
				</div>
				<div className="input-wrapper">
					<Input {...register('pw')} placeholder="PW를 입력해주세요" />
					<ErrorMessage errors={errors} name="pw" />
				</div>
				<div>
					<Link to="/signup">
						<Button text="회원가입" />
					</Link>
					<Button text="로그인" />
				</div>
			</LoginForm>
		</FormProvider>
	);
};

export default LoginPage;
