import {getField, updateField} from "vuex-map-fields";

export default {
    namespaced: true,
    state: {
        /** PRODUCTION **/
        // title: 'Deze kassa is gesloten',
        // inventory: [],
        // payment: 0,
        // input: '',
        // trainingMode: false

        /** DEVELOPMENT **/
        title: 'Welkom',
        inventory: [],
        payment: 0,
        input: '',
        trainingMode: false
    },
    getters: {
        getField,
        title (state) { return state.title },
        inventory (state) { return state.inventory },
        totalPayed (state) { return state.payment },
        isTrainingModeEnabled (state) { return state.trainingMode },
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
        totalChange (state, getters) {
            return getters.totalPayed >= getters.totalPrice ?
                Math.abs(getters.totalPrice - getters.totalPayed) : 0
        }
    },
    mutations: {
        updateField,
        setTitle (state, payload) { state.title = payload },
        addEntry (state, payload) { state.inventory.push(payload) },
        clearInventory (state) { state.inventory.splice(0) },
        makePayment (state, payload) { state.payment += Number(payload) },
        clearPayment (state) { state.payment = 0 },
        setTrainingMode (state, payload) { state.trainingMode = payload },
        duplicateLastAddedProduct (state, payload) {
            const productsInventory = state.inventory.filter(entry => entry.type === 'product')
            if (productsInventory.length <= 0) return
            const lastEntry = productsInventory[productsInventory.length - 1]
            const newEntry = {
                type: 'product',
                product: lastEntry.product,
                quantity: payload
            }
            state.inventory.push(newEntry)
        }
    },
    actions: {
        setTitle ({ commit }, payload) { commit('setTitle', payload) },
        addEntry ({ commit }, payload) { commit('addEntry', payload) },
        duplicateLastAddedProduct ({ commit }, payload) { commit('duplicateLastAddedProduct', payload) },
        clearInventory ({ commit }) { commit('clearInventory') },
        clearPayment ({ commit }) { commit('clearPayment') },
        toggleTrainingMode ({ commit, getters }) { commit('setTrainingMode', !getters.isTrainingModeEnabled) },
        addTotalInfoEntry ({ commit, getters }) {
            commit('addEntry', {
                type: 'info-large',
                message: 'Totaal',
                quantity: getters.totalQuantity,
                value: getters.totalPrice,
                price: ''
            })
        },
        makePayment ({ commit, getters, dispatch }, {type, value}) {
            commit('makePayment', value)
            commit('addEntry', {
                type: 'payment',
                message: type,
                quantity: '',
                price: '',
                value: value
            })
            if (getters.totalPayed <= getters.totalPrice)
                commit('addEntry', {
                    type: 'info-large',
                    message: 'Totaal',
                    quantity: '',
                    price: '',
                    value: getters.totalPrice - getters.totalPayed
                })
            else {
                commit('addEntry', {
                    type: 'info-large',
                    message: 'Terug',
                    quantity: '',
                    price: '',
                    value: getters.totalChange
                })
                dispatch('session/continue', {}, { root: true })
            }
        },
        makeFullPayment ({ commit, getters, dispatch }, payload) {
            commit('makePayment', getters.totalPrice - getters.totalPayed)
            commit('addEntry', {
                type: 'payment',
                message: payload,
                quantity: '',
                price: '',
                value: getters.totalPrice - getters.totalPayed
            })
            commit('addEntry', {
                type: 'info-large',
                message: 'Terug',
                quantity: '',
                price: '',
                value: getters.totalChange
            })
            dispatch('session/continue', {}, { root: true })
        }
    }
}