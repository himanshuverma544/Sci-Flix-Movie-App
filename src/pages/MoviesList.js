import { Container, Row, Col, Form, FormGroup, Input, Button, InputGroup, Label } from "reactstrap";
import Select from "react-select";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";

import { useState, useEffect, useCallback, useMemo } from "react";

import { useSelector } from "react-redux";

import { DEFAULT_USER, SORT_OPTIONS } from "../constants";
import { fetchMovies, setUsersDataLocally } from "../customFunctions";

import MoviesGridView from"../components/MoviesGridView";


const MoviesList = () => {

  let defaultUserMoviesLocal = useMemo(() => localStorage.getItem(DEFAULT_USER.username), []); 

  const movies = useSelector(state => {
    return state.usersMoviesReducer[DEFAULT_USER.username].length 
    ? state.usersMoviesReducer[DEFAULT_USER.username] 
    : (defaultUserMoviesLocal ? JSON.parse(defaultUserMoviesLocal) : []);
  });

  const [sortedMovies, setSortedMovies] = useState(movies);


  useEffect(() => {

    if (!movies.length) {
      async function loadingMoviesInitially() {
        setSortedMovies(await fetchMovies());
      }
      loadingMoviesInitially();
    }
  }, [movies.length]);


  useEffect(() => {
    
    if (!defaultUserMoviesLocal) {
      setUsersDataLocally(DEFAULT_USER.username, sortedMovies);
    }
  }, [defaultUserMoviesLocal, sortedMovies]);


  const handleSortOrder = useCallback(() => 

    setSortedMovies(prev => [...prev].reverse())

  , []);


  const handleSortBy = useCallback(sortBy => 

    setSortedMovies(prev => [...prev].sort((a, b) =>
      a[sortBy] < b[sortBy] ? -1 : (a[sortBy] > b[sortBy] ? 1 : 0)
    ))

  , []);


  const handleSearch = useCallback(searchedKeyword => {

    const matchedMovies = movies.filter(
      movie => movie.name.toLowerCase().includes(searchedKeyword) 
            || movie.description.toLowerCase().includes(searchedKeyword)
    );

    setSortedMovies(matchedMovies);

  }, [movies]);


  return ( 
    <Container>
      <Row>
        <Col>
          <Form className="filter-container mt-4" onSubmit={event => event.preventDefault()}>
            <FormGroup className="search-movies-group">
              <InputGroup>
                <Input
                  id="search-movies"
                  name="search-movies"
                  type="text"
                  placeholder="Search Movies"
                  autoComplete="off"
                  onChange={event => handleSearch(event.target.value.toLowerCase())}
                />
                <Button className="search-movies-btn btn-bg-color" type="submit">
                  <AiOutlineSearch/>
                </Button>
              </InputGroup>
            </FormGroup>
            <FormGroup className="sort-by-group">
              <InputGroup className="select-input-group">
                <Label className="sort-by-label ">Sort By</Label>
                <Select
                  className="sort-by-select"
                  options={ SORT_OPTIONS }
                  onChange={event => handleSortBy(event.value)}
                />
              </InputGroup>
              <Button 
                className="sort-order-btn ms-3 btn-bg-color" 
                type="button"
                onClick={handleSortOrder}
              >
                <BiSortAlt2/>
              </Button>
            </FormGroup>            
          </Form>
        </Col>
      </Row>
      <MoviesGridView movies={sortedMovies}/>
    </Container>
  );
}

export default MoviesList;