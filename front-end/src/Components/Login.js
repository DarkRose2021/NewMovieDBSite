//Login form that sends to back end that checks if the user used the proper username and password
import { useEffect, useState } from "react";
import TokenHook from "./TokenHook";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const hasToken = TokenHook();

    const togglePassword = () => {
        setShowPassword(!showPassword);
      };

    //api call: `http://localhost:8080/login`
	return (
        <div container d-flex flex-column justify-content-center align-items-center>
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
                </div>
            </div>
        </div>
    );
};

export default Login;
