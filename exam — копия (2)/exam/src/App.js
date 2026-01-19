import React from 'react';
import ColorDetail from './pages/ColorDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Auth from './pages/Auth';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/color-of-the-day" element={<ColorDetail />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/registration" element={<Auth type="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;