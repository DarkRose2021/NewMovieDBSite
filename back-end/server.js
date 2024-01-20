const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Load environment variables
dotenv.config();

// Routes
require("./routes/userRoutes")(app);
require("./routes/movieRoutes")(app);

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// var bcrypt = require("bcryptjs");
// const fetch = require("node-fetch");

// //add dal here
// const port = 8080;
// const app = express();

// app.use(express.json());
// app.use(
// 	express.urlencoded({
// 		extended: true,
// 	})
// );

// app.get("/", (req, res) => {
// 	res.json("Welcome to the backend of my website");
// });

// app.post("/login", async (req, res) => {
// 	console.log(req.body);
// 	const username = req.body.username;
// 	const password = req.body.password;

// 	//ref dal for login and compare username & passwords
// 	let user = { Username: username, password: password };

// 	if (user && bcrypt.compareSync(password, user.password)) {
// 		res.json({
// 			User: user,
// 			Message: "Logged in successful",
// 		});
// 	} else {
// 		res.json({
// 			Message: "Username or Password is incorrect",
// 		});
// 	}
// });

// app.post("/signup", async (req, res) => {
// 	const username = req.body.username;
// 	const password = req.body.password;
// 	const name = req.body.name;
// 	const hashedPassword = await bcrypt.hash(password, 10);
// 	//ref dal to send the info to the dal
// 	let newUser = { Username: username, Password: hashedPassword, Name: name };

// 	if (newUser) {
// 		res.json({
// 			User: newUser,
// 			Message: "Created a new user",
// 		});
// 	} else {
// 		res.json({
// 			Message: "Invalid info",
// 		});
// 	}
// });

// app.post("/reviewMovie", (req, res) => {
// 	const movieName = req.body.movieName;
// 	const starAmount = req.body.starAmount;
// 	const textBox = req.body.textBox;

// 	//ref dal to send the info to the dal
// 	let review;
// 	res.json({ Message: "Review submitted" });
// });

// app.post("/deleteReview/:id", (req, res) => {
// 	const id = req.params.id;
// 	//ref dal to send the info to the dal

// 	res.json({ Message: "Review Deleted" });
// });

// app.get("/allActors", (req, res) => {
// 	//change url
// 	const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}`;
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: process.env.ACCESS_TOKEN_AUTH,
// 		},
// 	};

// 	fetch(url, options)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			res.json(json);
// 		})
// 		.catch((err) => {
// 			console.error("error:" + err);
// 			// Send an error response to the client if something goes wrong
// 			res.status(500).json({ error: "Internal Server Error" });
// 		});
// });

// const commonHeaders = {
// 	accept: "application/json",
// 	Authorization: process.env.ACCESS_TOKEN_AUTH,
// };

// const fetchGenres = async () => {
// 	const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`;
// 	const genreResponse = await fetch(genreUrl, {
// 		method: "GET",
// 		headers: commonHeaders,
// 	});
// 	return await genreResponse.json();
// };

// const fetchMovieData = async () => {
// 	const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`;
// 	const movieResponse = await fetch(movieUrl, {
// 		method: "GET",
// 		headers: commonHeaders,
// 	});
// 	return await movieResponse.json();
// };

// const fetchCastInformation = async (movieId) => {
// 	const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`;
// 	const castResponse = await fetch(castUrl, {
// 		method: "GET",
// 		headers: commonHeaders,
// 	});
// 	return await castResponse.json();
// };

// const updateMovieDetails = (movie, genreMapping, castJson) => {
// 	return {
// 		title: movie.title,
// 		poster_path: movie.poster_path,
// 		vote_average: movie.vote_average,
// 		release_date: movie.release_date,
// 		genres: movie.genre_ids.map((genreId) => genreMapping[genreId]),
// 		actors: castJson.cast.map((actor) => actor.name),
// 	};
// };

// app.get("/allMovies", async (req, res) => {
// 	try {
// 		// Fetch Genre Data
// 		const genreJson = await fetchGenres();
// 		const genreMapping = genreJson.genres.reduce((acc, genre) => {
// 			acc[genre.id] = genre.name;
// 			return acc;
// 		}, {});

// 		// Fetch Movie Data
// 		const movieJson = await fetchMovieData();

// 		// Fetch and Update Movie Data with Genres and Actors concurrently
// 		const moviesWithDetails = await Promise.all(
// 			movieJson.results.map(async (movie) => {
// 				// Fetch Cast Information
// 				const castJson = await fetchCastInformation(movie.id);

// 				// Update Movie Data with Genres and Actors
// 				return updateMovieDetails(movie, genreMapping, castJson);
// 			})
// 		);

// 		res.json(moviesWithDetails);
// 	} catch (error) {
// 		console.error("Error:", error);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });

// app.get("/filterMovies", (req, res) => {
// 	//change url
// 	const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: process.env.ACCESS_TOKEN_AUTH,
// 		},
// 	};

// 	fetch(url, options)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			res.json(json);
// 		})
// 		.catch((err) => {
// 			console.error("error:" + err);
// 			// Send an error response to the client if something goes wrong
// 			res.status(500).json({ error: "Internal Server Error" });
// 		});
// });

// app.get("/filterActors", (req, res) => {
// 	//change url
// 	const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: process.env.ACCESS_TOKEN_AUTH,
// 		},
// 	};

// 	fetch(url, options)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			res.json(json);
// 		})
// 		.catch((err) => {
// 			console.error("error:" + err);
// 			// Send an error response to the client if something goes wrong
// 			res.status(500).json({ error: "Internal Server Error" });
// 		});
// });

// app.get("/oneMovie", (req, res) => {
// 	//change url
// 	const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: process.env.ACCESS_TOKEN_AUTH,
// 		},
// 	};

// 	fetch(url, options)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			res.json(json);
// 		})
// 		.catch((err) => {
// 			console.error("error:" + err);
// 			// Send an error response to the client if something goes wrong
// 			res.status(500).json({ error: "Internal Server Error" });
// 		});
// });

// app.get("/rateMovie", (req, res) => {
// 	//change url
// 	const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`;
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: process.env.ACCESS_TOKEN_AUTH,
// 		},
// 	};

// 	fetch(url, options)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			res.json(json);
// 		})
// 		.catch((err) => {
// 			console.error("error:" + err);
// 			// Send an error response to the client if something goes wrong
// 			res.status(500).json({ error: "Internal Server Error" });
// 		});
// });

// app.listen(port, function () {
// 	console.log(`Connected to port ${port}`);
// });
