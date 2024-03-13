import { Routes, Route } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import Alert from './components/Alert';
import GlobalDataProvider from './store/GlobalDataProvider';

export default function App() {
	return (
		<GlobalDataProvider>
			<Routes>
				<Route path='/' element={<Clients />} />
				<Route path='/Clients/:keyword' element={<Clients />} />
			</Routes>
			<Alert />
		</GlobalDataProvider>
	);
}
