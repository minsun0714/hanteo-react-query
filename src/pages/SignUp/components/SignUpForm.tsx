import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import LoadingFallback from '../../../components/LoadingFallback';
import { AuthService } from '../../../service/AuthService';
import DateFormatter from '../../../util/class/DateFormatter';

type SignUpFormProps = {
	children: React.ReactNode;
};

const SignUpForm = ({ children }: SignUpFormProps) => {
	const { handleSubmit, watch } = useFormContext();

	const authService = new AuthService();
	const { mutate, isPending } = authService.useSignUpMutation();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const { pwConfirm, ...postData } = formFieldData;

		const profileImage = watch('profileImage');

		const today = new Date();
		const createdAt = DateFormatter.formatDate(today);
		const updatedAt = DateFormatter.formatDate(today);

		const payload = {
			...postData,
			profileImage,
			createdAt,
			updatedAt,
		};

		mutate(payload);
	};

	return isPending ? (
		<LoadingFallback isPending />
	) : (
		<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
	);
};

export default SignUpForm;
