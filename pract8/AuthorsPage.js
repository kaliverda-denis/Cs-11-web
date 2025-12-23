import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthors, getPostsByAuthorId } from './api';
import './App.css'; // Тут будуть прості стилі

//Компонент одного рядка з атором та його постами
const AuthorRow = ({ author }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Коли компонент малюється, качаємо пости ТІЛЬКИ для цього автора
    getPostsByAuthorId(author.id).then(data => {
      setPosts(data);
    });
  }, [author.id]);

  return (
    <div className="author-row">
      {/* Ліва частина: Інфо про автора */}
      <div className="author-info">
        <div className="avatar"></div> {/* Біле коло */}
        <h3>{author.name}</h3>
        <p>{author.email}</p>
        <p>{author.phone}</p>
      </div>

      {/* Права частина: Горизонтальний список постів */}
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h4>{post.title.substring(0, 15)}...</h4> {/* Обрізаємо заголовок */}
            
            {/* Кнопка OPEN переводить на сторінку статті */}
            <Link to={`/posts/${post.id}`} className="open-btn">
              open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

//Головна сторінка Авторів 
const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // При завантаженні сторінки беремо всіх авторів
    getAuthors().then(data => {
      setAuthors(data);
    });
  }, []);

  return (
    <div className="container">
      <h2>Authors page</h2>
      {authors.map(author => (
        <AuthorRow key={author.id} author={author} />
      ))}
    </div>
  );
};

export default AuthorsPage;