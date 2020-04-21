import {postsStore} from './posts.store';

export async function fetchPosts() {
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  postsStore.setPosts(posts);
}

export async function addPost(post) {
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  const postToAdd = await response.json();
  postsStore.addPost(postToAdd);
}

export async function deletePost(id) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong while deleting');
    }

    postsStore.deletePost(id);
  } catch (err) {
    throw err;
  }

  postsStore.deletePost(id);
}

export async function editPost(post) {
  console.log('=========post to update in actions========');
  console.log(post);
  try {
    const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const postToUpdate = await response.json();

    if (!response.ok) {
      throw new Error('Something went wrong while editing');
    }

    postsStore.editPost(postToUpdate);
  } catch (err) {
    throw err;
  }
}
