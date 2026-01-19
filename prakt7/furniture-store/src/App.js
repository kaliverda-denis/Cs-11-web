import React, { useState, useEffect } from 'react';
import './App.css';
import { initialData } from './data'; // Імпортуємо наш список товарів

function App() {
    // Стан товарів (зберігаємо в localStorage)
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('inventory_v3');
        return saved ? JSON.parse(saved) : initialData;
    });

    // Стан кошика
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart_v3');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setCartOpen] = useState(false);
    const [filterText, setFilterText] = useState("");

    // Оновлення localStorage при змінах
    useEffect(() => {
        localStorage.setItem('inventory_v3', JSON.stringify(products));
        localStorage.setItem('cart_v3', JSON.stringify(cart));
    }, [products, cart]);

    // Функція додавання в кошик
    const addToCart = (product) => {
        if (product.stock <= 0) return;
        
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
        
        setCart(prev => {
            const exist = prev.find(i => i.id === product.id);
            if (exist) {
                return prev.map(i => i.id === product.id ? { ...i, count: i.count + 1 } : i);
            }
            return [...prev, { ...product, count: 1 }];
        });
    };

    // Оновлення кількості в кошику
    const updateQty = (id, delta) => {
        const product = products.find(p => p.id === id);
        if (delta > 0 && product.stock <= 0) return;

        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newCount = item.count + delta;
                return newCount > 0 ? { ...item, count: newCount } : null;
            }
            return item;
        }).filter(Boolean));

        setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: p.stock - delta } : p));
    };

    const cartCount = cart.reduce((acc, el) => acc + el.count, 0);
    const cartTotal = cart.reduce((acc, el) => acc + (el.price * el.count), 0);

    const visibleProducts = products.filter(p => 
        p.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div>
            <header>
                <div className="logo-section">
                    <h1>Furniture<span>Store</span></h1>
                    <p>The biggest choice on the web</p>
                </div>
                
                <div className="user-section">
                    <div className="top-links">
                        <a href="#">Log in</a> 
                        <a href="#">Create an account</a> 
                        <a href="#">Check out</a>
                    </div>
                    
                    <div className="cart-box" onClick={() => setCartOpen(true)}>
                        <span className="cart-icon">🛒</span>
                        <b>My cart:</b> &nbsp; {cartCount} item(s) — ${cartTotal.toFixed(2)}
                    </div>

                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search store..." 
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="filters-bar">
                    <strong>Featured Products</strong>
                </div>

                <div className="products-grid">
                    {visibleProducts.map(p => (
                        <div key={p.id} className="product-card">
                            <div className="image-area">
                                {p.isSale && <div className="sale-badge">SALE</div>}
                                <img src={p.imageUrl} alt={p.name} />
                            </div>
                            
                            <div className="product-title">{p.name}</div>
                            
                            <div className="price-box">
                                {p.oldPrice ? (
                                    <>
                                        <span className="price-new">${p.price.toFixed(2)}</span>
                                        <span className="price-old">${p.oldPrice.toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span>${p.price.toFixed(2)}</span>
                                )}
                            </div>

                            <button className="btn-add" disabled={p.stock === 0} onClick={() => addToCart(p)}>
                                {p.stock > 0 ? "Add to cart" : "Out of stock"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isCartOpen && (
                <div className="modal-overlay" onClick={() => setCartOpen(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <h3>Shopping Cart</h3>
                        {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map(item => (
                            <div key={item.id} className="cart-item-row">
                                <div style={{width: '50%'}}>{item.name}</div>
                                <div>
                                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                                    <span style={{padding: '0 10px'}}>{item.count}</span>
                                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                                </div>
                                <div>${(item.price * item.count).toFixed(2)}</div>
                            </div>
                        ))}
                        <div style={{marginTop: '20px', textAlign: 'right'}}>
                            <strong>Total: ${cartTotal.toFixed(2)}</strong>
                        </div>
                        <button style={{marginTop: '10px'}} onClick={() => setCartOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;