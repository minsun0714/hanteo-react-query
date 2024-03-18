import { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from './Button';
import DefaultImgUrl from '../assets/default.svg';

type ImageUploadProps = {
	profileImage?: string;
};

const ImageUpload = ({ profileImage }: ImageUploadProps) => {
	const [imageUrl, setImageUrl] = useState<string>(DefaultImgUrl);
	const [imageName, setImageName] = useState<string | undefined>('-');

	const fileInputRef = useRef<HTMLInputElement>(null);

	const { setValue, watch } = useFormContext();

	useEffect(() => {
		if (profileImage == 'undefined') {
			setImageName('-');
		}
	}, []);

	const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const file = event.target.files[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImageUrl(imageUrl);
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
				<img src={imageUrl} alt="preview" />
			</div>
			<p>{watch('profileImage') || imageName}</p>
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
