//Login form that sends to back end that checks if the user used the proper username and password
import { useEffect, useState } from "react";
import TokenHook from "./TokenHook";
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
const {
    register, 
    handleSubmit, 
    formState: {errors},
    watch} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const password = watch(["password", ""]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const hasToken = TokenHook();

    const togglePassword = () => {
        setShowPassword(!showPassword);
      };

      const goToClick = () => {
        navigate('/signup');
      }


     const onSubmit = async(data) => {
        console.log("Sending data: ", data)

        try{
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Got it~!", data)
                const token = data.token;
                const user = data.User.Username;
                if(token){
                    console.log("Putting Token in stoarge")
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', user )
                    setIsAuthenticated(true);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error("Error: ", err)
            });
        }
        catch(err){
            console.error("Error sending the data back: ", err)
        }
     }
            
     useEffect(() => {
        if (hasToken) {
            setIsAuthenticated(true);
            console.log('Token is set');
                }
    }, [hasToken]);
    //api call: `http://localhost:8080/login`
	return (
        <div className="container d-flex flex-column justify-content-center align-items-center">

            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
             
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
            <button className="goOpposite" onClick={goToClick}>Don't Have an acount? Sign up Now!</button>
        </div>
    );
};

export default Login;
