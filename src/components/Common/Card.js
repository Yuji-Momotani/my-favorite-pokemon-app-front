import StarRating from "../Star/StarRating";

const Card = ({dispPokemonData}) => {
	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-3 gap-3">
			{
				dispPokemonData.map(data => {
					return (
						<div className="max-w-sm rounded overflow-hidden shadow-lg" key={data.name}>
							<img className="w-full" src={data.sprites.front_default} alt={data.name} />
							<div className="px-6 py-4">
								<div className="font-bold mb-2 text-3xl">{data.name}</div>
							</div>
							<div className="pt-4">
								<StarRating pokemon_id={data.id}/>
							</div>
							<div className="pt-4">
								<div className="font-bold text-lg">abilities</div>
								<ul className="list-disc">
								{
									data.abilities.map(ability => {
										return (
											<li key={ability.ability.name} className="w-auto text-gray-700 text-base">
												・{ability.ability.name}
											</li>
										)
									})
								}
								</ul>
							</div>
							<div className="pt-4">
								<div className="text-gray-700 text-base">
									<div className="font-bold text-lg text-black">height</div>
									<span>{data.height}</span>
								</div>
							</div>
							<div className="pt-4">
								<div className="text-gray-700 text-base">
									<div className="font-bold text-lg text-black">weight</div>
									<span>{data.weight}</span>
								</div>
							</div>
							<div className="px-6 pt-4 pb-2">
								{
									data.game_indices.map((game, index) => {
										return (
											<span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{game.version.name}</span>
										)
									})
								}
							</div>
						</div>
					)
				})
			}
			</div>
		</div>
	)
}

export default Card