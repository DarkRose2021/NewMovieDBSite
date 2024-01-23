//search bar  and its functionality with the back end
import React, {useState} from "react";

const Search = () => {

	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	}

	return (
	<div className="searchBar">
		<input 
			type="text"
			 placeholder="Search"/>
			 value={searchTerm}
			 onChange={handleInputChange}
		<button className="searchButon">Search</button>
	</div>
	
	
	);
};

export default Search;
