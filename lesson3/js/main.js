const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
//let getRequest = (url, cb) => {
//  let xhr = new XMLHttpRequest();
//  xhr.open('GET', url, true);
//  xhr.onreadystatechange = () => {
//    if (xhr.readyState === 4) {
//      if (xhr.status !== 200) {
//        console.log('Error');
//      } else {
//        cb(xhr.responseText);
//      }
//    }
//  };
//  xhr.send();
//};

let getRequest = (url, cb) => {
    fetch(url)
        .then(resp => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error(`Ошибка выполнения запроса: ${resp.status}`);
            };
        })
        .then(resp => cb(resp.text()))
        .catch(err => console.error(err));
};

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    // _fetchProducts() {
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     this.goods = JSON.parse(data);
    //     this.render();
    //     console.log(this.goods);
    //   });
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('Error:', error);
            });
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        // this.title = product.title;
        this.title = product.product_name; // Because there are no "title" :^)
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

const list = new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 1000},
//   {id: 2, title: 'Mouse', price: 100},
//   {id: 3, title: 'Keyboard', price: 250},
//   {id: 4, title: 'Gamepad', price: 150},
// ];
//
// const renderProduct = (item) => `<div class="product-item">
//             <h3>${item.title}</h3>
//             <p>${item.price}</p>
//             <button class="by-btn">Добавить</button>
//           </div>`;
//
// const renderProducts = list => {
//   document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)));
// };
//
// renderProducts(products);