import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SignUpForm from './components/SignUpForm';
import * as z from 'zod';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import DefaultImg from '../../assets/default.svg';

const formSchema = z
	.object({
		profileImage: z.string().optional(),
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
		pwConfirm: z.string().min(1, { message: '비밀번호 확인을 입력해주세요' }),
		name: z
			.string()
			.min(1, { message: '이름을 입력해주세요' })
			.max(5, { message: '이름은 5자 이하로 입력해주세요' }),
	})
	.refine(({ pw, pwConfirm }) => pw === pwConfirm, {
		message: '비밀번호가 일치하지 않습니다.',
		path: ['pwConfirm'],
	});

const SignUpPage = () => {
	const [image, setImage] = useState<string>(DefaultImg);

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const {
		register,
		setValue,
		formState: { errors },
	} = form;

	const fileInputRef = useRef<HTMLInputElement>(null);

	const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const file = event.target.files[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImage(imageUrl);
			setValue('profileImage', file.name);
		}
	};

	const onButtonClick = () => {
		if (!fileInputRef.current) return;
		fileInputRef.current.click();
	};

	return (
		<>
			<div className="img-upload-wrapper">
				<div>
					<img src={image} alt="preview" />
				</div>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={onChangeImage}
					style={{ display: 'none' }}
				/>
				<Button
					text="이미지 업로드"
					type="button"
					onClick={onButtonClick}
					imgUpload
				/>
			</div>
			<FormProvider {...form}>
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
