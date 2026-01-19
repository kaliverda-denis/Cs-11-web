import React from 'react';

const ColorDetail = () => {
    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 15px',
        background: '#f8f8f8',
        marginBottom: '2px',
        fontSize: '14px',
        fontWeight: '600'
    };

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>

            <div style={{ fontSize: '13px', color: '#888', marginBottom: '30px' }}>
                Colors <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px', margin: '0 10px' }}></i> 
                <span style={{ color: '#000', fontWeight: 'bold' }}>Midnight Violet</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'left' }}>
                    <h1 style={{ fontSize: '72px', fontWeight: 900, margin: '0 0 15px 0', letterSpacing: '-2px' }}>Midnight Violet</h1>
                    <p style={{ fontSize: '22px', color: '#555', maxWidth: '600px', lineHeight: '1.5' }}>
                        Intense violet-black depths fill any space with intrigue and boldness, channeling mystery and hidden elegance.
                    </p>
                </div>
                


                <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '12px', width: '240px', textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Envato</div>
                    <div style={{ color: '#444', margin: '8px 0', fontSize: '12px', lineHeight: '1.4' }}>
                        Speed up your workflow with unlimited Graphic Assets.
                    </div>
                    <div style={{ color: '#bbb', fontSize: '10px', textTransform: 'uppercase' }}>ads via Carbon</div>
                </div>
            </div>


            <div style={{ 
                background: '#301934', 
                height: '400px', 
                borderRadius: '24px', 
                marginTop: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontSize: '100px', fontWeight: 800, color: 'rgba(255,255,255,0.15)' }}>301934</div>
                

                <div style={{ position: 'absolute', top: '25px', right: '25px', display: 'flex', gap: '10px' }}>
                    <div className="color-tool-btn"><i className="fa-solid fa-pencil"></i></div>
                    <div className="color-tool-btn"><i className="fa-solid fa-expand"></i></div>
                    <div style={{ 
                        background: '#111', color: 'white', padding: '0 20px', height: '45px',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', 
                        cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' 
                    }}>
                        <i className="fa-regular fa-heart"></i> Save <i className="fa-solid fa-chevron-down" style={{fontSize: '10px'}}></i>
                    </div>
                </div>
            </div>


            <h2 style={{ fontSize: '36px', fontWeight: 900, marginTop: '80px', marginBottom: '40px', textAlign: 'left' }}>Conversion</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px' }}>
                <div>
                    <div style={rowStyle}><span>HEX</span><span style={{fontWeight: 'normal'}}>301934</span></div>
                    <div style={rowStyle}><span>RGB</span><span style={{fontWeight: 'normal'}}>48, 25, 52</span></div>
                    <div style={rowStyle}><span>CMYK</span><span style={{fontWeight: 'normal'}}>8, 52, 0, 80</span></div>
                    <div style={rowStyle}><span>HSB</span><span style={{fontWeight: 'normal'}}>291, 52, 20</span></div>
                    <div style={rowStyle}><span>HSL</span><span style={{fontWeight: 'normal'}}>291, 35, 15</span></div>
                </div>
                <div>
                    <div style={rowStyle}><span>LAB</span><span style={{fontWeight: 'normal'}}>13, 17, -13</span></div>
                    <div style={rowStyle}><span>XYZ</span><span style={{fontWeight: 'normal'}}>2, 2, 3</span></div>
                    <div style={rowStyle}><span>LCH</span><span style={{fontWeight: 'normal'}}>13, 21, 322</span></div>
                    <div style={rowStyle}><span>LUV</span><span style={{fontWeight: 'normal'}}>13, 8, -13</span></div>
                    <div style={rowStyle}><span>HWB</span><span style={{fontWeight: 'normal'}}>291, 10, 80</span></div>
                </div>
            </div>
        </div>
    );
};

export default ColorDetail;