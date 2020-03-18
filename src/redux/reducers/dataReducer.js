import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  MAKE_POST,
  SET_POST,
  SUBMIT_COMMENT,
  GET_USER
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      var index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = {
          ...state.post,
          ...action.payload
        };
      }
      return {
        ...state
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== action.payload)
      };
    case MAKE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    case GET_USER:
      return {
        ...state,
        profile: action.payload.user,
        posts: action.payload.posts,
        loading: false
      };
    default:
      return state;
  }
}
