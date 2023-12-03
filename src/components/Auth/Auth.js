import { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const Auth = () => {
	const [isLoginDisp, setIsLoginDisp] = useState(true)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const {signUp, logIn} = useAuth()

	const sendUserForm = (e) => {
		// submit送信でリロードされるのを防ぐ
		e.preventDefault();
		if (isLoginDisp) {
			logIn(email, password)
		} else {
			signUp(email, password)
		}
	}
	return (
		<div className='flex justify-center mt-10'>
			<div className="w-full max-w-xs">
				<form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={sendUserForm}>
					<h4 className="text-center text-2xl">
						{
							isLoginDisp ?
								<span>ログイン画面</span>
							:
								<span>ユーザー登録</span>
						}
					</h4>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Email
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email" type="text" placeholder="xxx@test.com" onChange={(e) => {setEmail(e.target.value)}} />
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						{/* <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password" type="password" placeholder="******************" onChange={(e) => {setPassword(e.target.value)}} />
						<p className="text-red-500 text-xs italic">Please choose a password.</p> */}
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password" type="password" placeholder="******************" onChange={(e) => {setPassword(e.target.value)}} />
					</div>
					<div className="flex justify-center items-center">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							{
								isLoginDisp ? "Login" : "SignUp"
							}
						</button>
					</div>
					<div className="flex justify-center mt-5">
						{
							isLoginDisp ?
								<FontAwesomeIcon icon={faUserPlus} onClick={() => {setIsLoginDisp(prev => !prev)}} className="cursor-pointer" />
							 :
							 <FontAwesomeIcon icon={faRightToBracket} onClick={() => {setIsLoginDisp(prev => !prev)}} className="cursor-pointer" />
						}
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth