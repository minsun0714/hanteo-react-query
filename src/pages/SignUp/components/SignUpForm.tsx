import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ErrorFallback from '../../../components/ErrorFallback';
import LoadingFallback from '../../../components/LoadingFallback';
import { AuthService } from '../../../service/AuthService';
import DateFormatter from '../../../util/class/DateFormatter';

type SignUpFormProps = {
	children: React.ReactNode;
};

const SignUpForm = ({ children }: SignUpFormProps) => {
	const { handleSubmit, watch } = useFormContext();

	const navigate = useNavigate();

	const authService = new AuthService();
	const { mutateAsync, isPending, isError } = authService.useMyInfoMutation();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const { pwConfirm, ...postData } = formFieldData;

		const profileImage = watch('profileImage') || '-';

		const today = new Date();
		const createdAt = DateFormatter.formatDate(today);
		const updatedAt = DateFormatter.formatDate(today);

		const payload = {
			...postData,
			profileImage,
			createdAt,
			updatedAt,
		};

		mutateAsync(payload)
			.then(() => {
				navigate('/');
				alert('회원가입이 완료되었습니다.');
			})
			.catch(console.error);
	};

	return isPending ? (
		<LoadingFallback isPending />
	) : isError ? (
		<ErrorFallback />
	) : (
		<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
	);
};

export default SignUpForm;
