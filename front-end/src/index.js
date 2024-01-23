import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';
import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

const url = "http://localhost:8080"

const router = createBrowserRouter([
  {
    //Home page 
    path:'/',
    element: <>
      <NavBar />
      <Home />
    </>
  },
  {
    //Login 
    path:"/login",
    element: <>
      <NavBar />
      <Login />
    </>

  },
  {
    //Signup
    path: "/signup",
    element: <>
      <NavBar />
      <SignUp />
    </>
  },

])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/>   */}
    <NavBar />
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
