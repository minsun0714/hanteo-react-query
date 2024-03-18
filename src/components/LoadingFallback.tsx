import { useEffect, useState } from 'react';
import LoadingSpinner from '../assets/LoadingSpinner.svg';

type LoadingFallbackProp = {
	isPending: boolean;
};

const LoadingFallback = ({ isPending }: LoadingFallbackProp) => {
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		let timerId = 0;

		if (isPending) {
			timerId = setTimeout(() => {
				setShowLoading(false);
			}, 500);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isPending]);

	return (
		(isPending || showLoading) && (
			<img src={LoadingSpinner} className="loading-spinner" alt="Loading" />
		)
	);
};

export default LoadingFallback;
