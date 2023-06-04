import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import MoviesList from './pages/MoviesList';
import NoPage from './pages/NoPage';
import SignInSignUp from './pages/SignInSignUp';

function App() {
  return (
    <HashRouter basename=''>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="all-movies-list" element={<MoviesList/>}/>
          <Route path="sign-in-sign-up" element={<SignInSignUp/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
