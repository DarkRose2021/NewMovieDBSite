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
		const existingUsers = require(usersFilePath);

		if (
			existingUsers.find(
				(existingUser) => existingUser.Username === user.Username
			)
		) {
			return false; // Username already taken
		} else {
			const hashedPassword = bcryptjs.hashSync(user.Password, 10);

			const newUser = {
				Username: user.Username,
				Password: hashedPassword,
				RegPassword: user.Password,
				Name: user.Name,
				Role: user.Role,
			};

			existingUsers.push(newUser);

			fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));

			return true;
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
		const reviewIndex = existingReviews.findIndex(
			(review) => review.Id === reviewIdNumber
		);

		if (reviewIndex !== -1) {
			// Remove the review using splice
			existingReviews.splice(reviewIndex, 1);

			fs.writeFileSync(
				reviewFilePath,
				JSON.stringify(existingReviews, null, 2)
			);

			console.log(`Review with Id ${reviewIdNumber} deleted successfully.`);
		} else {
			console.log(`Review with Id ${reviewIdNumber} not found.`);
		}
	},
	allReviews: () => {
		const allReviews = require(reviewFilePath);
		return allReviews;
	},
	allUsers: () => {
		const allUsers = require(usersFilePath);
		return allUsers;
	},
};
