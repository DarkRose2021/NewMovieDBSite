//all the information that is gotten from the api with a button that lets you leave a review if your signed in
import React, { useEffect, useState } from "react";

const Movie = ({id}) => {
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
    useEffect(() => {
        console.log('Props in Movie component:', id);
        const fetchMovieData = async () => {
            try{
                console.log("Got Data")
                fetch(`http://localhost:8080/oneMovie/${id}`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                })
                .then((resp)=> {
                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                      }
                      return resp.json();
                })
                .then((data) => {
                    console.log("Data Recieved");
                    if (Array.isArray(data)) {
                           setMovieData(data);
                      } else {
                        console.error("Invalid data format received:", data);
                      }
                })
                .catch((error) => {
                    console.error("Error fetching: ", error);
                })
            }
            catch(error){
                console.error("Error outside of fetch: ", error)
            }
        };
        fetchMovieData();
        console.log("Got data: ", movieData)
    }, [id]);


//*********************************************************
    //Render Stars function generated from chatGPT

        // Function to generate star icons based on the average rating
        const renderStars = (averageRating) => {
            const stars = [];
            const filledStars = Math.floor(averageRating / 2);
            const hasHalfStar = averageRating % 2 !== 0;

            for (let i = 0; i < filledStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill"></i>);
            }

            if (hasHalfStar) {
            stars.push(<i key="half" className="bi bi-star-half"></i>);
            }

            const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
            }

            return stars;
        };
//******************************************************************** */

  


	return (
    <div>
        <img src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`} className="moviePic" alt={id.title} />
       //Movie Poster 
       //Movie discription 
        //Genre 
        //Actors 
        //amount of stars : renderStars()
        //if signed in button to write a review as long as they havent written one for that movie before
        //if not have button that takes takes to sign up form
        
        
    </div>
    );
};

export default Movie;
