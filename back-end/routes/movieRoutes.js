const commonHeaders = {
	accept: "application/json",
	Authorization: process.env.ACCESS_TOKEN_AUTH,
};

const fetchGenres = async () => {
	const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`;
	const genreResponse = await fetch(genreUrl, {
		method: "GET",
		headers: commonHeaders,
	});
	return await genreResponse.json();
};

const fetchMovieData = async () => {
	const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`;
	const movieResponse = await fetch(movieUrl, {
		method: "GET",
		headers: commonHeaders,
	});
	return await movieResponse.json();
};

const fetchCastInformation = async (movieId) => {
	const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`;
	const castResponse = await fetch(castUrl, {
		method: "GET",
		headers: commonHeaders,
	});
	return await castResponse.json();
};

const updateMovieDetails = (movie, genreMapping, castJson) => {
	return {
		title: movie.title,
		poster_path: movie.poster_path,
		vote_average: movie.vote_average,
		release_date: movie.release_date,
		genres: movie.genre_ids.map((genreId) => genreMapping[genreId]),
		actors: castJson.cast.map((actor) => actor.name),
	};
};

module.exports = (app) => {
	app.get("/allMovies", async (req, res) => {
		try {
			// Fetch Genre Data
			const genreJson = await fetchGenres();
			const genreMapping = genreJson.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			}, {});

			// Fetch Movie Data
			const movieJson = await fetchMovieData();

			// Fetch and Update Movie Data with Genres and Actors concurrently
			const moviesWithDetails = await Promise.all(
				movieJson.results.map(async (movie) => {
					// Fetch Cast Information
					const castJson = await fetchCastInformation(movie.id);

					// Update Movie Data with Genres and Actors
					return updateMovieDetails(movie, genreMapping, castJson);
				})
			);

			res.json(moviesWithDetails);
		} catch (error) {
			console.error("Error:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	app.get("/filterMovies", (req, res) => {
		//change url
		const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.ACCESS_TOKEN_AUTH,
			},
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((json) => {
				res.json(json);
			})
			.catch((err) => {
				console.error("error:" + err);
				// Send an error response to the client if something goes wrong
				res.status(500).json({ error: "Internal Server Error" });
			});
	});

	app.get("/filterActors", (req, res) => {
		//change url
		const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.ACCESS_TOKEN_AUTH,
			},
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((json) => {
				res.json(json);
			})
			.catch((err) => {
				console.error("error:" + err);
				// Send an error response to the client if something goes wrong
				res.status(500).json({ error: "Internal Server Error" });
			});
	});

	app.get("/oneMovie", (req, res) => {
		//change url
		const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.ACCESS_TOKEN_AUTH,
			},
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((json) => {
				res.json(json);
			})
			.catch((err) => {
				console.error("error:" + err);
				// Send an error response to the client if something goes wrong
				res.status(500).json({ error: "Internal Server Error" });
			});
	});

	app.get("/rateMovie", (req, res) => {
		//change url
		const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.ACCESS_TOKEN_AUTH,
			},
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((json) => {
				res.json(json);
			})
			.catch((err) => {
				console.error("error:" + err);
				// Send an error response to the client if something goes wrong
				res.status(500).json({ error: "Internal Server Error" });
			});
	});
};
