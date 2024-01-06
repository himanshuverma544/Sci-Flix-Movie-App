const DEFAULT_USER = {
  username: "someone",
  password: null,
};

const HOME = {
  title: "Home",
  pathname: "/"
};

const MOVIES = {
  title: "Movies",
  pathname: "/all-movies-list"
};

const AUTHENTICATION = {
  signInTitle: "Sign In",
  signUpTitle: "Sign Up",
  signOutTitle: "Sign Out",
  pathname: "/authentication"
};

const PAGE404 = {
  pathname: "*"
};

const REPRESENTING_YOU = "You";

const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "rating", label: "Rating" },
  { value: "release_date", label: "Release Date"}
];

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const CNAME_SIGNED_IN_USER = "signedInUser";


export {
  DEFAULT_USER, 
  HOME, 
  MOVIES, 
  AUTHENTICATION, 
  PAGE404, 
  REPRESENTING_YOU,
  ADD_COMMENT, 
  EDIT_COMMENT, 
  SORT_OPTIONS, 
  MILLISECONDS_PER_DAY,
  CNAME_SIGNED_IN_USER
};