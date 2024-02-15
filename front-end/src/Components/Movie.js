//all the information that is gotten from the api with a button that lets you leave a review if your signed in
import React, { useEffect, useState } from "react";
import Actor from "./Actor";
import { useParams } from "react-router-dom";
import { Carousel } from 'react-bootstrap';

const Movie = () => {
    const {id} = useParams();
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

    const [movieData, setMovieData] = useState(null);
    
    useEffect(() => {
        // console.log('Props in Movie component:', id);
        const fetchMovieData = async () => {
            try{
                //console.log("Got Data")
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
                    //console.log("Data Recieved");
                    if (data && typeof data === 'object') {
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
       // console.log("Got data: ", movieData)
    }, [id]);


//*********************************************************
    //Render Stars function generated from chatGPT

        // Function to generate star icons based on the average rating
        const renderStars = (averageRating) => {
            const stars = [];
            const filledStars = Math.round(averageRating);
        
            for (let i = 0; i < filledStars; i++) {
                stars.push(<i key={i} className="bi bi-star-fill"></i>);
            }
        
            const emptyStars = 5 - filledStars;
            for (let i = 0; i < emptyStars; i++) {
                stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
            }
        
            return stars;
        };
        
        
                
//******************************************************************** */

  


	return (
    <div>
       {/* //Movie discription 
        //Genre 
        //Actors  */}
       
       
       <div>
        {movieData ? (
            <>
                <h1>{movieData.title}</h1>

                <img src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`} className="moviePic" alt={movieData.title} />
                <p className="movieDescription">{movieData.description}</p>
                <h4>Released: {movieData.release_date}</h4>
                <p>{renderStars(movieData.vote_average)}</p> 
                
                {movieData.actors.map((actor, index) => (
                    <div key={index} >
                        <Actor key={actor.id} actor={actor} />

                    </div>
                ))}
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
{/*        
        //amount of stars : renderStars()
        //if signed in button to write a review as long as they havent written one for that movie before
        //if not have button that takes takes to sign up form */}
        
        
    </div>
    );
};

export default Movie;
