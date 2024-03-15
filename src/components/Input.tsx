import React from 'react';

type InputProps = {
	placeholder: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<>
			<input {...props} ref={ref} />
		</>
	);
});

export default Input;
