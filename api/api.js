const axios = require("axios");

export const getPosts = async () => {
  try {
    const res = await axios.get(`https://simple-blog-api.crew.red/posts`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (id) => {
  try {
    const res = await axios.get(
      `https://simple-blog-api.crew.red/posts/${id}?_embed=comments`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createComment = async ({ postId, body }) => {
  try {
    const res = await axios.post(`https://simple-blog-api.crew.red/comments`, {
      postId: postId,
      body: body,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async ({ id, title, body }) => {
  try {
    const res = await axios.put(
      `https://simple-blog-api.crew.red/posts/${id}`,
      { title: title, body: body }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
