import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PokemonSearch from './components/PokemonSearch';
import Auth from './components/Auth/Auth';
import { useEffect } from 'react';
import {getCsrfUtil} from './utils/getCsrfUtil';
import axios from 'axios';

const App = () => {
	useEffect(() => {
		const settingCsrf = async() => {
			axios.defaults.withCredentials = true
			const data = await getCsrfUtil();
			axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token
		}
		settingCsrf()
	}, [])
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/search' element={<PokemonSearch />} />
			</Routes>
		</Router>
	)
}

export default App;
