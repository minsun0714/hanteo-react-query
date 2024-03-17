import * as z from 'zod';

export const formSchema = z.object({
	profileImage: z.string().optional(),
	id: z.string(),
	name: z
		.string()
		.min(1, { message: '이름을 입력해주세요' })
		.max(5, { message: '이름은 5자 이하로 입력해주세요' }),
	createdAt: z.string(),
	updatedAt: z.string(),
});
