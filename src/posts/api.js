import {Platform} from 'react-native';

const url =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

export async function fetchPosts() {
  const response = await fetch(`${url}/posts`);
  const posts = await response.json();

  return posts;
}

export async function addPost(post) {
  const response = await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('Something went wrong while adding a post');
  }

  const postToAdd = await response.json();
  return postToAdd;
}

export async function deletePost(id) {
  try {
    const response = await fetch(`${url}/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong while deleting a post');
    }
  } catch (err) {
    throw err;
  }
}

export async function editPost(post) {
  try {
    const response = await fetch(`${url}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const postToUpdate = await response.json();

    if (!response.ok) {
      throw new Error('Something went wrong while editing a post');
    }
    return postToUpdate;
  } catch (err) {
    throw err;
  }
}
