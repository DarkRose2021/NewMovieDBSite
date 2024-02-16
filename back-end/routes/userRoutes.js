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

			const checkPasswords = await bcryptjs.compare(password, found.Password);

			if (checkPasswords) {
				const plainUser = found.toObject();

				const modifiedUser = { ...plainUser, Username: plainUser.Email };
				delete modifiedUser.Email;
				res.json({ Message: `${found.Email} found`, User: modifiedUser });
			} else {
				res.json({ Message: "Invalid Email or password" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ Message: "An error occurred" });
		}
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

	app.post("/reviewMovie/:username", (req, res) => {
		const movieName = req.body.movieName;
		const starAmount = req.body.starAmount;
		const textBox = req.body.textBox;
		const username = req.params.username;

		const newReview = {
			MovieName: movieName,
			starAmount: starAmount,
			ReviewTxt: textBox,
			UserPosted: username,
		};
		//ref dal to send the info to the dal
		userService.addReview(newReview);

		res.json({
			User: newReview,
			Message: "Review Submitted",
		});
	});

	app.post("/deleteReview/:id", (req, res) => {
		const id = req.params.id;
		//ref dal to send the info to the dal
		userService.deleteReview(id);

		res.json({ Message: "Review Deleted" });
	});

	app.get("/allReviews", (req, res) => {
		res.json({
			Message: "All Reviews",
			Reviews: userService.allReviews(),
		});
	});

	app.get("/allUsers", (req, res) => {
		res.json({
			Message: "All Users",
			Reviews: userService.allUsers(),
		});
	});
};
