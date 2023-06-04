import { useNavigate } from "react-router-dom";

import { useState, useRef, useCallback } from "react";
import { capitalizeUsername, setCustomCookie, clearCustomCookie } from "../customFunctions";

import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../redux/usersMovies";
import { signUp, signIn, signOut } from "../redux/users";

import { DEFAULT_USER, SIGN_UP, SIGN_IN, SIGN_OUT, CNAME_SIGNED_IN_USER } from "../constants";


const SignInSignUp = () => {

  const navigate = useNavigate();

  const userMovieDispatch = useDispatch();
  const userDispatch = userMovieDispatch;
  const { users: existingUsers, signedInUser } = useSelector(state => state.usersReducer);

  const [status, setStatus] = useState(signedInUser === DEFAULT_USER.username ? SIGN_UP: SIGN_OUT);

  const usernameNode = useRef(null);
  const passwordNode = useRef(null);
  const confirmPasswordNode = useRef(null);


  const getUser = useCallback(currentUsername => {

    const existingUser = existingUsers.find(existingUser => (
      existingUser.username === currentUsername
    ));

    return existingUser; 

  }, [existingUsers]);

  const handleSubmit = useCallback(event => {

    event.preventDefault();

    if (status === SIGN_UP) {

      const username = usernameNode.current.value.toLowerCase();
      const password = passwordNode.current.value;
      const confirmPassword = confirmPasswordNode.current.value;

      if (username.includes(DEFAULT_USER.username)) {
        toast(`Using ${username} in or as username is not allowed`, {type: "warning"});
      }
      else if (getUser(username)) {
        toast("Username already exists", {type: "error"});
      }
      else if (username.length < 4 || password.length < 8) {
        toast("Username and Password length must be equal to and greater than 5 and 8 respectively", {type: "error"});
      }
      else if (password !== confirmPassword) {
        toast("Passwords do not match", {type: "error"});
      }
      else if (password === confirmPassword) {    
        userDispatch(signUp({
          username,
          password
        }));
        userMovieDispatch(addNewUser({
          username
        }));
        
        setCustomCookie(CNAME_SIGNED_IN_USER, username);

        toast("Signed Up Successfully", {type: "success"});
        setStatus(SIGN_OUT);
        navigate("/");
      } 
    }

    else if (status === SIGN_IN) {

      const username = usernameNode.current.value.toLowerCase();
      const password = passwordNode.current.value;
      
      if (!getUser(username)) {
        toast("Username does not exist", {type: "error"});
      }
      else if (getUser(username)) {
        const { password: existingPassword } = getUser(username);

        if (existingPassword !== password) {
          toast("Incorrect password", {type: "error"});
        }
        else if (existingPassword === password) {
          userDispatch(signIn({ 
            username,
            password 
          }));

          setCustomCookie(CNAME_SIGNED_IN_USER, username);

          toast("Signed In Successfully", {type: "success"});
          setStatus(SIGN_OUT);
          navigate("/");
        }
      }
    }

    else if (status === SIGN_OUT) {

      userDispatch(signOut());
      clearCustomCookie(CNAME_SIGNED_IN_USER);
      toast("Signed Out Successfully", {type: "success"});
      setStatus(SIGN_IN);
    }
    
  }, [status, getUser, userMovieDispatch, userDispatch, navigate]);

  return (
    <Container className="sign-in-sign-up-form-container">
      {[SIGN_UP, SIGN_IN].includes(status) &&
        <div className="d-flex justify-content-center mb-3">
          <Button 
            className="btn-bg-color me-2" 
            onClick={() => setStatus(SIGN_IN)}
          >Sign In
          </Button>
          <Button 
            className="btn-bg-color ms-2" 
            onClick={() => setStatus(SIGN_UP)}
          >Sign Up
          </Button>
        </div>
      }
      { SIGN_OUT === status && 
        <h1 className="mb-5">Hello {capitalizeUsername(signedInUser)}</h1> 
      }
      <Form onSubmit={event => handleSubmit(event)}>
        {[SIGN_UP, SIGN_IN].includes(status) &&
          <>
            <FormGroup>
              <Input
                id="username"
                innerRef={usernameNode}
                name="username"
                placeholder="Enter Username"
                type="text"
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="password"
                innerRef={passwordNode}
                name="password"
                placeholder="Enter Password"
                type="password"
              />
            </FormGroup>
            {status === SIGN_UP && 
              <FormGroup>
                <Input
                  id="confirm-password"
                  innerRef={confirmPasswordNode}
                  name="confirm-password"
                  placeholder="Confirm Password"
                  type="password"
                />
              </FormGroup>
            }
          </>
        }
        <Button className="btn-bg-color">
          {status === SIGN_IN ? "Sign In" : (status === SIGN_UP ? "Sign Up" : "Sign Out")}
        </Button>
      </Form>
    </Container>
  );
}

export default SignInSignUp;