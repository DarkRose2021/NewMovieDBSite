const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const userService = require("../services/userService");

const usersFilePath = path.join(__dirname, "users.json");
const users = require("./users.json")

module.exports = {
	getUser: (username) => {
		return users.find((user) => user.Username === username);
	},

	addUser: (user) => {
		// Load existing users from the file
		const existingUsers = require(usersFilePath);

		// Check if the username is already taken
		if (
			existingUsers.find(
				(existingUser) => existingUser.Username === user.Username
			)
		) {
			return false; // Username already taken
		}

		// Hash the password
		const hashedPassword = bcrypt.hashSync(user.Password, 10);

		// Create a new user object
		const newUser = {
			Username: user.Username,
			Password: hashedPassword,
			Name: user.Name,
		};

		// Add the new user to the existing users array
		existingUsers.push(newUser);

		// Write the updated users array back to the file
		fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));

		return true; // User added successfully
	},
};
