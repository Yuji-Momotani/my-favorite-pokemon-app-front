import { useContext } from "react";
import Star from "./Star"
import { createStar, updateStar } from "../../utils/starUtil";
import useError from "../../hooks/useError";
import { StarContext } from "../PokemonSearch";

const StarRating = ({pokemon_id}) => {
	const {switchErrorHandling} = useError()
	const starNum = [1,2,3];
	// const [selectStar, setSelectStar] = useState(0);
	const [starsData, setStarsData] = useContext(StarContext)
	const starsDataFilter = starsData.filter((s) => pokemon_id === s.pokemon_id)
	const starData = starsDataFilter.length === 0 ? null : starsDataFilter[0]
	const selectStars = starData ? starData.evaluation : 0

	const clickStar = async(num) => {
		const upsertStarData = {
			pokemon_id: pokemon_id,
			evaluation:num 
		}

		if (selectStars === 0) {
			// 登録
			try {
				const resData = await createStar(upsertStarData)
				// setSelectStar(data)
				setStarsData(prev => [...prev, resData])
				// setSelectStar(resData.evaluation)
			} catch(err) {
				if (err.response.data.message) {
					// csrf,jwtミドルウェア系のエラーはmessageに入る
					switchErrorHandling(err.response.data.message)
				} else {
					switchErrorHandling(err.response.data)
				}
			}
		} else {
			// 更新
			try {
				const resData = await updateStar(upsertStarData)
				// setSelectStar(data)
				setStarsData(prev => {
					return prev.map((s) => {
						if (s.pokemon_id === resData.pokemon_id){
							s.evaluation = resData.evaluation
						}
						return s
					})
				})
				// setSelectStar(resData.evaluation)
			} catch(err) {
				if (err.response.data.message) {
					// csrf,jwtミドルウェア系のエラーはmessageに入る
					switchErrorHandling(err.response.data.message)
				} else {
					switchErrorHandling(err.response.data)
				}
			}
		}
		
	}
	return (
		<div className="flex justify-center">
			{
				starNum.map(s => {
					return (
						<Star key={s} selected={selectStars >= s} onSelect={() => {clickStar(s)}} />
					)
				})
			}
		</div>
	)
}

export default StarRating