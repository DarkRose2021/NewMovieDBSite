import React, { useState } from "react";
import "../App.scss";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Home from "./Home";
import Search from "./Search";

const NavBar = ({ siteName, contentComponent }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const openNav = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<>
			<div id="mySidebar" className={`sidebar ${sidebarOpen ? "open" : ""}`}>
				<a href="/login">Login</a>
				<a href="/signup">Sign Up</a>
				<a href="/movie">Movie</a>
			</div>

			<Navbar className="">
				<Container>
					<Navbar.Brand
						className="openbtn"
						onClick={openNav}>
						<div>
							{sidebarOpen ? (
								<i className="bi bi-x-lg h2"></i>
									) : (
								<i className="bi bi-list h2"></i>
									)}
							</div>
					</Navbar.Brand>
					
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-between">
						<Navbar.Text className="mx-auto">
							<h2>{siteName}</h2>
						</Navbar.Text>
						{/* why in the nav? the search bar doesn't need to be on all the pages -Katie */}
						<Search />

						<Navbar.Text>
							{/* Change to a toggle to show login   signup when not logged in */}
							<i className="bi bi-person-circle h1"></i>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<div id="main">
				{/* Content */}
				{contentComponent}
			</div>
		</>
	);
};

export default NavBar;
