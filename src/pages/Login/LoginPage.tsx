import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
	id: z.string().email({ message: '이메일 형식으로 입력해주세요' }),
	pw: z.string().max(13, { message: '비밀번호는 13자 이하로 입력해주세요' }),
});

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register('id')} placeholder="ID를 입력해주세요" />
			{errors.id && <p>{errors.id.message as string}</p>}
			<Input {...register('pw')} placeholder="PW를 입력해주세요" />
			{errors.pw && <p>{errors.pw.message as string}</p>}
			<div>
				<Button text="로그인" />
				<Button text="로그인" />
			</div>
		</form>
	);
};

export default LoginPage;
