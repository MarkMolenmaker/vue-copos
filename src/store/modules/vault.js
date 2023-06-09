export default {
    namespaced: true,
    state: {
        /** PRODUCTION **/

        /** DEVELOPMENT **/
        physical: {
            ct5: 10,
            ct10: 10,
            ct20: 10,
            ct50: 10,
            ct100: 10,
            ct200: 10,
            ct500: 5,
            ct1000: 5,
            ct2000: 2,
            ct5000: 1,
        },
        digital: 100,
        open: false
    },
    getters: {
        isOpen (state) { return state.open },
        coins (state) {
            return Object.fromEntries(
                Object.entries(state.physical)
                    .filter(([key]) => ['ct5', 'ct10', 'ct20', 'ct50', 'ct100', 'ct200'].includes(key))
            )
        },
        notes (state) {
            return Object.fromEntries(
                Object.entries(state.physical)
                    .filter(([key]) => ['ct500', 'ct1000', 'ct2000', 'ct5000'].includes(key))
            )
        }
    },
    mutations: {
        setOpen (state, payload) { state.open = payload },
    },
    actions: {
        open ({ commit, dispatch }) {
            commit('setOpen', true)
            dispatch('alert/showBlockingAlert', 'Kassalade is open!', { root: true })
        },
        close ({ commit, dispatch }) {
            commit('setOpen', false)
            dispatch('alert/closeAlert', {}, { root: true })
        }
    }
}