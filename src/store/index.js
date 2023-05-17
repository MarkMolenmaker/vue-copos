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
            // user: undefined

            /** DEVELOPMENT **/
            status: STATUS.SALE_ASSEMBLY,
            active: true,
            cash_register: { name: 'Kassa 1', number: 1 },
            user: { name: 'Mark Molenmaker', code: '1081140', password: '0000' }
        },
        checkout: {
            /** PRODUCTION **/
            // title: 'Deze kassa is gesloten',
            // inventory: []

            /** DEVELOPMENT **/
            title: 'Welkom',
            inventory: [ ]
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
        addProductToCheckout (state, payload) {
            state.checkout.inventory.push(payload)
        },
        duplicateLastAddedProduct (state, payload) {
            const lastEntry = state.checkout.inventory[state.checkout.inventory.length - 1]
            const newEntry = {
                product: lastEntry.product,
                quantity: payload
            }
            state.checkout.inventory.push(newEntry)
        },
        clearInventory (state) {
            state.checkout.inventory.splice(0)
        },

        clearRouteHistory (state) {
            state.routerHistory.splice(0)
        }
    },
    actions: {
        continueSession ({ commit }, payload) {
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
                return true
            } else if (this.state.session.status.type === 'SALE_PAYMENT') {
                commit('setSessionStatus', STATUS.SALE_ASSEMBLY)
                commit('setSessionActive', true)
                commit('setCheckoutTitle', 'Welkom')
                commit('clearInventory')
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
            commit('addProductToCheckout', payload)
        },
        duplicateLastAddedProduct ({ commit }, payload) {
            commit('duplicateLastAddedProduct', payload)
        },
        clearRouteHistory({ commit }) {
            commit('clearRouteHistory')
        }
    }
})