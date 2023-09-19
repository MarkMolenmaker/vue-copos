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

export async function collectAllBreadProductsList() {
    // Fetch the total amount of products
    const date = new Date().toISOString().slice(0, 10)
    const total = await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/categories/boodschappen/brood_bakkerij_ontbijtgranen_en_broodvervangers/harde_broodjes/products?sort=asc&amount=0&offset=0&_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result['total'])
        .catch(() => null)

    // Fetch all products, 20 at a time
    let products = []
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/categories/boodschappen/brood_bakkerij_ontbijtgranen_en_broodvervangers/harde_broodjes/products?sort=asc&amount=20&offset=' + i + '&_date=' + date, {method: 'GET'})
            .then(response => response.json())
            .then(result => result['elements'])
            .catch(() => null)
        products = products.concat(productsChunk)
    }

    // Add the sku to the product as a separate field. The sku is the last part of the uri.
    products = products.map(product => {
        product['sku'] = product['uri'].split("/").pop()
        return product
    })

    // Filter out the products that are not bread. These are the products that have a sku that is 4 digits or less.
    return products.filter(product => product['sku'].length <= 4)
}