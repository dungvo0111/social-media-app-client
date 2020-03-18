import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  MAKE_POST,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  GET_USER
} from "../types";
import axios from "axios";

//Get all posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

//Make a post
export const makePost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", newPost)
    .then(res => {
      dispatch({
        type: MAKE_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

//Get a Post
export const getPost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch(err => console.log(err));
};

//Like a post
export const likePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Unlike a post
export const unlikePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Submit comment
export const submitComment = (postId, commentData) => dispatch => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      axios
        .get("/posts")
        .then(res => {
          dispatch({
            type: SET_POSTS,
            payload: res.data
          });
          dispatch(clearErrors());
          dispatch(getPost(postId));
        })
        .catch(err => {
          dispatch({
            type: SET_POSTS,
            payload: []
          });
        });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
  //   dispatch(clearErrors());
  //   dispatch(getPost(postId));
  // })
  // .catch(err => {
  //   dispatch({
  //     type: SET_ERRORS,
  //     payload: err.response.data
  //   });
  // });
};

//Delete a post
export const deletePost = postId => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(res => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => {
      console.log(err);
    });
};

//Clear errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

//Get a single user data

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_USER,
        payload: null
      });
    });
};
