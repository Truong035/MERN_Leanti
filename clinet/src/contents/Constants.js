export const apiURL=process.env.NODE_ENV !=="production" ? "http://localhost:5656/api" : "https://meanlearnti.herokuapp.com/api";
export const LOCAL_STORAGE_TOKEN_NAME="learnit-mearn";
export const POSTS_LOADED_SUCCESS =`POSTS_LOADED_SUCCESS`;
export const POSTS_LOADED_FAIL ="POSTS_LOADED_FAIL";
export const ADD_POST ="ADD_POST";
