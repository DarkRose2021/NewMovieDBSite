//search bar  and its functionality with the back end

// 				BAck end 
// app.get("/searchByGenre/:genre", async (req, res) => {
// 	let genre = req.params.genre;
// 	let encodedString = encodeURIComponent(genre);
// 	const genreJson = await fetchGenres();
// 	genreMapping = genreJson.genres.reduce((acc, genre) => {
// 		acc[genre.id] = genre.name;
// 		return acc;
// 	});
// 	let searchedGenre = await searchGenres(encodedString);
// 	res.json(searchedGenre);
// });

// // Finished
// app.get("/searchByActor/:actor", async (req, res) => {
// 	let actor = req.params.actor;
// 	let encodedString = encodeURIComponent(actor);
// 	const genreJson = await fetchGenres();
// 	genreMapping = genreJson.genres.reduce((acc, genre) => {
// 		acc[genre.id] = genre.name;
// 		return acc;
// 	});
// 	let searchedPerson = await searchActors(encodedString);
// 	const actorsWithDetails = await updateActorMovieDetails(
// 		searchedPerson,
// 		genreMapping
// 	);
// 	res.json(actorsWithDetails);
// });



import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [actorList, setActorList] = useState([]);

  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value);
    try {
      const response = await fetch(`http://localhost:8080/searchByTitle/${event.target.value}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Search results:", data);
      if (data && data.length > 0) {
        setMovieList(data);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  }
  
  return (
    <div>
      <input 
        className="searchBar"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      
      <div className="movieCards">
        {movieList.length > 0 && (
          <ul>
            {movieList.map(movie => (
              <li key={movie.id}>
				<img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
				<br />
				{movie.title}
			  </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;