import { Container, Row, Col, Form, FormGroup, Input, Button, InputGroup, Label } from "reactstrap";
import Select from "react-select";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";

import { useState, useEffect, useCallback } from "react";

import { useQuery } from "react-query";

import { SORT_OPTIONS } from "../constants";
import { fetchMovies } from "../customFunctions";

import MoviesGridView from"../components/MoviesGridView";


const MoviesList = () => {
  

  const { 
    data: movies, 
    isSuccess 
  } = 
  useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  });
  
  const [sortedMovies, setSortedMovies] = useState([]);


  useEffect(() => {

    if (isSuccess) {
      
      function loadMoviesInitially() {
        setSortedMovies(movies);
      }
      loadMoviesInitially();
    }
  }, [isSuccess, movies]);


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