import { 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  ButtonGroup, 
  Button 
} 
from "reactstrap";

import { useLocation } from "react-router-dom";

import { formatDate } from "../functions";

import { HOME, MOVIES } from "../constants";


const MoviesGridView = 
  ({
    signedInUser,
    moviesToGrid, 
    getMovieImage, 
    getMovieTrailerUrl, 
    getMovieReqDescDetails, 
    getMovieReqRatingDetails, 
    getMovieReqDeletingDetails, 
    getMovieCommentsReqDetails
  }) => {
  
  const { pathname } = useLocation();

  return (
    <>
      <Row className="gy-4">
      { moviesToGrid.map(movie => (
        <Col className="movies-card-col gx-0" key={movie.id} sm={6} md={4}>
          <Card className="movie-card">
            <div 
              className="movie-img-container"
              onClick={() => getMovieImage({
                url: movie.thumbnail,
                alt: movie.name
              })}
            >
              <img src={movie.thumbnail} alt={movie.name}/>
            </div>
            <CardBody className="movie-card-body">
              <CardTitle className="movie-name">
                {movie.name}
              </CardTitle>
              <CardText className="movie-rating">
                Rating: {movie.rating}
              </CardText>
              <CardText className="movie-release-date">
                Released On: {formatDate(movie.release_date)}
              </CardText>
              <div className="btns-container">
                <Button 
                  className="watch-trailer-btn" 
                  block
                  color="dark"
                  onClick={() => getMovieTrailerUrl(movie.trailer_link)}
                >
                  Watch Trailer
                </Button>
                <Button
                  className="read-desc-btn mt-2" 
                  block
                  color="dark"
                  onClick={() => getMovieReqDescDetails({
                    name: movie.name,
                    description: movie.description
                  })}
                >
                  Read Description
                </Button>
                { pathname === MOVIES.pathname &&
                <Button 
                  className="comment-btn mt-2" 
                  block
                  color="dark"
                  onClick={() => getMovieCommentsReqDetails({
                    signedInUser,
                    movieName: movie.name,
                  })}
                >
                  Comment
                </Button>
                }
                { pathname === HOME.pathname && 
                  <div className="btn-gp mt-2">
                    <Button 
                      className="edit-rating-btn" 
                      color="dark"
                      onClick={event => getMovieReqRatingDetails(event, {
                        signedInUser,
                        id: movie.id,
                        name: movie.name,
                        rating: movie.rating,
                      })}
                    >
                      Rate
                    </Button>
                    <Button 
                      className="del-btn" 
                      color="dark"
                      onClick={event => getMovieReqDeletingDetails(event, {
                        signedInUser,
                        id: movie.id,
                        name: movie.name,
                      })}
                    >
                      Delete
                    </Button>
                  </div>
                } 
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  </>
  );
}

export default MoviesGridView;