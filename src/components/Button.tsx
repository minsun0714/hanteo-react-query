type ButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	imgUpload?: boolean;
};

const Button = ({ text, type, onClick, imgUpload }: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={imgUpload ? 'img-upload' : ''}
		>
			{text}
		</button>
	);
};

export default Button;
