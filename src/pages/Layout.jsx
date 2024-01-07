import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container } from "reactstrap";

import { HiOutlineHome } from "react-icons/hi2";
import { BiCameraMovie } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

import { ToastContainer } from "react-toastify";

import SmartNavLink from "../components/SmartNavLink";

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
                  <SmartNavLink
                    path={HOME.pathname}
                    icon={<HiOutlineHome/>}
                    title={HOME.title}
                  />
                </li>
                <li>
                  <SmartNavLink
                    path={MOVIES.pathname}
                    icon={<BiCameraMovie/>}
                    title={MOVIES.title}
                  />
                </li>
                <li>
                  <SmartNavLink 
                    path={AUTHENTICATION.pathname}
                    icon={<FiUser/>}
                    title={ signedInUser === DEFAULT_USER.username ? 
                      AUTHENTICATION.signInTitle : 
                      AUTHENTICATION.signOutTitle
                    }
                  />
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