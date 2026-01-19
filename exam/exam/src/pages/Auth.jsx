import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg from '\src\assets\bg.png';
const Auth = ({ type }) => {
    const isLogin = type === 'login';
    const [showPass, setShowPass] = useState(false);

    const toggleVisibility = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="auth-container">
            <div className="auth-form-side">
                <div className="auth-card">
                    <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>
                        {isLogin ? 'Hello!' : 'Sign up'}
                    </h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>
                        Use your email or another service to continue.
                    </p>
                    
                    <div className="social-btn">
                        <img src="https://img.icons8.com/color/24/google-logo.png" alt="G" /> 
                        Continue with Google
                    </div>
                    <div className="social-btn">
                        <i className="fa-brands fa-apple" style={{ fontSize: '20px' }}></i> 
                        Continue with Apple
                    </div>
                    
                    <div className="auth-sep">OR</div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className="auth-input-group">
                                <input type="text" className="auth-input" placeholder="Full Name" />
                            </div>
                        )}
                        
                        <div className="auth-input-group">
                            <input type="email" className="auth-input" placeholder="Email" />
                        </div>
                        
                        <div className="auth-input-group">
                            <input 
                                type={showPass ? "text" : "password"} 
                                className="auth-input" 
                                placeholder="Password" 
                                autoComplete="current-password"
                            />
                            <i 
                                className={`fa-regular ${showPass ? 'fa-eye-slash' : 'fa-eye'} auth-eye`} 
                                onClick={toggleVisibility}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>

                        <button type="submit" className="auth-btn-main">
                            {isLogin ? 'Continue with email' : 'Create your free account'}
                        </button>
                    </form>
                    
                    <p style={{ marginTop: '24px', fontSize: '14px' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"} 
                        <Link 
                            to={isLogin ? '/registration' : '/login'} 
                            style={{ color: '#0066ff', fontWeight: 700, marginLeft: '5px' }}
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </Link>
                    </p>
                </div>
            </div>

            {/* ПРАВА ЧАСТИНА - ТУТ БУЛА ПОМИЛКА В ДУЖКАХ */}
            <div className="auth-visual" style={{ overflow: 'hidden' }}>
                <img 
                    src={bg} 
                    alt="Background" 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                    }} 
                />
            </div>
        </div>
    );
};

export default Auth;