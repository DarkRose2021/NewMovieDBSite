//search bar  and its functionality with the back end
import React, {useState} from "react";

const Search = () => {

	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	}
	
	const handleSearch =()=> {
		//go to backend and search db for whatever they put in
		console.log("Searching for ", searchTerm) 
	}

	return (
	<div >
		<input 
			className="searchBar"
			type="search"
			 placeholder="Search"
			 value={searchTerm}
			 onChange={handleInputChange}
			 />
		<button className="searchButon" onClick={handleSearch}>Search</button>
	</div>
	
	
	);
};

export default Search;
