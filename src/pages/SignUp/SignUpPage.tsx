import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as z from 'zod';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	id: z
		.string()
		.min(1, { message: '아이디를 입력해주세요' })
		.email({ message: '이메일 형식으로 입력해주세요' }),
	pw: z
		.string()
		.min(1, { message: '비밀번호를 입력해주세요' })
		.max(13, { message: '비밀번호는 13자 이하로 입력해주세요' })
		.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/, {
			message: '비밀번호는 숫자, 영문-소, 영문-대, 특수문자를 포함해야 합니다.',
		}),
	pwConfirm: z.string().min(1, { message: '비밀번호 확인을 입력해주세요' }),
	name: z
		.string()
		.min(1, { message: '이름을 입력해주세요' })
		.max(5, { message: '이름은 5자 이하로 입력해주세요' }),
});

const SignUpPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
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
		</form>
	);
};

export default SignUpPage;
