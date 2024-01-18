import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";

import { useSelector } from "react-redux";

import ImageModal from "./modals/ImageModal";
import VideoModal from "./modals/VideoModal";
import DescriptionModal from "./modals/DescriptionModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import CommentsModal from "./modals/CommentsModal";

import { 
  DEFAULT_USER, 
  HOME, 
  MOVIES, 
  AUTHENTICATION
} 
from "../constants";

import { formatDate } from "../functions";


const MoviesGridView = ({movies}) => {


  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const { signedInUser } = useSelector(state => state.usersReducer);
  
  const [showImageModal, setShowImageModal] = useState(null);
  const imageModalImageNode = useRef(null);

  const [showVideoModal, setShowVideoModal] = useState(null);
  const videoModalMovieTrailerNode = useRef(null);

  const [showDescriptionModal, setShowDescriptionModal] = useState(null);
  const descriptionModalTextNode = useRef(null);

  const [showEditModal, setShowEditModal] = useState(null);
  const editModalRatingNode = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const deleteModalDeleteNode = useRef(null);

  const [showCommentsModal, setShowCommentsModal] = useState(null);
  const commentsModalCommentsNode = useRef(null);



    /* Utilities Functions */

    const navigateToAuthenticationPage = useCallback(() => {

      navigate(AUTHENTICATION.pathname);
      toast("You need to Sign In first to make changes", {type: "info"});
  
    }, [navigate]);
  
    const isClickedOutsideOfModal = useCallback((event, node) => {
      if (node.current && !node.current.contains(event.target)) {
        return true;
      }
      return false;
    }, []);
  
  
    /* Image Modal */
  
    const openImageModal = useCallback(movieImage => {
      setShowImageModal(movieImage);
    }, []);
  
    
    const closeImageModal = useCallback(event => {
      if (isClickedOutsideOfModal(event, imageModalImageNode)) {
        setShowImageModal(null);
      }
    }, [isClickedOutsideOfModal]);
  
  
    /* Video Modal */
  
    const openVideoModal = useCallback(movieTrailerUrl => {
      setShowVideoModal(movieTrailerUrl);
    }, []);
  

    const closeVideoModal = useCallback(event => {
      if (isClickedOutsideOfModal(event, videoModalMovieTrailerNode)) {
        setShowVideoModal(null);
      }
    }, [isClickedOutsideOfModal]);
    
  
    /* Description Modal */
  
    const openDescriptionModal = useCallback(movieReqDescDetails => {
      setShowDescriptionModal(movieReqDescDetails);
    }, []);
  

    const closeDescriptionModal = useCallback(event => {
      if (isClickedOutsideOfModal(event, descriptionModalTextNode)) {
        setShowDescriptionModal(null);
      }
    }, [isClickedOutsideOfModal]);
  
  
    /* Edit Modal */
  
    const openEditModal = useCallback((event, movieReqRatingDetails) => {
      event.stopPropagation();
  
      if (signedInUser !== DEFAULT_USER.username) {
        setShowEditModal(movieReqRatingDetails);
      }
      else {
        navigateToAuthenticationPage();
      }
    }, [signedInUser, navigateToAuthenticationPage]);
  

    const closeEditModal = useCallback((event = null) => {
  
      if(!event) {
        setShowEditModal(null);
      }
      else if (isClickedOutsideOfModal(event, editModalRatingNode)) {
        setShowEditModal(null);
      }
  
    }, [isClickedOutsideOfModal]);

  
    /* Delete Modal */
  
    const openDeleteModal = useCallback((event, movieReqDeletingDetails) => {
      event.stopPropagation();
  
      if (signedInUser !== DEFAULT_USER.username) {
        setShowDeleteModal(movieReqDeletingDetails);
      }
      else {
        navigateToAuthenticationPage();
      }
    }, [signedInUser, navigateToAuthenticationPage]);
  

    const closeDeleteModal = useCallback((event = null) => {
  
      if(!event) {
        setShowDeleteModal(null);
      }
      else if (isClickedOutsideOfModal(event, deleteModalDeleteNode)) {
        setShowDeleteModal(null);
      }
  
    }, [isClickedOutsideOfModal]);


    /* Comments Modal */
  
    const openCommentsModal = useCallback(commentsReqDetails => {  
      setShowCommentsModal(commentsReqDetails);
    }, []);
  
    const closeCommentsModal = useCallback(event => {
      if (isClickedOutsideOfModal(event, commentsModalCommentsNode)) {
        setShowCommentsModal(null);
      }
    }, [isClickedOutsideOfModal]);


  return (       
    movies.length ? 
      <>
        <Row className="gy-4">
          { movies.map(movie => (
            <Col className="movies-card-col gx-0" key={movie.id} sm={6} md={4}>
              <Card className="movie-card">
                <div 
                  className="movie-img-container"
                  onClick={() => openImageModal({
                    url: movie.thumbnail,
                    alt: movie.name
                  })}
                >
                  { pathname === HOME && 
                    <div className="actions-on-movie d-flex"> 
                      <AiOutlineEdit 
                        className="edit-movie me-2" 
                        onClick={event => openEditModal(event, {
                          signedInUser,
                          id: movie.id,
                          name: movie.name,
                          rating: movie.rating,
                        })}
                      />
                      <AiOutlineDelete 
                        className="delete-movie" 
                        onClick={event => openDeleteModal(event, {
                          signedInUser,
                          id: movie.id,
                          name: movie.name,
                        })}
                      />
                    </div>
                  } 
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
                      onClick={() => openVideoModal(movie.trailer_link)}
                    >
                      Watch Trailer
                    </Button>
                    <Button
                      className="read-desc-btn mt-2" 
                      block
                      color="dark"
                      onClick={() => openDescriptionModal({
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
                        onClick={() => openCommentsModal({
                          signedInUser,
                          movieName: movie.name,
                        })}
                      >
                        Comment
                      </Button>
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {showImageModal && 
            <ImageModal 
              movieImage={showImageModal} 
              imageModalImageNode={imageModalImageNode} 
              closeImageModal={closeImageModal}
            />
          }
          {showVideoModal && 
            <VideoModal 
              movieTrailerUrl={showVideoModal} 
              videoModalMovieTrailerNode={videoModalMovieTrailerNode} 
              closeVideoModal={closeVideoModal}
            />
          }
          {showDescriptionModal && 
            <DescriptionModal
              movieReqDescDetails={showDescriptionModal}
              descriptionModalTextNode={descriptionModalTextNode}
              closeDescriptionModal={closeDescriptionModal}
            />  
          }
          {showEditModal &&
            <EditModal
              movieReqRatingDetails={showEditModal}
              editModalRatingNode={editModalRatingNode}
              closeEditModal={closeEditModal}
            />
          }
          {showCommentsModal &&
            <CommentsModal
              commentReqDetails={showCommentsModal}
              commentsModalCommentsNode={commentsModalCommentsNode}
              closeCommentsModal={closeCommentsModal}
            />
          }
          {showDeleteModal &&
            <DeleteModal
              movieReqDeletingDetails={showDeleteModal}
              deleteModalDeleteNode={deleteModalDeleteNode}
              closeDeleteModal={closeDeleteModal}
            />
          }
      </>
    : null 
  )
};

export default MoviesGridView;