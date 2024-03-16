import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as z from 'zod';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
	.object({
		id: z
			.string()
			.min(1, { message: '아이디를 입력해주세요' })
			.email({ message: '이메일 형식으로 입력해주세요' }),
		pw: z
			.string()
			.min(1, { message: '비밀번호를 입력해주세요' })
			.max(13, { message: '비밀번호는 13자 이하로 입력해주세요' })
			.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/, {
				message:
					'비밀번호는 숫자, 영문-소, 영문-대, 특수문자를 포함해야 합니다.',
			}),
	})
	.refine(
		({ pw }) => {
			const consecutiveNums = [...Array(10)].map((_, i) => String(i).repeat(3));
			return !consecutiveNums.some((num) => pw.includes(num));
		},
		{
			message: '비밀번호에 3자리 이상 연속된 숫자가 있지 않아야 합니다.',
			path: ['pw'],
		},
	);

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
		</form>
	);
};

export default LoginPage;
