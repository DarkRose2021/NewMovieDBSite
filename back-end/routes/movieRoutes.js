const {
	fetchGenres,
	fetchMovieData,
	fetchCastInformation,
	updateMovieDetails,
	fetchOneMovie,
	updateOneMovieDetails,
	searchTitles,
	searchActors,
	searchGenres,
	updateActorMovieDetails
} = require("./movieFetchUtils");

module.exports = (app) => {
	// Finished
	app.get("/allMovies", async (req, res) => {
		try {
			const genreJson = await fetchGenres();
			genreMapping = genreJson.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			});
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

	app.get("/searchByGenre/:genre", async (req, res) =>{
		let genre = req.params.genre
		let encodedString = encodeURIComponent(genre);
		const genreJson = await fetchGenres();
			genreMapping = genreJson.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			});
		let searchedGenre = await searchGenres(encodedString)
		res.json(searchedGenre)
	})

	// Finished
	app.get("/searchByActor/:actor", async (req, res) =>{
		let actor = req.params.actor
		let encodedString = encodeURIComponent(actor);
		const genreJson = await fetchGenres();
			genreMapping = genreJson.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			});
		let searchedPerson = await searchActors(encodedString)
		const actorsWithDetails = await updateActorMovieDetails(searchedPerson, genreMapping)
		// res.json(searchedPerson)
		res.json(actorsWithDetails)
	})

	// Finished
	app.get("/searchByTitle/:title", async (req, res) => {
		let title = req.params.title;
		let encodedString = encodeURIComponent(title);
		const genreJson = await fetchGenres();
			genreMapping = genreJson.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			});
			const searchedMovies = await searchTitles(encodedString);

			// Fetch and Update Movie Data with Genres and Actors concurrently
			const moviesWithDetails = await Promise.all(
				searchedMovies.results.map(async (movie) => {
					const castJson = await fetchCastInformation(movie.id);
					return updateMovieDetails(movie, genreMapping, castJson);
				})
			);
			res.json(moviesWithDetails);
	});
};
