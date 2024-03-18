import * as z from 'zod';

export const formSchema = z
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
