import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import useCheckAccount from '../../../util/customHook/useCheckAccount';

type LoginFormProps = {
	children: React.ReactNode;
};

const LoginForm = ({ children }: LoginFormProps) => {
	const { handleSubmit } = useFormContext();

	const { handleCheckAccount } = useCheckAccount();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const { id, pw } = formFieldData;
		handleCheckAccount(id, pw);
	};

	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default LoginForm;
