import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';

type LoginFormProps = {
	children: React.ReactNode;
};

const LoginForm = ({ children }: LoginFormProps) => {
	const { handleSubmit } = useFormContext();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};
	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default LoginForm;
