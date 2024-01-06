import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import MoviesList from './pages/MoviesList';
import NoPage from './pages/NoPage';
import Authentication from './pages/Authentication';

import { HOME, MOVIES, AUTHENTICATION, PAGE404 } from './constants';


function App() {
  return (
    <HashRouter basename=''>
      <Routes>
        <Route path={HOME.pathname} element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path={MOVIES.pathname} element={<MoviesList/>}/>
          <Route path={AUTHENTICATION.pathname} element={<Authentication/>}/>
          <Route path={PAGE404.pathname} element={<NoPage/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
