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
			const genreMapping = (genreJson.genres && genreJson.genres.length > 0)
				? genreJson.genres.reduce((acc, genre) => {
						acc[genre.id] = genre.name;
						return acc;
				  }, {})
				: {};

			// Fetch Movie Data
			const movieJson = await fetchMovieData();

			// Fetch and Update Movie Data with Genres and Actors concurrently
			const moviesWithDetails = (movieJson.results && movieJson.results.length > 0)
				? await Promise.all(
						movieJson.results.map(async (movie) => {
							// Fetch Cast Information
							const castJson = await fetchCastInformation(movie.id);

							// Update Movie Data with Genres and Actors
							return updateMovieDetails(movie, genreMapping, castJson);
						})	
				  )
				: [];

			res.json(moviesWithDetails);
		} catch (error) {
			console.error("Error:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	//Finished
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

	
};
