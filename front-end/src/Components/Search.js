import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategory, setSearchCategory] = useState('Movie'); 

  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value);
    try {
      let endpoint;
      switch (searchCategory) {
        case 'Movie':
          endpoint = 'searchByTitle';
          break;
        case 'Actor':
          endpoint = 'searchByActor';
          break;
        case 'Genre':
          endpoint = 'searchByGenre';
          break;
        default:
          endpoint = 'searchByTitle';
      }
      const response = await fetch(`http://localhost:8080/${endpoint}/${event.target.value}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  }

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchResults([]); // Clear search results when changing category
  };

  const renderMovieResults = () => (
    <div className="movieResults">
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
              <br />
              <h1 className="movieTitle">{movie.title}</h1>	
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderActorResults = () => (
    <div className="actorResults">
      <ul>
        {searchResults.map(actor => (
          <li key={actor.id}>
              
              <h1 className="actorName">{actor.name}</h1>	
			  <h3>Known For:</h3>
			  <ul> 
			  {actor.known_for.slice(0, 3).map(movie => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    {movie.movie_name}
                  </Link>
                </li>
              ))}
			  </ul>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderGenreResults = () => (
    <div className="genreResults">
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
              <br />
              <h1 className="movieTitle">{movie.title}</h1>	
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {searchCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleCategoryChange('Movie')}>Movie</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Actor')}>Actor</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Genre')}>Genre</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <input 
        className="searchBar"
        type="search"
        placeholder={`${searchCategory} Search`} 
        value={searchTerm}
        onChange={handleInputChange}
      />
      
      {searchCategory === 'Movie' && renderMovieResults()}
      {searchCategory === 'Actor' && renderActorResults()}
      {searchCategory === 'Genre' && renderGenreResults()}
    </div>
  );
};

export default Search;
