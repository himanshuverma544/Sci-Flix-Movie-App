import { Outlet, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { DEFAULT_USER } from "../constants";


const Layout = () => {

  const { signedInUser } = useSelector(state => state.usersReducer);

  return (
    <>
      <nav className="movie-app-navbar mb-4">
        <ul className="d-flex justify-content-evenly">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-movies-list">All Movies List</NavLink>
          </li>
          <li>
            <NavLink to="/sign-in-sign-up">{signedInUser === DEFAULT_USER.username ? "Sign In or Sign Up" : "Sign Out"}</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet/>
      <ToastContainer position="bottom-left"/>
      
      <footer>Popular Science Fiction Movies</footer>
    </>
  )
}

export default Layout;