import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import { HiOutlineHome } from "react-icons/hi2";
import { LiaHeart } from "react-icons/lia";
import { FiUser } from "react-icons/fi";

import { ToastContainer } from "react-toastify";

import SmartNavLink from "../components/SmartNavLink";

import { HOME, PREFERENCES, AUTHENTICATION, DEFAULT_USER } from "../utils/constants";


const Layout = () => {

  const { signedInUser } = useSelector(state => state.usersReducer);

  return (
    <>
      <header>
        <nav className="movie-app-navbar">
          <ul>
            <SmartNavLink
              path={HOME.pathname}
              icon={<HiOutlineHome className="home-icon"/>}
              title={HOME.title}
            />    
            <SmartNavLink
              path={PREFERENCES.pathname}
              icon={<LiaHeart className="preferences-icon"/>}
              title={PREFERENCES.title}
            />
            <SmartNavLink 
              path={AUTHENTICATION.pathname}
              icon={<FiUser className="auth-icon"/>}
              title={ signedInUser === DEFAULT_USER.username ? 
                AUTHENTICATION.signInTitle : 
                AUTHENTICATION.signOutTitle
              }
            />             
          </ul>
        </nav>
      </header>

      <main>
        <Outlet/>
        <ToastContainer position="bottom-left"/>
      </main>
    
      <footer>
        Popular Science Fiction Movies
      </footer>
    </>
  );
}

export default Layout;