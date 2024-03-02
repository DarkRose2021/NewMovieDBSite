const bcryptjs = require("bcryptjs");
const userService = require("../services/userService");
const dal = require("../dal").dal;

module.exports = (app) => {
	app.post("/login", async (req, res) => {
		const email = req.body.username;
		const password = req.body.password;

		try {
			const found = await dal.findUserEmail(email);
			console.log(found);

			if (!found) {
				res.json({ Message: "Invalid Email or password" });
				return;
			}

		// Check if the entered password is correct
		console.log("Stored hashed password:", user.Password);
		console.log("Entered password:", password);

		const isPasswordValid = await bcryptjs.compare(password, user.Password);
		console.log("Is password valid:", isPasswordValid);

		if (isPasswordValid) {
			const token = jwt.sign({ username: username }, secretKey, {
				expiresIn: "1h",
			});
			res.json({
				User: {
					Username: user.Username,
					Name: user.Name,
					Roles: user.Role,
				},
				Message: "Login successful",
				token: token,
			});
		} else {
			res.json({
				Message: "Incorrect password. Please try again.",
			});
		}
	} catch (error) {
		console.error(error);
		throw error;
	});

	// done in the dal
	app.post("/signup", async (req, res) => {
		const email = req.body.username;
		const password = req.body.password;
		const name = req.body.name;

		let newUser = await dal.createUser(email, name, password);

		res.json({
			User: newUser,
			Message: "Created a new user",
		});
	});

	app.get("/deleteUser/:email", async (req, res) => {
		const email = req.params.email;
		let users = await dal.listUsers();
		let beforeDel = users.length;

		await dal.deleteUser(email);
		users;
		let afterDel = users.length;

		if (afterDel < beforeDel) {
			res.json({ Message: "User Deleted", Users: users });
		} else {
			res.json({ Message: "User Not Deleted", Users: users });
		}
	});

	app.get("/listUsers", async (req, res) => {
		users = await dal.listUsers();
		res.json(users);
	});

	app.post("/reviewMovie/:username", async (req, res) => {
		const movieName = req.body.movieName;
		const starAmount = req.body.starAmount;
		const textBox = req.body.textBox;
		const username = req.params.username;

		let newReview = await dal.createReview(
			movieName,
			starAmount,
			textBox,
			username
		);

		res.json({
			User: newReview,
			Message: "Review Submitted",
		});
	});

	app.post("/deleteReview/:id", async (req, res) => {
		const id = req.params.id;
		await dal.deleteReview(id);
		let reviews = await dal.allReviews();

		res.json({ Message: "Review Deleted", Reviews: reviews });
	});

	app.get("/allReviews", async (req, res) => {
		res.json({
			Message: "All Reviews",
			Reviews: await dal.allReviews(),
		});
	});

	app.get("/allUsers", async (req, res) => {
		res.json({
			Message: "All Users",
			Reviews: await dal.listUsers(),
		});
	});
};
