import { Container, Row, Col, Button } from "reactstrap";
import { toast } from "react-toastify";

import { useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadMoviesInitially } from "../redux/usersMovies";

import { DEFAULT_USER } from "../constants";
import { fetchMovies, setUsersDataLocally } from "../customFunctions";

import MoviesGridView from "../components/MoviesGridView";


const Home = () => {

  const userMovieDispatch = useDispatch();

  const { users: existingUsers, signedInUser } = useSelector(state => state.usersReducer);
  const movies = useSelector(state => state.usersMoviesReducer[signedInUser] ?? []);


  useEffect(() => {

    function storeUsersLocally() {

      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
    storeUsersLocally();

  }, [existingUsers]);


  useEffect(() => {   

    async function loadingMoviesInitially() {

      const userMoviesLocal = localStorage.getItem(signedInUser);
    
      userMovieDispatch(
        loadMoviesInitially({
          username: signedInUser,
          movies: userMoviesLocal ? JSON.parse(userMoviesLocal) : await fetchMovies() 
        })
      );
    }

    loadingMoviesInitially();

  }, [signedInUser, userMovieDispatch]);
 

  useEffect(() => {
      setUsersDataLocally(signedInUser, movies);
  }, [signedInUser, movies]);


  /* Regenerate Movies */

  const regenerateMovies = useCallback(async () => {

    if (signedInUser !== DEFAULT_USER.username) {
      userMovieDispatch(
        loadMoviesInitially({
          username: signedInUser,
          movies: await fetchMovies()
        })
      );
      toast("Regenerated Movies", { type: "success" });
    }

  }, [signedInUser, userMovieDispatch]);


  return (
    <Container>
      <MoviesGridView movies={movies}/>
        <Row>
          <Col className="regenerate-col">
            <Button className="regenerate-btn btn-bg-color mb-4" onClick={regenerateMovies}>
              Regenerate Movies
            </Button>
          </Col>
        </Row>
    </Container>
  );
}

export default Home;