import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { getCookie } from '../util/function/getCookie';
import Button from './Button';
import DefaultImg from '../assets/default.svg';

const ImageUpload = () => {
	const [image, setImage] = useState<string>(DefaultImg);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const { setValue, watch } = useFormContext();

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
		<div className="img-upload-wrapper">
			<div>
				<img src={image} alt="preview" />
			</div>
			<p>{watch('profileImage') || getCookie('profileImage')}</p>
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
	);
};

export default ImageUpload;
