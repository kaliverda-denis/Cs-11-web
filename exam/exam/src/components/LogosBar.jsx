import React from 'react';

const LogosBar = () => {
    // Тут ти просто заміниш '#' на свої реальні посилання на картинки логотипів
    const logos = [
        { name: 'Airbnb', url: '#' },
        { name: 'Dropbox', url: '#' },
        { name: 'Microsoft', url: '#' },
        { name: 'Netflix', url: '#' },
        { name: 'Disney', url: '#' },
        { name: 'GitHub', url: '#' },
        { name: 'Slack', url: '#' },
        { name: 'Warner Bros', url: '#' },
    ];

    return (
        <div className="logos-section">
            <p className="logos-title">TRUSTED BY 8+ MILLION CREATIVE MINDS AND TOP COMPANIES</p>
            <div className="logos-container">
                {logos.map((logo, index) => (
                    <img 
                        key={index} 
                        src={logo.url} 
                        alt={logo.name} 
                        className="logo-item" 
                    />
                ))}
            </div>
        </div>
    );
};

export default LogosBar;