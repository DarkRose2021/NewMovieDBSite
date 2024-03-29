import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { useForm } from "react-hook-form";
import TokenHook from "./TokenHook";

const Review = ({movieTitle}) => {

    const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('')
    const [submit, setSubmit] = useState(false);
    const [rating, setRating] = useState(0);
    const hasToken = TokenHook();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const user = localStorage.getItem("user");
    //api call: `http://localhost:8080/reviewMovie/${username}`
    // Needs this info:
    // "MovieName": "In Time",
    // "starAmount": "4",
    // "ReviewTxt": "This is a testing review. Please don't take this seriously.",
    // "UserPosted": "testing"


    //Will already be populated with movie Name & Genere

    useEffect(() => {
        if (hasToken) {
            setIsAuthenticated(true);
            // console.log('Token is set');
                }
    }, [hasToken]);


    const onSubmit = async () => {
        
        const data = {
          movieName: movieTitle, //Movie 
          textBox: review, //Review 
          starAmount: rating, //Stars 
    };
        console.log(data)

        const response = await fetch(`http://localhost:8080/reviewMovie/${user}`, {
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(data)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("The response :", data)
        })
    }
    const handleRatingChange = (value) => {
        setRating(value);
      };


    const handleChange = (e) => {
        if (e.target.value.length <= 1000) {
            setReview(e.target.value)
            // console.log(review);
        }
    }   
	return (
    
    <div>
        <h1>{movieTitle}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea 
                {...register("Review", {required: "You must leave a review to rate the movie."})}
                id="Review"
                onChange={handleChange}
                placeholder="Review"
                value={review}
                maxLength={1000}
            />
             <p>Character count: {review.length}/1000</p>


        <StarRating rating={rating} onChange={handleRatingChange}/>
        <p>You selected {rating} stars.</p>



        <input type="submit" />

        </form>
        
        
        
    </div>
    
    
    
    );
};

export default Review;
