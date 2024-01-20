const bcrypt = require("bcryptjs");
const userService = require("../services/userService");

module.exports = (app) => {
	app.post("/login", async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;

		// Retrieve user from the userService
		const user = userService.getUser(username);
		console.log(user);

		// Check if the user exists
		if (!user) {
			res.json({
				Message: "User not found. Please check your username.",
			});
			return;
		}

		// Check if the entered password is correct
		console.log("Stored hashed password:", user.Password);
		console.log("Entered password:", password);

		const isPasswordValid = bcrypt.compareSync(password, user.Password);
		console.log("Is password valid:", isPasswordValid);

		if (isPasswordValid) {
			res.json({
				User: {
					Username: user.Username,
					Name: user.Name,
				},
				Message: "Login successful",
			});
		} else {
			res.json({
				Message: "Incorrect password. Please try again.",
			});
		}
	});

	app.post("/signup", async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		const name = req.body.name;

		// Check if the username is already taken
		// if (await userService.getUser(username)) {
		// 	res.json({
		// 		Message: "Username is already taken. Please choose another username.",
		// 	});
		// 	return;
		// }

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user object
		const newUser = {
			Username: username,
			Password: hashedPassword,
			Name: name,
		};

		// Add the new user to the users array in the userService
		userService.addUser(newUser);

		res.json({
			User: newUser,
			Message: "Created a new user",
		});
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
};
