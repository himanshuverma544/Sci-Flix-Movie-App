import { Outlet, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { DEFAULT_USER, SIGN_IN, SIGN_UP, SIGN_OUT } from "../constants";


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
            <NavLink to="/sign-in-sign-up">{signedInUser === DEFAULT_USER.username ? `${SIGN_IN} or ${SIGN_UP}` : SIGN_OUT}</NavLink>
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