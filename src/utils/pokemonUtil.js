export const getAllPokemon = (base_url) => {
	return new Promise((resolve, reject) => {
		fetch(base_url).then(req => {
			if (!req.ok) {
				return reject("Error: APIの取得に失敗しました。(getAllPokemon)")
			}
			return req.json();
		}).then(data => {
			return resolve(data);
		});
	});
}

export const getDetailPokemon = (data) => {
	const getDetail = (url) => {
		return new Promise((resolve, reject) => {
			fetch(url).then(req => {
				if (!req.ok) {
					return reject("Error: APIの取得に失敗しました。(getDetail)")
				}
				return req.json();
				
			}).then(data => {
				return resolve(data);
			});
		});
	}
	return Promise.all(
		data.map((dt) => {
			return getDetail(dt.url);
		})
	);
}

