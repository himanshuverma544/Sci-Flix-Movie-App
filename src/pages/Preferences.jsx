import { Container, Row, Col, Button } from "reactstrap";
import { toast } from "react-toastify";

import { useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../redux/slices/usersMovies";

import { useQuery } from "react-query";

import Modals from "../components/Modals";
import VerticalSpacer from "../components/VerticalSpacer";
import { fetchMovies, setUsersDataLocally } from "../utils/functions";
import { DEFAULT_USER } from "../utils/constants";


const Preferences = () => {

  const userMovieDispatch = useDispatch();

  const { users: existingUsers, signedInUser } = useSelector(state => state.usersReducer);

  const { 
    data: moviesData, 
    isSuccess 
  } = 
  useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  });

  const movies = useSelector(state => state.usersMoviesReducer[signedInUser] ?? []); 


  useEffect(() => {

    function storeUsersLocally() {

      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
    storeUsersLocally();

  }, [existingUsers]);


  useEffect(() => {
    
    async function loadMoviesInRedux() {
      
      const userMoviesLocal = localStorage.getItem(signedInUser);

      userMovieDispatch(
        loadMovies({
          username: signedInUser,
          movies: userMoviesLocal ? JSON.parse(userMoviesLocal) : (isSuccess ? moviesData : [])
        })
      );
    }
      
    loadMoviesInRedux();
      
  }, [signedInUser, isSuccess, moviesData, userMovieDispatch]);
    

  const isSignedInUser = useCallback(() => signedInUser !== DEFAULT_USER.username, [signedInUser]);

  useEffect(() => {
    if (isSignedInUser()) {
      setUsersDataLocally(signedInUser, movies);
    }
  }, [signedInUser, movies, isSignedInUser]);


  /* Regenerate Movies */

  const regenerateMovies = useCallback(async () => {

    if (isSignedInUser()) {
      userMovieDispatch(
        loadMovies({
          username: signedInUser,
          movies: moviesData
        })
      );
      toast("Regenerated Movies", { type: "success" });
    }

  }, [signedInUser, moviesData, isSignedInUser, userMovieDispatch]);


  return (
    <>
      <section>
        <VerticalSpacer p="3" m="2"/>
      </section>

      <section>
        <Container>
          <Modals moviesToGrid={movies}/>
          <Row className="mt-4">
            <Col className="regenerate-col">
              <Button 
                className="regenerate-btn btn-bg-color" 
                block 
                onClick={regenerateMovies}
              >
                Regenerate Movies
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <VerticalSpacer p="3" m="2"/>
      </section>
    </>
  );
}

export default Preferences;