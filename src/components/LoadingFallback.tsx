import LoadingSpinner from '../assets/LoadingSpinner.svg';

const LoadingFallback = () => {
	return <img src={LoadingSpinner} className="loading-spinner" alt="Loading" />;
};

export default LoadingFallback;
