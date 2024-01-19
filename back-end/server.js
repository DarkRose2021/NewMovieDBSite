const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

app.post("/login", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	//ref dal for login and compare username & passwords
	let user;

	if (user) {
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

app.post("/signup", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let name = req.body.name;
	//ref dal to send the info to the dal
	let newUser;

	if (newUser) {
		res.json({
			User: user,
			Message: "Created a new user",
		});
	} else {
		res.json({
			Message: "Invalid info",
		});
	}
});

app.get("/allActors", (req, res) => {
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

app.get("/allMovies", (req, res) => {
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
