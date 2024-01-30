import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import Page404 from './pages/Page404';
import Authentication from './pages/Authentication';

import { HOME, PREFERENCES, AUTHENTICATION, PAGE404 } from './constants';


function App() {
  return (
    <HashRouter basename=''>
      <Routes>
        <Route path={HOME.pathname} element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path={PREFERENCES.pathname} element={<Preferences/>}/>
          <Route path={AUTHENTICATION.pathname} element={<Authentication/>}/>
          <Route path={PAGE404.pathname} element={<Page404/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
