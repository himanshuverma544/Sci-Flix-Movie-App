const DEFAULT_USER = {
  username: "someone",
  password: null,
};

const SIGN_UP = "SIGN_UP";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const HOME = "/";
const ALL_MOVIES_LIST = "/all-movies-list";

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
  SIGN_UP, 
  SIGN_IN, 
  SIGN_OUT, 
  HOME, 
  ALL_MOVIES_LIST, 
  REPRESENTING_YOU, 
  ADD_COMMENT, 
  EDIT_COMMENT,
  SORT_OPTIONS, 
  MILLISECONDS_PER_DAY,
  CNAME_SIGNED_IN_USER
};