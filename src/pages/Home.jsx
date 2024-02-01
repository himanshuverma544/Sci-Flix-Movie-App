import { 
  Container,
  Row, 
  Col, 
  Form, 
  FormGroup, 
  InputGroup, 
  Input, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem, 
  Button
} 
from "reactstrap";

import { AiOutlineSearch } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";

import { useState, useEffect, useCallback } from "react";

import { useQuery } from "react-query";

import TheCarousel from "../components/TheCarousel";
import VerticalSpacer from "../components/VerticalSpacer";
import Modals from "../components/Modals";

import { fetchMovies } from "../utils/functions";

import { 
  DEFAULT_DROPDOWN_TOGGLE_TEXT, 
  SORT_OPTIONS, 
  DEFAULT_TEXT_COLOR, 
  PLACEHOLDER_TEXT_COLOR 
} 
from "../utils/constants";


const Home = () => {

  const { 
    data: movies, 
    isSuccess 
  } = 
  useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  });


  const [sortedMovies, setSortedMovies] = useState([]);

  const [dropdown, setDropdown] = useState({
    toggleText: DEFAULT_DROPDOWN_TOGGLE_TEXT,
    openStatus: false
  });

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

  const toggleOpenStatus = useCallback(() =>
    setDropdown(prev => {
      return {...prev, openStatus: !prev.openStatus}
    })
  , []);

  const selectedDropdownItem = useCallback(sortByTitle => 
    setDropdown(prev => {
      return {...prev, toggleText: sortByTitle}
    })
  , []);

  const handleSortBy = useCallback((sortByTitle, sortByValue) => {
    selectedDropdownItem(sortByTitle);
    setSortedMovies(prev => [...prev].sort((a, b) =>
      a[sortByValue] < b[sortByValue] ? -1 : (a[sortByValue] > b[sortByValue] ? 1 : 0)
    ));
  }
  , [selectedDropdownItem]);


  const handleSearch = useCallback(searchedKeyword => {

    const matchedMovies = movies.filter(
      movie => movie.name.toLowerCase().includes(searchedKeyword) 
            || movie.description.toLowerCase().includes(searchedKeyword)
    );

    setSortedMovies(matchedMovies);

  }, [movies]);


  return (
    <>
      <section>
        <Container className="gx-0" fluid> 
          <Row className="gx-0">
            <Col>
              <TheCarousel items={isSuccess ? movies : []}/>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <VerticalSpacer p="3" m="2"/>
      </section>

      <section>
        <Container className="gx-0">
          <Row>
            <Col sm={6}>
              <Form className="search-movies-filter" onClick={event => event.preventDefault()}>
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
              </Form>
            </Col>
            <Col sm={6}>
              <Form className="sort-by-filter">
                <FormGroup className="sort-by-group">
                  <InputGroup className="select-input-group">
                    <Dropdown isOpen={dropdown.openStatus} toggle={toggleOpenStatus}>
                      <DropdownToggle 
                        className="sort-by-dropdown" 
                        style={{ 
                          color: (DEFAULT_DROPDOWN_TOGGLE_TEXT === dropdown.toggleText) ?
                          PLACEHOLDER_TEXT_COLOR : 
                          DEFAULT_TEXT_COLOR
                        }} 
                        caret
                      >
                        {dropdown.toggleText}
                      </DropdownToggle>
                      <DropdownMenu className="sort-by-dropdown-menu">
                        {SORT_OPTIONS.map((option, index) => (
                          <DropdownItem 
                            key={index} 
                            className="py-2" 
                            onClick={event => 
                              handleSortBy(event.target.innerText, option.value)
                            }
                          >
                            {option.title}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
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
          <Modals moviesToGrid={sortedMovies}/>
        </Container>
      </section>

      <section>
        <VerticalSpacer p="3" m="2"/>
      </section>
    </>
  );
}

export default Home;