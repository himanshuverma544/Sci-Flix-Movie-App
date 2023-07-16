import { createPortal } from "react-dom";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import { v4 as getUniqueKey } from "uuid";

import { AiOutlineEdit, AiOutlineSend } from "react-icons/ai";
import { Form, FormGroup, Input, Button, InputGroup } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { addComment, editComment } from "../../redux/moviesComments";

import { DEFAULT_USER, REPRESENTING_YOU, ADD_COMMENT, EDIT_COMMENT } from "../../constants";
import { reverseVal, capitalizeUsername } from "../../customFunctions";


const CommentsModal = ({commentReqDetails: { signedInUser: currentSignedInUser , movieName }, commentsModalCommentsNode, closeCommentsModal}) => {
  

  let currentDefaultUser = sessionStorage.getItem("currentDefaultUser");

  if (currentSignedInUser === DEFAULT_USER.username) {
    if (!currentDefaultUser) { 
      currentSignedInUser = currentDefaultUser = `${currentSignedInUser}-${getUniqueKey()}`;
      sessionStorage.setItem("currentDefaultUser", currentSignedInUser);
    }
    else if (currentDefaultUser) {
      currentSignedInUser = currentDefaultUser;
    }
  }

  const commentIds = useRef({
    commentId: localStorage.getItem(`${movieName}-lastCommentId`) ?? 1,
    editCommentId: 0
  });
  const [userComment, setUserComment] = useState("");
  const [actionOnComment, setActionOnComment] = useState(ADD_COMMENT);
  const userCommentNode = useRef(null);
  const allUsersCommentsNode = useRef(null);

  const movieCommentDispatch = useDispatch();

  const moviesComments = useSelector(state => state.moviesCommentsReducer);
  const usersComments = useMemo(() => moviesComments[movieName] ?? [], [moviesComments, movieName]);


  useEffect(() => {

    function storeLastCommentIdCountLocally() {

      localStorage.setItem(`${movieName}-lastCommentId`, commentIds.current.commentId);
    }

    storeLastCommentIdCountLocally();

  }, [movieName, commentIds.current.commentId]);


  useEffect(() => {
    
    function storeMoviesCommentsLocally() {

      localStorage.setItem("moviesComments", JSON.stringify(moviesComments));
    }

    storeMoviesCommentsLocally();

  }, [moviesComments]);


  const handleCommentEdit = useCallback(event => {

    commentIds.current.editCommentId = parseInt(event.target.parentNode.getAttribute("data-id"));
    const comment = event.target.parentNode.querySelector(".user-comment").innerText;
    
    userCommentNode.current.value = comment;
    userCommentNode.current.focus();
    setUserComment(comment);

    setActionOnComment(EDIT_COMMENT);

  }, []);


  const handleCommentSubmission = useCallback(event => {

    event.preventDefault();

    if (!userComment) {
      return;
    }

    switch (actionOnComment) {

      case ADD_COMMENT:
        movieCommentDispatch(
          addComment({
            movieName,
            userCommentReqDetails: {
              commentId : commentIds.current.commentId++,
              username: currentSignedInUser,
              userComment
            }
          }) 
        );
        allUsersCommentsNode.current.scrollTo(0, 0);
        break;

      case EDIT_COMMENT:
        movieCommentDispatch(
          editComment({
            movieName,
            userCommentReqDetails: {
              commentId: commentIds.current.editCommentId,
              userComment
            }
          })
        );
        setActionOnComment(ADD_COMMENT);
        break;

      default: 
        console.log("Something's Wrong!");
    }
    
    userCommentNode.current.value = "";
    setUserComment("");

  }, [movieName, actionOnComment, currentSignedInUser, userComment, movieCommentDispatch]);

  
  return createPortal(
    <div className="the-comments-modal" onClick={event => closeCommentsModal(event)}>
      <div ref={commentsModalCommentsNode} className="comments-container">
        <h3 className="mt-3 ms-3">{`${movieName} (Comments)`}</h3>
        <hr/>
        <div ref={allUsersCommentsNode} className="all-comments">
          <ul>
            {usersComments.map((_, index, arr) => {
              const { commentId, username: commentUsername, userComment } = reverseVal(index, arr);
              return (
                <li key={commentId} data-id={commentId}>
                  <span className="comment-username ms-3 me-2">
                    { !commentUsername.includes(DEFAULT_USER.username)     // current signed in user comment
                      && currentSignedInUser === commentUsername
                      ? `${capitalizeUsername(commentUsername)} (${REPRESENTING_YOU})`

                      : (currentSignedInUser !== commentUsername      // signed in users comments
                      && !commentUsername.includes(DEFAULT_USER.username)
                      ? capitalizeUsername(commentUsername) 

                      : (currentSignedInUser === commentUsername      // current default signed in user comment     
                      ? REPRESENTING_YOU
                      : capitalizeUsername(DEFAULT_USER.username)))      // all default users comments
                    }
                  </span>
                  <span className="user-comment">{userComment}</span>
                  {currentSignedInUser === commentUsername &&
                    <AiOutlineEdit className="edit-comment-btn me-3" onClick={event => handleCommentEdit(event)}/>
                  }
                </li>
              )
            })}
          </ul>
        </div>
        <Form onSubmit={event => handleCommentSubmission(event)}>
          <FormGroup className="form-group-comment">
            <InputGroup>
              <Input
                id="comment-input"
                name="comment-input"
                type="text"
                innerRef={userCommentNode}
                placeholder="Add a comment…"
                autoComplete="off"
                autoFocus
                onChange={event => setUserComment(event.target.value)}
              />    
              <Button 
                className="post-comment-btn"
                style={{cursor: userComment.length ? "pointer" : "default"}}
              >
                <AiOutlineSend 
                  className="icon"
                  style={{ 
                    color: userComment.length ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)",
                  }}
                />
              </Button>
            </InputGroup> 
          </FormGroup>
        </Form>
      </div> 
    </div>,
    document.getElementById("comments-modal")
  );
}

export default CommentsModal;