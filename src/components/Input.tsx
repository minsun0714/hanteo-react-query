import React from 'react';

type InputProps = {
	placeholder?: string;
	readOnly?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<>
			<input {...props} ref={ref} />
		</>
	);
});

export default Input;
