import { createStore } from 'vuex'
import {Product} from "@/util";

const DATABASE = {
    USERS: {
      '1081140': { name: 'Mark Molenmaker', code: '1081140', password: '0000' }
    },
    findUserByLoginCode: (loginCode) => { return DATABASE.USERS[loginCode] || false }
}

const STATUS = {
    INITIAL: {
        type: 'INITIAL',
        title: 'Aanloggen',
        description: 'Voer het lade nummer in'
    },
    ENTER_LOGIN_CODE: {
        type: 'ENTER_LOGIN_CODE',
        title: 'Aanloggen',
        description: 'Voer jouw identificatie in'
    },
    ENTER_PASSWORD: {
        type: 'ENTER_PASSWORD',
        title: 'Aanloggen',
        description: 'Voer jouw wachtwoord in'
    },
    SALE_ASSEMBLY: {
        type: 'SALE_ASSEMBLY',
        title: 'Verkoop - Begin'
    },
    SALE_PAYMENT: {
        type: 'SALE_PAYMENT',
        title: 'Verkoop - Einde'
    }
}

export default createStore({
    state: {
        session: {
            /** PRODUCTION **/
            // status: STATUS.INITIAL,
            // active: false,
            // cash_register: undefined,
            // user: undefined,
            // training_mode: false,
            // input: ''

            /** DEVELOPMENT **/
            status: STATUS.SALE_ASSEMBLY,
            active: true,
            cash_register: { name: 'Kassa 1', number: 1 },
            user: { name: 'Mark Molenmaker', code: '1081140', password: '0000' },
            training_mode: false,
            input: ''
        },
        checkout: {
            /** PRODUCTION **/
            // title: 'Deze kassa is gesloten',
            // inventory: [],
            // payment: 0

            /** DEVELOPMENT **/
            title: 'Welkom',
            inventory: [ ],
            payment: 0
        },
        routerHistory: []
    },
    getters: {
        session (state) {
            return state.session
        },

        checkout (state) {
            return state.checkout
        },
        checkoutTotalQuantity (state) {
            let total = 0
            state.checkout.inventory.filter(entry => entry.type === 'product').forEach(entry => {
                total += Number(entry.quantity)
            })
            return total
        },
        checkoutTotalPrice (state) {
            let total = 0
            state.checkout.inventory.filter(entry => entry.type === 'product').forEach(entry => {
                total += Number(entry.product.price) * Number(entry.quantity)
            })
            return total
        },
        checkoutTotalPayed (state) {
          return state.checkout.payment
        },
        checkoutTotalChange (state, getters) {
            // 10,00 (total) - 15,00 (payment) = 5,00 (change)
            return getters.checkoutTotalPayed >= getters.checkoutTotalPrice ?
                Math.abs(getters.checkoutTotalPrice - getters.checkoutTotalPayed) : 0
        },

        trainingMode (state) {
            return state.session.training_mode
        },

        previousRoute (state) {
            const historyLen = state.routerHistory.length
            if (historyLen === 0) return '/'
            return state.routerHistory[historyLen - 1]
        }
    },
    mutations: {
        setSessionStatus (state, payload) {
            state.session.status = payload
        },
        setSessionCashRegister (state, payload) {
            state.session.cash_register = payload
        },
        setSessionUser (state, payload) {
            state.session.user = payload
        },
        setSessionActive (state, payload) {
            state.session.active = payload
        },

        setCheckoutTitle (state, payload) {
            state.checkout.title = payload
        },
        addEntryToCheckoutInventory (state, payload) {
            state.checkout.inventory.push(payload)
        },
        duplicateLastAddedProduct (state, payload) {
            const lastEntry = state.checkout.inventory[state.checkout.inventory.length - 1]
            const newEntry = {
                type: 'product',
                product: lastEntry.product,
                quantity: payload
            }
            state.checkout.inventory.push(newEntry)
        },
        clearInventory (state) {
            state.checkout.inventory.splice(0)
        },

        setTrainingMode (state, payload) {
            state.session.training_mode = payload
        },

        makePayment (state, payload) {
            state.checkout.payment += Number(payload.replace(',', '.'))
        },
        clearPayment (state) {
            state.checkout.payment = 0
        },

        clearRouteHistory (state) {
            state.routerHistory.splice(0)
        }
    },
    actions: {
        continueSession ({ commit, getters }, payload) {
            // Check session state
            if (this.state.session.status.type === 'INITIAL') {
                if (isNaN(payload) || payload.length !== 1) return false    // Check if pay desk number is valid

                commit('setSessionStatus', STATUS.ENTER_LOGIN_CODE)
                commit('setSessionCashRegister', { name: 'Kassa ' + payload, number: payload })
                return true
            } else if (this.state.session.status.type === 'ENTER_LOGIN_CODE') {
                if (payload.length !== 7) return false    // Check if login code is valid

                const user = DATABASE.findUserByLoginCode(payload)
                if (!user) return false  // Check if user exists

                commit('setSessionStatus', STATUS.ENTER_PASSWORD)
                commit('setSessionUser', user)
            } else if (this.state.session.status.type === 'ENTER_PASSWORD') {
                if (payload !== this.state.session.user.password) return false  // Check if password is correct

                commit('setSessionStatus', STATUS.SALE_ASSEMBLY)
                commit('setSessionActive', true)
                commit('setCheckoutTitle', 'Welkom')
                return true
            } else if (this.state.session.status.type === 'SALE_ASSEMBLY') {
                commit('setSessionStatus', STATUS.SALE_PAYMENT)
                commit('setSessionActive', true)
                commit('setCheckoutTitle', 'Begin bon - ...')
                commit('addEntryToCheckoutInventory', {
                    type: 'info-large',
                    message: 'Totaal',
                    quantity: getters.checkoutTotalQuantity,
                    value: getters.checkoutTotalPrice,
                    price: ''
                })
                return true
            } else if (this.state.session.status.type === 'SALE_PAYMENT') {
                commit('setSessionStatus', STATUS.SALE_ASSEMBLY)
                commit('setSessionActive', true)
                commit('setCheckoutTitle', 'Welkom')
                commit('clearInventory')
                commit('clearPayment')
                return true
            }
        },
        logout ({ commit }) {
            commit('setSessionStatus', STATUS.INITIAL)
            commit('setSessionCashRegister', undefined)
            commit('setSessionUser', undefined)
            commit('setSessionActive', false)
            commit('setCheckoutTitle', 'Deze kassa is gesloten')
        },
        addProductToCheckout ({ commit }, payload) {
            commit('addEntryToCheckoutInventory', payload)
        },
        duplicateLastAddedProduct ({ commit }, payload) {
            commit('duplicateLastAddedProduct', payload)
        },

        toggleTrainingMode ({ commit }) {
            commit('setTrainingMode', !this.state.session.training_mode)
        },

        makePayment ({ commit, getters }, {type, value}) {
            commit('makePayment', value)
            commit('addEntryToCheckoutInventory', {
                type: 'payment',
                message: type,
                quantity: '',
                price: '',
                value: value
            })
            if (getters.checkoutTotalPayed <= getters.checkoutTotalPrice)
                commit('addEntryToCheckoutInventory', {
                    type: 'info-large',
                    message: 'Totaal',
                    quantity: '',
                    price: '',
                    value: getters.checkoutTotalPrice - getters.checkoutTotalPayed
                })
            else
                commit('addEntryToCheckoutInventory', {
                    type: 'info-large',
                    message: 'Terug',
                    quantity: '',
                    price: '',
                    value: getters.checkoutTotalChange
                })
        },

        clearRouteHistory({ commit }) {
            commit('clearRouteHistory')
        }
    }
})