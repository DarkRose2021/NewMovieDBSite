import React, { useEffect, useState } from 'react'

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
     const response = fetch("http://localhost:8080/allMovies");
     
     if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

     const data = (await response).json();
     console.log("Data recieved: ", data)
     
     setMovieDetails(data); 
    }
    catch(err){
      console.error("Error catching from api:", err)
    }
  };
  fetching();
  }, []);


  return (
    <div className='movieCard'>
    <div className="movie">
      <img src="..." className="moviePic" alt="Movie Title"/>
      <div className="card-body">
        <h5 className="movieTitle">Movie Title</h5>
        <p className="movieDescription">Description of the movie</p>
      </div>
    </div>



    </div>
  )
}

export default Home
//Page where the information about the website is housed 
    //Maybe a carasel of the most recent movies to be reviewed? 