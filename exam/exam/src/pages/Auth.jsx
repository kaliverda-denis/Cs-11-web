import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Auth = ({ type }) => {
    const isLogin = type === 'login';
    
    // Стан для видимості пароля (false - сховано, true - видно)
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="auth-container">
            <div className="auth-form-side">
                <div className="auth-card">
                    <h1 style={{fontSize:'48px', fontWeight:900, marginBottom:'10px'}}>
                        {isLogin ? 'Hello!' : 'Sign up'}
                    </h1>
                    <p style={{color:'#666', marginBottom:'30px'}}>Use your email or another service to continue.</p>
                    
                    <div className="social-btn">
                        <img src="https://img.icons8.com/color/24/google-logo.png" alt="G"/> Continue with Google
                    </div>
                    <div className="social-btn">
                        <i className="fa-brands fa-apple" style={{fontSize:'20px'}}></i> Continue with Apple
                    </div>
                    
                    <div className="auth-sep">OR</div>

                    {!isLogin && (
                        <div className="auth-input-group">
                            <input type="text" className="auth-input" placeholder="Full Name" />
                        </div>
                    )}
                    
                    <div className="auth-input-group">
                        <input type="email" className="auth-input" placeholder="Email" />
                    </div>
                    
                    {/* ГРУПА ПАРОЛЯ З ОКОМ */}
                    <div className="auth-input-group">
                        <input 
                            type={showPass ? "text" : "password"} // Перемикаємо тип тут
                            className="auth-input" 
                            placeholder="Password" 
                        />
                        <i 
                            className={`fa-regular ${showPass ? 'fa-eye-slash' : 'fa-eye'} auth-eye`} // Змінюємо іконку
                            onClick={() => setShowPass(!showPass)} // Перемикаємо стан при кліку
                        ></i>
                    </div>

                    <button className="auth-btn-main">
                        {isLogin ? 'Continue with email' : 'Create your free account'}
                    </button>
                    
                    <p style={{marginTop:'24px', fontSize:'14px'}}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"} 
                        <Link to={isLogin ? '/registration' : '/login'} style={{color:'var(--blue)', fontWeight:700, marginLeft:'5px'}}>
                            {isLogin ? 'Sign up' : 'Log in'}
                        </Link>
                    </p>
                </div>
            </div>
            <div className="auth-visual"></div>
        </div>
    );
};

export default Auth;