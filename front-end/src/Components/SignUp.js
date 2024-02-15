//form to sign up for an account
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const SignUp = () => {
	//api call: `http://localhost:8080/signup`

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const passwordPattern =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

	const onSubmit = async (data) => {
		console.log("Data sending: ", data);
		try {
			const response = await fetch("http://localhost:8080/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error(`HTTP Error! Status: ${response.status}`);
			}
			const result = await response.json();
			console.log("Backend response:", result);
		} catch (error) {
			console.error("Error sending data to the backend:", error);
		}
	};

	return (
		<div className="signUp">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("username", { required: "Email is required" })}
					id="username"
					placeholder="Email"
				/>
				

				<input
					id="password"
					{...register("password", {
						required: "Password is required",
						pattern: {
							value: passwordPattern,
							message:
								"Password must include at least one letter, one number, and one special character",
						},
						minLength: {
							value: 10,
							message: "Password must be at least 10 characters",
						},
					})}
					type={showPassword ? "text" : "password"}
					placeholder="Password"
				/>

				{errors.password && <p>{errors.password.message}</p>}

				<input
					{...register("passwordConfirm", {
						required: "Please confirm your password",
						validate: (value) =>
							value === watch("password", "") || "Passwords do not match",
					})}
					type={showPassword ? "text" : "password"}
					placeholder="Confirm Password"
				/>
				<span className="icon-eye" onClick={togglePassword}>
					{showPassword ? (
						<i className="bi bi-eye"></i>
					) : (
						<i className="bi bi-eye-slash"></i>
					)}
				</span>
				{errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}

				<input type="submit" />
			</form>
		</div>
	);
};

export default SignUp;
