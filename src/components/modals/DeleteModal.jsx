import { Button } from "reactstrap";
import { toast } from "react-toastify";

import { createPortal } from "react-dom";
import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { deleteMovie } from "../../redux/usersMovies";


const DeleteModal = ({ movieReqDeletingDetails: { signedInUser, id, name }, deleteModalDeleteNode, closeDeleteModal }) => {


  const userMovieDispatch = useDispatch();


  const handleBtnYes = useCallback(() => {

    userMovieDispatch(
      deleteMovie({
        username: signedInUser,
        id
      })
    );
    
    toast("Movie Deleted Successfully", {type: "success"});
    closeDeleteModal();

  }, [signedInUser, id, userMovieDispatch, closeDeleteModal]);


  const handleBtnNo = useCallback(() => {

    closeDeleteModal();

  }, [closeDeleteModal]);


  return createPortal(
    <div className="the-delete-modal" onClick={event => closeDeleteModal(event)}>
      <div ref={deleteModalDeleteNode} className="confirm-box">
        <h3>{name}</h3>
        <p className="mt-3">Are you sure you want to delete this movie?</p>
        <div className="confirm-btn-group mt-3">
          <Button className="yes-btn btn-bg-color me-5" onClick={handleBtnYes}>Yes</Button>
          <Button className="no-btn btn-bg-color ms-5" onClick={handleBtnNo}>No</Button>
        </div>
      </div>
    </div>,
    document.getElementById("delete-modal")
  );
}

export default DeleteModal;