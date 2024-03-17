import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { AuthService } from '../../../service/AuthService';
import DateFormatter from '../../../util/class/DateFormatter';

type MyInfoFormProp = {
	children: React.ReactNode;
};

const MyInfoForm = ({ children }: MyInfoFormProp) => {
	const { handleSubmit, watch } = useFormContext();

	const authService = new AuthService();
	const { mutate } = authService.useUpdateMyInfoMutation();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const name = formFieldData.name;
		const profileImage = watch('profileImage');

		const today = new Date();
		const updatedAt = DateFormatter.formatDate(today);

		const payload = {
			name,
			profileImage,
			updatedAt,
		};

		mutate(payload);
	};
	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default MyInfoForm;
