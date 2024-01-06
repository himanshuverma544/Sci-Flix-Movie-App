import { Outlet, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { Container } from "reactstrap";
import { HiOutlineHome } from "react-icons/hi2";

import { HOME, MOVIES, AUTHENTICATION, DEFAULT_USER } from "../constants";

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
                  <NavLink to={HOME.pathname}>{HOME.title}</NavLink>
                </li>
                <li>
                  <NavLink to={MOVIES.pathname}>{MOVIES.title}</NavLink>
                </li>
                <li>
                  <NavLink to={AUTHENTICATION.pathname}>
                    {signedInUser === DEFAULT_USER.username ? AUTHENTICATION.signInTitle : AUTHENTICATION.signOutTitle}
                  </NavLink>
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