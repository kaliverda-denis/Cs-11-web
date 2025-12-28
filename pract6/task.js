
// 1. РЕАЛІЗАЦІЯ ФІЛЬТРАЦІЇ ПО КАТЕГОРІЯМ
function filterByCategory(products, category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// 2. РЕАЛІЗАЦІЯ ФІЛЬТРАЦІЇ ПО РЕЙТИНГУ
function filterByRating(products, minRating) {
    return products.filter(product => product.rating >= minRating);
}

// 3. ЗБІЛЬШЕННЯ/ЗМЕНШЕННЯ ТОВАРУ У КОРЗИНІ + ВПЛИВ НА STOCK
let cart = []; 
let allProducts = []; 

function changeQuantity(productId, delta) {
    const product = allProducts.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (delta > 0) {
        if (product.stock > 0) {
            product.stock--; 
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
        } else {
            console.error("Товар закінчився на складі!");
        }
    } else {
        if (cartItem) {
            cartItem.quantity--;
            product.stock++;
            if (cartItem.quantity === 0) {
                cart = cart.filter(item => item.id !== productId);
            }
        }
    }
    

    syncStorage();
}

// 4. ЗБЕРЕЖЕННЯ В LOCALSTORAGE 
function syncStorage() {
    localStorage.setItem('user_cart', JSON.stringify(cart));
    localStorage.setItem('products_state', JSON.stringify(allProducts));
}

function restoreData() {
    const savedCart = localStorage.getItem('user_cart');
    const savedProducts = localStorage.getItem('products_state');

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedProducts) {
        allProducts = JSON.parse(savedProducts);
    }
}
restoreData();