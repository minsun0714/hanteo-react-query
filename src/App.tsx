import './style/main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	<QueryClientProvider client={queryClient}>
		<></>
	</QueryClientProvider>;
}

export default App;
