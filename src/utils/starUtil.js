import axios from "axios"

export const getAllStarByUser = async() => {
	// ユーザーごとのお気に入り情報をすべて取得
	const {data} = await axios.get(
		`${process.env.REACT_APP_API_URL}/stars`
	)
	return data;
}

export const createStar = async(starData) => {
	// お気に入り情報の登録
	const {data} = await axios.post(
		`${process.env.REACT_APP_API_URL}/stars`,
		starData
	)
	return data;
}

export const updateStar = async(starData) => {
	// お気に入り情報の登録
	const {data} = await axios.put(
		`${process.env.REACT_APP_API_URL}/stars/${starData.pokemon_id}`,
		starData
	)
	return data;
}

export const deleteStar = async(starData) => {
	// お気に入り情報の登録
	const {data} = await axios.delete(
		`${process.env.REACT_APP_API_URL}/stars/${starData.pokemon_id}`
	)
	return data;
}