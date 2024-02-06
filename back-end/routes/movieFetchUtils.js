const commonHeaders = {
	accept: "application/json",
	Authorization: process.env.ACCESS_TOKEN_AUTH,
};

//get auth token and api key at: https://developer.themoviedb.org/docs/getting-started

module.exports = {
	fetchGenres: async () => {
		try {
			const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`;
			const genreResponse = await fetch(genreUrl, {
				method: "GET",
				headers: commonHeaders,
			});
			const genreJson = await genreResponse.json();

			// Ensure that genreJson.genres is an array
			if (Array.isArray(genreJson.genres)) {
				return genreJson;
			} else {
				console.error("Invalid genre data:", genreJson);
				throw new Error("Failed to fetch genre data");
			}
		} catch (error) {
			console.error("Error fetching genre data:", error);
			throw new Error("Failed to fetch genre data");
		}
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

	fetchOneMovie: async (movieId) => {
		try {
			// Fetch movie details
			const oneMovieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`;
			const options = {
				method: "GET",
				headers: commonHeaders,
			};
			const movieResponse = await fetch(oneMovieUrl, options);
			const movieDetails = await movieResponse.json();

			// Fetch cast information
			return movieDetails;
		} catch (error) {
			console.error("Error fetching movie details:", error);
			throw new Error("Failed to fetch movie details");
		}
	},

	searchTitles: async (title) => {
		const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
		const searchResponse = await fetch(url, {
			method: "GET",
			headers: commonHeaders,
		});
		return await searchResponse.json();
	},

	searchActors: async (actor) => {
		const url = `https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=en-US&page=1`;
		const searchResponse = await fetch(url, {
			method: "GET",
			headers: commonHeaders,
		});
		return await searchResponse.json();
	},

	searchGenres: async (genre) => {
		const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_keywords=${genre}`;
		const searchResponse = await fetch(url, {
			method: "GET",
			headers: commonHeaders,
		});
		return await searchResponse.json();
	},

	updateMovieDetails: (movie, genreMapping, castJson) => {
		return {
			title: movie.title,
			id: movie.id,
			poster_path: movie.poster_path,
			vote_average: Math.round(movie.vote_average * 0.5),
			release_date: movie.release_date,
			genres: movie.genre_ids.map((genreId) => genreMapping[genreId]),
			actors: castJson.cast.map((actor) => actor.name),
		};
	},

	updateOneMovieDetails: (movie, castJson) => {
		return {
			title: movie.title,
			id: movie.id,
			poster_path: movie.poster_path,
			vote_average: Math.round(movie.vote_average * 0.5),
			description: movie.overview,
			release_date: movie.release_date,
			actors: castJson.cast.map((actor) => actor.name),
		};
	},

	// Finished
	updateActorMovieDetails: (actors, genreMapping) => {
			const actorsData = actors.results.filter(
				(result) => result.known_for_department === "Acting"
			);
			const filteredActors = actorsData.map((actor) => {
				const filteredKnownFor = actor.known_for.map((movie) => {
					return {
						id: movie.id,
						movie_name: movie.title,
						genres: movie.genre_ids.map((genreId) => genreMapping[genreId]),
						poster_path: movie.poster_path,
						vote_average: Math.round(movie.vote_average * 0.5),
						release_date: movie.release_date,
					};
				});

				return {
					name: actor.name,
					known_for: filteredKnownFor,
				};
			});

			return filteredActors;
	},
};
