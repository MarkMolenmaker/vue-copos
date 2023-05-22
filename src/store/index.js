import {createStore} from "vuex";
import session from "@/store/modules/session";
import checkout from "@/store/modules/checkout";
import routerHistory from "@/store/modules/routerHistory";

const store = createStore({})
store.registerModule('session', session)
store.registerModule('checkout', checkout)
store.registerModule('routerHistory', routerHistory)

export default store