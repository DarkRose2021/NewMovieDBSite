//all the information that is gotten from the api with a button that lets you leave a review if your signed in
import React, { useEffect, useState } from "react";

const Movie = () => {
    //api call: `http://localhost:8080/oneMovie/${movieID}`
    //returns:
    // {
    //     "title": "Lift",
    //     "id": 955916,
    //     "poster_path": "/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg",
    //     "vote_average": 3,
    //     "release_date": "2024-01-10",
    //     "actors": [
    //         array of names
    //     ]
    // }


    //get stuff back from api 
    //put it in variables 
    //display the information

    //filled star : <i class="bi bi-star-fill"></i>

    //empty star : <i class="bi bi-star"></i>

    //partical star : <i class="bi bi-star-half"></i>



//!!!!!!!!!!!!******************************
//        Different ways to get movie id
//              Click on the movie card 
//              search for specific movie 
//
    const [movieData, setMovieData] = useState(null);
    const [movieID, seetMovieID] = useState();

    useEffect(() => {
        const fetchMovieData = async () => {
            try{
                const response = await fetch(`http:localhost:8080/oneMovie/${movieID}`);
                const data = await response.json();
                setMovieData(data);
            }
            catch(err){
                console.error("Error fetching movie data: ", err)
            }
        };
        fetchMovieData();
    }, [movieID]);


	return (
    <div>
        {movieData ? (
            <img src=""
        )}    
        
        
        
    </div>
    );
};

export default Movie;
