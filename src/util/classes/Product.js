export class Product {
    constructor(sku, name, price) {
        this._sku = sku
        this._name = name
        this._price = price
    }
    get sku() {
        return this._sku;
    }
    set sku(value) {
        this._sku = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
}