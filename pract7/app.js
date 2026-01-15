const { useState, useEffect } = React;
const initialData = [
    { id: 1, name: "Arne Jacobsen Egg Chair blue", 
        category: "Chairs", 
        price: 199.00, 
        oldPrice: 220.00, 
        rating: 5, 
        stock: 5, 
        isSale: true,
        imageUrl: "D:\web\pract7\imgs\arne_jacobsen_egg_chair_blue_1_medium.avif"
    },
    { id: 2, name: "Attractive round chair on low revolving", 
        category: "Chairs", 
        price: 60.00, 
        oldPrice: null, 
        rating: 4, 
        stock: 3, 
        isSale: false,
        imageUrl: "D:\web\pract7\imgs\attractive_round_chair_on_low_revolving_base_1_medium.avif"
    },
    { id: 3, name: "Avenue Six Roundabout Spring Green", 
        category: "Chairs", 
        price: 78.00, 
        oldPrice: null, 
        rating: 3, 
        stock: 2, 
        isSale: false,
        imageUrl: "D:\web\pract7\imgs\avenue_six_roundabout_spring_green_low_circle_lounger_1_medium.avif"
    },
    { id: 4, name: "CAMILLA Armchair", 
        category: "Chairs", 
        price: 469.00, 
        oldPrice: null, 
        rating: 5, 
        stock: 4, 
        isSale: false,
        imageUrl: "./img/chair4.jpg"
    },
    { id: 5, name: "Le Corbusier Armchair", 
        category: "Chairs", 
        price: 399.00, 
        oldPrice: 500.00, 
        rating: 5, 
        stock: 1, 
        isSale: true,
        imageUrl: "./img/chair5.jpg"
    },
    { id: 6, name: "Le Corbusier LC7 Chair furniture", 
        category: "Chairs", 
        price: 420.00, 
        oldPrice: null, 
        rating: 4, 
        stock: 6, 
        isSale: false,
        imageUrl: "./img/chair6.jpg"
    },
    { id: 7, name: "Mesa Modern Round Dining Table", 
        category: "Tables", 
        price: 265.00, 
        oldPrice: null, 
        rating: 5, 
        stock: 2, 
        isSale: false,
        imageUrl: "./img/table1.jpg"
    },
    { id: 8, name: "Miss K Table Lamp by Flos", 
        category: "Lamps", 
        price: 170.00, 
        oldPrice: null, 
        rating: 4, 
        stock: 10, 
        isSale: false,
        imageUrl: "./img/lamp1.jpg"
    },
    { id: 9, name: "Modern Contemporary Self Storage", 
        category: "Tables", 
        price: 320.00, 
        oldPrice: 400.00, 
        rating: 3, 
        stock: 3, 
        isSale: true,
        imageUrl: "./img/table2.jpg"
    },
    { id: 10, name: "Modern Design Cardboard Wiggle", 
        category: "Chairs", 
        price: 265.00, 
        oldPrice: null, 
        rating: 5, 
        stock: 0, 
        isSale: false,
        imageUrl: "./img/chair7.jpg"
    },
    { id: 11, name: "Oksana Dining Table", 
        category: "Tables", 
        price: 265.00, 
        oldPrice: null, 
        rating: 5, 
        stock: 0, 
        isSale: false,
        imageUrl: "./img/chair7.jpg"
    },
    { id: 12, name: "PK20 Easy Chair by Designer Poul Kjaerholm", 
        category: "Chairs", 
        price: 199.00, 
        oldPrice: null, 
        rating: 5, 
        stock: 0, 
        isSale: false,
        imageUrl: "./img/chair7.jpg"
    }
];

function App() {
    // LocalStorage
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('inventory_v2');
        return saved ? JSON.parse(saved) : initialData;
    });

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart_v2');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setCartOpen] = useState(false);
    const [filterText, setFilterText] = useState("");

    // Save
    useEffect(() => {
        localStorage.setItem('inventory_v2', JSON.stringify(products));
        localStorage.setItem('cart_v2', JSON.stringify(cart));
    }, [products, cart]);

    // Logic
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

    // Фільтр по назві (для пошуку)
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
                                <span>Image</span> 
                                {/* Сюди потім вставиш <img src={p.imageUrl} /> */}
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);