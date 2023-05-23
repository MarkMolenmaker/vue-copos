export default {
    namespaced: true,
    state: {
        /** PRODUCTION **/
        // isActive: false,
        // type: undefined,
        // data: undefined

        /** DEVELOPMENT **/
        isActive: false,
        type: undefined,
        data: undefined
    },
    getters: {
        isActive (state) { return state.isActive },
        alert (state) {
            return {
                type: state.type,
                ...state.data
            }
        },
    },
    mutations: {
        showAlert (state, payload) {
            state.isActive = true
            state.type = payload.type
            state.data = payload.data
        },
        closeAlert (state) {
            state.isActive = false
            state.type = undefined
            state.data = undefined
        }
    },
    actions: {
        showInfoAlert({commit}, payload) {
            commit('showAlert', {type: 'INFO', data: { message: payload }})
        },
        showBlockingAlert({commit}, payload) {
            commit('showAlert', {type: 'BLOCKING', data: { message: payload }})
        },
        closeAlert({commit}) {
            commit('closeAlert')
        }
    }
}