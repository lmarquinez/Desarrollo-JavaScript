class Producto {
    constructor(...info) {
        this.SKU = info[0];
        this.title = info[1];
        this.price = Number(info[2]);
        this.quantity = 1;
    }

    getSku() {
        return this.SKU;
    }

    getTitle() {
        return this.title;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }

    getTotal() {
        return this.price * this.quantity;
    }
}