const commonHeaders = {
	accept: "application/json",
	Authorization: process.env.ACCESS_TOKEN_AUTH,
};

module.exports = {
	fetchGenres: async () => {
		const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`;
		const genreResponse = await fetch(genreUrl, {
			method: "GET",
			headers: commonHeaders,
		});
		return await genreResponse.json();
	},

	fetchMovieData: async () => {
		const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`;
		const movieResponse = await fetch(movieUrl, {
			method: "GET",
			headers: commonHeaders,
		});
		return await movieResponse.json();
	},

	fetchCastInformation: async (movieId) => {
		const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`;
		const castResponse = await fetch(castUrl, {
			method: "GET",
			headers: commonHeaders,
		});
		return await castResponse.json();
	},

	updateMovieDetails: (movie, genreMapping, castJson) => {
		return {
			title: movie.title,
			poster_path: movie.poster_path,
            vote_average: Math.round(movie.vote_average * 0.5),
			release_date: movie.release_date,
			genres: movie.genre_ids.map((genreId) => genreMapping[genreId]),
			actors: castJson.cast.map((actor) => actor.name),
		};
	},
};
