import React from 'react'

const Sidebar = () => {
    //Might want to move to app.js, I can explain next time i see you or class
  return (
    <div>
        {/* Change later, just placeholders for now */}
        <div id="mySidebar" class="sidebar">
			<a href="#">About</a>
			<a href="#">Services</a>
			<a href="#">Clients</a>
			<a href="#">Contact</a>
		</div>

        {/* Might have to move to the nav component? idk tho */}
    </div>
  )
}

export default Sidebar