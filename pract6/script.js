// Кошик тепер завантажується з LocalStorage при старті
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функція для оновлення лічильника на іконці кошика
const updateCartBadge = () => {
    const cartCounter = document.querySelector('#cart-counter');
    const sum = cart.reduce((acc, cur) => acc + cur.count, 0);
    
    if (sum > 0) {
        cartCounter.classList.remove('hide');
        cartCounter.textContent = sum > 9 ? "+9" : sum;
    } else {
        cartCounter.classList.add('hide');
    }
};

// ЗАВДАННЯ 4: Збереження в LocalStorage
const saveToLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Зберігаємо також поточний стан доступної кількості товарів
    localStorage.setItem('inventory', JSON.stringify(data));
};

const addCart = (item, data) => {
    const existedItem = cart.find(el => el.id == item.id);
    if (existedItem) {
        existedItem.count += 1;
    } else {
        cart.push({ ...item, count: 1 });
    }
    updateCartBadge();
    saveToLocalStorage(data);
};

// ЗАВДАННЯ 1 та 2: Фільтрація за категорією та рейтингом
const filterItems = (data, params) => {
    const { searchText, priceMin, priceMax, category, rating, extraFunctions } = params;

    data.forEach(el => {
        const itemNode = document.querySelector(`.item[item-id="${el.id}"]`);
        let isVisible = true;

        if (searchText && !el.name.toLowerCase().includes(searchText) && !el.shortDescription.toLowerCase().includes(searchText)) isVisible = false;
        if (priceMin >= 0 && el.price < priceMin) isVisible = false;
        if (priceMax >= 0 && el.price > priceMax) isVisible = false;
        
        // Фільтрація за категорією
        if (category && category !== 'All' && el.category !== category) isVisible = false;
        
        // Фільтрація за рейтингом (мінімальний рейтинг)
        if (rating && el.rating < rating) isVisible = false;

        if (extraFunctions && extraFunctions.length) {
            if (!extraFunctions.every(extra => el.extraFunctions.includes(extra))) isVisible = false;
        }

        isVisible ? itemNode.classList.remove('hide') : itemNode.classList.add('hide');
    });
};

// ЗАВДАННЯ 3: Збільшення/зменшення кількості + Склад
const createViewItem = (item, data) => {
    const cartViewItem = document.createElement('div');
    cartViewItem.classList.add('cart-view-item');

    // ... (код створення Image, Name, Price як у вас)
    const cartViewItemImage = document.createElement('div');
    cartViewItemImage.classList.add('image');
    cartViewItemImage.style = `--bgImg: url('${item.imageUrl}')`;

    const cartViewItemName = document.createElement('div');
    cartViewItemName.classList.add('name');
    cartViewItemName.textContent = item.name;

    const cartViewItemPrice = document.createElement('div');
    cartViewItemPrice.classList.add('price');
    cartViewItemPrice.textContent = item.price;

    const cartViewItemCount = document.createElement('div');
    cartViewItemCount.classList.add('count');

    const cartViewItemCountValue = document.createElement('div');
    cartViewItemCountValue.classList.add('count-value');
    cartViewItemCountValue.textContent = item.count;

    const renderItem = data.find(el => el.id === item.id);

    // Кнопка ЗМЕНШИТИ
    const cartViewItemCountDec = document.createElement('div');
    cartViewItemCountDec.classList.add('decrease-count');
    cartViewItemCountDec.textContent = "-";
    cartViewItemCountDec.addEventListener('click', () => {
        if (item.count > 0) {
            item.count--;
            renderItem.availableCount++; // Повертаємо на склад
            if (item.count === 0) {
                cart.splice(cart.indexOf(item), 1);
                cartViewItem.remove();
            }
            updateUIAfterCartChange(item, cartViewItemCountValue, data);
        }
    });

    // Кнопка ЗБІЛЬШИТИ
    const cartViewItemCountInc = document.createElement('div');
    cartViewItemCountInc.classList.add('increase-count');
    cartViewItemCountInc.textContent = "+";
    cartViewItemCountInc.addEventListener('click', () => {
        if (renderItem.availableCount > 0) {
            item.count++;
            renderItem.availableCount--; // Забираємо зі складу
            updateUIAfterCartChange(item, cartViewItemCountValue, data);
        } else {
            alert("Limit reached!");
        }
    });

    const updateUIAfterCartChange = (item, countNode, data) => {
        countNode.textContent = item.count;
        updateItemAvailabeCount(item.id, renderItem.availableCount);
        setTotalPrice();
        updateCartBadge();
        saveToLocalStorage(data);
        
        // Оновлення ціни для конкретного рядка
        cartViewItemTotalItemPrice.textContent = (item.count * item.price).toFixed(2);
    };

    cartViewItemCount.append(cartViewItemCountDec, cartViewItemCountValue, cartViewItemCountInc);

    const cartViewItemTotalItemPrice = document.createElement('div');
    cartViewItemTotalItemPrice.classList.add("total-item-price");
    cartViewItemTotalItemPrice.textContent = (item.count * item.price).toFixed(2);

    const cartViewItemRemoveItem = document.createElement('div');
    cartViewItemRemoveItem.classList.add('remove-item');
    const cartViewItemRemoveImg = document.createElement('img');
    cartViewItemRemoveImg.src = "./imgs/delete.png";
    cartViewItemRemoveImg.addEventListener('click', () => {
        renderItem.availableCount += item.count; // Повертаємо все на склад
        cart.splice(cart.indexOf(item), 1);
        updateItemAvailabeCount(item.id, renderItem.availableCount);
        cartViewItem.remove();
        setTotalPrice();
        updateCartBadge();
        saveToLocalStorage(data);
    });
    cartViewItemRemoveItem.appendChild(cartViewItemRemoveImg);

    cartViewItem.append(cartViewItemImage, cartViewItemName, cartViewItemPrice, cartViewItemCount, cartViewItemTotalItemPrice, cartViewItemRemoveItem);
    return cartViewItem;
};

// Оновлений DOMContentLoaded для підтримки відновлення даних
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./electronic_items_dataset.json');
    let data = await response.json();

    // Відновлюємо кількість на складі з LocalStorage, якщо вона там є
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
        const inventoryData = JSON.parse(savedInventory);
        data.forEach(item => {
            const saved = inventoryData.find(i => i.id === item.id);
            if (saved) item.availableCount = saved.availableCount;
        });
    }

    const itemsContainer = document.querySelector('.items');
    data.forEach(el => {
        itemsContainer.appendChild(createItem(el));
    });

    setCategoryValues(data);
    setExtraFunctions(data);
    setupFilters(data);
    updateCartBadge();

    // Додайте слухачі для категорій та рейтингу у вашу функцію setupFilters
    document.querySelector('.category select').addEventListener('change', (e) => {
        filterItems(data, { 
            category: e.target.value,
            searchText: document.querySelector('#search-input').value,
            priceMin: parseInt(document.querySelector('#price-min').value) || 0,
            priceMax: parseInt(document.querySelector('#price-max').value) || Infinity,
            rating: parseFloat(document.querySelector('#rating-input')?.value) || 0,
            extraFunctions: getAllSelectedExtraFunctions()
        });
    });

    document.querySelector('.loader').classList.add('hide');
});