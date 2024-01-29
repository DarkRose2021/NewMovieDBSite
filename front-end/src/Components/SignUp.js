//form to sign up for an account
import React, {useState} from "react";
import {useForm} from 'react-hook-form'
const SignUp = () => {
    //api call: `http://localhost:8080/signup`

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        watch} = useForm();
        const [showPassword, setShowPassword] = useState(false);

        const togglePassword = () => {
            setShowPassword(!showPassword);
          };
        const password = watch(["password", ""]);
        

        const onSubmit = (data) => console.log(data);

    //const username = req.body.username;
		// const password = req.body.password;
		// const name = req.body.name;
	return (
    <div className="signUp" >
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("userName", {required: "Username is required"})} placeholder="Username"/>

        <input
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
              message: "Password must include at least one letter, one number, and one special character",
            },
            minLength: {
                value: 10,
                message: "Password must be at least 10 characters",
              },
          })}
          type={showPassword ? "text" : "password"}
          placeholder="Password" />

          {errors.password && <p>{errors.password.message}</p>}
        
          <input
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
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
