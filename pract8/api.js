// запити
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// список авторів
export const getAuthors = () => {
  return fetch(`${BASE_URL}/users`).then(res => res.json());
};

//статті конкретного автора за його ID
export const getPostsByAuthorId = (authorId) => {
  return fetch(`${BASE_URL}/posts?userId=${authorId}`).then(res => res.json());
};