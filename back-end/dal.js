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
			console.log(existingUser)

			if (existingUser) {
				console.log("taken")
				return "Email Taken";
			} else {
				let newUser = await userModel.create(user);
				console.log("created")
				return newUser;
			}
		} catch (error) {
			console.log("error happened")
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
	deleteUser: async (email) =>{
		email = email.replace(/^"(.*)"$/, "$1");
		await userModel.collection.updateOne({Email: email})
		return email + " deleted"
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
};
