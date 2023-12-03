import axios from "axios";

export const getCsrfUtil = async() => {
	const {data} = await axios.get(
		`${process.env.REACT_APP_API_URL}/csrf`
	)
	return data
}
