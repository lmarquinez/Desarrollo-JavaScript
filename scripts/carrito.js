class Carrito {
  constructor(currency = '€', productos = []) {
    this.total = 0;
    this.currency = currency;
    this.products = productos;
  }

  getCarrito() {
    // Devuelve el carrito
    return this;
  }

  getProducts() {
    // Devuelve los productos añadidos al carrito
    return this.products;
  }

  getProductInfo(sku) {
    // Devuelve un producto
    return this.products.find((item) => item.getSku() === sku);
  }

  addProduct(product) {
    // Añade un producto al carrito
    if (!this.productExist(product)) {
      this.products.push(product);
    } else {
      return this.updateQuantity(product.getSku(), true);
    }
  }

  removeProduct(sku) {
    // Elimina un producto del carrito
    const index = this.products.findIndex((item) => item.getSku() === sku);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  productExist(product) {
    // Comprueba si el producto existe en el carrito
    return this.products.find((item) => item.getSku() === product.getSku());
  }

  updateQuantity(sku, sumar) {
    // Actualiza el número de unidades que se quieren comprar de un producto
    const item = this.products.find((item) => item.getSku() === sku);
    if (sumar)
      //suma cantidad
      item.quantity = item.getQuantity() + 1;
    else if (!sumar && item.getQuantity() > 1)
      //resta cantidad
      item.quantity = item.getQuantity() - 1;
    else if (!sumar && item.getQuantity() > 0) {
      //resta cantidad y si es 0 elimina el producto
      item.quantity = item.getQuantity() - 1;
      this.removeProduct(sku);
    }
  }

  calculateTotal() {
    // calcula el total del carrito
    return this.products.reduce((cont, item) => {
      return cont + item.getPrice() * item.getQuantity();
    }, 0);
  }

}

