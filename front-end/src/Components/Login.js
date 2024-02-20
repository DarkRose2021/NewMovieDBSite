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
    const [showPassword, setShowPassword] = useState(false);
    const password = watch(["password", ""]);
    const hasToken = TokenHook();

    const togglePassword = () => {
        setShowPassword(!showPassword);
      };

     const onSubmit = async(data) => {
        console.log("Sending data")

        try{
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json()
            console.log("Backend response:", result);
        }
        catch(err){
            console.error("Error sending the data back: ", err)
        }
     }

    //api call: `http://localhost:8080/login`
	return (
        <div className="container d-flex flex-column justify-content-center align-items-center">

            <form className="loginForm" onSubmit={handleSubmit}>
             
              <div>
                  <input {...register("username", 
                    {required: "Username is required"})}  
                    placeholder="Username" 
                    className="login"
                />
              </div>
              <div >

              </div>

                <input {...register("password", 
                    {required: "Password is required"})} 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="login"
                />

                <span className="icon-eye" onClick={togglePassword}>
                    {showPassword ? (
                        <i className="bi bi-eye"></i>
                    ) : (
                        <i className="bi bi-eye-slash"></i>
                    )}
                </span>

                <div>
                     <input className="loginButton"
                type="submit" />
                </div>
               

            </form>
        </div>
    );
};

export default Login;
