import {createStore} from "vuex";
import alert from "@/store/modules/alert";
import vault from "@/store/modules/vault";
import session from "@/store/modules/session";
import checkout from "@/store/modules/checkout";
import routerHistory from "@/store/modules/routerHistory";

const store = createStore({})
store.registerModule('alert', alert)
store.registerModule('vault', vault)
store.registerModule('session', session)
store.registerModule('checkout', checkout)
store.registerModule('routerHistory', routerHistory)

export default store