import React, { useEffect, useState } from "react";
import Actor from "./Actor";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import Review from "./Review";
import Reviews from "./Reviews";

const Movie = () => {
    const {id} = useParams();
 
    const [movieData, setMovieData] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [reviewClicked, setReviewClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);

        const fetchMovieData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/oneMovie/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMovieData(data);
            } catch(error) {
                console.error("Error fetching movie data:", error);
            }
        };
        fetchMovieData();
    }, [id]);

    // Function to generate star icons based on the average rating
    const renderStars = (averageRating) => {
        const stars = [];
        const filledStars = Math.round(averageRating);

        for (let i = 0; i < filledStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill" style={{ marginRight: '20px' }}></i>);
        }

        const emptyStars = 5 - filledStars;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="bi bi-star" style={{ marginRight: '20px' }}></i>);
        }

        return stars;
    };

    const handleSignInClick = () => {
        if (!loggedIn) {
            navigate('/signup');
        }
        else{
            setReviewClicked(true)
        }
    };

    return (
        <div>
            <div>
                {movieData ? (
                    <>         
                    <div className="moviePage">
                            <div className="posterAndDetail">
                                <h1 className="movieTitle">{movieData.title}</h1>
                                <div className="movieDetails">
                                    
                                    <img src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`} className="moviePic" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w300/${movieData.backdrop_path})`}} alt={movieData.title} />
                                    <p className="movieDescription">{movieData.overview}</p>
                                    <h4 className="released">{movieData.release_date}</h4>
                                    
                                </div>
                                <p className="stars">{renderStars(movieData.vote_average)}</p> 
                            </div>
                            
                    
                        <button onClick={handleSignInClick}>
                            {loggedIn ? "Write a Review" : "Sign in to Review"}
                        </button>
                        {reviewClicked && <Review movieTitle={movieData.title} />}
{/* Will see what reviews are left for the movie, if signed in user has already left a review they can edit their review 

if admin 
*/}
                        <div className="display">
                            {movieData.actors.map((actor, index) => (
                                <div key={index} className="actorCards">
                                    <Actor key={actor.id} actor={actor} />
                                </div>
                            ))}
                        </div>    
                    </div>   
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Movie;