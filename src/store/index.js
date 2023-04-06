import { createStore } from 'vuex'

export default createStore({
    state: {
        session: {
            title: 'Deze kassa is gesloten',
            state: 'Aanloggen',
            active: false,
            pay_desk: undefined,
            user: undefined
        }
    },
    getters: {
        session (state) {
            return state.session
        }
    },
    mutations: {},
    actions: {}
})