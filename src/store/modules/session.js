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

export default {
    namespaced: true,
    state: {
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
    getters: {
        session (state) {
            return state
        },
        trainingMode (state) {
            return state.training_mode
        },
        isActive (state) {
            return state.active
        }
    },
    mutations: {
        setStatus (state, payload) {
            state.status = payload
        },
        setCashRegister (state, payload) {
            state.cash_register = payload
        },
        setUser (state, payload) {
            state.user = payload
        },
        setActive (state, payload) {
            state.active = payload
        },
        setTrainingMode (state, payload) {
            state.session.training_mode = payload
        },
    },
    actions: {
        continue ({ commit, getters, dispatch }, payload) {
            // Check session state
            if (getters.session.status.type === 'INITIAL') {
                if (isNaN(payload) || payload.length !== 1) return false    // Check if pay desk number is valid

                commit('setStatus', STATUS.ENTER_LOGIN_CODE)
                commit('setCashRegister', { name: 'Kassa ' + payload, number: payload })
                return true
            } else if (getters.session.status.type === 'ENTER_LOGIN_CODE') {
                if (payload.length !== 7) return false    // Check if login code is valid

                const user = DATABASE.findUserByLoginCode(payload)
                if (!user) return false  // Check if user exists

                commit('setStatus', STATUS.ENTER_PASSWORD)
                commit('setUser', user)
            } else if (getters.session.status.type === 'ENTER_PASSWORD') {
                if (payload !== getters.session.user.password) return false  // Check if password is correct

                commit('setStatus', STATUS.SALE_ASSEMBLY)
                commit('setActive', true)
                dispatch('checkout/setTitle', 'Welkom', { root: true })
                return true
            } else if (getters.session.status.type === 'SALE_ASSEMBLY') {
                commit('setStatus', STATUS.SALE_PAYMENT)
                commit('setActive', true)
                dispatch('checkout/setTitle', 'Begin bon - ...', { root: true })
                dispatch('checkout/addTotalInfo', {}, { root: true })
                return true
            } else if (getters.session.status.type === 'SALE_PAYMENT') {
                commit('setStatus', STATUS.SALE_ASSEMBLY)
                commit('setActive', true)
                dispatch('checkout/setTitle', 'Begin bon - ...', { root: true })
                dispatch('checkout/clearInventory', {}, { root: true })
                dispatch('checkout/clearPayment', {}, { root: true })
                return true
            }
        },
        logout ({ commit }) {
            commit('setStatus', STATUS.INITIAL)
            commit('setCashRegister', undefined)
            commit('setUser', undefined)
            commit('setActive', false)
            dispatch('checkout/setTitle', 'Deze kassa is gesloten.', { root: true })
        },

        toggleTrainingMode ({ commit, getters }) {
            commit('setTrainingMode', !getters.trainingMode)
        },
    }
}