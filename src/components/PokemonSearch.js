import { useEffect, useState, createContext } from 'react';
import { getAllPokemon, getDetailPokemon } from '../utils/pokemonUtil';
import Card from '../components/Common/Card';
import Nav from '../components/Common/Nav';
import Loading from '../components/Common/Loading';
import { getAllStarByUser } from '../utils/starUtil';
import useError from '../hooks/useError';
// import Modal from './Common/Modal';

export const StarContext = createContext()
const PokemonSearch = () => {
	const [allPokemonData, setAllPokemonData] =	useState([]);
	const [dispPokemonData, setDispPokemonData] = useState([]);
	const [starsData, setStarsData] = useState([]);
	const [isLoad, setLoad] = useState(true);
	const [prevURL, setPrevURL] = useState("");
	const [nextURL, setNextURL] = useState("");
	// お気に入り表示用の状態管理 0:すべて表示。1~3：登録されたお気に入りのみ表示
	const [dispStarNum, setDispStarNum] = useState(0);
	// const [displayModal, setDisplayModal] = useState(false);
	const {switchErrorHandling} = useError()

	useEffect(() => {
		async function getInitData() {
			try {
				const allData = await getAllPokemon(process.env.REACT_APP_POKEMON_API_BASE_URL);
				setPrevURL(allData.previous);
				setNextURL(allData.next);
				const detailResult = await getDetailPokemon(allData.results);
				setAllPokemonData(allData);
				setDispPokemonData(detailResult);

				const starResult = await getAllStarByUser();
				setStarsData(starResult)
				setLoad(false);
			} catch(err) {
				if (err.response.data.message) {
					// csrf,jwtミドルウェア系のエラーはmessageに入る
					switchErrorHandling(err.response.data.message)
				} else {
					switchErrorHandling(err.response.data)
				}
			}
		}
		getInitData();
	}, []);

	useEffect(() => {
		const filterPokemonData = async() => {
			try {
				if (allPokemonData.length === 0) {
					return;
				}
				const detailResult = await getDetailPokemon(allPokemonData.results);
				if (dispStarNum === 0) {
					// すべて表示の場合は、フィルタリングしない。
					setDispPokemonData(detailResult);
					return;
				}
		
				const filterStarsData = starsData.filter(s => {
					return s.evaluation === dispStarNum;
				});
				const filterDispPokemonData = detailResult.filter(p => {
					// return p.id === filterStarsData.pokemon_id;
					return filterStarsData.findIndex(s => s.pokemon_id === p.id) > -1;
				});
				setDispPokemonData(filterDispPokemonData);
			} catch(err) {
				if (err.response.data.message) {
					// csrf,jwtミドルウェア系のエラーはmessageに入る
					switchErrorHandling(err.response.data.message)
				} else {
					switchErrorHandling(err.response.data)
				}
			}
		}
		setLoad(true);
		filterPokemonData();
		setLoad(false);
	}, [allPokemonData,dispStarNum, starsData])

	const clickPrevBtn = async() => {
		try {
			setLoad(true);
			const allPokemonData = await getAllPokemon(prevURL);
			setPrevURL(allPokemonData.previous);
			setNextURL(allPokemonData.next);
			const detailResult = await getDetailPokemon(allPokemonData.results);
			setDispPokemonData(detailResult);
			setLoad(false);
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}

	const clickNextBtn = async() => {
		try {
			setLoad(true);
			const allPokemonData = await getAllPokemon(nextURL);
			setPrevURL(allPokemonData.previous);
			setNextURL(allPokemonData.next);
			const detailResult = await getDetailPokemon(allPokemonData.results);
			setDispPokemonData(detailResult);
			setLoad(false);
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}

  return (
		<div className="text-center">
			{
				isLoad ? 
					<Loading />
				:
				<>
					<Nav setDispStarNum={setDispStarNum} />
					<StarContext.Provider value={[starsData, setStarsData]}>
						{/* {
							// 一旦これはなし。やりたかったことは、登録前に確認したかった。けど時間的に他の実装へ
							displayModal && <Modal confirmModalAnswer />
						} */}
						<Card dispPokemonData={dispPokemonData} />
					</StarContext.Provider>
					<div className="inline-flex my-10">
						{
							prevURL &&
							<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
								onClick={clickPrevBtn}>
								Prev
							</button>
						}
						{
							nextURL &&
							<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
								onClick={clickNextBtn}>
								Next
							</button>
						}
					</div>
				</>
			}
		</div>
  );
}

export default PokemonSearch