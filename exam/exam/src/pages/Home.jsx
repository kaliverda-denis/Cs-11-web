import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <section className="hero">
                <div className="hero-text">
                    <h1>The super fast<br/>color palettes<br/>generator!</h1>
                    <p style={{fontSize: '20px', color: '#555', marginBottom: '40px'}}>Create the perfect palette or get inspired by thousands of beautiful schemes.</p>
                    <div style={{display:'flex', gap:'15px'}}>
                        <Link to="/generator" className="btn-blue" style={{padding:'16px 32px', fontSize:'18px'}}>Start the generator!</Link>
                        <button style={{border:'1px solid #ddd', padding:'16px 32px', borderRadius:'10px', fontWeight:700}}>Explore 10M+ Palettes</button>
                    </div>
                </div>
                <div className="hero-palette">
                    <div className="hp-col" style={{background:'#FF7D7D'}}></div>
                    <div className="hp-col" style={{background:'#FFBCBC'}}></div>
                    <div className="hp-col" style={{background:'#D0B8B8'}}></div>
                    <div className="hp-col" style={{background:'#B8D8D0'}}></div>
                    <div className="hp-col" style={{background:'#8FFFFF'}}></div>
                </div>
            </section>

            <section className="trusted-section">
                <div className="trusted-title">Trusted by 5+ million creative minds and top companies</div>
                <div className="logos-grid">
                    <img className="company-logo" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="apple"/>
                    <img className="company-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix"/>
                    <img className="company-logo" src="https://res.cloudinary.com/coolors/image/upload/v1757421886/media/idSXQnMw-Q.svg" alt="coolors"/>
                    <img className="company-logo" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="google"/>
                    <img className="company-logo" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Warner_Bros._Pictures_logo.svg" alt="wb"/>
                </div>
            </section>

               <section className="intro-section" style={{ marginBottom: '50px' }}>
    <div className="intro-text">
        Coolors is the lightning-fast, ultra-intuitive color palette generator for designers, creators, and anyone seeking visual harmony. 
        Instantly generate beautiful palettes by hitting the spacebar, or explore millions of popular ones.
    </div>
    
    <Link to="/color-of-the-day" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="cotd-card" style={{ width: '350px', padding: '20px' }}>
            <div className="cotd-swatch" style={{ background: '#301934', width: '60px', height: '60px' }}></div>
            <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Color of the day</div>
                <div style={{ fontSize: '22px', fontWeight: 800 }}>Midnight Violet</div>
                <div style={{ fontSize: '14px', color: '#777', marginTop: '4px' }}>#301934</div>
            </div>
        </div>
    </Link>
</section>
            

            <p style={{textAlign:'center', color:'#aaa', fontWeight:800, textTransform:'uppercase', marginBottom:'20px'}}>Our Tools, Loved by Millions</p>
            <div className="tools-grid">
    {/* Існуючі 6 карток */}
    <div className="tool-card c-1"><h3>Palette Generator</h3><p>Create beautiful color schemes in seconds with the worldwide loved palette tool.</p><div className="tool-link">Start the generator <i className="fa-solid fa-arrow-right"></i></div></div>
    <div className="tool-card c-2"><h3>Explore Palettes</h3><p>Get inspired by thousands of beautiful color schemes. Search by colors, styles, topics.</p><div className="tool-link">Explore 10M+ Palettes <i className="fa-solid fa-arrow-right"></i></div></div>
    <div className="tool-card c-3"><h3>Image Picker</h3><p>Extract beautiful colors from your photos and turn them into palettes.</p><div className="tool-link">Launch the image picker <i className="fa-solid fa-arrow-right"></i></div></div>
    <div className="tool-card c-4"><h3>Contrast Checker</h3><p>Calculate the contrast ratio of text and background colors.</p><div className="tool-link">Check contrast <i className="fa-solid fa-arrow-right"></i></div></div>
    <div className="tool-card c-5"><h3>Palette Visualizer</h3><p>Preview your colors on real designs to see how they look in context.</p><div className="tool-link">Visualize <i className="fa-solid fa-arrow-right"></i></div></div>
    <div className="tool-card c-6"><h3>Color Picker</h3><p>Get useful color information like meaning, usage, variations.</p><div className="tool-link">Pick color <i className="fa-solid fa-arrow-right"></i></div></div>

    {/* 7. ТАЙЛВІНД (Повертаємо) */}
    <div className="tool-card c-7">
        <h3>Tailwind Colors</h3>
        <p>Preview Tailwind CSS colors on real designs to see how they look in context.</p>
        <div className="tool-link">Get your tailwind colors <i className="fa-solid fa-arrow-right"></i></div>
    </div>
    {/* 9. COLOR BOT (Повертаємо) */}
    <div className="tool-card c-8" style={{ background: '#e9fff0', color: '#3ea35b' }}>
        <h3>Color Bot</h3>
        <p>Chat with our AI-powered Color Bot, ask questions and get color suggestions.</p>
        <div className="tool-link">Chat with color bot <i className="fa-solid fa-arrow-right"></i></div>
    </div>
</div>

            <div className="resources-title">More Useful Resources</div>
            <div className="res-grid">
                <div className="res-card"><h4>Color Names</h4><p>Browse and search through a comprehensive list of color names to find the perfect shade for your project.</p></div>
                <div className="res-card"><h4>Free Fonts</h4><p>Discover and collect beautiful free fonts for your designs from our curated list of typography resources.</p></div>
                <div className="res-card"><h4>Collage Maker</h4><p>Create stylish collages by combining your photos and palettes in seconds.</p></div>
                <div className="res-card"><h4>Browse Gradients</h4><p>Explore beautiful gradients for your projects or create your own gradient with the Gradient Maker.</p></div>
                <div className="res-card"><h4>Gradient Palette</h4><p>Create a gradient palette between two colors and export it in various formats.</p></div>
                <div className="res-card"><h4>Image Converter</h4><p>Convert images to different formats with ease.</p></div>
            </div>

            <div className="plugins-title">Plugins and Apps</div>
            <div className="plugins">
                <div className="p-btn">iOS App</div>
                <div className="p-btn">Figma Plugin</div>
                <div class="p-btn">Adobe Extension</div>
            </div>

            <div className="big-footer-text">Make something colorful!</div>
        </div>
    );
};
export default Home;