import { useNavigate } from "react-router-dom";

import { useState, useRef, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn, signOut } from "../redux/users";
import { addNewUser } from "../redux/usersMovies";

import { Container, Form, FormGroup, Input, Button, FormText } from "reactstrap";
import { toast } from "react-toastify";

import { capitalizeUsername, setCustomCookie, clearCustomCookie } from "../functions";

import { 
  DEFAULT_USER, 
  SIGN_IN, 
  SIGN_UP, 
  SIGN_OUT, 
  AS_PER, 
  CNAME_SIGNED_IN_USER 
} 
from "../constants";


const Authentication = () => {

  const navigate = useNavigate();

  const userMovieDispatch = useDispatch();
  const userDispatch = userMovieDispatch;
  const { users: existingUsers, signedInUser } = useSelector(state => state.usersReducer);

  const [status, setStatus] = useState(signedInUser === DEFAULT_USER.username ?
    SIGN_IN.name :
    SIGN_OUT.name
  );

  const isAuthenticated = useCallback(() => (
    status === SIGN_OUT.name
  ), [status]);

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
    
    const username = usernameNode.current && usernameNode.current.value.toLowerCase();
    const password = passwordNode.current && passwordNode.current.value;
    const confirmPassword = confirmPasswordNode.current && confirmPasswordNode.current.value;

    switch (status) {
      
      case SIGN_UP.name:

        if (username.includes(DEFAULT_USER.username)) {
          toast(`Using ${DEFAULT_USER.username} for the username is not allowed`, {type: "warning"});
        }
        else if (getUser(username)) {
          toast("Username already exists", {type: "error"});
        }
        else if (username.length < 4 || password.length < 8) {
          toast("Username and Password length must be equal to and greater than 4 and 8 respectively", {type: "error"});
        }
        else if (password !== confirmPassword) {
          toast("Passwords do not match", {type: "error"});
        }
        else if (password === confirmPassword) {    
          userDispatch(
            signUp({
              username,
              password
            })
          );
          userMovieDispatch(
            addNewUser({
              username
            })
          );
          
          setCustomCookie(CNAME_SIGNED_IN_USER, username);

          toast("Signed Up Successfully", {type: "success"});
          setStatus(SIGN_OUT.name);
          navigate("/");
        }
        break;

      case SIGN_IN.name: 
        
        if (!getUser(username)) {
          toast("Username does not exist", {type: "error"});
        }
        else if (getUser(username)) {
          const { password: existingPassword } = getUser(username);

          if (existingPassword !== password) {
            toast("Incorrect password", {type: "error"});
          }
          else if (existingPassword === password) {
            userDispatch(
              signIn({ 
                username,
                password 
              })
            );

            setCustomCookie(CNAME_SIGNED_IN_USER, username);

            toast("Signed In Successfully", {type: "success"});
            setStatus(SIGN_OUT.name);
            navigate("/");
          }
        }
        break;

      case SIGN_OUT.name:

        userDispatch(signOut());
        clearCustomCookie(CNAME_SIGNED_IN_USER);
        toast("Signed Out Successfully", {type: "success"});
        setStatus(SIGN_IN.name);
        break;

      default:
        break;
    }
    
  }, [status, getUser, userMovieDispatch, userDispatch, navigate]);

  
  return (
    <section>
      <div className="auth-form-cont">
        <Form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="form-heading">
            {`${AS_PER[status].heading} ${isAuthenticated() ?
              capitalizeUsername(signedInUser) :
              ""
            }`}
          </h1>
          <hr/>
          {!isAuthenticated() &&
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
              {AS_PER[status].show && 
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
          <Button className="btn-bg-color" block>
            {AS_PER[status].name}
          </Button>
          <hr/>
          <FormText>
            {AS_PER[status].switchMsg}
            {!isAuthenticated() &&
              <Button 
                className="auth-switch-btn"
                color="link"
                onClick={() => setStatus(AS_PER[status].switchTitle)}
              >
                {AS_PER[status].switchTitle}
              </Button>
            }
          </FormText>
        </Form>
      </div>
    </section>
  );
}

export default Authentication;