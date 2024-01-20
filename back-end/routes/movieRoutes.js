const {
	fetchGenres,
	fetchMovieData,
	fetchCastInformation,
	updateMovieDetails,
} = require("./movieFetchUtils");

module.exports = (app) => {
	// Finished
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
