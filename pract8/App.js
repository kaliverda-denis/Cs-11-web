import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthorsPage from './AuthorsPage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', background: '#333', color: 'white' }}>
        {/* Пункт меню для переходу на сторінку авторів */}
        <Link to="/authors" style={{ color: 'white', textDecoration: 'none' }}>
          Authors Page
        </Link>
      </nav>

      <Routes>
        <Route path="/authors" element={<AuthorsPage />} />
        
        {/* Заглушка для сторінки посту, щоб перевірити перехід */}
        <Route path="/posts/:postId" element={<h1>Сторінка статті відкрита!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;