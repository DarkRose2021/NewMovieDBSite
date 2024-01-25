const {
	fetchGenres,
	fetchMovieData,
	fetchCastInformation,
	updateMovieDetails,
	fetchOneMovie,
	updateOneMovieDetails,
} = require("./movieFetchUtils");

module.exports = (app) => {
	// Finished
	app.get("/allMovies", async (req, res) => {
		try {
			// Fetch Genre Data
			const genreJson = await fetchGenres();
			genreMapping = genreJson.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			});

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

	// Finished
	app.get("/oneMovie/:movieId", async (req, res) => {
		try {
			const movieId = req.params.movieId;

			// Use the updated fetchOneMovie function
			const movieDetails = await fetchOneMovie(movieId);

			const castJson = await fetchCastInformation(movieId);

			// Update movie details with actors
			const updatedMovieDetails = updateOneMovieDetails(movieDetails, castJson);

			res.json(updatedMovieDetails);
		} catch (error) {
			console.error("Error:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	// app.get("/searchMovies", async (req, res) => {
	// 	try {
	// 		const { genre, actor, title } = req.query;

	// 		const genreJson = await fetchGenres();
	// 		const genreMapping = genreJson.genres.reduce((acc, genre) => {
	// 			acc[genre.name.toLowerCase()] = genre.id;
	// 			return acc;
	// 		}, {});

	// 		const movieJson = await fetchMovieData();
	// 		const genreId = genre ? genreMapping[genre.toLowerCase()] : undefined;

	// 		const filteredMovies = movieJson.results.filter((movie) => {
	// 			//genre works
	// 			const hasGenre = genreId ? movie.genre_ids.includes(genreId) : true;
	// 			const hasActor = actor
	// 				? movie.cast.some((actorObj) => actorObj.name.toLowerCase().includes(actor.toLowerCase()))
	// 				: true;
	// 			const hasTitle = title ? movie.title.toLowerCase().includes(title.toLowerCase()) : true;
	// 			return hasGenre && hasActor && hasTitle;
	// 		});

	// 		const moviesWithDetails = await Promise.all(
	// 			filteredMovies.map(async (movie) => {
	// 				const castJson = await fetchCastInformation(movie.id);

	// 				return updateMovieDetails(movie, genreMapping, castJson);
	// 			})
	// 		);

	// 		res.json(moviesWithDetails);
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 		res.status(500).json({ error: "Internal Server Error" });
	// 	}
	// });

	app.get("searchByGenre/:genre", async (req, res) =>{
		
	})

	app.get("searchByActor/:actor", async (req, res) =>{
		
	})

	app.get("searchByTitle/:title", async (req, res) =>{
		
	})
};
