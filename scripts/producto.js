class Producto {
    /**
     * The constructor function is a special function that is called when a new instance of the class is
     * created
     * @param info - An array of the parameters passed to the constructor.
     */
    constructor(...info) {
        this.SKU = info[0];
        this.title = info[1];
        this.price = Number(info[2]);
        this.quantity = 1;
    }

    /**
     * This function returns the SKU of the product
     * @returns The SKU of the product.
     */
    getSku() {
        return this.SKU;
    }

    /**
     * It returns the value of the title property of the object that called it.
     * @returns The title of the book.
     */
    getTitle() {
        return this.title;
    }

    /**
     * Get the price of the product.
     * @returns The price of the item.
     */
    getPrice() {
        return this.price;
    }

    /**
     * This function returns the value of the quantity property of the object that called it.
     * @returns The quantity of the item.
     */
    getQuantity() {
        return this.quantity;
    }
    /**
     * Get the total price of the item by multiplying the price by the quantity.
     * @returns The total price of the item.
     */

    getTotal() {
        return this.price * this.quantity;
    }
}