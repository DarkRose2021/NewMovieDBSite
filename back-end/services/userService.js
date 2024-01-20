const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const userService = require("../services/userService");

const usersFilePath = path.join(__dirname, "users.json");
const reviewFilePath = path.join(__dirname, "reviews.json");
// delete this file later, placeholder for the database
const users = require("./users.json");
const reviews = require("./reviews.json");

// eventually delete this cuz its basically a dal

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
		} else {
			// Hash the password
			const hashedPassword = bcryptjs.hashSync(user.Password, 10);

			// Create a new user object
			const newUser = {
				Username: user.Username,
				Password: hashedPassword,
				//testing purposes
				RegPassword: user.Password,
				Name: user.Name,
				Role: user.Role,
			};

			// Add the new user to the existing users array
			existingUsers.push(newUser);

			// Write the updated users array back to the file
			fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));

			return true; // User added successfully
		}
	},
	addReview: (review) => {
		const existingReviews = require(reviewFilePath);
		let id = existingReviews.length + 1;

		const newReview = {
			Id: id,
			MovieName: review.MovieName,
			starAmount: review.starAmount,
			ReviewTxt: review.ReviewTxt,
			// Might change to user id?
			UserPosted: review.UserPosted,
		};

		existingReviews.push(newReview);

		fs.writeFileSync(reviewFilePath, JSON.stringify(existingReviews, null, 2));
	},
	deleteReview: (reviewId) => {
		const existingReviews = require(reviewFilePath);
	
		// Convert reviewId to a number (assuming Id is a number)
		const reviewIdNumber = Number(reviewId);
	
		// Find the index of the review with the specified reviewId
		const reviewIndex = existingReviews.findIndex(review => review.Id === reviewIdNumber);
	
		if (reviewIndex !== -1) {
			// Remove the review using splice
			existingReviews.splice(reviewIndex, 1);
	
			fs.writeFileSync(reviewFilePath, JSON.stringify(existingReviews, null, 2));
	
			console.log(`Review with Id ${reviewIdNumber} deleted successfully.`);
		} else {
			console.log(`Review with Id ${reviewIdNumber} not found.`);
		}
	}
	
};
