import { useNavigate } from 'react-router-dom';

const ErrorFallback = () => {
	const navigate = useNavigate();

	const handleRetry = () => {
		navigate(0);
	};
	return (
		<>
			<p>error</p>
			<button onClick={handleRetry}>Retry</button>
		</>
	);
};

export default ErrorFallback;
