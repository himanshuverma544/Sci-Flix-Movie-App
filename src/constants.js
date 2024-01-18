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

const GREETING = "Hello,";

const SIGN_IN = {
  name: AUTHENTICATION.signInTitle,
  heading: "Sign In Yourself",
  switchMsg: "Don't have an account?",
  switchTitle: AUTHENTICATION.signUpTitle,
  show: false
};

const SIGN_UP = {
  name: AUTHENTICATION.signUpTitle,
  heading: "Sign Up Yourself",
  switchMsg: "Already have an account?",
  switchTitle: AUTHENTICATION.signInTitle,
  show: true
};

const SIGN_OUT = {
  name: AUTHENTICATION.signOutTitle,
  heading: GREETING,
  switchMsg: "We are sure you have at least one favorite Sci-Fi movie.",
};

const AS_PER = {
  [SIGN_UP.name]: SIGN_UP,
  [SIGN_IN.name]: SIGN_IN,
  [SIGN_OUT.name]: SIGN_OUT
};

const REPRESENTING_YOU = "You";

const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";

const DEFAULT_DROPDOWN_TOGGLE_TEXT = "Sort Movies By"; 
const SORT_OPTIONS = [
  {title: "Name", value: "name"},
  {title: "Rating", value: "rating"},
  {title: "Release Date", value: "release_date"}
];

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const CNAME_SIGNED_IN_USER = "signedInUser";

const DEFAULT_TEXT_COLOR = "#000";
const PLACEHOLDER_TEXT_COLOR = "#6e6b6b";


export {
  DEFAULT_USER, 
  HOME, 
  MOVIES, 
  AUTHENTICATION, 
  PAGE404,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  AS_PER,
  REPRESENTING_YOU,
  ADD_COMMENT, 
  EDIT_COMMENT,
  DEFAULT_DROPDOWN_TOGGLE_TEXT, 
  SORT_OPTIONS, 
  MILLISECONDS_PER_DAY,
  CNAME_SIGNED_IN_USER,
  DEFAULT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR
};