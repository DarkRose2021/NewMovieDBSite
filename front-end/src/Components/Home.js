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
      console.log("Going for data");
     const response = fetch("http://localhost:8080/allMovies");
      
     console.log("Data fetching")
     if (!response.ok) {
      console.log("Response was ill")
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("awiating data")
     const data = await response.json();
      //////////////////Debuging from ChatGPT/////////////////////
      console.log("Full response:", response);
     console.log("Data recieved: ", data)
     
     console.log("Checking if right form")
     if (Array.isArray(data)) {
      console.log("It is")
      setMovieDetails(data);
    } else {
      console.log("it isnt")
      console.error("Invalid data format received from API.");
    }
    }
    catch(err){
      console.error("Error catching from api:", err)

    


      if (err instanceof Error) {
        console.log("Response status:", err.message.split(":")[1].trim());
      }
    }
  };
  fetching();
  }, []);


  return (
    <div className='movieCard'>
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
  )
}

export default Home
//Page where the information about the website is housed 
    //Maybe a carasel of the most recent movies to be reviewed? 