import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";

import { useSelector } from "react-redux";

import MoviesGridView from "./MoviesGridView";

import ImageModal from "./modals/ImageModal";
import VideoModal from "./modals/VideoModal";
import DescriptionModal from "./modals/DescriptionModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import CommentsModal from "./modals/CommentsModal";

import { DEFAULT_USER, AUTHENTICATION, PREFERENCES } from "../utils/constants";


const Modals = ({moviesToGrid}) => {

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

      navigate(AUTHENTICATION.pathname, { state: PREFERENCES.pathname });
      toast("You need to Sign In first to make changes", {type: "info"});
  
    }, [navigate]);
  
    const manageModalClosing = useCallback((event, node, setShowModal) => {

      if (!event) {  // when using key or by calling the function
        setShowModal(null);
      }
      else if (event.target.classList.contains("close-modal-btn")) {  // using cross button  
        event.stopPropagation();
        setShowModal(null);
      }
      else if (node.current && !node.current.contains(event.target)) {  // when clicked outside
        setShowModal(null);
      }
    }, []);
  
    
    /* Image Modal */
  
    const openImageModal = useCallback(movieImage => {
      setShowImageModal(movieImage);
    }, []);
  
    
    const closeImageModal = useCallback(event => {
      manageModalClosing(event, imageModalImageNode, setShowImageModal);
    }, [manageModalClosing]);
  
  
    /* Video Modal */
  
    const openVideoModal = useCallback(movieTrailerUrl => {
      setShowVideoModal(movieTrailerUrl);
    }, []);
  

    const closeVideoModal = useCallback(event => {
      manageModalClosing(event, videoModalMovieTrailerNode, setShowVideoModal);
    }, [manageModalClosing]);
    
  
    /* Description Modal */
  
    const openDescriptionModal = useCallback(movieReqDescDetails => {
      setShowDescriptionModal(movieReqDescDetails);
    }, []);
  

    const closeDescriptionModal = useCallback(event => {
      manageModalClosing(event, descriptionModalTextNode, setShowDescriptionModal);
    }, [manageModalClosing]);
  
  
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
  

    const closeEditModal = useCallback(event => {
      manageModalClosing(event, editModalRatingNode, setShowEditModal);
    }, [manageModalClosing]);

  
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
  

    const closeDeleteModal = useCallback(event => {
      manageModalClosing(event, deleteModalDeleteNode, setShowDeleteModal)  
    }, [manageModalClosing]);


    /* Comments Modal */
  
    const openCommentsModal = useCallback(movieCommentsReqDetails => {  
      setShowCommentsModal(movieCommentsReqDetails);
    }, []);
  
    const closeCommentsModal = useCallback(event => {
      manageModalClosing(event, commentsModalCommentsNode, setShowCommentsModal);
    }, [manageModalClosing]);


  return (       
    <>
      <MoviesGridView
        signedInUser = {signedInUser}
        moviesToGrid = {moviesToGrid}
        getMovieImage = {openImageModal}
        getMovieTrailerUrl = {openVideoModal}
        getMovieReqDescDetails = {openDescriptionModal}
        getMovieReqRatingDetails = {openEditModal}
        getMovieReqDeletingDetails = {openDeleteModal}
        getMovieCommentsReqDetails = {openCommentsModal}
      />
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
      {showDeleteModal &&
        <DeleteModal
          movieReqDeletingDetails={showDeleteModal}
          deleteModalDeleteNode={deleteModalDeleteNode}
          closeDeleteModal={closeDeleteModal}
        />
      }
      {showCommentsModal &&
        <CommentsModal
          commentReqDetails={showCommentsModal}
          commentsModalCommentsNode={commentsModalCommentsNode}
          closeCommentsModal={closeCommentsModal}
        />
      }
    </>
  );
};

export default Modals;