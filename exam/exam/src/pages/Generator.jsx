import React, { useState, useEffect, useCallback } from 'react';
import { getName, isDark, getRandomPalette, getDistributedPalette } from '../utils';

const Generator = () => {
    const [colors, setColors] = useState(['#00BFB2', '#1A5E63', '#028090', '#F0F3BD', '#C64191']);
    const [locked, setLocked] = useState([false, false, false, false, false]);

    // Генерація нових кольорів
    const generate = useCallback(() => {
        const currentCount = colors.length;
        const newPalette = getRandomPalette(currentCount);
        
        setColors(prevColors => 
            prevColors.map((col, index) => locked[index] ? col : newPalette[index])
        );
    }, [colors.length, locked]);

    // Обробка пробілу
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                generate();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [generate]);

    const toggleLock = (index) => {
        const newLocked = [...locked];
        newLocked[index] = !newLocked[index];
        setLocked(newLocked);
    };

    const removeCol = (index) => {
        if (colors.length > 2) {
            setColors(colors.filter((_, i) => i !== index));
            setLocked(locked.filter((_, i) => i !== index));
        }
    };

    const addCol = (index) => {
        if (colors.length >= 7) {
            alert("Max 7 colors!");
            return;
        }
        const nextCols = getDistributedPalette(colors[index], 3);
        const newColor = nextCols[1];

        const newColors = [...colors];
        newColors.splice(index + 1, 0, newColor);
        
        const newLocked = [...locked];
        newLocked.splice(index + 1, 0, false);

        setColors(newColors);
        setLocked(newLocked);
    };

    return (
        <div>
             <div style={{padding: '10px 40px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                <div>Press Spacebar to generate! (Max 7 colors)</div>
                <div style={{fontWeight:700}}><i className="fa-regular fa-heart"></i> Save</div>
            </div>
            <div className="gen-main">
                {colors.map((c, i) => (
                    <div key={i} className="col" style={{background: c, color: isDark(c) ? 'white' : 'black'}}>
                        <div className="col-tools">
                            <i className="fa-solid fa-xmark" onClick={() => removeCol(i)}></i>
                            <i className={`fa-solid fa-lock${locked[i] ? '' : '-open'}`} onClick={() => toggleLock(i)}></i>
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <div className="hex">{c.replace('#','')}</div>
                        <div style={{fontSize:'13px', opacity:0.7}}>{getName(c)}</div>
                        
                        {i < colors.length - 1 && (
                            <div className="add-col-area" onClick={() => addCol(i)}>
                                <div className="add-plus">+</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Generator;