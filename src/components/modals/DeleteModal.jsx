import { Button, CloseButton } from "reactstrap";
import { toast } from "react-toastify";

import { createPortal } from "react-dom";
import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { deleteMovie } from "../../redux/usersMovies";

import { useCloseModalByKey } from "../../customHooks";


const DeleteModal = ({ movieReqDeletingDetails: { signedInUser, id, name }, deleteModalDeleteNode, closeDeleteModal }) => {

  useCloseModalByKey(closeDeleteModal);

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
    <section>
      <div className="the-delete-modal overlay" onClick={closeDeleteModal}>
        <CloseButton 
          className="close-modal-btn"
          variant="white"
          onClick={closeDeleteModal}
        />
        <div ref={deleteModalDeleteNode} className="confirm-box">
          <h3>{name}</h3>
          <hr/>
          <p className="mt-3">Are you sure you want to delete this movie?</p>
          <div className="confirm-btn-group mt-3">
            <Button className="yes-btn btn-bg-color me-5" onClick={handleBtnYes}>Yes</Button>
            <Button className="no-btn btn-bg-color ms-5" onClick={handleBtnNo}>No</Button>
          </div>
        </div>
      </div>
    </section>,
    document.getElementById("delete-modal")
  );
}

export default DeleteModal;