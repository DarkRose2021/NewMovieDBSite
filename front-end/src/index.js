import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Movie from "./Components/Movie";
import Review from "./Components/Review";

const url = "http://localhost:8080";

const router = createBrowserRouter([
	{
		//Home page
		path: "/",
		element: (
			<>
				<NavBar siteName="My Website" 
					contentComponent={
					<Home />} />
			</>
		),
	},
	{
		//Login
		path: "/login",
		element: (
			<>
				<NavBar siteName="My Website" 
					contentComponent={
					<Login />} />
			</>
		),
	},
	{
		//Signup
		path: "/signup",
		element: (
			<>
				<NavBar siteName="My Website" 
					contentComponent={
					<SignUp />} />
			</>
		),
	},
	{
		path: "/movie/:id",
		element: (
			<> 
			 
					<NavBar siteName="My Website" 
						contentComponent={
							<Movie  />} />
			  
			</>
		)
	},
	{
		path:"/review",
		element: (
			<>
				<NavBar siteName={"My Site"}
					contentComponent={<Review />}/>
			</>
		)
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
