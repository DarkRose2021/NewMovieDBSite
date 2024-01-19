const express = require("express");
const cors = require("cors");
require("dotenv").config();
var bcrypt = require("bcryptjs");

//add dal here
const port = 8080;
const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.json("Welcome to the backend of my website");
});

app.post("/login", async (req, res) => {
	console.log(req.body);
	const username = req.body.username;
	const password = req.body.password;

	//ref dal for login and compare username & passwords
	let user = { Username: username, password: password };

	if (user && bcrypt.compareSync(password, user.password)) {
		res.json({
			User: user,
			Message: "Logged in successful",
		});
	} else {
		res.json({
			Message: "Username or Password is incorrect",
		});
	}
});

app.post("/signup", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const name = req.body.name;
	const hashedPassword = await bcrypt.hash(password, 10);
	//ref dal to send the info to the dal
	let newUser = { Username: username, Password: hashedPassword, Name: name };

	if (newUser) {
		res.json({
			User: newUser,
			Message: "Created a new user",
		});
	} else {
		res.json({
			Message: "Invalid info",
		});
	}
});

app.post("/reviewMovie", (req, res) => {
	const movieName = req.body.movieName;
	const starAmount = req.body.starAmount;
	const textBox = req.body.textBox;

	//ref dal to send the info to the dal
	let review;
	res.json({ Message: "Review submitted" });
});

app.post("/deleteReview/:id", (req, res) => {
	const id = req.params.id;
	//ref dal to send the info to the dal

	res.json({ Message: "Review Deleted" });
});

app.get("/allActors", (req, res) => {
	const fetch = require("node-fetch");

	//change url
	const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}`;
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

app.get("/allMovies", (req, res) => {
	const fetch = require("node-fetch");

	//change url
	const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`;
    const genreOptions = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: process.env.ACCESS_TOKEN_AUTH,
        },
    };

	fetch(genreUrl, genreOptions)
	.then((genreResponse) => genreResponse.json())
	.then((genreJson) => {
		// Step 2: Map Genre IDs
		const genreMapping = genreJson.genres.reduce((acc, genre) => {
			acc[genre.id] = genre.name;
			return acc;
		}, {});

		// Step 3: Fetch Movies
		const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`;
		const movieOptions = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.ACCESS_TOKEN_AUTH,
			},
		};

		fetch(movieUrl, movieOptions)
			.then((movieResponse) => movieResponse.json())
			.then(async (movieJson) => {
				// Step 4: Fetch and Update Movie Data with Genres and Actors
				const moviesWithDetails = await Promise.all(movieJson.results.map(async (movie) => {
					// Fetch Cast Information
					const castUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.API_KEY}`;
					const castOptions = {
						method: "GET",
						headers: {
							accept: "application/json",
							Authorization: process.env.ACCESS_TOKEN_AUTH,
						},
					};

					const castResponse = await fetch(castUrl, castOptions);
					const castJson = await castResponse.json();

					// Update Movie Data with Genres and Actors
					movie.genres = movie.genre_ids.map((genreId) => genreMapping[genreId]);
					movie.actors = castJson.cast.map((actor) => actor.name);

					return movie;
				}));

				res.json(moviesWithDetails);
			})
			.catch((movieErr) => {
				console.error("error fetching movies:" + movieErr);
				res.status(500).json({ error: "Internal Server Error (Movies)" });
			});
	})
	.catch((genreErr) => {
		console.error("error fetching genres:" + genreErr);
		res.status(500).json({ error: "Internal Server Error (Genres)" });
	});
});

app.get("/filterMovies", (req, res) => {
	const fetch = require("node-fetch");

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
	const fetch = require("node-fetch");

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
	const fetch = require("node-fetch");

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
	const fetch = require("node-fetch");

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

app.listen(port, function () {
	console.log(`Connected to port ${port}`);
});
