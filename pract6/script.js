
const cart = []

const saveCartToLS = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const updateCartCounterUI = () => {
    const cartCounter = document.querySelector('#cart-counter');
    const sum = cart.reduce((acc, cur) => acc + cur.count, 0);

    if (sum > 0) {
        cartCounter.classList.remove('hide');
        cartCounter.textContent = sum > 9 ? "+9" : sum;
    } else {
        cartCounter.classList.add('hide');
    }
}

const addCart = (item) => {
    const existedItem = cart.find(el => el.id == item.id)
    if (existedItem) {
        existedItem.count += 1
    } else {
        cart.push({ ...item, count: 1 });
    }
    
    updateCartCounterUI();
    saveCartToLS();
}

const createItem = (item) => {
    const div = document.createElement('div')
    div.classList.add('item');
    div.setAttribute('item-id', item.id)

    const image = document.createElement('div')
    image.classList.add('item-image')
    image.style = `--bgURL:url(${item.imageUrl})`

    const title = document.createElement('div')
    title.classList.add('item-title')
    title.textContent = item.name

    const description = document.createElement('div')
    description.classList.add('item-short-description')
    description.textContent = item.shortDescription

    const bottom = document.createElement('div')
    bottom.classList.add('item-bottom')

    const rating = document.createElement('div')
    rating.classList.add('item-rating')
    rating.textContent = `Rating: ${item.rating}`

    const availableCount = document.createElement('div')
    availableCount.classList.add('item-available-count')
    availableCount.textContent = `Count: ${item.availableCount}`

    const price = document.createElement('div')
    price.classList.add('item-price')
    price.textContent = `${item.price} ${item.currency}`

    const add = document.createElement('div')
    add.classList.add('item-add')
    add.textContent = `Add to cart`
    
    if (item.availableCount === 0) {
        add.classList.add('disabled');
    }

    add.addEventListener('click', () => {
        if (item.availableCount == 0) {
            return;
        }

        addCart(item)

        item.availableCount -= 1
        availableCount.textContent = `Count: ${item.availableCount}`

        if (item.availableCount == 0) {
            add.classList.add('disabled')
        }
    })

    bottom.append(rating)
    bottom.append(availableCount)
    bottom.append(price)
    bottom.append(add)

    div.appendChild(image)
    div.appendChild(title)
    div.appendChild(description)
    div.appendChild(bottom)

    return div
}

const setCategoryValues = (data) => {
    const allCategories = data.map(el => el.category)
    const uniqueCategories = [...new Set(allCategories)]

    const categoryNode = document.querySelector('.category select')

    uniqueCategories.forEach(category => {
        const option = document.createElement('option')
        option.textContent = category
        option.value = category
        categoryNode.appendChild(option)
    })
}

const setExtraFunctions = (data) => {
    const allExtraFunctions = data.flatMap(el => el.extraFunctions)
    const uniqueExtraFunctions = [...new Set(allExtraFunctions)]

    const container = document.querySelector('.extra-functions-container')

    uniqueExtraFunctions.forEach(extra => {
        const label = document.createElement('label')
        const span = document.createElement('span')
        span.textContent = extra;

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.setAttribute('data', extra)

        label.appendChild(input)
        label.appendChild(span)

        container.appendChild(label)
    })
}

const getAllSelectedExtraFunctions = () => {
    const selectedCheckbox = document.querySelectorAll(
        '.extra-functions-container input[type="checkbox"]:checked'
    )
    const extraFunctions = []
    selectedCheckbox.forEach(checkbox => {
        extraFunctions.push(
            checkbox.getAttribute('data')
        )
    })
    return extraFunctions
}

const filterItems = (data, params) => {
    const {
        searchText,
        priceMin,
        priceMax,
        category,
        rating,
        extraFunctions
    } = params;

    data.forEach(el => {
        const item = document.querySelector(`.item[item-id="${el.id}"]`);

        if (searchText.length) {
            const isTextInName = el.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            const isTextInShorDescription = el.shortDescription.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            if (!isTextInName && !isTextInShorDescription) {
                item.classList.add('hide');
                return;
            }
        }

        if (priceMin >= 0 && el.price < priceMin) {
            item.classList.add('hide');
            return;
        }

        if (priceMax >= 0 && el.price > priceMax) {
            item.classList.add('hide');
            return;
        }

        if (category && category !== 'all' && el.category !== category) {
            item.classList.add('hide');
            return;
        }

        if (rating && el.rating < rating) {
            item.classList.add('hide');
            return;
        }

        if (extraFunctions && extraFunctions.length) {
            const result = extraFunctions.every(extra => el.extraFunctions.includes(extra))
            if (!result) {
                item.classList.add('hide');
                return;
            }
        }

        item.classList.remove('hide');
    })
}

const setupFilters = (data) => {
    const searchInput = document.querySelector('#search-input')
    const priceMinInput = document.querySelector('#price-min')
    const priceMaxInput = document.querySelector('#price-max')
    const categorySelect = document.querySelector('.category select') // Task 1

    const getFilterParams = () => {
        const selectedRatingInput = document.querySelector('input[name="rating-selector"]:checked');
        const ratingValue = selectedRatingInput ? parseInt(selectedRatingInput.value) : 0;

        return {
            searchText: searchInput.value.trim(),
            priceMin: parseInt(priceMinInput.value),
            priceMax: parseInt(priceMaxInput.value),
            category: categorySelect.value, 
            rating: ratingValue,
            extraFunctions: getAllSelectedExtraFunctions()
        };
    };

    const applyFilters = () => {
        filterItems(data, getFilterParams());
    };

    searchInput.addEventListener('keyup', applyFilters);
    priceMinInput.addEventListener('keyup', applyFilters);
    priceMaxInput.addEventListener('keyup', applyFilters);

    categorySelect.addEventListener('change', applyFilters);

    document.querySelectorAll('input[name="rating-selector"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('.extra-functions-container input[type="checkbox"]').forEach(checkboxInput => {
        checkboxInput.addEventListener('change', applyFilters);
    })
}

const updateItemAvailabeCount = (id, count) => {
    const itemNode = document.querySelector(`.item[item-id="${id}"] .item-available-count`);
    const addBtn = document.querySelector(`.item[item-id="${id}"] .item-add`);
    
    if(itemNode) {
        itemNode.textContent = `Count: ${count}`;

        if (count === 0) {
            addBtn.classList.add('disabled');
        } else {
            addBtn.classList.remove('disabled');
        }
    }
}

const createViewItem = (item, data) => {
    const cartViewItem = document.createElement('div')
    cartViewItem.classList.add('cart-view-item')

    const cartViewItemImage = document.createElement('div')
    cartViewItemImage.classList.add('image')
    cartViewItemImage.style = `--bgImg: url('${item.imageUrl}')`

    const cartViewItemName = document.createElement('div')
    cartViewItemName.classList.add('name')
    cartViewItemName.textContent = item.name

    const cartViewItemPrice = document.createElement('div')
    cartViewItemPrice.classList.add('price')
    cartViewItemPrice.textContent = item.price

    const cartViewItemCount = document.createElement('div')
    cartViewItemCount.classList.add('count')

    const cartViewItemCountDec = document.createElement('div')
    cartViewItemCountDec.classList.add('decrease-count')
    cartViewItemCountDec.textContent = "-"
    
    const cartViewItemCountValue = document.createElement('div')
    cartViewItemCountValue.classList.add('count-value')
    cartViewItemCountValue.textContent = item.count

    const cartViewItemCountInc = document.createElement('div')
    cartViewItemCountInc.classList.add('increase-count')
    cartViewItemCountInc.textContent = "+"

    const cartViewItemTotalItemPrice = document.createElement('div')
    cartViewItemTotalItemPrice.classList.add("total-item-price")
    cartViewItemTotalItemPrice.textContent = (item.count * item.price).toFixed(2)

    const originalItem = data.find(el => el.id === item.id);

    cartViewItemCountInc.addEventListener('click', () => {
        if (originalItem.availableCount > 0) {
            item.count++;
            originalItem.availableCount--;

            cartViewItemCountValue.textContent = item.count;
            cartViewItemTotalItemPrice.textContent = (item.count * item.price).toFixed(2);

            updateItemAvailabeCount(item.id, originalItem.availableCount);

            setTotalPrice();
            updateCartCounterUI();
            saveCartToLS();
        }
    });

    cartViewItemCountDec.addEventListener('click', () => {
        if (item.count > 1) {
            item.count--;
            originalItem.availableCount++;

            cartViewItemCountValue.textContent = item.count;
            cartViewItemTotalItemPrice.textContent = (item.count * item.price).toFixed(2);
    
            updateItemAvailabeCount(item.id, originalItem.availableCount);

            setTotalPrice();
            updateCartCounterUI();
            saveCartToLS();
        }
    });

    cartViewItemCount.append(
        cartViewItemCountDec,
        cartViewItemCountValue,
        cartViewItemCountInc
    )

    const cartViewItemRemoveItem = document.createElement('div')
    cartViewItemRemoveItem.classList.add('remove-item')
    const cartViewItemRemoveItemImg = document.createElement('img')
    cartViewItemRemoveItemImg.src = "./imgs/delete.png"
    
    cartViewItemRemoveItemImg.addEventListener('click', () => {
        const index = cart.findIndex(el => el.id === item.id)

        originalItem.availableCount += item.count;
        updateItemAvailabeCount(item.id, originalItem.availableCount)

        cart.splice(index, 1)
        
        setTotalPrice()
        updateCartCounterUI();
        saveCartToLS();

        cartViewItem.remove()

        if(cart.length === 0) {
            document.querySelector('.cart-view-wrapper').classList.add('hide');
        }
    })
    
    cartViewItemRemoveItem.appendChild(cartViewItemRemoveItemImg)

    cartViewItem.append(
        cartViewItemImage,
        cartViewItemName,
        cartViewItemPrice,
        cartViewItemCount,
        cartViewItemTotalItemPrice,
        cartViewItemRemoveItem,
    )
    return cartViewItem
}

const setTotalPrice = () => {
    let totalPrice = 0
    for (const el of cart) {
        totalPrice += el.count * el.price
    }

    document.querySelector('#total-price-value')
        .textContent = totalPrice.toFixed(2)
}

document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('./electronic_items_dataset.json')
    const data = await response.json()


    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        
        parsedCart.forEach(savedItem => {

            const originalItem = data.find(el => el.id === savedItem.id);
            if (originalItem) {

                originalItem.availableCount -= savedItem.count;

                cart.push(savedItem);
            }
        });
        updateCartCounterUI();
    }

    const items = document.querySelector('.items')
    data.forEach(el => {
        const div = createItem(el)
        items.appendChild(div)
    })

    setCategoryValues(data)
    setExtraFunctions(data)
    setupFilters(data)

    const cartViewWrapper = document.querySelector('.cart-view-wrapper')
    const cartViewList = document.querySelector('.cart-view-list')

    const closeCart = () => {
        cartViewWrapper.classList.add('hide')
    }

    const openCart = () => {
        cartViewWrapper.classList.remove('hide')
    }

    document.querySelector('.blur')
        .addEventListener('click', () => {
            closeCart()
        })

    document.querySelector('#cart-view-close')
        .addEventListener('click', () => {
            closeCart()
        })

    document.querySelector('.cart > div')
        .addEventListener('click', () => {
            cartViewList.innerHTML = ''
            
            const cartViewItems = cart.map(item => {
                return createViewItem(item, data)
            })
            cartViewList.append(...cartViewItems)

            setTotalPrice()

            openCart()
        })

    document.querySelector('.loader').classList.add('hide')
})