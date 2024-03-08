import React, { useEffect, useState } from 'react'
import Search from './Search';
import { Link } from 'react-router-dom';

const Home = () => {

const [movieDetails, setMovieDetails] = useState([]);


useEffect(() => {
  const fetching = async () => {
    try{
      // console.log("Going for data");
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
        // console.log("Data received: ", data);
        if (Array.isArray(data)) {
          setMovieDetails(data);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    } catch (error) {
      console.error("Error outside of the fetch:", error);
    }
  };
  fetching();
  }, []); //only runs 1 time 


  return (
    <>
      <Search />
      <div className='movieCards'>
        {/* Maps over all the movies in the array and displays information for each */}
        {movieDetails.map((movie) => (
        <Link to={`/movie/${movie.id}`}key={movie.id} className='movieLink'>
          <div className="movieCard">
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} className="moviePoster" alt={movie.title} />
            <div className="card-body">
              <h5 className="movieTitle">{movie.title}</h5>
              <p className="movieReleased">Released: {movie.release_date}</p>
              <h5>Genres: <br/> {movie.genres.filter(genre => genre !== null).join(', ')}</h5>
            </div>
          </div>
          </Link>
        ))}
      </div>
  </>
  )
}

export default Home
//Page where the information about the website is housed 
    //Maybe a carasel of the most recent movies to be reviewed? 