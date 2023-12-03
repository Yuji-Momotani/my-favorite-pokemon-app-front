import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import useError from '../hooks/useError';

const useAuth = () => {
	const navigate = useNavigate()
	const {switchErrorHandling} = useError()

	const signUp = async(email, password) => {
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/signup`,
				{
					email: email,
					password: password,
				}
			)
			await logIn(email, password)
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}
	const logIn = async(email, password) => {
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/login`,
				{
					email: email,
					password: password,
				}
			)
			navigate("/search")
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}

	const logOut = async() => {
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/logout`
			)
			navigate("/")
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}
	return {signUp, logIn, logOut}
}

export default useAuth