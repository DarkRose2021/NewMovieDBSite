import React, { useEffect, useState } from 'react'
import Search from './Search';

const Home = () => {
  //api call: `http://localhost:8080/allMovies
  //that will return an array of json objects
  //json format:
//   {
//     "title": "Lift",
//     "id": 955916,
//     "poster_path": "/gma8o1jWa6m0K1iJ9TzHIiFyTtI.jpg",
//     "vote_average": 3,
//     "release_date": "2024-01-10",
        //show only the first one
//     "genres": [
//         "Action",
//         "Comedy",
//         "Crime"
//     ],
        //Don't show on screen for searching purposes
//     "actors": [
          //array of names
//     ]
// }

const [movieDetails, setMovieDetails] = useState('');


useEffect(() => {
  const fetching = async () => {
    try{
      console.log("Going for data");
      fetch("http://localhost:8080/allMovies", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Data received: ", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    } catch (error) {
      console.error("Error outside of the fetch:", error);
    }
  };
  fetching();
  }, []);


  return (
   <div>
    <Search />

   
    <div className='movieCard'>
      {/* //maps over all the movies that are in array then it displays the information  */}
      {movieDetails.localeCompare((movie) => {
        <div className="movie" key={movie.id}>
              <img src={`http://example.com/${movie.poster_path}`} className="moviePic" alt={movie.tittle}/>
         
          <div className="card-body">
              <h5 className="movieTitle">Movie Title: {movie.tittle}</h5>
              <p className="movieDescription">Movie Release Date: {movie.release.date}</p>
          </div>

        </div>


      })}
    </div> 
  </div>
  )
}

export default Home
//Page where the information about the website is housed 
    //Maybe a carasel of the most recent movies to be reviewed? 