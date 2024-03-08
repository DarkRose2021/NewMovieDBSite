const { mongoose, Schema } = require("mongoose");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
require("dotenv").config();
const bcryptjs = require("bcryptjs");

const config = {
	connectionString: process.env.CONNECTION_STRING,
	userCollection: "Users",
	reviewCollection: "Reviews",
};

mongoose.connect(config.connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const user = new Schema(
	{
		Email: { type: String, required: true },
		Name: String,
		Password: { type: String, required: true },
		Roles: Array,
	},
	{ collection: config.userCollection }
);
const userModel = mongoose.model("user", user);

const review = new Schema(
	{
		MovieName: String,
		starAmount: String,
		ReviewTxt: String,
		UserPosted: String,
	},
	{ collection: config.reviewCollection }
);
const reviewModel = mongoose.model("review", review);

exports.dal = {
	createUser: async (email, name, password) => {
		const hashedPassword = bcryptjs.hashSync(password, 10);

		let check = {
			Email: email,
		};

		let user = {
			Email: email,
			Name: name,
			Password: hashedPassword,
			Roles: ["User"],
		};
		try {
			let existingUser = await userModel.findOne(check);
			if (existingUser) {
				return "Email Taken";
			} else {
				let newUser = await userModel.create(user);
				return newUser;
			}
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	createUsersBatch: async (usersArray) => {
		try {
			const hashedUsers = usersArray.map(({ email, fname, password }) => {
				const hashedPassword = bcryptjs.hashSync(password, 10);
				return {
					Email: email,
					Name: fname,
					Password: hashedPassword,
					Roles: ["User"],
				};
			});
			console.log('connecting.....')

			const result = await userModel.collection.insertMany(hashedUsers);
			return result.ops;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	checkUser: async (email, password) => {
		try {
			const cursor = await userModel.collection.find({
				Email: email,
				Password: password,
			});
			const result = await cursor.toArray();
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	listUsers: async () => {
		return await userModel.find({}).exec();
	},
	deleteUser: async (email) => {
		let user = await userModel.collection.findOne({
			Email: email,
		});

		if (user !== null) {
			await userModel.collection.deleteOne({
				Email: email,
			});
		}
	},
	findUserEmail: async (email) => {
		try {
			email = email.replace(/^"(.*)"$/, "$1");
			return await userModel.findOne({ Email: email }).exec();
		} catch (error) {
			console.error("Error finding user:", error);
			throw error;
		}
	},

	createReview: async (movie, star, review, user) => {
		let reviewObj = {
			MovieName: movie,
			starAmount: star,
			ReviewTxt: review,
			UserPosted: user,
		};

		try {
			let newReview = await reviewModel.create(reviewObj);
			return newReview;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	allReviews: async () => {
		return await reviewModel.find({}).exec();
	},
	deleteReview: async (id) => {
		return await reviewModel.findByIdAndDelete(id);
	},
};
