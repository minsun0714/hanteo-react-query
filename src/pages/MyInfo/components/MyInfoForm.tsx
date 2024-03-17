import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import DateFormatter from '../../../util/class/DateFormatter';

type MyInfoFormProp = {
	children: React.ReactNode;
};

const MyInfoForm = ({ children }: MyInfoFormProp) => {
	const { handleSubmit, watch } = useFormContext();
	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const name = formFieldData.name;
		const profileImage = watch('profileImage');

		const today = new Date();
		const updatedAt = DateFormatter.formatDate(today);

		const payload = {
			profileImage,
			updatedAt,
		};

		document.cookie = `name=${name}; path=/`;
		document.cookie = `profileImage=${profileImage}; path=/`;
		alert(document.cookie);

		// mutate(payload);
	};
	return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default MyInfoForm;
