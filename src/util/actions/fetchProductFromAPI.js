const date = new Date().toISOString().slice(0, 10)

async function fetchTotal(path = '', filter = '') {
    return await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site' +
        '/-;loc=nl_NL;cur=EUR/' + path + '/products' +
        '?amount=0&offset=0&_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result['total'])
        .catch(() => null)
}

async function fetchChunk(path = '', offset = 0, filter = '', amount = 20) {
    return await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site' +
        '/-;loc=nl_NL;cur=EUR/' + path + '/products?attrs=sku,listPrice,image&' +
        '&attributeGroup=PRODUCT_LIST_DETAIL_ATTRIBUTES' + filter + '&amount=20&offset=' + offset + '&_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result['elements'])
        .catch(() => null)
}

export async function fetchProductBySku(sku) {
    // Get the current date in the format YYYY-MM-DD
    return await fetch('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/products/'
        + sku + '?_date=' + date, {method: 'GET'})
        .then(response => response.json())
        .then(result => result)
        .catch(() => null)
}

export async function fetchRandomProduct() {
    const total = await fetchTotal()
    const random = Math.floor(Math.random() * total - 1);

    // Fetch the url of the product with the random number as the offset
    const products = await fetchChunk('', random, 1)
    return products[0]
}

export async function collectBreadProductsList() {
    let products = []

    let total = await fetchTotal('categories/boodschappen/' +
        'brood_bakkerij_ontbijtgranen_en_broodvervangers/harde_broodjes')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk(
            'categories/boodschappen/brood_bakkerij_ontbijtgranen_en_broodvervangers/harde_broodjes', i)
        products = products.concat(productsChunk)
    }

    total = await fetchTotal('categories/boodschappen/' +
        'brood_bakkerij_ontbijtgranen_en_broodvervangers/stokbrood')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk(
            'categories/boodschappen/brood_bakkerij_ontbijtgranen_en_broodvervangers/stokbrood', i)
        products = products.concat(productsChunk)
    }

    total = await fetchTotal('categories/boodschappen/' +
        'chips_nootjes_en_borrelhapjes/hartige_snacks')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk(
            'categories/boodschappen/chips_nootjes_en_borrelhapjes/hartige_snacks', i)
        products = products.concat(productsChunk)
    }

    // Filter out the products that are not in this category.
    return products.filter(product => product.attributes[0].value.length <= 4
        || ((product.uri.includes('stokbrood') || product.uri.includes('hartige_snacks'))
            && product.attributes[0].value.substring(6) === '0000000'))
}

export async function collectFruitPiecesProductsList() {
    let products = []

    const total = await fetchTotal('categories/boodschappen/fruit', '&Inhoud=1+stuk(s)')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk('categories/boodschappen/fruit', i, '&Inhoud=1+stuk(s)')
        products = products.concat(productsChunk)
    }

    // Filter out the products that are not in this category.
    return products
}

export async function collectFruitWeightProductsList() {
    let products = []

    const total = await fetchTotal('categories/boodschappen/fruit')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk('categories/boodschappen/fruit', i)
        products = products.concat(productsChunk)
    }

    // Filter out the products that are not in this category.
    return products.filter(product => product.attributes[0].value.substring(6) === '0000000'
    && !product.title.includes('appels') && !product.title.includes('peren'))
}

export async function collectVegetablePiecesProductsList() {
    let products = []

    const total = await fetchTotal('categories/boodschappen/groenten', '&Inhoud=1+stuk(s)')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk('categories/boodschappen/groenten', i, '&Inhoud=1+stuk(s)')
        products = products.concat(productsChunk)
    }

    // Filter out the products that are not in this category.
    return products.filter(product => product.attributes[0].value.length <= 4
        || product.attributes[0].value.substring(6) === '0000000')
}

export async function collectVegetableWeightProductsList() {
    let products = []

    const total = await fetchTotal('categories/boodschappen/groenten')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk('categories/boodschappen/groenten', i)
        products = products.concat(productsChunk)
    }

    // Filter out the products that are not in this category.
    return products.filter(product => product.attributes[0].value.substring(6) === '0000000')
}

export async function collectAppleAndPearProductsList() {
    let products = []

    // APPLES
    let total = await fetchTotal('categories/boodschappen/fruit/appels')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk('categories/boodschappen/fruit/appels', i)
        products = products.concat(productsChunk)
    }

    // PEARS
    total = await fetchTotal('categories/boodschappen/fruit/peren')
    for (let i = 0; i < total; i += 20) {
        const productsChunk = await fetchChunk('categories/boodschappen/fruit/peren', i)
        products = products.concat(productsChunk)
    }

    // Filter out the products that are unwanted.
    return products.filter(product => product.attributes[0].value.substring(6) === '0000000')
}