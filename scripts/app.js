const jsonblob = 'https://jsonblob.com/api/984558472431681536';
let json;
const shoppingcart = new Carrito();

document.addEventListener('DOMContentLoaded', async () => {

    /*
    *
    * Coger los productos de JSONBLOB
    *
    */
    let i = 1;
    await fetch(jsonblob)
        .then(res => res.json()) //retorna una promesa
        .then(data => { //contenido de response
            json = data;
            data.products.forEach(elem => {
                // pintar los productos obtenidos
                drawProducts(elem.title, elem.SKU, elem.price, i);
                i++;
            });
        });

    /*
    *
    * Funcionalidades de los botones de la tabla de productos
    *
    */

    /*
    * Sumar productos
    */
    const buttonPlus = document.querySelectorAll('.js-btn-plus');
    buttonPlus.forEach(elem => {
        elem.addEventListener('click', (event) => {
            //elemento contador de la fila seleccionada
            const span_cont = (event.target).previousSibling.previousSibling;
            //conseguir id del producto por fila
            const row = span_cont.id.slice(-1);
            //recoger datos del producto
            const product_sku = document.querySelector(`#sku${row}`).innerText.slice(5, -1);
            const product_title = document.querySelector(`#name${row}`).innerText;
            const product_price = Number(document.querySelector(`#price${row}`).innerText.slice(0, -1));
            //crear nuevo producto para añadir al carrito
            const adding_product = new Producto(product_sku, product_title, product_price);
            //añadir producto al carrito
            addProduct(adding_product, span_cont);
        });
    });

    function addProduct(product, span_cont) {
        //añadimos el producto al carrito
        shoppingcart.addProduct(product);
        //recuperamos la unidades
        const res = shoppingcart.getProductInfo(product.getSku());
        span_cont.innerText = res.quantity;
        //calculamos el precio total de los productos de la tabla
        calculateTotalProducts(product, span_cont);
        //limpiamos el carrito
        const total_product = document.getElementById('sc-products');
        total_product.innerHTML = "";
        //pintamos el carrito
        drawShoppingCart();
    }

    /*
    * Restar productos
    */
    const buttonMinus = document.querySelectorAll('.js-btn-minus');
    buttonMinus.forEach(elem => {
        elem.addEventListener('click', (event) => {
            const span_cont = (event.target).nextSibling.nextSibling;
            //conseguir id del producto por fila
            const row = span_cont.id.slice(-1);
            //recoger datos del producto
            const product_sku = document.querySelector(`#sku${row}`).innerText.slice(5, -1);
            const product_title = document.querySelector(`#name${row}`).innerText;
            const product_price = Number(document.querySelector(`#price${row}`).innerText.slice(0, -1));
            //crear nuevo producto para añadir al carrito
            const removing_product = new Producto(product_sku, product_title, product_price);
            //restar producto al carrito
            removeProduct(removing_product, span_cont);
        });
    });

    function removeProduct(product, span_cont) {
        if (shoppingcart.productExist(product)) {
            // si existe, actualizamos las unidades del producto
            shoppingcart.updateQuantity(product.getSku(), false);
            //recuperamos la unidades
            const res = shoppingcart.getProductInfo(product.getSku());
            if (res === undefined)
                span_cont.innerText = 0;
            else
                span_cont.innerText = res.quantity;

            //calculamos el precio total de los productos de la tabla
            calculateTotalProducts(product, span_cont);
            //limpiamos el carrito
            const total_product = document.getElementById('sc-products');
            total_product.innerHTML = "";
            //pintamos el carrito
            drawShoppingCart();
        }
    }

    /*
    *
    * Calcular precio total de productos en la tabla
    *
    */
    function calculateTotalProducts(product, contElem) {
        let row = (contElem.id[contElem.id.length - 1]);
        const total = document.querySelector(`#total${row}`);
        //recuperamos el producto y calculamos el total
        const res = shoppingcart.getProductInfo(product.getSku());
        if (res === undefined) {
            //si el producto no existe porque no hay ninguna cantidad el total es 0
            total.innerText = 0 + shoppingcart.currency;
        } else {
            let total_price = res.getTotal();
            total.innerText = (total_price).toFixed(2) + shoppingcart.currency;
        }
    }
    console.log(shoppingcart.products);

});


/*
*
* Pintar productos en la tabla
*
*/
const drawProducts = (product_name, product_sku, product_price, i) => {
    let table_content = document.getElementById('table_content');
    table_content.innerHTML +=
        `<tr class="product_row">
        <th>
            <h2 id="name${i}"class="fw-bold js-name">
                ${product_name}
            </h2>
            <p id="sku${i}"class="fw-normal fs-6 js-sku">
                Ref: ${product_sku}
            </p>
        </th>
        <td class="align-middle">
            <button class="btn btn-danger m-1 js-btn-minus">
                -
            </button>
            <span id="cont${i}"class="border border-secondary rounded-2 py-2 px-4 js-product-cont">
                ${0}
            </span>
            <button class="btn btn-info m-1 js-btn-plus">
                +
            </button>
        </td>
        <td id="price${i}"class="align-middle js-product-price">
            ${product_price + shoppingcart.currency}
        </td>
        <td id="total${i++}"class="align-middle js-product-price-total">
            ${0 + shoppingcart.currency}
        </td >
    </tr >
`;
}

/*
*
* Pintar carrito
*
*/
const drawShoppingCart = () => {
    const total_product = document.getElementById('sc-products');
    shoppingcart.products.forEach(elem => {
        total_product.innerHTML +=
            `<div id="p-${elem.getSku()}" class="d-flex justify-content-between">
                <p id="p-${elem.getSku()}-name">
                    ${elem.getTitle()}
                </p>
                <p id="p-${elem.getSku()}-price">
                    ${elem.getTotal()}
                </p>
            </div>
            `;
    });
    const total_cart = document.querySelector('.js-total');
    const total = shoppingcart.calculateTotal();
    if (total === 0)
        total_cart.innerText = 0 + shoppingcart.currency;
    else
        total_cart.innerText = total.toFixed(2) + shoppingcart.currency;
}
