import { createPortal } from "react-dom";

import { useRef, useCallback } from "react";

import { useDispatch } from "react-redux";
import { editMovie } from "../../redux/usersMovies";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { toast } from "react-toastify";


const EditModal = ({ movieReqRatingDetails: { signedInUser: currentSignedInUser, id, name, rating}, editModalRatingNode, closeEditModal }) => {


  const userMovieDispatch = useDispatch();
  const formInputNode = useRef(null);

  const handleEdit = useCallback(event => {

    event.preventDefault();
    const userGivenRating = formInputNode.current.value;

    if (userGivenRating < 1 || userGivenRating > 10) {
      toast("Rating must be between 1 to 10", {type: "error"});
      return;
    }

    userMovieDispatch(
      editMovie({
        username: currentSignedInUser,
        id, 
        userGivenRating
      })
    );

    toast("Movie Rated Successfully", {type: "success"});
    closeEditModal();

  }, [currentSignedInUser, id, userMovieDispatch, closeEditModal]);


  return createPortal(
    <div className="the-edit-modal" onClick={event => closeEditModal(event)}>
      <div ref={editModalRatingNode} className="user-rating-form-container">
        <Form onSubmit={event => handleEdit(event)}>
          <h3 className="mb-3">{name}</h3>
          <FormGroup className="form-group">
            <Label for="user-rating-label">
              Give your Rating
            </Label>
            <Input
              id="user-rating-input"
              innerRef={formInputNode}
              name="user-rating"
              placeholder="Enter Rating"
              defaultValue={rating}
              type="text"
              autoComplete="off"
              autoFocus
            />
          </FormGroup>
          <Button className="btn-bg-color mt-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>,
    document.getElementById("edit-modal")
  );
}

export default EditModal;