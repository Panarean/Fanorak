import Cookies from 'js-cookie';

const COOKIE_NAME = 'jwtToken';

export const setAuthToken = (token) => {
  Cookies.set(COOKIE_NAME, token, { expires: 7 }); // Set the token in the cookie with a 7-day expiration
};

export const getAuthToken = () => {
  return Cookies.get(COOKIE_NAME); // Retrieve the token from the cookie
};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_NAME); // Remove the token from the cookie
};