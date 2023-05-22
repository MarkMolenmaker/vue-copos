const DATABASE = {
    USERS: {
        '1081140': { name: 'Mark Molenmaker', code: '1081140', password: '00000' }
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
        title: 'Verkoop - Betalen'
    },
    SALE_POST_PAYMENT: {
        type: 'SALE_POST_PAYMENT',
        title: 'Verkoop - Einde'
    }
}

export default {
    namespaced: true,
    state: {
        /** PRODUCTION **/
        // status: STATUS.INITIAL,
        // active: false,
        // register: undefined,
        // user: undefined,

        /** DEVELOPMENT **/
        status: STATUS.SALE_ASSEMBLY,
        active: true,
        register: { name: 'Kassa 1', number: 1 },
        user: { name: 'Mark Molenmaker', code: '1081140', password: '00000' }
    },
    getters: {
        status (state) { return state.status },
        isActive (state) { return state.active },
        register (state) { return state.register },
        user (state) { return state.user }
    },
    mutations: {
        setStatus (state, payload) { state.status = payload },
        setActive (state, payload) { state.active = payload },
        setRegister (state, payload) { state.cash_register = payload },
        setUser (state, payload) { state.user = payload }
    },
    actions: {
        continue ({ commit, getters, dispatch }, payload) {
            // Check session state
            if (getters.status.type === 'INITIAL') {
                if (isNaN(payload) || payload.length !== 1) return false    // Check if pay desk number is valid

                commit('setStatus', STATUS.ENTER_LOGIN_CODE)
                commit('setRegister', { name: 'Kassa ' + payload, number: payload })
                return true
            } else if (getters.status.type === 'ENTER_LOGIN_CODE') {
                if (payload.length !== 7) return false    // Check if login code is valid

                const user = DATABASE.findUserByLoginCode(payload)
                if (!user) return false  // Check if user exists

                commit('setStatus', STATUS.ENTER_PASSWORD)
                commit('setUser', user)
            } else if (getters.status.type === 'ENTER_PASSWORD') {
                if (payload !== getters.user.password) return false  // Check if password is correct

                commit('setStatus', STATUS.SALE_ASSEMBLY)
                commit('setActive', true)
                dispatch('checkout/setTitle', 'Welkom', { root: true })
                return true
            } else if (getters.status.type === 'SALE_ASSEMBLY') {
                commit('setStatus', STATUS.SALE_PAYMENT)
                commit('setActive', true)
                dispatch('checkout/setTitle', 'Begin bon - ...', { root: true })
                dispatch('checkout/addTotalInfoEntry', {}, { root: true })
                return true
            } else if (getters.status.type === 'SALE_PAYMENT') {
                commit('setStatus', STATUS.SALE_POST_PAYMENT)
                dispatch('vault/open', {}, { root: true })
                return true
            } else if (getters.status.type === 'SALE_POST_PAYMENT') {
                // Dispatch save to bonnetje

                commit('setStatus', STATUS.SALE_ASSEMBLY)
                commit('setActive', true)
                dispatch('vault/close', {}, { root: true })
                dispatch('checkout/setTitle', 'Begin bon - ...', { root: true })
                dispatch('checkout/clearInventory', {}, { root: true })
                dispatch('checkout/clearPayment', {}, { root: true })
                return true
            }
        },
        logout ({ commit, dispatch }) {
            commit('setStatus', STATUS.INITIAL)
            commit('setActive', false)
            commit('setRegister', undefined)
            commit('setUser', undefined)
            dispatch('checkout/setTitle', 'Deze kassa is gesloten.', { root: true })
        }
    }
}