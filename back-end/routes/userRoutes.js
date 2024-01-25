const bcryptjs = require("bcryptjs");
const userService = require("../services/userService");
const jwt = require('jsonwebtoken'); //token for sign in
const crypto =  require('crypto');


const generateSecretKey = () => {
	return crypto.randomBytes(16).toString('hex');
  };

  const secretKey = generateSecretKey(); //secret key for token

module.exports = (app) => {
	app.post("/login", async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
//ref dal to send the info to the dal
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

		const isPasswordValid = await bcryptjs.compare(password, user.Password);
		console.log("Is password valid:", isPasswordValid);

		if (isPasswordValid) {
			const token = jwt.sign({username: username}, secretKey, {expiresIn: '1h'});
			res.json({
				User: {
					Username: user.Username,
					Name: user.Name,
				},
				Message: "Login successful",
				token: token
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

		const newUser = {
			Username: username,
			Password: password,
			Name: name,
			Role: ["Client"]
		};

		//ref dal to send the info to the dal
		userService.addUser(newUser);

		res.json({
			User: newUser,
			Message: "Created a new user",
		});
	});

	app.post("/reviewMovie/:username", (req, res) => {
		const movieName = req.body.movieName;
		const starAmount = req.body.starAmount;
		const textBox = req.body.textBox;
		const username = req.params.username

		const newReview = {
			MovieName: movieName,
			starAmount: starAmount,
			ReviewTxt: textBox,
			UserPosted: username
		}
//ref dal to send the info to the dal
		userService.addReview(newReview)

		
		res.json({
			User: newReview,
			Message: "Review Submitted",
		});
	});

	app.post("/deleteReview/:id", (req, res) => {
		const id = req.params.id;
		//ref dal to send the info to the dal
		userService.deleteReview(id)

		res.json({ Message: "Review Deleted" });
	});
};
