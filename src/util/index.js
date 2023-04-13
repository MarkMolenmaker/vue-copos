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

export async function fetchRandomProduct() {
    // Fetch the total amount of products
    const date = new Date().toISOString().slice(0, 10)
    const total = await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/products?amount=0&offset=0&_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result['total'])
        .catch(() => null)
    // Get a random number between 0 and the total
    const random = Math.floor(Math.random() * total - 1);
    // Fetch the url of the product with the random number as the offset
    const sku = await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/products?amount=1&offset=' + random + '&_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result['elements'][0]['uri'].replace("COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/products/", ""))
        .catch(() => null)
    return await fetchProductBySku(sku)
}