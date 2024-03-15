type ButtonProps = {
	text: string;
	onClick?: () => void;
	imgUpload?: boolean;
};

const Button = ({ text, onClick, imgUpload }: ButtonProps) => {
	return (
		<button onClick={onClick} className={imgUpload ? 'img-upload' : ''}>
			{text}
		</button>
	);
};

export default Button;
