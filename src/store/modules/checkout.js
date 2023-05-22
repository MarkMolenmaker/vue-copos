export default {
    namespaced: true,
    state: {
        /** PRODUCTION **/
        // title: 'Deze kassa is gesloten',
        // inventory: [],
        // payment: 0

        /** DEVELOPMENT **/
        title: 'Welkom',
        inventory: [],
        payment: 0
    },
    getters: {
        checkout (state) { return state },
        totalQuantity (state) {
            let total = 0
            state.inventory.filter(entry => entry.type === 'product').forEach(entry => {
                total += Number(entry.quantity)
            })
            return total
        },
        totalPrice (state) {
            let total = 0
            state.inventory.filter(entry => entry.type === 'product').forEach(entry => {
                total += Number(entry.product.price) * Number(entry.quantity)
            })
            return total
        },
        totalPayed (state) {
            return state.payment
        },
        totalChange (state, getters) {
            return getters.totalPayed >= getters.totalPrice ?
                Math.abs(getters.totalPrice - getters.totalPayed) : 0
        },
    },
    mutations: {
        setTitle (state, payload) {
            state.title = payload
        },
        addEntryToInventory (state, payload) {
            state.inventory.push(payload)
        },
        duplicateLastAddedProduct (state, payload) {
            const lastEntry = state.inventory[state.inventory.length - 1]
            const newEntry = {
                type: 'product',
                product: lastEntry.product,
                quantity: payload
            }
            state.inventory.push(newEntry)
        },
        clearInventory (state) {
            state.inventory.splice(0)
        },
        makePayment (state, payload) {
            state.payment += Number(payload)
        },
        clearPayment (state) {
            state.payment = 0
        }
    },
    actions: {
        addProduct ({ commit }, payload) {
            commit('addEntryToInventory', payload)
        },
        duplicateLastAddedProduct ({ commit }, payload) {
            commit('duplicateLastAddedProduct', payload)
        },

        makePayment ({ commit, getters }, {type, value}) {
            commit('makePayment', value)
            commit('addEntryToInventory', {
                type: 'payment',
                message: type,
                quantity: '',
                price: '',
                value: value
            })
            if (getters.totalPayed <= getters.totalPrice)
                commit('addEntryToInventory', {
                    type: 'info-large',
                    message: 'Totaal',
                    quantity: '',
                    price: '',
                    value: getters.totalPrice - getters.totalPayed
                })
            else
                commit('addEntryToInventory', {
                    type: 'info-large',
                    message: 'Terug',
                    quantity: '',
                    price: '',
                    value: getters.totalChange
                })
        },

        setTitle ({ commit }, payload) {
            commit('setTitle', payload)
        },

        addTotalInfo ({ commit, getters }) {
            commit('addEntryToInventory', {
                type: 'info-large',
                message: 'Totaal',
                quantity: getters.totalQuantity,
                value: getters.totalPrice,
                price: ''
            })
        },

        clearInventory ({ commit }) {
            commit('clearInventory')
        },

        clearPayment ({ commit }) {
            commit('clearPayment')
        }

    }
}