import * as api from "../api/index";

export const sharePost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.sharePost(postData);
    dispatch({ type: "ADD_POST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();
    dispatch({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    await api.likePost(postId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const dislikePost = (postId) => async (dispatch) => {
  try {
    await api.dislikePost(postId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const deletedPost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (postId, commentText) => async (dispatch) => {
  try {
    await api.commentPost(postId, commentText);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error.message);
  }
};
