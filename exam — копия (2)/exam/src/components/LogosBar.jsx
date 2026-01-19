import React from 'react';

const LogosBar = () => {
    const logos = [
        { name: 'Airbnb', url: 'https://res.cloudinary.com/coolors/image/upload/v1757421975/media/1622439415c22e4475400432eae4619d1592a8bc-71x22.svg' },
        { name: 'Dropbox', url: 'https://res.cloudinary.com/coolors/image/upload/v1757422329/media/c641bb5bbe69c6b42344fd2333924a206ef43736-92x18.svg' },
        { name: 'Microsoft', url: 'https://res.cloudinary.com/coolors/image/upload/v1757421770/media/cc8b81fd47ded1e82d83258e2f674e0951e20fcc-86x18.svg' },
        { name: 'Netflix', url: 'https://res.cloudinary.com/coolors/image/upload/v1757421784/media/63efa1d3d16c97552586e2ac6a280a6b2389b88f-100x48.svg' },
        { name: 'The New York Times', url: 'https://res.cloudinary.com/coolors/image/upload/v1757422338/media/5e789db505180ee41e0612d7d53e2ec48c9c5837-153x20.svg' },
        { name: 'GitHub', url: 'https://res.cloudinary.com/coolors/image/upload/v1757421758/media/a9bfb23cca986ee16b0547274bcd7461ffd373aa-67x18.svg' },
        { name: 'Slack', url: 'https://res.cloudinary.com/coolors/image/upload/v1757421980/media/fb78b2f382a2d2d93b155601fbc9032379d2515d-79x20.svg' },
        { name: 'Warner Bros', url: 'https://res.cloudinary.com/coolors/image/upload/v1757422149/media/warnerbros.svg' },
        { name: 'EA', url: 'https://res.cloudinary.com/coolors/image/upload/v1757422148/media/ea.svg' },
        { name: 'DreamWorks', url: 'https://res.cloudinary.com/coolors/image/upload/v1757422624/media/DreamWorks2016.svg' },
        { name: 'Apple', url: 'https://res.cloudinary.com/coolors/image/upload/v1757422145/media/apple.svg' },
    ];

    return (
        <div className="logos-section">
            <p className="logos-title">TRUSTED BY 8+ MILLION CREATIVE MINDS AND TOP COMPANIES</p>
            <div className="logos-container">
                {logos.map((logo, index) => (
                    <div className="logo-wrapper" key={index}>
                        <img 
                            src={logo.url} 
                            alt={logo.name} 
                            className="logo-item" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogosBar;