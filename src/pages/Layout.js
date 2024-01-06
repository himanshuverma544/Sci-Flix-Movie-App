import { Outlet, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { DEFAULT_USER, SIGN_IN, SIGN_OUT } from "../constants";

import { HiOutlineHome } from "react-icons/hi2";
import { Container } from "reactstrap";


const Layout = () => {

  const { signedInUser } = useSelector(state => state.usersReducer);

  return (
    <>
      <Container className="master-cont gx-0" fluid>
        <Container className="header-cont gx-0" fluid>
          <header>
            <nav className="movie-app-navbar">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/all-movies-list">All Movies List</NavLink>
                </li>
                <li>
                  <NavLink to="/authentication">{signedInUser === DEFAULT_USER.username ? `${SIGN_IN}` : SIGN_OUT}</NavLink>
                </li>
              </ul>
            </nav>
          </header>
        </Container>

        <Container className="main-cont my-5">
          <main>
            <Outlet/>
          </main>
          <ToastContainer position="bottom-left"/>
        </Container>
        
        <Container className="footer-cont gx-0" fluid>
          <footer>
            Popular Science Fiction Movies
          </footer>
        </Container>
      </Container>
    </>
  )
}

export default Layout;