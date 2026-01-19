import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    // Ховаємо хедер на сторінках входу
    if (['/login', '/registration'].includes(location.pathname)) return null;

    return (
        <header>
            <Link to="/" className="logo">coolors</Link>
            <div className="nav-right">
                <span>Tools <i className="fa-solid fa-chevron-down"></i></span>
                <span style={{color: '#d122e3'}}>Go Pro</span>
                <div style={{width:'1px', height:'20px', background:'#eee'}}></div>
                <Link to="/login">Log in</Link>
                <Link to="/registration" className="btn-blue">Sign up</Link>
            </div>
        </header>
    );
};
export default Header;