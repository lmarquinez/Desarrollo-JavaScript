class Carrito {
  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created.
   * @param [currency=€] - The currency symbol to be used.
   * @param [productos] - an array of objects, each object has a name and a price
   */
  constructor(currency = '€', productos = []) {
    this.total = 0;
    this.currency = currency;
    this.products = productos;
  }

  /**
   * This function returns the products added to the cart.
   * @returns The products array.
   */
  getProducts() {
    return this.products;
  }

  /**
   * Return the product object from the products array that has a sku property that matches the sku
   * argument.
   * @param sku - The sku of the product you want to get the info for.
   * @returns The product object that matches the sku.
   */
  getProductInfo(sku) {
    return this.products.find((item) => item.getSku() === sku);
  }

  /**
   * If the product doesn't exist, add it to the products array. If it does exist, update the quantity.
   * @param product - the product object to be added to the cart
   * @returns The return value is the result of the updateQuantity method.
   */
  addProduct(product) {
    if (!this.productExist(product)) {
      this.products.push(product);
    } else {
      return this.updateQuantity(product.getSku(), true);
    }
  }

  /**
   * It takes a sku as an argument, finds the index of the product with that sku in the products array,
   * and if it exists, removes it from the array.
   * @param sku - The SKU of the product to remove.
   */
  removeProduct(sku) {
    const index = this.products.findIndex((item) => item.getSku() === sku);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  /**
   * If the product exists in the cart, return the product, otherwise return false.
   * @param product - The product to be added to the cart.
   * @returns The product object.
   */
  productExist(product) {
    return this.products.find((item) => item.getSku() === product.getSku());
  }

  /**
   * If the user clicks the plus button, the quantity of the product is increased by one. If the user
   * clicks the minus button, the quantity of the product is decreased by one, unless the quantity is
   * already one, in which case the product is removed from the cart.
   * @param sku - the product's sku
   * @param sumar - boolean
   */
  updateQuantity(sku, sumar) {
    const item = this.products.find((item) => item.getSku() === sku);
    if (sumar)
      item.quantity = item.getQuantity() + 1;
    else if (!sumar && item.getQuantity() > 1)
      item.quantity = item.getQuantity() - 1;
    else if (!sumar && item.getQuantity() > 0) {
      item.quantity = item.getQuantity() - 1;
      this.removeProduct(sku);
    }
  }

  /**
   * It takes an array of products, and returns the sum of the price of each product multiplied by the
   * quantity of each product.
   * @returns The total price of all the products in the cart.
   */
  calculateTotal() {
    return this.products.reduce((cont, item) => {
      return cont + item.getPrice() * item.getQuantity();
    }, 0);
  }

}

