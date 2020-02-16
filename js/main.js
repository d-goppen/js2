const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = ({ title = 'Some product', price = 100000, picture = './img/snow.jpg' }) => {
    // Parameters is the object now
    // Added parameter for picture address
    // Added default values for parameters
    // Added HTML for a picture
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src="${picture}" alt="There are no picturre yet">
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = (list) => {
    // Commas were printed because renderProducts has returned array.
    // By joining all elements of array in one string commas were deleted.
    // Now renderProducts returns one string instead of array.
    // Removed unsed "const productList"
    document.querySelector('.products').innerHTML = list.map((item) => renderProduct(item)).join('');
};

renderProducts(products);