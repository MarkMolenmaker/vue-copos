import sku from "@/util/sku";

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

export async function fetchProductBySku(sku) {
    // Get the current date in the format YYYY-MM-DD
    const date = new Date().toISOString().slice(0, 10)
    return await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/products/' + sku + '?_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result)
        .catch(() => null)
}

export function getRandomSku() {
    // Get a random number between 0 and the length of the skuCodes array
    const random = Math.floor(Math.random() * sku.codes.length)
    // Return the skuCode at the random index
    return sku.codes[random]
}