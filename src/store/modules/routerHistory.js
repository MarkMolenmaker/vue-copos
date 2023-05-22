export default {
    namespaced: true,
    state: {
        history: []
    },
    getters: {
        previous (state) {
            const historyLen = state.history.length
            if (historyLen === 0) return '/'
            return state.history[historyLen - 1]
        },
        length (state) {
            return state.history.length
        }
    },
    mutations: {
        splice (state) {
            state.history.splice(-1, 1)
        },
        push (state, payload) {
            state.history.push(payload)
        },
        clear (state) {
            state.history.splice(0)
        }
    },
    actions: {
        splice ({ commit }) {
            commit('splice')
        },
        push ({ commit }, payload) {
            commit('push', payload)
        },
        clear({ commit }) {
            commit('clear')
        }
    }
}