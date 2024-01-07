import Axios from "axios";

import { MILLISECONDS_PER_DAY } from "./constants";


function setUsersDataLocally(signedInUser, movies) {

  localStorage.setItem(signedInUser, JSON.stringify(movies));
}

const fetchMovies = async () => {

  const URL = import.meta.env.VITE_MOVIES_API_URL;
  const { data: { movies: fetchedMovies } } = await Axios.get(URL);

  return fetchedMovies;
};


function clearCustomCookie(cookieName) {

  localStorage.setItem(cookieName, "");
}

function getCustomCookieValue(cookieName) {

  let currentCookieLocal = localStorage.getItem(cookieName);

  if (currentCookieLocal) {

    const currentCookie = JSON.parse(currentCookieLocal);
    let currentTime = new Date().getTime() / MILLISECONDS_PER_DAY;

    if (currentCookie.expiryTime > currentTime) {
      return currentCookie.cookieValue;
    }
    else {
      clearCustomCookie(cookieName);
      return null;
    }
  }

  return null;
}


function getCookieExpiryDate() {

  let currentDate = new Date();

  let futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 30);
  
  let totalDays = Math.floor(futureDate.getTime() / MILLISECONDS_PER_DAY);

  return totalDays;
}

function setCustomCookie(cookieName, cookieValue) {

  const cookieObj = {
    cookieValue,
    expiryTime: getCookieExpiryDate()
  };

  localStorage.setItem(cookieName, JSON.stringify(cookieObj));
}


function theRemoveUniqueKeyStr(str, symbol = '-') {

  return str.substring(0, str.indexOf(symbol))
}


function theReverseVal(index, arr) {

  return arr.at(-index - 1);
} 


function theFormatDate(dateString) {

  const dateParts = dateString.split('-');
  const year = dateParts[0];
  const month = new Date(dateString).toLocaleString('default', { month: 'short' });
  const day = dateParts[2];

  return `${day}-${month}-${year}`;
}


function theCapitalizeUsername(username) {

  const words = username.split(" ");

  const capitalizedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  );
  
  const capitalizedUsername = capitalizedWords.join(" ");
  return capitalizedUsername;
}


function memoFunc(func) {

  var cache = {};

  return function (...args) {

    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }
    else {
      const result = func(...args);
      cache[key] = result;
      return result;
    }
  };
}


const removeUniqueKeyStr = memoFunc(theRemoveUniqueKeyStr);
const reverseVal = memoFunc(theReverseVal);
const formatDate = memoFunc(theFormatDate);
const capitalizeUsername = memoFunc(theCapitalizeUsername);


export {
  setUsersDataLocally,
  fetchMovies, 
  clearCustomCookie, 
  getCustomCookieValue, 
  setCustomCookie, 
  removeUniqueKeyStr, 
  reverseVal, 
  formatDate,
  capitalizeUsername 
};