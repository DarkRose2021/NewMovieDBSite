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
    const [rating, setRating] = useState(0)
    const hasToken = TokenHook();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

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
            console.log('Token is set');
                }
    }, [hasToken]);


    const onSubmit = async () => {
        
        const data = [
          movieTitle, //Movie 
          review, //Review 
          rating //Stars 
        ];
        console.log(data)
        
    }
    const handleRatingChange = (value) => {
        setRating(value);
      };


    const handleChange = (e) => {
        if (e.target.value.length <= 1000) {
            setReview(e.target.value)
            console.log(review);
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
