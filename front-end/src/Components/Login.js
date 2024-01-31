//Login form that sends to back end that checks if the user used the proper username and password
import { useEffect, useState } from "react";
import TokenHook from "./TokenHook";
import {useForm} from 'react-hook-form'

const Login = () => {
const {
    register, 
    handleSubmit, 
    formState: {errors},
    watch} = useForm();
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const password = watch(["password", ""]);
    const hasToken = TokenHook();

    const togglePassword = () => {
        setShowPassword(!showPassword);
      };

     const onSubmit = async(data) => {
        console.log("Sending data")
     }

    //api call: `http://localhost:8080/login`
	return (
        <div className="container d-flex flex-column justify-content-center align-items-center">

        <form className="loginForm" onSubmit={handleSubmit}>

             <input {...register("username", {required: "Username is required"})}  placeholder="Username" onChange={(e) => setUsername} />



            <input {...register("password", 
                {required: "PAssword is required"})} 
                type={showPassword ? "text" : "password"}
                placeholder="Password"/>

            <span className="icon-eye" onClick={togglePassword}>
                {showPassword ? (
                    <i className="bi bi-eye"></i>
                ) : (
                    <i className="bi bi-eye-slash"></i>
                )}
            </span>

            <input type="submit" />

        </form>

{/* 
            <div className="SignInForm">
            
            <h1 className="Title SignInForm">Sign In</h1>

            <label className="SignInForm mt-2 formLabel">Username:</label>
            <input
            className=" SignInForm mb-3 form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

                <div className="form-group">
                    
                        <label className="SignInForm formLabel">Password:</label>
                        <div className="input-group">
                            <input
                                className={`SignInForm form-control ${showPassword ? "showPassword" : ""}`}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="icon-eye" onClick={togglePassword}>
                                {showPassword ? (
                                    <i className="bi bi-eye"></i>
                                ) : (
                                    <i className="bi bi-eye-slash"></i>
                                )}
                                </span>
                        </div>
                </div> */}
            </div>
        // </div>
    );
};

export default Login;
